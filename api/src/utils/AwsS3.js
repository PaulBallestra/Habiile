import fs, { readFileSync } from 'fs'
import AWS from 'aws-sdk'
import config from 'config'
import { crypt } from './'
import ffmpeg from 'fluent-ffmpeg'
import ffmpegPath from '@ffmpeg-installer/ffmpeg'
import path from 'path'
const { s3BucketName } = config.aws

ffmpeg.setFfmpegPath(ffmpegPath.path)

async function readFile (file) {
  if (file.path) {
    return new Promise((resolve, reject) => {
      fs.readFile(file.path, (error, data) => {
        if (error) reject(error)
        return resolve(data)
      })
    })
  }
  return file
}

export class AwsS3 {
  constructor () {
    AWS.config.update(config.aws.config)
    this.s3 = new AWS.S3()
  }

  delete ({ Key, ...rest }) {
    const params = { Bucket: s3BucketName, Key, ...rest }

    // DOC => http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#upload-property
    // param => { Bucket, Key, Body, ACL, ContentType, ... }
    return new Promise((resolve, reject) => {
      this.s3.deleteObject(params, (error, result) => {
        if (error) reject(error)
        else resolve(result)
      })
    })
  }

  async upload (param) {
    const defaultParams = { Bucket: s3BucketName }

    // DOC => http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#upload-property
    // param => { Bucket, Key, Body, ACL, ContentType, ... }
    return new Promise((resolve, reject) => {
      this.s3.upload({ ...defaultParams, ...param }, (error, result) => {
        if (error) reject(error)
        else resolve(result)
      })
    })
  }

  async putBase64 (aws_key, base64) {
    const defaultParams = { Bucket: s3BucketName }
    const base64Data = new Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ''), 'base64')
    const type = base64.split(';')[0].split('/')[1]

    const params = {
      Key: aws_key,
      Body: base64Data,
      ContentEncoding: 'base64',
      ContentType: type,
      ACL: 'public-read',
    }

    return new Promise((resolve, reject) => {
      this.s3.putObject({ ...defaultParams, ...params }, (error /*, result*/) => {
        if (error) reject(error)
        else resolve(this.getPublicUrl(aws_key))
      })
    })
  }

  async putImage (aws_key, image) {

    if (config.imageTestUrl) {
    // FOR DEV MODE ONLY
      return new Promise((resolve) => {
        resolve(config.imageTestUrl)
      })
    }

    //Image
    const defaultParams = { Bucket: s3BucketName }

    const params = {
      Key: aws_key,
      Body: readFileSync(image.path),
      //ContentEncoding: 'base64',
      ContentType: image.type,
      ACL: 'public-read',
    }
    return new Promise((resolve, reject) => {
      this.s3.putObject({ ...defaultParams, ...params }, (error /*, result*/) => {
        if (error) reject(error)
        else resolve(this.getPublicUrl(aws_key))
      })
    })
  }

  async putObject (param) {
    const defaultParams = { Bucket: s3BucketName }
    return new Promise((resolve, reject) => {
      this.s3.putObject({ ...defaultParams, ...param }, (error, result) => {
        if (error) reject(error)
        else resolve(result)
      })
    })
  }

  async uploadPublic (param) {
    return this.upload({ ...param, ACL: 'public-read' })
  }

  async uploadPublicFile (param) {
    param.Body = await readFile(param.Body)
    return this.uploadPublic(param)
  }

  getPublicUrl (aws_key) {
    return `${config.aws.publicUrl}/${aws_key}`
  }

  getUrl (param) {
    const defaultParams = { Bucket: s3BucketName }
    return new Promise((resolve, reject) => {
      return this.s3.getSignedUrl('getObject', { ...defaultParams, ...param }, (error, url) => {
        if (error) reject(error)
        else resolve(url)
      })
    })
  }

  async getObject (param) {
    const defaultParams = { Bucket: s3BucketName }
    return new Promise((resolve, reject) => {
      this.s3.getObject({ ...defaultParams, ...param }, (error, result) => {
        if (error) reject(error)
        else resolve(result)
      })
    })
  }

  async awsKeyExists ({ Bucket, Key }) {
    return new Promise((resolve) => {
      this.s3.headObject({ Bucket, Key }, (error) => {
        if (error) resolve(false)
        else resolve(true)
      })
    })
  }

  async checkAndUpdate (objectAfter, objectBefore, nodeToCheck, key) {
    // console.log(objectAfter, objectBefore, nodeToCheck)
    const cleanString = (string) => {
      return string.slice(5, -1)
    }

    const regexNewImages = /src="data(.*?)"/gi
    const regexOldImages = /src="http(.*?)"/gi

    for (let nodeIndex = 0; nodeIndex < nodeToCheck.length; nodeIndex++) {
      // add new images
      const foundNewImages = (objectAfter[nodeToCheck[nodeIndex]] || '').match(regexNewImages) || []
      for (let foundIndex = 0; foundIndex < foundNewImages.length; foundIndex++) {
        const image = cleanString(foundNewImages[foundIndex])
        const keyName = crypt.encryptPassword(`${key}-${nodeToCheck[nodeIndex]}-${Date.now()}-${foundIndex}`).replace(/\//, '').replace(/\./, '')
        const url = await this.putBase64(keyName, image)

        objectAfter[nodeToCheck[nodeIndex]] = objectAfter[nodeToCheck[nodeIndex]].replace(image, url)
      }

      // remove old images
      if (objectBefore) {
        const foundOldImages = (objectBefore[nodeToCheck[nodeIndex]] || '').match(regexOldImages) || []
        for (let foundIndex = 0; foundIndex < foundOldImages.length; foundIndex++) {
          const image = cleanString(foundOldImages[foundIndex])
          if (objectAfter === null || objectAfter[nodeToCheck[nodeIndex]].indexOf(image) === -1) {
            let awsKey = image.split('/')
            awsKey = awsKey[awsKey.length - 1]
            await this.delete({ Key: awsKey })
          }
        }
      }
    }

    return objectAfter
  }

  async checkAndUpdateImages (objectAfter, objectBefore, nodeToCheck, key) {
    // console.log(objectAfter, objectBefore, nodeToCheck)
    for (let nodeIndex = 0; nodeIndex < nodeToCheck.length; nodeIndex++) {
      // add new images
      if (objectAfter) {
        const image = objectAfter[nodeToCheck[nodeIndex]] || ''

        if (image.startsWith('data')) {
          const keyName = crypt.encryptPassword(`${key}-${nodeToCheck[nodeIndex]}-${Date.now()}`).replace(/[/.$]/g, '')
          const url = await this.putBase64(keyName, image)

          objectAfter[nodeToCheck[nodeIndex]] = url
        }
      }

      // remove old images
      if (objectBefore) {
        const image = objectBefore[nodeToCheck[nodeIndex]] || ''

        if (image.startsWith('http') && (objectAfter === null || objectAfter[nodeToCheck[nodeIndex]] !== image)) {
          let awsKey = image.split('/')
          awsKey = awsKey[awsKey.length - 1]
          await this.delete({ Key: awsKey })
        }
      }
    }

    return objectAfter
  }
}

const awsS3 = new AwsS3()

export default awsS3
