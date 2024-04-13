"use strict";
(() => {
var exports = {};
exports.id = 630;
exports.ids = [630];
exports.modules = {

/***/ 11185:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 22037:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 95509:
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

// NAMESPACE OBJECT: ./app/api/recipe/[id]/route.ts
var route_namespaceObject = {};
__webpack_require__.r(route_namespaceObject);
__webpack_require__.d(route_namespaceObject, {
  DELETE: () => (DELETE),
  GET: () => (GET),
  PATCH: () => (PATCH)
});

// EXTERNAL MODULE: ./node_modules/next/dist/server/node-polyfill-headers.js
var node_polyfill_headers = __webpack_require__(42394);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-modules/app-route/module.js
var app_route_module = __webpack_require__(69692);
var module_default = /*#__PURE__*/__webpack_require__.n(app_route_module);
// EXTERNAL MODULE: ./utils/database.ts
var database = __webpack_require__(28919);
// EXTERNAL MODULE: ./models/recipe.ts
var recipe = __webpack_require__(68834);
// EXTERNAL MODULE: ./models/comment.ts
var comment = __webpack_require__(9325);
// EXTERNAL MODULE: ./node_modules/next/dist/server/web/exports/next-response.js
var next_response = __webpack_require__(89335);
;// CONCATENATED MODULE: ./app/api/recipe/[id]/route.ts




const GET = async (request, { params })=>{
    try {
        await (0,database/* connectToDB */.P)();
        let recipeWithComments;
        recipeWithComments = await recipe/* default */.Z.findById(params.id).populate("creator").populate("comments");
        if (!recipeWithComments) {
            return new next_response/* default */.Z("Recipe not found", {
                status: 404
            });
        }
        return new next_response/* default */.Z(JSON.stringify(recipeWithComments), {
            status: 200
        });
    } catch (error) {
        return new next_response/* default */.Z("Failed to fetch recipe", {
            status: 500
        });
    }
};
const PATCH = async (request, { params })=>{
    const { description, tag, title, ingredients, creator, steps, photo, nutrition, servings, timeToDo } = await request.json();
    try {
        await (0,database/* connectToDB */.P)();
        const existingRecipe = await recipe/* default */.Z.findById(params.id);
        if (!existingRecipe) return new Response("Recipe not found", {
            status: 404
        });
        existingRecipe.description = description;
        existingRecipe.tag = tag;
        existingRecipe.title = title;
        existingRecipe.ingredients = ingredients;
        existingRecipe.timeToDo = timeToDo;
        existingRecipe.nutrition = nutrition;
        existingRecipe.servings = servings;
        existingRecipe.creator = creator;
        existingRecipe.steps = steps;
        existingRecipe.photo = photo;
        await existingRecipe.save();
        return new Response(JSON.stringify(existingRecipe), {
            status: 200
        });
    } catch (error) {
        console.log(error);
        return new Response("Failed to update recipe", {
            status: 500
        });
    }
};
const DELETE = async (request, { params })=>{
    try {
        await (0,database/* connectToDB */.P)();
        await comment["default"].deleteMany({
            postId: params.id
        });
        await recipe/* default */.Z.findByIdAndRemove(params.id);
        return new Response("Recipe deleted successfully", {
            status: 200
        });
    } catch (error) {
        return new Response("Failed to delete recipe", {
            status: 500
        });
    }
};

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Fapi%2Frecipe%2F%5Bid%5D%2Froute&name=app%2Fapi%2Frecipe%2F%5Bid%5D%2Froute&pagePath=private-next-app-dir%2Fapi%2Frecipe%2F%5Bid%5D%2Froute.ts&appDir=%2FUsers%2FVlad%2FDocuments%2Fprojects%2Ffood-blog%2Fapp&appPaths=%2Fapi%2Frecipe%2F%5Bid%5D%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!

    

    

    

    const options = {"definition":{"kind":"APP_ROUTE","page":"/api/recipe/[id]/route","pathname":"/api/recipe/[id]","filename":"route","bundlePath":"app/api/recipe/[id]/route"},"resolvedPagePath":"/Users/Vlad/Documents/projects/food-blog/app/api/recipe/[id]/route.ts","nextConfigOutput":""}
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

    const originalPathname = "/api/recipe/[id]/route"

    

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [937,501,335,919,834], () => (__webpack_exec__(95509)));
module.exports = __webpack_exports__;

})();