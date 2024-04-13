"use strict";
exports.id = 811;
exports.ids = [811];
exports.modules = {

/***/ 73811:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OC: () => (/* binding */ uploadFileToS3),
/* harmony export */   a6: () => (/* binding */ getFileFromS3),
/* harmony export */   dd: () => (/* binding */ deleteFileFromS3)
/* harmony export */ });
/* unused harmony export s3 */
/* harmony import */ var _aws_sdk_client_s3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21841);
/* harmony import */ var _aws_sdk_client_s3__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_aws_sdk_client_s3__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _aws_sdk_s3_request_presigner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(86889);
/* harmony import */ var _aws_sdk_s3_request_presigner__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_aws_sdk_s3_request_presigner__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(51063);



const bucketName = process.env.MY_AWS_BUCKET_NAME;
const region = process.env.MY_AWS_BUCKET_REGION;
const accessKeyId = process.env.MY_AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.MY_AWS_SECRET_ACCESS_KEY;
const s3 = new _aws_sdk_client_s3__WEBPACK_IMPORTED_MODULE_0__.S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey
    }
});
async function uploadFileToS3(file, fileName) {
    const fileBuffer = file;
    const params = {
        Bucket: bucketName,
        Key: `${(0,uuid__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)()}`,
        Body: fileBuffer
    };
    const command = new _aws_sdk_client_s3__WEBPACK_IMPORTED_MODULE_0__.PutObjectCommand(params);
    await s3.send(command);
    return params.Key;
}
async function deleteFileFromS3(key) {
    const params = {
        Bucket: bucketName,
        Key: key
    };
    const command = new _aws_sdk_client_s3__WEBPACK_IMPORTED_MODULE_0__.DeleteObjectCommand(params);
    await s3.send(command);
    return params.Key;
}
async function getFileFromS3(id) {
    const getObjectParams = {
        Bucket: bucketName,
        Key: id
    };
    const command = new _aws_sdk_client_s3__WEBPACK_IMPORTED_MODULE_0__.GetObjectCommand(getObjectParams);
    const src = await (0,_aws_sdk_s3_request_presigner__WEBPACK_IMPORTED_MODULE_1__.getSignedUrl)(s3, command, {
        expiresIn: 3600
    });
    return src;
}


/***/ })

};
;