require('dotenv').config()

// AWS
const awsBucketDocuments = process.env.BUCKETEER_BUCKET_NAME
const awsRegion = process.env.BUCKETEER_AWS_REGION || 'eu-west-1'
const aws = {
  publicUrl: `https://${awsBucketDocuments}.s3.amazonaws.com`,
  config: {
    apiVersion: '2006-03-01',
    accessKeyId: process.env.BUCKETEER_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.BUCKETEER_AWS_SECRET_ACCESS_KEY,
    region: awsRegion,
  },
  s3BucketName: awsBucketDocuments,
}

module.exports = {
  envName: '',
  serverUrl: process.env.SERVER_URL || 'http://localhost:8080/api',
  frontUrl: process.env.FRONT_URL || 'http://localhost:3000',
  port: process.env.PORT || 8080,
  database: {
    url: process.env.DATABASE_URL,
  },
  jsonwebtoken: {
    private_key: 'dsfsdjfmsdjdfmsljfmlsdkfmskfmdlskflm',
  },
  aws,
  stripe: process.env.STRIPE,
  consoleLog: true,
  sendinblue: process.env.SENDINBLUE,
  adminEmail : process.env.ADMIN_EMAIL || 'redwane.zafari@dev-together.com',
  adminName : process.env.ADMIN_NAME || 'Redwane Zafari',
  forceDestroy: false,
}
