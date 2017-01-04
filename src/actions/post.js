export const FETCHING_POST = 'FETCH_POST'
export const DONE_FETCHING_POST = 'DONE_FETCH_POST'
export const NO_POST_FOUND = 'NO_POST_FOUND'

export const ERROR_FETCHING_POST = 'ERROR_FETCHING_POST'

export const UPLOADING_POST = 'UPLOADING_POST'
export const DONE_UPLOADING_POST = 'DONE_UPLOADING_POST'

import { browserHistory } from 'react-router'

import { encrypt, decrypt } from '../utils/Crypto'

import { b64_encode, b64_decode } from '../utils/Base64'

const checkStatus = (response) => {
  if (response.ok) {
    return response
  } else {
    const error = new Error(response.statusText)

    error.response = response
    throw error
  }
}

const fetchingPost = () => ({
  type: FETCHING_POST
})

const gotPost = (postContent) => ({
  type: DONE_FETCHING_POST,
  post: postContent
})

const noPostFound = () => ({
  type: NO_POST_FOUND
})

const uploadingPost = post => ({
  type: UPLOADING_POST
})

const postUploaded = (post, json) => ({
  type: DONE_UPLOADING_POST,
  post,
  url: json.files['anolog.encrypted.json'].raw_url,
  publishedAt: Date.now()
})

export const fetchPost = (hashId1, hashId2, key) => async dispatch => {
  const url = `https://gist.githubusercontent.com/anonymous/${hashId1}/raw/${hashId2}/anolog.encrypted.json`

  dispatch(fetchingPost())

  try {
    const response  = await fetch(url)
                      await checkStatus(response)
    const text      = await response.text()
    const decoded   = b64_decode(text, true)

    const decryptedPost = await decrypt(new Uint8Array(decoded), key)
    const parsedPost = JSON.parse(new TextDecoder('utf-8').decode(decryptedPost))

    dispatch(gotPost(parsedPost))

    return parsedPost
  }
  catch (e) {
    console.log(e)
    browserHistory.replace('/not-found')
    dispatch(noPostFound())
  }
}

export const uploadPost = (isExplorable = true) => async (dispatch, getState) => {
  const { editor } = getState()
  const danteEditor = editor.editor.editor

  const content = danteEditor.emitSerializedOutput()

  // const firstImage = content.blocks.find(o => { return o.type === 'image'})
  // const imageUrl = firstImage ? firstImage.data.url : false
  // const title = content.blocks[0].text
  // const words = danteEditor.getTextFromEditor().split(" ").length

  const binaryContent = new TextEncoder().encode(JSON.stringify(content))

  const { encryptedData, key }  = await encrypt(binaryContent)
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      public: false,
      files: {
        'anolog.encrypted.json': {
          'content':  b64_encode(encryptedData, true, false)
        }
      }
    })
  }

  dispatch(uploadingPost(content))

  try {
    const response  = await fetch('https://api.github.com/gists', options)
                      await checkStatus(response)
    const json      = await response.json()

    dispatch(dispatch(postUploaded(content, json)))

    let hash1 = json.files['anolog.encrypted.json'].raw_url.split('/')[4]
    let hash2 = json.files['anolog.encrypted.json'].raw_url.split('/')[6]

    browserHistory.replace(`/p/${hash1}/${hash2}/${key}`)

    return json
  }
  catch(e) {

  }

}
