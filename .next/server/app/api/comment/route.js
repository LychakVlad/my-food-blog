"use strict";
(() => {
var exports = {};
exports.id = 753;
exports.ids = [753];
exports.modules = {

/***/ 11185:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 22037:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 72851:
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

// NAMESPACE OBJECT: ./app/api/comment/route.ts
var route_namespaceObject = {};
__webpack_require__.r(route_namespaceObject);
__webpack_require__.d(route_namespaceObject, {
  DELETE: () => (DELETE),
  POST: () => (POST)
});

// EXTERNAL MODULE: ./node_modules/next/dist/server/node-polyfill-headers.js
var node_polyfill_headers = __webpack_require__(42394);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-modules/app-route/module.js
var app_route_module = __webpack_require__(69692);
var module_default = /*#__PURE__*/__webpack_require__.n(app_route_module);
// EXTERNAL MODULE: ./models/comment.ts
var comment = __webpack_require__(9325);
// EXTERNAL MODULE: ./utils/database.ts
var database = __webpack_require__(28919);
// EXTERNAL MODULE: ./models/recipe.ts
var recipe = __webpack_require__(68834);
;// CONCATENATED MODULE: ./app/api/comment/route.ts



const POST = async (req, res)=>{
    const { text, postId, creatorName, rating } = await req.json();
    try {
        await (0,database/* connectToDB */.P)();
        const newComment = new comment["default"]({
            text,
            creatorName,
            postId,
            rating
        });
        await newComment.save();
        const existingPost = await recipe/* default */.Z.findById(postId);
        existingPost.comments.push(newComment._id);
        await existingPost.save();
        return new Response(JSON.stringify(newComment), {
            status: 201
        });
    } catch (error) {
        console.log("internal error");
        console.dir(error);
    }
};
const DELETE = async (req, res)=>{
    const { id, postId } = await req.json();
    try {
        await (0,database/* connectToDB */.P)();
        const existingPost = await recipe/* default */.Z.findById(postId);
        const findComment = existingPost.comments.indexOf(id);
        if (findComment > -1) {
            existingPost.comments.splice(findComment, 1);
        }
        await existingPost.save();
        await comment["default"].findByIdAndRemove(id);
        return new Response("Comment deleted successfully", {
            status: 200
        });
    } catch (error) {
        return new Response("Failed to delete comment", {
            status: 500
        });
    }
};

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Fapi%2Fcomment%2Froute&name=app%2Fapi%2Fcomment%2Froute&pagePath=private-next-app-dir%2Fapi%2Fcomment%2Froute.ts&appDir=%2FUsers%2FVlad%2FDocuments%2Fprojects%2Ffood-blog%2Fapp&appPaths=%2Fapi%2Fcomment%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!

    

    

    

    const options = {"definition":{"kind":"APP_ROUTE","page":"/api/comment/route","pathname":"/api/comment","filename":"route","bundlePath":"app/api/comment/route"},"resolvedPagePath":"/Users/Vlad/Documents/projects/food-blog/app/api/comment/route.ts","nextConfigOutput":""}
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

    const originalPathname = "/api/comment/route"

    

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [937,501,919,834], () => (__webpack_exec__(72851)));
module.exports = __webpack_exports__;

})();