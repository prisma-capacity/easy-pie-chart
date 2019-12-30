/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/app.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/CanvasRenderer.ts":
/*!*******************************!*\
  !*** ./app/CanvasRenderer.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CanvasRenderer = (function () {
    function CanvasRenderer(el, options) {
        this._scaleBy = 1;
        this._canvas = document.createElement('canvas');
        this._ctx = this._canvas.getContext('2d');
        el.appendChild(this._canvas);
        this._options = options;
        if (window.devicePixelRatio > 1) {
            this._scaleBy = window.devicePixelRatio;
            this._canvas.style.width = this._canvas.style.height = [this._options.size, 'px'].join('');
            this._canvas.width = this._canvas.height = this._options.size * this._scaleBy;
            this._ctx.scale(this._scaleBy, this._scaleBy);
        }
        this._ctx.translate(this._options.size / 2, this._options.size / 2);
        this._ctx.rotate((-1 / 2 + this._options.rotate / 180) * Math.PI);
        this._radius = (this._options.size - this._options.lineWidth) / 2;
        if (this._options.scaleColor && this._options.scaleLength) {
            this._radius -= this._options.scaleLength + 2;
        }
        Date.now = Date.now || function () {
            return +(new Date());
        };
        this._cachedBackground = this._ctx.getImageData(0, 0, this._options.size * this._scaleBy, this._options.size * this._scaleBy);
    }
    CanvasRenderer.prototype.drawCircle = function (color, lineWidth, percent) {
        percent = Math.min(Math.max(-1, percent || 0), 1);
        var isNegative = percent <= 0 ? true : false;
        this._ctx.beginPath();
        this._ctx.arc(0, 0, this._radius, 0, Math.PI * 2 * percent, isNegative);
        this._ctx.strokeStyle = color;
        this._ctx.lineWidth = lineWidth;
        this._ctx.stroke();
    };
    CanvasRenderer.prototype.drawScale = function () {
        var offset;
        var length;
        this._ctx.lineWidth = 1;
        this._ctx.fillStyle = this._options.scaleColor;
        this._ctx.save();
        for (var i = 24; i > 0; --i) {
            if (i % 6 === 0) {
                length = this._options.scaleLength;
                offset = 0;
            }
            else {
                length = this._options.scaleLength * 0.6;
                offset = this._options.scaleLength - length;
            }
            this._ctx.fillRect(-this._options.size / 2 + offset, 0, length, 1);
            this._ctx.rotate(Math.PI / 12);
        }
        this._ctx.restore();
    };
    CanvasRenderer.prototype.reqAnimationFrame = function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    };
    CanvasRenderer.prototype.drawBackground = function () {
        if (this._options.scaleColor)
            this.drawScale();
        if (this._options.trackColor)
            this.drawCircle(this._options.trackColor, this._options.trackWidth || this._options.lineWidth, 1);
    };
    CanvasRenderer.prototype.clear = function () {
        this._ctx.clearRect(this._options.size / -2, this._options.size / -2, this._options.size, this._options.size);
    };
    CanvasRenderer.prototype.draw = function (percent) {
        if (!!this._options.scaleColor || !!this._options.trackColor) {
            if (this._ctx.getImageData && this._ctx.putImageData) {
                if (!this._cachedBackground) {
                    this.drawBackground();
                    this._cachedBackground = this._ctx.getImageData(0, 0, this._options.size * this._scaleBy, this._options.size * this._scaleBy);
                }
                else {
                    this._ctx.putImageData(this._cachedBackground, 0, 0);
                }
            }
            else {
                this.clear();
                this.drawBackground();
            }
        }
        else {
            this.clear();
        }
        this._ctx.lineCap = this._options.lineCap;
        var color;
        if (typeof (this._options.barColor) === 'function') {
            color = this._options.barColor(percent);
        }
        else {
            color = this._options.barColor;
        }
        this.drawCircle(color, this._options.lineWidth, percent / 100);
    };
    CanvasRenderer.prototype.animate = function (from, to) {
        var _this = this;
        var startTime = Date.now();
        this._options.onStart(from, to);
        var animation = function () {
            var process = Math.min(Date.now() - startTime, _this._options.animate.duration);
            var currentValue = _this._options.easing(_this, process, from, to - from, _this._options.animate.duration);
            _this.draw(currentValue);
            _this._options.onStep(from, to, currentValue);
            if (process >= _this._options.animate.duration) {
                _this._options.onStop(from, to);
            }
            else {
                _this.reqAnimationFrame();
            }
        };
        this.reqAnimationFrame();
    };
    Object.defineProperty(CanvasRenderer.prototype, "canvas", {
        get: function () {
            return this._canvas;
        },
        set: function (value) {
            this._canvas = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasRenderer.prototype, "ctx", {
        get: function () {
            return this._ctx;
        },
        set: function (value) {
            this._ctx = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasRenderer.prototype, "radius", {
        get: function () {
            return this._radius;
        },
        set: function (value) {
            this._radius = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasRenderer.prototype, "scaleBy", {
        get: function () {
            return this._scaleBy;
        },
        set: function (value) {
            this._scaleBy = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasRenderer.prototype, "options", {
        get: function () {
            return this._options;
        },
        set: function (value) {
            this._options = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasRenderer.prototype, "cachedBackground", {
        get: function () {
            return this._cachedBackground;
        },
        set: function (value) {
            this._cachedBackground = value;
        },
        enumerable: true,
        configurable: true
    });
    return CanvasRenderer;
}());
exports.CanvasRenderer = CanvasRenderer;


/***/ }),

