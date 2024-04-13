"use strict";
exports.id = 190;
exports.ids = [190];
exports.modules = {

/***/ 96190:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ Form_Form)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(11440);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
// EXTERNAL MODULE: ./components/Routes/withAuth.tsx
var withAuth = __webpack_require__(21653);
// EXTERNAL MODULE: ./components/UI/Input/Input.tsx
var Input = __webpack_require__(12966);
// EXTERNAL MODULE: ./node_modules/react-hook-form/dist/index.esm.mjs
var index_esm = __webpack_require__(66558);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(52451);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
;// CONCATENATED MODULE: ./assets/icons/close.svg
/* harmony default export */ const icons_close = ({"src":"/_next/static/media/close.37385623.svg","height":24,"width":24,"blurWidth":0,"blurHeight":0});
;// CONCATENATED MODULE: ./components/Form/FormList.tsx






const FormList = ({ data, register, name, control })=>{
    const { fields, append, remove } = (0,index_esm/* useFieldArray */.Dq)({
        name: name,
        control,
        rules: {
            minLength: 1
        }
    });
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                className: "font-satoshi font-semibold text-base text-gray-700",
                children: data.label
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                className: " opacity-50",
                children: data.description
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "flex  flex-col",
                children: [
                    fields.map((field, index)=>{
                        return /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("section", {
                                className: "flex items-center mt-5",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx(Input/* default */.Z, {
                                        register: register,
                                        placeholder: "Add one more",
                                        name: `${name}.${index}`,
                                        className: "form_input w-full",
                                        type: "text",
                                        required: true
                                    }),
                                    fields.length !== 1 && /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                        type: "button",
                                        onClick: ()=>remove(index),
                                        className: "h-full px-4",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                            src: icons_close,
                                            width: 36,
                                            height: 36,
                                            className: "rounded-full",
                                            alt: "close-icon"
                                        })
                                    })
                                ]
                            }, field.id)
                        }, field.id);
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                        type: "button",
                        className: "outline_btn mt-8",
                        onClick: ()=>append(`Add ${name.slice(0, -1)}`),
                        children: [
                            "Add ",
                            name.slice(0, -1)
                        ]
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const Form_FormList = (FormList);

// EXTERNAL MODULE: ./components/UI/Textarea/Textarea.tsx
var Textarea = __webpack_require__(59681);
;// CONCATENATED MODULE: ./components/Form/Form.tsx







