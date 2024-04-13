"use strict";
exports.id = 834;
exports.ids = [834];
exports.modules = {

/***/ 68834:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const { Schema, default: mongoose, models, model } = __webpack_require__(11185);
const RecipeSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: [
            true,
            "Title is required"
        ]
    },
    description: {
        type: String,
        required: [
            true,
            "Description is required"
        ]
    },
    tag: {
        type: String,
        required: [
            true,
            "Tag is required"
        ]
    },
    steps: {
        type: [
            String
        ],
        required: [
            true,
            "Steps are required"
        ]
    },
    servings: {
        servings: {
            type: String,
            required: [
                true,
                "Servings amount is required"
            ]
        },
        yield: {
            type: String
        }
    },
    timeToDo: {
        prepTime: {
            type: String
        },
        cookTime: {
            type: String,
            required: [
                true,
                "Cook time is required"
            ]
        }
    },
    nutrition: {
        cal: {
            type: String,
            required: [
                true,
                "Calories amount is required"
            ]
        },
        protein: {
            type: String,
            required: [
                true,
                "Protein amount is required"
            ]
        },
        carbs: {
            type: String,
            required: [
                true,
                "Carbs amount is required"
            ]
        },
        fats: {
            type: String,
            required: [
                true,
                "Fats amount is required"
            ]
        }
    },
    photo: {
        imageLink: {
            type: String
        },
        base64: {
            type: String
        }
    },
    time: {
        type: Date,
        default: Date.now
    },
    ingredients: {
        type: [
            String
        ],
        required: [
            true,
            "Ingredients are required"
        ]
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});
const Recipe = models.Recipe || model("Recipe", RecipeSchema);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Recipe);


/***/ })

};
;