/***/ "./app/app.ts":
/*!********************!*\
  !*** ./app/app.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CanvasRenderer_1 = __webpack_require__(/*! ./CanvasRenderer */ "./app/CanvasRenderer.ts");
var canvas = new CanvasRenderer_1.CanvasRenderer(document.getElementById('chart'), {
    barColor: '#ef1e25',
    trackColor: '#f9f9f9',
    scaleColor: '#dfe0e0',
    scaleLength: 5,
    lineCap: 'round',
    lineWidth: 10,
    trackWidth: undefined,
    size: 110,
    rotate: 0,
    animate: {
        duration: 1000,
        enabled: true
    }
});
canvas.draw(75);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBwL0NhbnZhc1JlbmRlcmVyLnRzIiwid2VicGFjazovLy8uL2FwcC9hcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBO0lBYUksd0JBQVksRUFBZSxFQUFFLE9BQVk7UUFUakMsYUFBUSxHQUFXLENBQUMsQ0FBQztRQVV6QixJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsUUFBUSxHQUFH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LE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vYXBwL2FwcC50c1wiKTtcbiIsImV4cG9ydCBjbGFzcyBDYW52YXNSZW5kZXJlciB7XG4gICAgcHJpdmF0ZSBfY2FjaGVkQmFja2dyb3VuZDogSW1hZ2VEYXRhO1xuICAgIHByaXZhdGUgX2NhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgcHJpdmF0ZSBfY3R4OiBhbnk7XG4gICAgcHJpdmF0ZSBfc2NhbGVCeTogbnVtYmVyID0gMTtcbiAgICBwcml2YXRlIF9yYWRpdXM6IG51bWJlcjtcbiAgICBwcml2YXRlIF9vcHRpb25zOiBhbnk7XG4gICAgXG4gICAgLyoqXG4gICAgICogUmVuZGVyZXIgdG8gcmVuZGVyIHRoZSBjaGFydCBvbiBhIGNhbnZhcyBvYmplY3RcbiAgICAgKiBAcGFyYW0gZWwgRE9NIGVsZW1lbnQgdG8gaG9zdCB0aGUgY2FudmFzIChyb290IG9mIHRoZSBwbHVnaW4pXG4gICAgICogQHBhcmFtIG9wdGlvbnMgb3B0aW9ucyBvYmplY3Qgb2YgdGhlIHBsdWdpblxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGVsOiBIVE1MRWxlbWVudCwgb3B0aW9uczogYW55KSB7XG4gICAgICAgIHRoaXMuX2NhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICB0aGlzLl9jdHggPSB0aGlzLl9jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgZWwuYXBwZW5kQ2hpbGQodGhpcy5fY2FudmFzKTtcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgIFxuICAgICAgICAvLyBjYW52YXMgb24gcmV0aW5hIGRldmljZXNcbiAgICAgICAgaWYgKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvID4gMSkge1xuICAgICAgICAgICAgdGhpcy5fc2NhbGVCeSA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvO1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzLnN0eWxlLndpZHRoID0gdGhpcy5fY2FudmFzLnN0eWxlLmhlaWdodCA9IFt0aGlzLl9vcHRpb25zLnNpemUsICdweCddLmpvaW4oJycpO1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzLndpZHRoID0gdGhpcy5fY2FudmFzLmhlaWdodCA9IHRoaXMuX29wdGlvbnMuc2l6ZSAqIHRoaXMuX3NjYWxlQnk7XG4gICAgICAgICAgICB0aGlzLl9jdHguc2NhbGUodGhpcy5fc2NhbGVCeSwgdGhpcy5fc2NhbGVCeSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBtb3ZlIDAsMCBjb29yZGluYXRlcyB0byB0aGUgY2VudGVyXG4gICAgICAgIHRoaXMuX2N0eC50cmFuc2xhdGUodGhpcy5fb3B0aW9ucy5zaXplIC8gMiwgdGhpcy5fb3B0aW9ucy5zaXplIC8gMik7XG5cbiAgICAgICAgLy8gcm90YXRlIGNhbnZhcyAtOTBkZWdcbiAgICAgICAgdGhpcy5fY3R4LnJvdGF0ZSgoLTEgLyAyICsgdGhpcy5fb3B0aW9ucy5yb3RhdGUgLyAxODApICogTWF0aC5QSSk7XG5cbiAgICAgICAgdGhpcy5fcmFkaXVzID0gKHRoaXMuX29wdGlvbnMuc2l6ZSAtIHRoaXMuX29wdGlvbnMubGluZVdpZHRoKSAvIDI7XG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zLnNjYWxlQ29sb3IgJiYgdGhpcy5fb3B0aW9ucy5zY2FsZUxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5fcmFkaXVzIC09IHRoaXMuX29wdGlvbnMuc2NhbGVMZW5ndGggKyAyOyAvLyAyIGlzIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHNjYWxlIGFuZCBiYXJcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElFIHBvbHlmaWxsIGZvciBEYXRlXG4gICAgICAgIERhdGUubm93ID0gRGF0ZS5ub3cgfHwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gKyhuZXcgRGF0ZSgpKTtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLl9jYWNoZWRCYWNrZ3JvdW5kID0gdGhpcy5fY3R4LmdldEltYWdlRGF0YSgwLCAwLCB0aGlzLl9vcHRpb25zLnNpemUgKiB0aGlzLl9zY2FsZUJ5LCB0aGlzLl9vcHRpb25zLnNpemUgKiB0aGlzLl9zY2FsZUJ5KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEcmF3IGEgY2lyY2xlIGFyb3VuZCB0aGUgY2VudGVyIG9mIHRoZSBjYW52YXNcbiAgICAgKiBAcGFyYW0gY29sb3IgVmFsaWQgQ1NTIENvbG9yXG4gICAgICogQHBhcmFtIGxpbmVXaWR0aCBXaWR0aCBvZiB0aGUgbGluZSBpbiBweFxuICAgICAqIEBwYXJhbSBwZXJjZW50IFBlcmNlbnRhZ2UgdG8gZHJhdyAoZmxvYXQgYmV0d2VlbiAtMSBhbmQgMSlcbiAgICAgKi9cbiAgICBwcml2YXRlIGRyYXdDaXJjbGUoY29sb3I6IHN0cmluZywgbGluZVdpZHRoOiBudW1iZXIsIHBlcmNlbnQ6IG51bWJlcikge1xuICAgICAgICBwZXJjZW50ID0gTWF0aC5taW4oTWF0aC5tYXgoLTEsIHBlcmNlbnQgfHwgMCksIDEpO1xuXHRcdGNvbnN0IGlzTmVnYXRpdmUgPSBwZXJjZW50IDw9IDAgPyB0cnVlIDogZmFsc2U7XG5cblx0XHR0aGlzLl9jdHguYmVnaW5QYXRoKCk7XG5cdFx0dGhpcy5fY3R4LmFyYygwLCAwLCB0aGlzLl9yYWRpdXMsIDAsIE1hdGguUEkgKiAyICogcGVyY2VudCwgaXNOZWdhdGl2ZSk7XG5cblx0XHR0aGlzLl9jdHguc3Ryb2tlU3R5bGUgPSBjb2xvcjtcblx0XHR0aGlzLl9jdHgubGluZVdpZHRoID0gbGluZVdpZHRoO1xuXG5cdFx0dGhpcy5fY3R4LnN0cm9rZSgpO1xuICAgIH1cblxuICAgIC8qKlxuXHQgKiBEcmF3IHRoZSBzY2FsZSBvZiB0aGUgY2hhcnRcblx0ICovXG4gICAgcHJpdmF0ZSBkcmF3U2NhbGUoKSB7XG4gICAgICAgIGxldCBvZmZzZXQ7XG5cdFx0bGV0IGxlbmd0aDtcblxuXHRcdHRoaXMuX2N0eC5saW5lV2lkdGggPSAxO1xuXHRcdHRoaXMuX2N0eC5maWxsU3R5bGUgPSB0aGlzLl9vcHRpb25zLnNjYWxlQ29sb3I7XG5cblx0XHR0aGlzLl9jdHguc2F2ZSgpO1xuXHRcdGZvciAodmFyIGkgPSAyNDsgaSA+IDA7IC0taSkge1xuXHRcdFx0aWYgKGkgJSA2ID09PSAwKSB7XG5cdFx0XHRcdGxlbmd0aCA9IHRoaXMuX29wdGlvbnMuc2NhbGVMZW5ndGg7XG5cdFx0XHRcdG9mZnNldCA9IDA7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRsZW5ndGggPSB0aGlzLl9vcHRpb25zLnNjYWxlTGVuZ3RoICogMC42O1xuXHRcdFx0XHRvZmZzZXQgPSB0aGlzLl9vcHRpb25zLnNjYWxlTGVuZ3RoIC0gbGVuZ3RoO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5fY3R4LmZpbGxSZWN0KC10aGlzLl9vcHRpb25zLnNpemUvMiArIG9mZnNldCwgMCwgbGVuZ3RoLCAxKTtcblx0XHRcdHRoaXMuX2N0eC5yb3RhdGUoTWF0aC5QSSAvIDEyKTtcblx0XHR9XG5cdFx0dGhpcy5fY3R4LnJlc3RvcmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0IGFuaW1hdGlvbiBmcmFtZSB3cmFwcGVyIHdpdGggcG9seWZpbGxcblx0ICogQHJldHVybiB7ZnVuY3Rpb259IFJlcXVlc3QgYW5pbWF0aW9uIGZyYW1lIG1ldGhvZCBvciB0aW1lb3V0IGZhbGxiYWNrXG4gICAgICovXG4gICAgcHJpdmF0ZSByZXFBbmltYXRpb25GcmFtZSgpIHtcbiAgICAgICAgcmV0dXJuICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG5cdFx0XHRcdHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcblx0XHRcdFx0ZnVuY3Rpb24oY2FsbGJhY2spIHtcblx0XHRcdFx0XHR3aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKTtcblx0XHRcdFx0fTtcbiAgICB9XG5cbiAgICAvKipcblx0ICogRHJhdyB0aGUgYmFja2dyb3VuZCBvZiB0aGUgcGx1Z2luIGluY2x1ZGluZyB0aGUgc2NhbGUgYW5kIHRoZSB0cmFja1xuXHQgKi9cbiAgICBwcml2YXRlIGRyYXdCYWNrZ3JvdW5kKCkge1xuICAgICAgICBpZih0aGlzLl9vcHRpb25zLnNjYWxlQ29sb3IpIHRoaXMuZHJhd1NjYWxlKCk7XG5cdFx0aWYodGhpcy5fb3B0aW9ucy50cmFja0NvbG9yKSB0aGlzLmRyYXdDaXJjbGUodGhpcy5fb3B0aW9ucy50cmFja0NvbG9yLCB0aGlzLl9vcHRpb25zLnRyYWNrV2lkdGggfHwgdGhpcy5fb3B0aW9ucy5saW5lV2lkdGgsIDEpO1xuICAgIH1cblxuICAgIC8qKlxuXHQgKiBDbGVhciB0aGUgY29tcGxldGUgY2FudmFzXG5cdCAqL1xuICAgIHByaXZhdGUgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMuX2N0eC5jbGVhclJlY3QodGhpcy5fb3B0aW9ucy5zaXplIC8gLTIsIHRoaXMuX29wdGlvbnMuc2l6ZSAvIC0yLCB0aGlzLl9vcHRpb25zLnNpemUsIHRoaXMuX29wdGlvbnMuc2l6ZSlcbiAgICB9XG5cbiAgICAvKipcblx0ICogRHJhdyB0aGUgY29tcGxldGUgY2hhcnRcblx0ICogQHBhcmFtIHtudW1iZXJ9IHBlcmNlbnQgUGVyY2VudCBzaG93biBieSB0aGUgY2hhcnQgYmV0d2VlbiAtMTAwIGFuZCAxMDBcblx0ICovXG4gICAgZHJhdyhwZXJjZW50OiBudW1iZXIpIHtcbiAgICAgICAgLy8gZG8gd2UgbmVlZCB0byByZW5kZXIgYSBiYWNrZ3JvdW5kXG5cdFx0aWYgKCEhdGhpcy5fb3B0aW9ucy5zY2FsZUNvbG9yIHx8ICEhdGhpcy5fb3B0aW9ucy50cmFja0NvbG9yKSB7XG5cdFx0XHQvLyBnZXRJbWFnZURhdGEgYW5kIHB1dEltYWdlRGF0YSBhcmUgc3VwcG9ydGVkXG5cdFx0XHRpZiAodGhpcy5fY3R4LmdldEltYWdlRGF0YSAmJiB0aGlzLl9jdHgucHV0SW1hZ2VEYXRhKSB7XG5cdFx0XHRcdGlmICghdGhpcy5fY2FjaGVkQmFja2dyb3VuZCkge1xuXHRcdFx0XHRcdHRoaXMuZHJhd0JhY2tncm91bmQoKTtcblx0XHRcdFx0XHR0aGlzLl9jYWNoZWRCYWNrZ3JvdW5kID0gdGhpcy5fY3R4LmdldEltYWdlRGF0YSgwLCAwLCB0aGlzLl9vcHRpb25zLnNpemUgKiB0aGlzLl9zY2FsZUJ5LCB0aGlzLl9vcHRpb25zLnNpemUgKiB0aGlzLl9zY2FsZUJ5KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLl9jdHgucHV0SW1hZ2VEYXRhKHRoaXMuX2NhY2hlZEJhY2tncm91bmQsIDAsIDApO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLmNsZWFyKCk7XG5cdFx0XHRcdHRoaXMuZHJhd0JhY2tncm91bmQoKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5jbGVhcigpO1xuXHRcdH1cblxuXHRcdHRoaXMuX2N0eC5saW5lQ2FwID0gdGhpcy5fb3B0aW9ucy5saW5lQ2FwO1xuXG5cdFx0Ly8gaWYgYmFyY29sb3IgaXMgYSBmdW5jdGlvbiBleGVjdXRlIGl0IGFuZCBwYXNzIHRoZSBwZXJjZW50IGFzIGEgdmFsdWVcblx0XHR2YXIgY29sb3I7XG5cdFx0aWYgKHR5cGVvZih0aGlzLl9vcHRpb25zLmJhckNvbG9yKSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0Y29sb3IgPSB0aGlzLl9vcHRpb25zLmJhckNvbG9yKHBlcmNlbnQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb2xvciA9IHRoaXMuX29wdGlvbnMuYmFyQ29sb3I7XG5cdFx0fVxuXG5cdFx0Ly8gZHJhdyBiYXJcblx0XHR0aGlzLmRyYXdDaXJjbGUoY29sb3IsIHRoaXMuX29wdGlvbnMubGluZVdpZHRoLCBwZXJjZW50IC8gMTAwKTtcbiAgICB9XG5cbiAgICAvKipcblx0ICogQW5pbWF0ZSBmcm9tIHNvbWUgcGVyY2VudCB0byBzb21lIG90aGVyIHBlcmNlbnRhZ2Vcblx0ICogQHBhcmFtIHtudW1iZXJ9IGZyb20gU3RhcnRpbmcgcGVyY2VudGFnZVxuXHQgKiBAcGFyYW0ge251bWJlcn0gdG8gICBGaW5hbCBwZXJjZW50YWdlXG5cdCAqL1xuICAgIGFuaW1hdGUoZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IHN0YXJ0VGltZSA9IERhdGUubm93KCk7XG5cdFx0dGhpcy5fb3B0aW9ucy5vblN0YXJ0KGZyb20sIHRvKTtcblx0XHRjb25zdCBhbmltYXRpb24gPSAoKSA9PiB7XG5cdFx0XHRjb25zdCBwcm9jZXNzID0gTWF0aC5taW4oRGF0ZS5ub3coKSAtIHN0YXJ0VGltZSwgdGhpcy5fb3B0aW9ucy5hbmltYXRlLmR1cmF0aW9uKTtcblx0XHRcdGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHRoaXMuX29wdGlvbnMuZWFzaW5nKHRoaXMsIHByb2Nlc3MsIGZyb20sIHRvIC0gZnJvbSwgdGhpcy5fb3B0aW9ucy5hbmltYXRlLmR1cmF0aW9uKTtcblx0XHRcdHRoaXMuZHJhdyhjdXJyZW50VmFsdWUpO1xuXHRcdFx0dGhpcy5fb3B0aW9ucy5vblN0ZXAoZnJvbSwgdG8sIGN1cnJlbnRWYWx1ZSk7XG5cdFx0XHRpZiAocHJvY2VzcyA+PSB0aGlzLl9vcHRpb25zLmFuaW1hdGUuZHVyYXRpb24pIHtcblx0XHRcdFx0dGhpcy5fb3B0aW9ucy5vblN0b3AoZnJvbSwgdG8pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5yZXFBbmltYXRpb25GcmFtZSgpO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHR0aGlzLnJlcUFuaW1hdGlvbkZyYW1lKCk7XG4gICAgfVxuXG4gICAgLyoqIENhbnZhcyBBY2Nlc3NvciBHZXR0ZXIgYW5kIFNldHRlciAqL1xuICAgIHB1YmxpYyBnZXQgY2FudmFzKCk6IEhUTUxDYW52YXNFbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhbnZhcztcbiAgICB9XG4gICAgcHVibGljIHNldCBjYW52YXModmFsdWU6IEhUTUxDYW52YXNFbGVtZW50KSB7XG4gICAgICAgIHRoaXMuX2NhbnZhcyA9IHZhbHVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgY3R4KCk6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdHg7XG4gICAgfVxuICAgIHB1YmxpYyBzZXQgY3R4KHZhbHVlOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpIHtcbiAgICAgICAgdGhpcy5fY3R4ID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCByYWRpdXMoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JhZGl1cztcbiAgICB9XG4gICAgcHVibGljIHNldCByYWRpdXModmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9yYWRpdXMgPSB2YWx1ZTtcbiAgICB9XG4gICAgXG4gICAgcHVibGljIGdldCBzY2FsZUJ5KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY2FsZUJ5O1xuICAgIH1cbiAgICBwdWJsaWMgc2V0IHNjYWxlQnkodmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9zY2FsZUJ5ID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBvcHRpb25zKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcHRpb25zO1xuICAgIH1cbiAgICBwdWJsaWMgc2V0IG9wdGlvbnModmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLl9vcHRpb25zID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBjYWNoZWRCYWNrZ3JvdW5kKCk6IEltYWdlRGF0YSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYWNoZWRCYWNrZ3JvdW5kO1xuICAgIH1cbiAgICBwdWJsaWMgc2V0IGNhY2hlZEJhY2tncm91bmQodmFsdWU6IEltYWdlRGF0YSkge1xuICAgICAgICB0aGlzLl9jYWNoZWRCYWNrZ3JvdW5kID0gdmFsdWU7XG4gICAgfVxufSIsImltcG9ydCB7IENhbnZhc1JlbmRlcmVyIH0gZnJvbSAnLi9DYW52YXNSZW5kZXJlcidcblxuY29uc3QgY2FudmFzID0gbmV3IENhbnZhc1JlbmRlcmVyKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGFydCcpISwge1xuICAgIGJhckNvbG9yOiAnI2VmMWUyNScsXG4gICAgdHJhY2tDb2xvcjogJyNmOWY5ZjknLFxuICAgIHNjYWxlQ29sb3I6ICcjZGZlMGUwJyxcbiAgICBzY2FsZUxlbmd0aDogNSxcbiAgICBsaW5lQ2FwOiAncm91bmQnLFxuICAgIGxpbmVXaWR0aDogMTAsXG4gICAgdHJhY2tXaWR0aDogdW5kZWZpbmVkLFxuICAgIHNpemU6IDExMCxcbiAgICByb3RhdGU6IDAsXG4gICAgYW5pbWF0ZToge1xuICAgICAgICBkdXJhdGlvbjogMTAwMCxcbiAgICAgICAgZW5hYmxlZDogdHJ1ZVxuICAgIH1cbn0pO1xuXG5jYW52YXMuZHJhdyg3NSkiXSwic291cmNlUm9vdCI6IiJ9