const Form = ({ type, onSubmit, form })=>{
    const { register, handleSubmit, control, formState: { errors, isSubmitting } } = form;
    const stepData = {
        label: "Directions",
        description: "Explain how to make your recipe, including oven temperatures, baking or cooking times, and pan sizes, etc. Use optional headers to organize the different parts of the recipe (i.e. Prep, Bake, Decorate).",
        addButton: "Add step",
        subTitle: "Step"
    };
    const ingredientData = {
        label: "Ingredients",
        description: "Enter one ingredient per line. Include the quantity (i.e. cups, tablespoons) and any special preparation (i.e. sifted, softened, chopped). Use optional headers to organize the different parts of the recipe (i.e. Cake, Frosting, Dressing).",
        addButton: "Add ingredient"
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("section", {
        className: "w-full max-w-fill flex-start flex-col",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                className: "head_text text-left",
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                    className: "blue_gradient",
                    children: [
                        " ",
                        type,
                        " Post"
                    ]
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                className: "desc text-left max-w-md",
                "data-testid": "form-title",
                children: [
                    type,
                    " and share your best recipes"
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("form", {
                onSubmit: handleSubmit(onSubmit),
                className: "mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism",
                children: [
                    type === "Create" && /*#__PURE__*/ jsx_runtime_.jsx(Input/* default */.Z, {
                        register: register,
                        errors: errors?.photo,
                        label: "Photo (optional)",
                        type: "file",
                        name: "photo",
                        accept: "image/*",
                        required: false
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(Input/* default */.Z, {
                        name: "title",
                        register: register,
                        errors: errors?.title,
                        label: "Recipe Title",
                        placeholder: "Enter the title",
                        type: "text",
                        required: true,
                        cytest: "title-input"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(Textarea/* default */.Z, {
                        placeholder: "Description...",
                        label: "Description",
                        register: register,
                        name: "description",
                        required: true,
                        errors: errors?.description,
                        cytest: "description-input"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(Form_FormList, {
                        data: ingredientData,
                        register: register,
                        control: control,
                        name: "ingredients"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(Form_FormList, {
                        data: stepData,
                        register: register,
                        control: control,
                        name: "steps"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(Input/* default */.Z, {
                        label: "Tag",
                        desc: "(dinner, lunch, breakfast)",
                        placeholder: "tag",
                        name: "tag",
                        type: "text",
                        register: register,
                        errors: errors?.tag,
                        required: true,
                        cytest: "tag-input"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "flex gap-10",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(Input/* default */.Z, {
                                label: "Servings",
                                placeholder: "10",
                                type: "number",
                                name: "servings",
                                register: register,
                                errors: errors?.servings,
                                required: true
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(Input/* default */.Z, {
                                label: "Yield",
                                placeholder: "Small bowls",
                                type: "text",
                                name: "yield",
                                register: register,
                                errors: errors?.yield,
                                required: true
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "flex gap-10",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(Input/* default */.Z, {
                                label: "Time to prep (minutes)",
                                placeholder: "120",
                                type: "number",
                                name: "prepTime",
                                register: register,
                                errors: errors?.prepTime,
                                required: true
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(Input/* default */.Z, {
                                label: "Time to cook (minutes)",
                                placeholder: "60",
                                type: "number",
                                name: "cookTime",
                                register: register,
                                errors: errors?.cookTime,
                                required: true
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "sm:flex sm:gap-10",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(Input/* default */.Z, {
                                label: "Calories",
                                name: "calories",
                                placeholder: "200",
                                type: "number",
                                register: register,
                                errors: errors?.calories,
                                required: true
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(Input/* default */.Z, {
                                label: "Carbs",
                                placeholder: "30",
                                type: "number",
                                name: "carbs",
                                register: register,
                                errors: errors?.carbs,
                                required: true
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(Input/* default */.Z, {
                                label: "Protein",
                                name: "protein",
                                placeholder: "30",
                                type: "number",
                                register: register,
                                errors: errors?.protein,
                                required: true
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(Input/* default */.Z, {
                                name: "fats",
                                register: register,
                                errors: errors?.fats,
                                label: "Fats",
                                placeholder: "10",
                                type: "number",
                                required: true
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "flex-end mx-3 mb-5 gap-4",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                href: "/",
                                className: "text-gray-500 text-sm",
                                children: "Cancel"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                type: "submit",
                                disabled: isSubmitting,
                                className: "submit_btn",
                                "data-cy": "submit-form-btn",
                                children: isSubmitting ? `${type} is in process...` : type
                            })
                        ]
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const Form_Form = ((0,withAuth/* default */.Z)(Form));


/***/ }),

/***/ 21653:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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



function withAuth(Component) {
    return function WithAuth(props) {
        const { data: session } = (0,next_auth_react__WEBPACK_IMPORTED_MODULE_1__.useSession)();
        const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
        (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
            if (!session) {
                router.push("/");
            }
        }, []);
        if (!session) {
            return null;
        }
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
            ...props
        });
    };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (withAuth);


/***/ }),

/***/ 59681:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const Textarea = ({ label, placeholder, register, name, required, errors, cytest })=>{
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                className: "font-satoshi font-semibold text-base text-gray-700",
                children: label && label
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("textarea", {
                placeholder: placeholder,
                ...register(name, {
                    required: required ? `${name} is required` : false
                }),
                className: `form_textarea ${errors && "border-red-500"} `,
                "data-cy": cytest
            }),
            errors && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                className: "text-red-500 mt-2",
                children: `${label} field is required`
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Textarea);


/***/ })

};
;