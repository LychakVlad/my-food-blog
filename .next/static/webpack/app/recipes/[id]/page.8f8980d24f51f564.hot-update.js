"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/recipes/[id]/page",{

/***/ "(app-pages-browser)/./components/Recipe/RecipeComment.tsx":
/*!*********************************************!*\
  !*** ./components/Recipe/RecipeComment.tsx ***!
  \*********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/image */ \"(app-pages-browser)/./node_modules/next/image.js\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _UI_RatingBar_RatingBar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../UI/RatingBar/RatingBar */ \"(app-pages-browser)/./components/UI/RatingBar/RatingBar.tsx\");\n/* harmony import */ var _utils_dateConvert__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/dateConvert */ \"(app-pages-browser)/./utils/dateConvert.ts\");\n/* harmony import */ var _assets_icons_profile_undefined_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../assets/icons/profile-undefined.svg */ \"(app-pages-browser)/./assets/icons/profile-undefined.svg\");\n/* harmony import */ var _assets_icons_delete_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../assets/icons/delete.svg */ \"(app-pages-browser)/./assets/icons/delete.svg\");\n\n\n\n\n\n\n\nconst RecipeComment = (param)=>{\n    let { item, name, deleteComment } = param;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \" border-gray-400 border mb-8 p-4\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex justify-between\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"flex items-center mb-2\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \" overflow-hidden rounded-full w-[50px] h-[50px] relative mr-6\",\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_image__WEBPACK_IMPORTED_MODULE_1___default()), {\n                                    src: _assets_icons_profile_undefined_svg__WEBPACK_IMPORTED_MODULE_5__[\"default\"],\n                                    alt: \"user_image\",\n                                    width: 50,\n                                    height: 50,\n                                    className: \"absolute object-center left-0 top-0\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/Vlad/Documents/projects/food-blog/components/Recipe/RecipeComment.tsx\",\n                                    lineNumber: 15,\n                                    columnNumber: 13\n                                }, undefined)\n                            }, void 0, false, {\n                                fileName: \"/Users/Vlad/Documents/projects/food-blog/components/Recipe/RecipeComment.tsx\",\n                                lineNumber: 14,\n                                columnNumber: 11\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                className: \"text-xl\",\n                                children: item.creatorName\n                            }, void 0, false, {\n                                fileName: \"/Users/Vlad/Documents/projects/food-blog/components/Recipe/RecipeComment.tsx\",\n                                lineNumber: 24,\n                                columnNumber: 11\n                            }, undefined)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/Vlad/Documents/projects/food-blog/components/Recipe/RecipeComment.tsx\",\n                        lineNumber: 13,\n                        columnNumber: 9\n                    }, undefined),\n                    name === item.creatorName && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_image__WEBPACK_IMPORTED_MODULE_1___default()), {\n                        src: _assets_icons_delete_svg__WEBPACK_IMPORTED_MODULE_6__[\"default\"],\n                        width: 36,\n                        height: 36,\n                        className: \"rounded-full mr-6 cursor-pointer\",\n                        alt: \"close-icon\",\n                        onClick: (e)=>deleteComment(item._id),\n                        \"data-cy\": \"delete-comment-\".concat(item.text)\n                    }, void 0, false, {\n                        fileName: \"/Users/Vlad/Documents/projects/food-blog/components/Recipe/RecipeComment.tsx\",\n                        lineNumber: 27,\n                        columnNumber: 11\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/Vlad/Documents/projects/food-blog/components/Recipe/RecipeComment.tsx\",\n                lineNumber: 12,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_UI_RatingBar_RatingBar__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                rating: item.rating,\n                clickable: false\n            }, void 0, false, {\n                fileName: \"/Users/Vlad/Documents/projects/food-blog/components/Recipe/RecipeComment.tsx\",\n                lineNumber: 39,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                className: \"my-3\",\n                children: [\n                    \" \",\n                    (0,_utils_dateConvert__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(item.date)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/Vlad/Documents/projects/food-blog/components/Recipe/RecipeComment.tsx\",\n                lineNumber: 40,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                className: \"text-lg\",\n                \"data-cy\": \"comment-cy-\".concat(item.text),\n                children: item.text\n            }, void 0, false, {\n                fileName: \"/Users/Vlad/Documents/projects/food-blog/components/Recipe/RecipeComment.tsx\",\n                lineNumber: 41,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/Vlad/Documents/projects/food-blog/components/Recipe/RecipeComment.tsx\",\n        lineNumber: 11,\n        columnNumber: 5\n    }, undefined);\n};\n_c = RecipeComment;\n/* harmony default export */ __webpack_exports__[\"default\"] = (RecipeComment);\nvar _c;\n$RefreshReg$(_c, \"RecipeComment\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2NvbXBvbmVudHMvUmVjaXBlL1JlY2lwZUNvbW1lbnQudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQStCO0FBQ0w7QUFDd0I7QUFDQTtBQUVVO0FBQ1Y7QUFFbEQsTUFBTU0sZ0JBQWdCO1FBQUMsRUFBRUMsSUFBSSxFQUFFQyxJQUFJLEVBQUVDLGFBQWEsRUFBc0I7SUFDdEUscUJBQ0UsOERBQUNDO1FBQUlDLFdBQVU7OzBCQUNiLDhEQUFDRDtnQkFBSUMsV0FBVTs7a0NBQ2IsOERBQUNEO3dCQUFJQyxXQUFVOzswQ0FDYiw4REFBQ0Q7Z0NBQUlDLFdBQVU7MENBQ2IsNEVBQUNYLG1EQUFLQTtvQ0FDSlksS0FBS1IsMkVBQVNBO29DQUNkUyxLQUFJO29DQUNKQyxPQUFPO29DQUNQQyxRQUFRO29DQUNSSixXQUFVOzs7Ozs7Ozs7OzswQ0FJZCw4REFBQ0s7Z0NBQUVMLFdBQVU7MENBQVdKLEtBQUtVLFdBQVc7Ozs7Ozs7Ozs7OztvQkFFekNULFNBQVNELEtBQUtVLFdBQVcsa0JBQ3hCLDhEQUFDakIsbURBQUtBO3dCQUNKWSxLQUFLUCxnRUFBVUE7d0JBQ2ZTLE9BQU87d0JBQ1BDLFFBQVE7d0JBQ1JKLFdBQVU7d0JBQ1ZFLEtBQUk7d0JBQ0pLLFNBQVMsQ0FBQ0MsSUFBTVYsY0FBY0YsS0FBS2EsR0FBRzt3QkFDdENDLFdBQVMsa0JBQTRCLE9BQVZkLEtBQUtlLElBQUk7Ozs7Ozs7Ozs7OzswQkFLMUMsOERBQUNwQiwrREFBU0E7Z0JBQUNxQixRQUFRaEIsS0FBS2dCLE1BQU07Z0JBQUVDLFdBQVc7Ozs7OzswQkFDM0MsOERBQUNSO2dCQUFFTCxXQUFVOztvQkFBTztvQkFBRVIsOERBQVdBLENBQUNJLEtBQUtrQixJQUFJOzs7Ozs7OzBCQUMzQyw4REFBQ1Q7Z0JBQUVMLFdBQVU7Z0JBQVVVLFdBQVMsY0FBd0IsT0FBVmQsS0FBS2UsSUFBSTswQkFDcERmLEtBQUtlLElBQUk7Ozs7Ozs7Ozs7OztBQUlsQjtLQXJDTWhCO0FBdUNOLCtEQUFlQSxhQUFhQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2NvbXBvbmVudHMvUmVjaXBlL1JlY2lwZUNvbW1lbnQudHN4P2NlN2MiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEltYWdlIGZyb20gXCJuZXh0L2ltYWdlXCI7XG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUmF0aW5nQmFyIGZyb20gXCIuLi9VSS9SYXRpbmdCYXIvUmF0aW5nQmFyXCI7XG5pbXBvcnQgZGF0ZUNvbnZlcnQgZnJvbSBcIi4uLy4uL3V0aWxzL2RhdGVDb252ZXJ0XCI7XG5pbXBvcnQgeyBSZWNpcGVDb21tZW50UHJvcHMgfSBmcm9tIFwiLi4vLi4vdHlwZXMvcmVjaXBlLmludGVyZmFjZVwiO1xuaW1wb3J0IHVzZXJJbWFnZSBmcm9tIFwiL2Fzc2V0cy9pY29ucy9wcm9maWxlLXVuZGVmaW5lZC5zdmdcIjtcbmltcG9ydCBkZWxldGVJY29uIGZyb20gXCIvYXNzZXRzL2ljb25zL2RlbGV0ZS5zdmdcIjtcblxuY29uc3QgUmVjaXBlQ29tbWVudCA9ICh7IGl0ZW0sIG5hbWUsIGRlbGV0ZUNvbW1lbnQgfTogUmVjaXBlQ29tbWVudFByb3BzKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCIgYm9yZGVyLWdyYXktNDAwIGJvcmRlciBtYi04IHAtNFwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIG1iLTJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIiBvdmVyZmxvdy1oaWRkZW4gcm91bmRlZC1mdWxsIHctWzUwcHhdIGgtWzUwcHhdIHJlbGF0aXZlIG1yLTZcIj5cbiAgICAgICAgICAgIDxJbWFnZVxuICAgICAgICAgICAgICBzcmM9e3VzZXJJbWFnZX1cbiAgICAgICAgICAgICAgYWx0PVwidXNlcl9pbWFnZVwiXG4gICAgICAgICAgICAgIHdpZHRoPXs1MH1cbiAgICAgICAgICAgICAgaGVpZ2h0PXs1MH1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgb2JqZWN0LWNlbnRlciBsZWZ0LTAgdG9wLTBcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteGxcIj57aXRlbS5jcmVhdG9yTmFtZX08L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7bmFtZSA9PT0gaXRlbS5jcmVhdG9yTmFtZSAmJiAoXG4gICAgICAgICAgPEltYWdlXG4gICAgICAgICAgICBzcmM9e2RlbGV0ZUljb259XG4gICAgICAgICAgICB3aWR0aD17MzZ9XG4gICAgICAgICAgICBoZWlnaHQ9ezM2fVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicm91bmRlZC1mdWxsIG1yLTYgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgYWx0PVwiY2xvc2UtaWNvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4gZGVsZXRlQ29tbWVudChpdGVtLl9pZCl9XG4gICAgICAgICAgICBkYXRhLWN5PXtgZGVsZXRlLWNvbW1lbnQtJHtpdGVtLnRleHR9YH1cbiAgICAgICAgICAvPlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxSYXRpbmdCYXIgcmF0aW5nPXtpdGVtLnJhdGluZ30gY2xpY2thYmxlPXtmYWxzZX0gLz5cbiAgICAgIDxwIGNsYXNzTmFtZT1cIm15LTNcIj4ge2RhdGVDb252ZXJ0KGl0ZW0uZGF0ZSl9PC9wPlxuICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1sZ1wiIGRhdGEtY3k9e2Bjb21tZW50LWN5LSR7aXRlbS50ZXh0fWB9PlxuICAgICAgICB7aXRlbS50ZXh0fVxuICAgICAgPC9wPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUmVjaXBlQ29tbWVudDtcbiJdLCJuYW1lcyI6WyJJbWFnZSIsIlJlYWN0IiwiUmF0aW5nQmFyIiwiZGF0ZUNvbnZlcnQiLCJ1c2VySW1hZ2UiLCJkZWxldGVJY29uIiwiUmVjaXBlQ29tbWVudCIsIml0ZW0iLCJuYW1lIiwiZGVsZXRlQ29tbWVudCIsImRpdiIsImNsYXNzTmFtZSIsInNyYyIsImFsdCIsIndpZHRoIiwiaGVpZ2h0IiwicCIsImNyZWF0b3JOYW1lIiwib25DbGljayIsImUiLCJfaWQiLCJkYXRhLWN5IiwidGV4dCIsInJhdGluZyIsImNsaWNrYWJsZSIsImRhdGUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./components/Recipe/RecipeComment.tsx\n"));

/***/ })

});