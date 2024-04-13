"use strict";
(() => {
var exports = {};
exports.id = 481;
exports.ids = [481];
exports.modules = {

/***/ 21841:
/***/ ((module) => {

module.exports = require("@aws-sdk/client-s3");

/***/ }),

/***/ 14300:
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ 6113:
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ 57147:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 13685:
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ 85158:
/***/ ((module) => {

module.exports = require("http2");

/***/ }),

/***/ 95687:
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ 22037:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 71017:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 12781:
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ 73837:
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ 48321:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  headerHooks: () => (/* binding */ headerHooks),
  originalPathname: () => (/* binding */ originalPathname),
  requestAsyncStorage: () => (/* binding */ requestAsyncStorage),
  routeModule: () => (/* binding */ routeModule),
  serverHooks: () => (/* binding */ serverHooks),
  staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),
  staticGenerationBailout: () => (/* binding */ staticGenerationBailout)
});

// NAMESPACE OBJECT: ./app/api/s3-bucket/[id]/route.ts
var route_namespaceObject = {};
__webpack_require__.r(route_namespaceObject);
__webpack_require__.d(route_namespaceObject, {
  DELETE: () => (DELETE),
  GET: () => (GET)
});

// EXTERNAL MODULE: ./node_modules/next/dist/server/node-polyfill-headers.js
var node_polyfill_headers = __webpack_require__(42394);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-modules/app-route/module.js
var app_route_module = __webpack_require__(69692);
var module_default = /*#__PURE__*/__webpack_require__.n(app_route_module);
// EXTERNAL MODULE: ./node_modules/next/dist/server/web/exports/next-response.js
var next_response = __webpack_require__(89335);
// EXTERNAL MODULE: ./utils/s3.ts
var s3 = __webpack_require__(73811);
;// CONCATENATED MODULE: ./app/api/s3-bucket/[id]/route.ts


const DELETE = async (req, { params })=>{
    const fileId = params.id;
    try {
        if (!fileId) {
            return next_response/* default */.Z.json({
                error: "Key is required"
            }, {
                status: 400
            });
        }
        const fileKey = await (0,s3/* deleteFileFromS3 */.dd)(fileId);
        return next_response/* default */.Z.json({
            fileKey
        });
    } catch (error) {
        return next_response/* default */.Z.json({
            error
        });
    }
};
const GET = async (req, res)=>{
    const { id } = res.params || {};
    try {
        if (!id) {
            return res.status(400).json({
                error: "Key is required"
            });
        }
        const src = await (0,s3/* getFileFromS3 */.a6)(id);
        return next_response/* default */.Z.json({
            src
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
};

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Fapi%2Fs3-bucket%2F%5Bid%5D%2Froute&name=app%2Fapi%2Fs3-bucket%2F%5Bid%5D%2Froute&pagePath=private-next-app-dir%2Fapi%2Fs3-bucket%2F%5Bid%5D%2Froute.ts&appDir=%2FUsers%2FVlad%2FDocuments%2Fprojects%2Ffood-blog%2Fapp&appPaths=%2Fapi%2Fs3-bucket%2F%5Bid%5D%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!

    

    

    

    const options = {"definition":{"kind":"APP_ROUTE","page":"/api/s3-bucket/[id]/route","pathname":"/api/s3-bucket/[id]","filename":"route","bundlePath":"app/api/s3-bucket/[id]/route"},"resolvedPagePath":"/Users/Vlad/Documents/projects/food-blog/app/api/s3-bucket/[id]/route.ts","nextConfigOutput":""}
    const routeModule = new (module_default())({
      ...options,
      userland: route_namespaceObject,
    })

    // Pull out the exports that we need to expose from the module. This should
    // be eliminated when we've moved the other routes to the new format. These
    // are used to hook into the route.
    const {
      requestAsyncStorage,
      staticGenerationAsyncStorage,
      serverHooks,
      headerHooks,
      staticGenerationBailout
    } = routeModule

    const originalPathname = "/api/s3-bucket/[id]/route"

    

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [937,501,335,177,811], () => (__webpack_exec__(48321)));
module.exports = __webpack_exports__;

})();