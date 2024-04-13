"use strict";
(() => {
var exports = {};
exports.id = 163;
exports.ids = [163];
exports.modules = {

/***/ 67096:
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ 11185:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 22037:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 82875:
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

// NAMESPACE OBJECT: ./app/api/sign-up/route.ts
var route_namespaceObject = {};
__webpack_require__.r(route_namespaceObject);
__webpack_require__.d(route_namespaceObject, {
  POST: () => (POST)
});

// EXTERNAL MODULE: ./node_modules/next/dist/server/node-polyfill-headers.js
var node_polyfill_headers = __webpack_require__(42394);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-modules/app-route/module.js
var app_route_module = __webpack_require__(69692);
var module_default = /*#__PURE__*/__webpack_require__.n(app_route_module);
// EXTERNAL MODULE: ./node_modules/next/dist/server/web/exports/next-response.js
var next_response = __webpack_require__(89335);
// EXTERNAL MODULE: ./models/user.ts
var models_user = __webpack_require__(76802);
// EXTERNAL MODULE: external "bcrypt"
var external_bcrypt_ = __webpack_require__(67096);
var external_bcrypt_default = /*#__PURE__*/__webpack_require__.n(external_bcrypt_);
// EXTERNAL MODULE: ./utils/database.ts
var database = __webpack_require__(28919);
;// CONCATENATED MODULE: ./app/api/sign-up/route.ts




async function POST(request) {
    const body = await request.json();
    const { name, password, email } = body.data;
    if (!name || !email || !password) {
        return new next_response/* default */.Z("Missing name, email, or password", {
            status: 400
        });
    }
    const hashedPassword = await external_bcrypt_default().hash(password, 10);
    await (0,database/* connectToDB */.P)();
    const exist = await models_user/* default */.Z.findOne({
        email: email
    });
    if (exist) {
        return new next_response/* default */.Z("User already exists", {
            status: 400
        });
    }
    const user = await models_user/* default */.Z.create({
        email: email,
        name: name,
        hashedPassword: hashedPassword
    });
    return next_response/* default */.Z.json(user);
}

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Fapi%2Fsign-up%2Froute&name=app%2Fapi%2Fsign-up%2Froute&pagePath=private-next-app-dir%2Fapi%2Fsign-up%2Froute.ts&appDir=%2FUsers%2FVlad%2FDocuments%2Fprojects%2Ffood-blog%2Fapp&appPaths=%2Fapi%2Fsign-up%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!

    

    

    

    const options = {"definition":{"kind":"APP_ROUTE","page":"/api/sign-up/route","pathname":"/api/sign-up","filename":"route","bundlePath":"app/api/sign-up/route"},"resolvedPagePath":"/Users/Vlad/Documents/projects/food-blog/app/api/sign-up/route.ts","nextConfigOutput":""}
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

    const originalPathname = "/api/sign-up/route"

    

/***/ }),

/***/ 76802:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const { Schema, default: mongoose, models, model } = __webpack_require__(11185);
const UserSchema = new Schema({
    email: {
        type: String,
        unique: [
            true,
            "Email already exists!"
        ],
        required: [
            true,
            "Email is required!"
        ]
    },
    name: {
        type: String,
        required: [
            true,
            "Name is required!"
        ]
    },
    hashedPassword: {
        type: String,
        required: [
            true,
            "Password is required!"
        ],
        select: false
    }
});
const User = models.User || model("User", UserSchema);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (User);


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [937,501,335,919], () => (__webpack_exec__(82875)));
module.exports = __webpack_exports__;

})();