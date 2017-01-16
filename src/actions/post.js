export const FETCHING_POST = 'FETCH_POST'
export const DONE_FETCHING_POST = 'DONE_FETCH_POST'
export const NO_POST_FOUND = 'NO_POST_FOUND'

export const ERROR_FETCHING_POST = 'ERROR_FETCHING_POST'

export const UPLOADING_POST = 'UPLOADING_POST'
export const DONE_UPLOADING_POST = 'DONE_UPLOADING_POST'

import { hashHistory } from 'react-router'

import { encrypt, decrypt, getRandomString } from '../utils/Crypto'

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
  url: json.url,
  publishedAt: Date.now()
})

export const fetchPost = (hashId, key) => async dispatch => {
  const url = `https://api.github.com/gists/${hashId}`

  dispatch(fetchingPost())

  try {
    const response  = await fetch(url)
                      await checkStatus(response)
    const json      = await response.json()
    const encryptedFile = json.files[Object.keys(json.files)[0]]
    let text


    if (json.truncated) {
      const rawResponse  = await fetch(encryptedFile.raw_url)
                           await checkStatus(rawResponse)
      text = await rawResponse.text()
    }
    else {
      text = await encryptedFile.content
    }

    const decoded   = b64_decode(text, true)
    const decryptedPost = await decrypt(new Uint8Array(decoded), key)
    const parsedPost = JSON.parse(new TextDecoder('utf-8').decode(decryptedPost))

    dispatch(gotPost(parsedPost))

    return parsedPost
  }
  catch (e) {
    console.log(e)
    hashHistory.replace('not-found')
    dispatch(noPostFound())
  }
}

export const uploadPost = (isExplorable = true) => async (dispatch, getState) => {
  const { editor } = getState()
  const danteEditor = editor.editor.editor

  const content = danteEditor.emitSerializedOutput()
  const binaryContent = new TextEncoder().encode(JSON.stringify(content))
  const { encryptedData, key }  = await encrypt(binaryContent)
  const randomString  = await getRandomString()
  let files = {}

  files[randomString] = {
    'content':  b64_encode(encryptedData, true, false)
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      public: false,
      files,
    })
  }

  dispatch(uploadingPost(content))

  try {
    const response  = await fetch('https://api.github.com/gists', options)
                      await checkStatus(response)
    const json      = await response.json()

    dispatch(dispatch(postUploaded(content, json)))

    let hash = json.files[randomString].raw_url.split('/')[4]

    hashHistory.replace(`${hash}/${key}`)

    return json
  }
  catch(e) {
    console.log(e);
    hashHistory.replace('not-found')
    dispatch(noPostFound())
  }

}
