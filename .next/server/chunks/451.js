"use strict";
exports.id = 451;
exports.ids = [451];
exports.modules = {

/***/ 48451:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   X: () => (/* binding */ getPlaiceholder)
/* harmony export */ });
/* harmony import */ var sharp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(57441);

function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function(target) {
        for(var i = 1; i < arguments.length; i++){
            var source = arguments[i];
            for(var key in source){
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    return _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
var _excluded = [
    "a"
], _excluded2 = [
    "autoOrient",
    "size",
    "format",
    "brightness",
    "saturation",
    "removeAlpha"
], _excluded3 = [
    "width",
    "height"
];
/* Utils
   =========================================== */ var arrayChunk = function arrayChunk(arr, size) {
    return arr.length > size ? [
        arr.slice(0, size)
    ].concat(arrayChunk(arr.slice(size), size)) : [
        arr
    ];
};
var toRGBAString = function toRGBAString(_ref) {
    var r = _ref.r, g = _ref.g, b = _ref.b, a = _ref.a;
    if (typeof a === "undefined") return "rgb(" + [
        r,
        g,
        b
    ].join(",") + ")";
    return "rgba(" + [
        r,
        g,
        b,
        a
    ].join(",") + ")";
};
var getPixels = function getPixels(_ref2) {
    var _ref3;
    var data = _ref2.data, info = _ref2.info;
    var channels = info.channels, width = info.width;
    var rawBuffer = (_ref3 = []).concat.apply(_ref3, data);
    var allPixels = arrayChunk(rawBuffer, channels);
    var rows = arrayChunk(allPixels, width);
    var pixels = rows.map(function(row) {
        return row.map(function(pixel) {
            var r = pixel[0], g = pixel[1], b = pixel[2], a = pixel[3];
            return _extends({
                r: r,
                g: g,
                b: b
            }, typeof a === "undefined" ? {} : {
                a: Math.round(a / 255 * 1000) / 1000
            });
        });
    });
    return pixels;
};
var getCSS = function getCSS(_ref4) {
    var pixels = _ref4.pixels, info = _ref4.info;
    var linearGradients = pixels.map(function(row) {
        var rowPixels = row.map(function(pixel) {
            return toRGBAString(pixel);
        });
        var gradient = rowPixels.map(function(pixel, i) {
            var start = i === 0 ? "" : " " + i / rowPixels.length * 100 + "%";
            var end = i === rowPixels.length ? "" : " " + (i + 1) / rowPixels.length * 100 + "%";
            return "" + pixel + start + end;
        }).join(",");
        return "linear-gradient(90deg, " + gradient + ")";
    });
    if (linearGradients.length !== info.height) {
        console.error("Woops! Something went wrong here and caused the color height to differ from the source height.");
    }
    var backgroundPosition = linearGradients.map(function(_, i) {
        return i === 0 ? "0 0 " : "0 " + i / (linearGradients.length - 1) * 100 + "%";
    }).join(",");
    var backgroundSize = "100% " + 100 / linearGradients.length + "%";
    return {
        backgroundImage: linearGradients.join(","),
        backgroundPosition: backgroundPosition,
        backgroundSize: backgroundSize,
        backgroundRepeat: "no-repeat"
    };
};
var getSVG = function getSVG(_ref5) {
    var _ref7;
    var pixels = _ref5.pixels, info = _ref5.info;
    var chunkRects = pixels.map(function(row, y) {
        return row.map(function(_ref6, x) {
            var a = _ref6.a, rgb = _objectWithoutPropertiesLoose(_ref6, _excluded);
            var colorProps = typeof a !== "undefined" ? {
                fill: toRGBAString(rgb),
                "fill-opacity": a
            } : {
                fill: toRGBAString(rgb),
                "fill-opacity": 1
            };
            return [
                "rect",
                _extends({}, colorProps, {
                    width: 1,
                    height: 1,
                    x: x,
                    y: y
                })
            ];
        });
    });
    if (chunkRects.length !== info.height) {
        console.error("Woops! Something went wrong here and caused the color height to differ from the source height.");
    }
    var rects = (_ref7 = []).concat.apply(_ref7, chunkRects);
    return [
        "svg",
        {
            xmlns: "http://www.w3.org/2000/svg",
            width: "100%",
            height: "100%",
            shapeRendering: "crispEdges",
            preserveAspectRatio: "none",
            viewBox: "0 0 " + info.width + " " + info.height,
            style: {
                position: "absolute",
                top: "50%",
                left: "50%",
                transformOrigin: "top left",
                transform: "translate(-50%, -50%)",
                right: 0,
                bottom: 0
            }
        },
        rects
    ];
};
var getPlaiceholder = function getPlaiceholder(src, _temp) {
    var _ref8 = _temp === void 0 ? {} : _temp, _ref8$autoOrient = _ref8.autoOrient, autoOrient = _ref8$autoOrient === void 0 ? false : _ref8$autoOrient, _ref8$size = _ref8.size, size = _ref8$size === void 0 ? 4 : _ref8$size, _ref8$format = _ref8.format, format = _ref8$format === void 0 ? [
        "png"
    ] : _ref8$format, _ref8$brightness = _ref8.brightness, brightness = _ref8$brightness === void 0 ? 1 : _ref8$brightness, _ref8$saturation = _ref8.saturation, saturation = _ref8$saturation === void 0 ? 1.2 : _ref8$saturation, _ref8$removeAlpha = _ref8.removeAlpha, removeAlpha = _ref8$removeAlpha === void 0 ? false : _ref8$removeAlpha, options = _objectWithoutPropertiesLoose(_ref8, _excluded2);
    try {
        /* Optimize
      ---------------------------------- */ return Promise.resolve(sharp__WEBPACK_IMPORTED_MODULE_0__(src).metadata().then(function(_ref9) {
            var width = _ref9.width, height = _ref9.height, metadata = _objectWithoutPropertiesLoose(_ref9, _excluded3);
            if (!width || !height) {
                throw Error("Could not get required image metadata");
            }
            return _extends({
                width: width,
                height: height
            }, metadata);
        })).then(function(metadata) {
            var _sharp$resize;
            var sizeMin = 4;
            var sizeMax = 64;
            var isSizeValid = sizeMin <= size && size <= sizeMax;
            !isSizeValid && console.error([
                "Please enter a `size` value between",
                sizeMin,
                "and",
                sizeMax
            ].join(" ")); // initial optimization
            var pipelineStage1 = (_sharp$resize = sharp__WEBPACK_IMPORTED_MODULE_0__(src).resize(size, size, {
                fit: "inside"
            })).toFormat.apply(_sharp$resize, format).modulate(_extends({
                brightness: brightness,
                saturation: saturation
            }, options != null && options.hue ? {
                hue: options == null ? void 0 : options.hue
            } : {}, options != null && options.lightness ? {
                lightness: options == null ? void 0 : options.lightness
            } : {})); // alpha
            var pipelineStage2 = removeAlpha === false ? pipelineStage1 : pipelineStage1.removeAlpha(); // autoOrientation
            var pipelineStage3 = autoOrient === false ? pipelineStage2 : pipelineStage2.rotate();
            var pipeline = pipelineStage3;
            /* Return
        ---------------------------------- */ return Promise.resolve(pipeline.clone().stats().then(function(_ref10) {
                var _ref10$dominant = _ref10.dominant, r = _ref10$dominant.r, g = _ref10$dominant.g, b = _ref10$dominant.b;
                return {
                    r: r,
                    g: g,
                    b: b,
                    hex: "#" + [
                        r,
                        g,
                        b
                    ].map(function(x) {
                        return x.toString(16).padStart(2, "0");
                    }).join("")
                };
            })).then(function(color) {
                return Promise.resolve(pipeline.clone().normalise().toBuffer({
                    resolveWithObject: true
                }).then(function(_ref11) {
                    var data = _ref11.data, info = _ref11.info;
                    return "data:image/" + info.format + ";base64," + data.toString("base64");
                })["catch"](function(err) {
                    console.error("base64 generation failed", err);
                    throw err;
                })).then(function(base64) {
                    return Promise.resolve(pipeline.clone().raw().toBuffer({
                        resolveWithObject: true
                    }).then(function(_ref12) {
                        var data = _ref12.data, info = _ref12.info;
                        var pixels = getPixels({
                            data: data,
                            info: info
                        });
                        var css = getCSS({
                            pixels: pixels,
                            info: info
                        });
                        var svg = getSVG({
                            pixels: pixels,
                            info: info
                        });
                        return {
                            pixels: pixels,
                            css: css,
                            svg: svg
                        };
                    })["catch"](function(err) {
                        console.error("pixel generation failed", err);
                        throw err;
                    })).then(function(_ref13) {
                        var pixels = _ref13.pixels, css = _ref13.css, svg = _ref13.svg;
                        return {
                            color: color,
                            css: css,
                            base64: base64,
                            metadata: metadata,
                            pixels: pixels,
                            svg: svg
                        };
                    });
                });
            });
        });
    } catch (e) {
        return Promise.reject(e);
    }
};
 //# sourceMappingURL=plaiceholder.esm.js.map


/***/ })

};
;