"use strict";
exports.id = 919;
exports.ids = [919];
exports.modules = {

/***/ 9325:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const { Schema, default: mongoose, models, model } = __webpack_require__(11185);
const CommentSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    creatorName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    rating: {
        type: Number,
        required: true
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: "Recipe"
    }
});
const Comment = models.Comment || model("Comment", CommentSchema);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Comment);


/***/ }),

/***/ 28919:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   P: () => (/* binding */ connectToDB)
/* harmony export */ });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11185);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);

__webpack_require__(9325);
let isConnected = false;
const uri = process.env.MONGODB_URI;
const connectToDB = async ()=>{
    mongoose__WEBPACK_IMPORTED_MODULE_0___default().set("strictQuery", true);
    if (isConnected) {
        console.log("MongoDB is already connected");
        return;
    }
    try {
        await mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(uri, {
            dbName: "share_recipe"
        });
        isConnected = true;
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
    }
};


/***/ })

};
;