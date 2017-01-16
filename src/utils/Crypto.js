import { b64_encode, b64_decode } from './Base64'


const ALGO_NAME = 'AES-GCM'
const ALGO_LENGTH = 256
const IV_LENGTH = 16

const crypto = window.crypto || window.webkitCrypto

const joinIvAndData = (iv, data) => {
  const buf = new Uint8Array(iv.length + data.length)

  buf.set(iv)
  buf.set(data, iv.length)

  return buf
}

export const encrypt = async (data) => {
  const iv = new Uint8Array(IV_LENGTH)
        crypto.getRandomValues(iv)

  const cryptoKey = await crypto.subtle.generateKey({ name: ALGO_NAME, length: ALGO_LENGTH }, true, ['encrypt'])
  const rawKey = b64_encode(await crypto.subtle.exportKey('raw', cryptoKey), true, false)
  const encrypted = await crypto.subtle.encrypt({ name: ALGO_NAME, iv }, cryptoKey, data)


  const encryptedData = joinIvAndData(iv, new Uint8Array(encrypted))

  return {
    encryptedData,
    key: rawKey
  }
}

export const decrypt = async (data, key) => {
  const iv = data.subarray(0, 16)
  const encryptedData = data.subarray(16)

  const rawKey = new Uint8Array((b64_decode(key, true)))

  const importedKey = await crypto.subtle.importKey('raw', rawKey, ALGO_NAME, false, ['decrypt'])
  const decryptedData = await crypto.subtle.decrypt({ name: ALGO_NAME, iv }, importedKey, encryptedData)

  return decryptedData
}


export const getRandomString = (length = 10) => {
  const letters = 'ABCDEFGHIJLKMNOPQRSTUVWXYZabcdefghijlkmnopqrstuvwxyz123456789'.split('')
  const randomNumbers =  Array.from(crypto.getRandomValues(new Uint8Array(length)))
  const randomString = randomNumbers.map(s => { return letters[parseInt(s, 10) % letters.length] }).join('')
  return randomString
}