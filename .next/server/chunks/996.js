exports.id = 996;
exports.ids = [996];
exports.modules = {

/***/ 52996:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11440);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Routes_whenLoggedIn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(46037);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(66558);
/* harmony import */ var _UI_Input_Input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12966);
/* harmony import */ var _assets_icons_logo_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(15982);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(52451);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_5__);







const AuthForm = ({ onSubmit, type, error })=>{
    const { register, handleSubmit, formState: { errors, isSubmitting } } = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_6__/* .useForm */ .cI)();
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 font-inter",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "sm:mx-auto sm:w-full sm:max-w-sm",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_5___default()), {
                            className: "mx-auto h-10 w-auto",
                            src: _assets_icons_logo_svg__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z,
                            alt: "cooks compass"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                            className: "mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900",
                            children: type === "signup" ? "Create a new account" : "Log in account"
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "mt-10 sm:mx-auto sm:w-full sm:max-w-sm",
                    children: [
                        error && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                            className: "text-red-500 mb-2",
                            children: error
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                            className: "space-y-4 ",
                            onSubmit: handleSubmit(onSubmit),
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_UI_Input_Input__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                                    label: "Email address",
                                    placeholder: "Email",
                                    id: "email",
                                    name: "email",
                                    type: "email",
                                    autoComplete: "email",
                                    register: register,
                                    errors: errors.email,
                                    required: true,
                                    cytest: "auth-email"
                                }),
                                type !== "signin" && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_UI_Input_Input__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                                    label: "Name",
                                    placeholder: "Your username",
                                    id: "name",
                                    type: "text",
                                    name: "name",
                                    autoComplete: "name",
                                    register: register,
                                    errors: errors.name,
                                    required: true,
                                    cytest: "auth-name"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_UI_Input_Input__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                                    label: "Password",
                                    placeholder: "Password",
                                    id: "password",
                                    name: "password",
                                    type: "password",
                                    autoComplete: "current-password",
                                    register: register,
                                    errors: errors.password,
                                    required: true,
                                    cytest: "auth-password"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                        type: "submit",
                                        className: "black_btn w-full",
                                        disabled: isSubmitting,
                                        children: type === "signup" ? "Sign up" : "Log in"
                                    })
                                })
                            ]
                        }),
                        type !== "signin" ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                            className: "mt-10 text-center text-sm text-gray-500",
                            children: [
                                "Already have an account?",
                                " ",
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                    href: "/login",
                                    className: "font-semibold leading-6 text-gray-600 hover:text-gray-400 transition-colors ",
                                    "data-cy": "link-to-login-page",
                                    children: "Sign in"
                                })
                            ]
                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                            className: "mt-10 text-center text-sm text-gray-500",
                            children: [
                                "Don't have an account?",
                                " ",
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                    href: "/sign-up",
                                    className: "font-semibold leading-6 text-gray-600 hover:text-gray-400 transition-colors ",
                                    "data-cy": "link-to-signup-page",
                                    children: "Sign up"
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_Routes_whenLoggedIn__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)(AuthForm));


/***/ }),

/***/ 46037:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(74284);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(57114);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* __next_internal_client_entry_do_not_use__ default auto */ 



function whenLoggedIn(Component) {
    return function whenLoggedIn(props) {
        const { data: session } = (0,next_auth_react__WEBPACK_IMPORTED_MODULE_1__.useSession)();
        const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
        (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
            if (session) {
                router.push("/");
            }
        }, []);
        if (session) {
            return null;
        }
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
            ...props
        });
    };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (whenLoggedIn);


/***/ }),

/***/ 57114:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(90696)


/***/ })

};
;