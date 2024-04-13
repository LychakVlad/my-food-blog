"use strict";
exports.id = 904;
exports.ids = [904];
exports.modules = {

/***/ 35904:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GET: () => (/* binding */ handler),
/* harmony export */   POST: () => (/* binding */ handler),
/* harmony export */   authOptions: () => (/* binding */ authOptions)
/* harmony export */ });
/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(49861);
/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(42446);
/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(67096);
/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _models_user__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(76802);
/* harmony import */ var _utils_database__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(28919);





const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)({
            name: "credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "jsmith"
                },
                password: {
                    label: "Password",
                    type: "password"
                },
                email: {
                    label: "Email",
                    type: "email"
                }
            },
            async authorize (credentials) {
                await (0,_utils_database__WEBPACK_IMPORTED_MODULE_4__/* .connectToDB */ .P)();
                if (!credentials?.email || !credentials.password) {
                    console.log("Failed to get email or password");
                    return null;
                }
                const user = await _models_user__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z.findOne({
                    email: credentials.email
                }).select("+hashedPassword");
                if (!user) {
                    console.log("User not found");
                    return null;
                }
                const passwordsMatch = await bcrypt__WEBPACK_IMPORTED_MODULE_2___default().compare(credentials.password, user.hashedPassword);
                if (!passwordsMatch) {
                    console.log("Passwords do no match");
                    return null;
                }
                return user;
            }
        })
    ],
    callbacks: {
        async session ({ session, token, user }) {
            await (0,_utils_database__WEBPACK_IMPORTED_MODULE_4__/* .connectToDB */ .P)();
            const userExists = await _models_user__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z.findOne({
                email: session.user.email
            });
            if (userExists) {
                session.user.id = userExists._id.toString();
            }
            return session;
        }
    }
};
const handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()(authOptions);



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