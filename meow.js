const fs = require('fs');

const data = fs.readFileSync('test.jpg', 'binary');
const buffer = new Buffer(data, 'binary');
const ready = buffer.toString('base64');

// Depends on tencentcloud-sdk-nodejs version 4.0.3 or higher
const tencentcloud = require("tencentcloud-sdk-nodejs");

const OcrClient = tencentcloud.ocr.v20181119.Client;

const clientConfig = {
  credential: {
    secretId: "",
    secretKey: "",
  },
  region: "ap-guangzhou",
  profile: {
    httpProfile: {
      endpoint: "ocr.tencentcloudapi.com",
    },
  },
};

const client = new OcrClient(clientConfig);
const params = {
    "ImageBase64": ready,
};
client.GeneralBasicOCR(params).then(
  (data) => {
    console.log(data);
  },
  (err) => {
    console.error("error", err);
  }
);