export class CanvasRenderer {
    private _cachedBackground: ImageData;
    private _canvas: HTMLCanvasElement;
    private _ctx: any;
    private _scaleBy = 1;
    private _radius: number;
    private _options: any;
    
    /**
     * Renderer to render the chart on a canvas object
     * @param el DOM element to host the canvas (root of the plugin)
     * @param options options object of the plugin
     */
    constructor(el: HTMLElement, options: any) {
        this._canvas = document.createElement('canvas');
        this._ctx = this._canvas.getContext('2d');
        el.appendChild(this._canvas);
        this._options = options;
        
        // canvas on retina devices
        if (window.devicePixelRatio > 1) {
            this._scaleBy = window.devicePixelRatio;
            this._canvas.style.width = this._canvas.style.height = [this._options.size, 'px'].join('');
            this._canvas.width = this._canvas.height = this._options.size * this._scaleBy;
            this._ctx.scale(this._scaleBy, this._scaleBy);
        }

        // move 0,0 coordinates to the center
        this._ctx.translate(this._options.size / 2, this._options.size / 2);

        // rotate canvas -90deg
        this._ctx.rotate((-1 / 2 + this._options.rotate / 180) * Math.PI);

        this._radius = (this._options.size - this._options.lineWidth) / 2;
        if (this._options.scaleColor && this._options.scaleLength) {
            this._radius -= this._options.scaleLength + 2; // 2 is the distance between scale and bar
        }

        // IE polyfill for Date
        Date.now = Date.now || function() {
            return +(new Date());
        };

        this._cachedBackground = this._ctx.getImageData(0, 0, this._options.size * this._scaleBy, this._options.size * this._scaleBy);
    }

    /**
     * Draw a circle around the center of the canvas
     * @param color Valid CSS Color
     * @param lineWidth Width of the line in px
     * @param percent Percentage to draw (float between -1 and 1)
     */
    private drawCircle(color: string, lineWidth: number, percent: number) {
        percent = Math.min(Math.max(-1, percent || 0), 1);
		const isNegative = percent <= 0 ? true : false;

		this._ctx.beginPath();
		this._ctx.arc(0, 0, this._radius, 0, Math.PI * 2 * percent, isNegative);

		this._ctx.strokeStyle = color;
		this._ctx.lineWidth = lineWidth;

		this._ctx.stroke();
    }

    /**
	 * Draw the scale of the chart
	 */
    private drawScale() {
        let offset;
		let length;

		this._ctx.lineWidth = 1;
		this._ctx.fillStyle = this._options.scaleColor;

		this._ctx.save();
		for (var i = 24; i > 0; --i) {
			if (i % 6 === 0) {
				length = this._options.scaleLength;
				offset = 0;
			} else {
				length = this._options.scaleLength * 0.6;
				offset = this._options.scaleLength - length;
			}
			this._ctx.fillRect(-this._options.size/2 + offset, 0, length, 1);
			this._ctx.rotate(Math.PI / 12);
		}
		this._ctx.restore();
    }

    /**
     * Request animation frame wrapper with polyfill
	 * @return {function} Request animation frame method or timeout fallback
     */
    private reqAnimationFrame() {
        return  window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				function(callback) {
					window.setTimeout(callback, 1000 / 60);
				};
    }

    /**
	 * Draw the background of the plugin including the scale and the track
	 */
    private drawBackground() {
        if(this._options.scaleColor) this.drawScale();
		if(this._options.trackColor) this.drawCircle(this._options.trackColor, this._options.trackWidth || this._options.lineWidth, 1);
    }

    /**
	 * Clear the complete canvas
	 */
    private clear() {
        this._ctx.clearRect(this._options.size / -2, this._options.size / -2, this._options.size, this._options.size)
    }

    /**
	 * Draw the complete chart
	 * @param {number} percent Percent shown by the chart between -100 and 100
	 */
    draw(percent: number) {
        // do we need to render a background
		if (!!this._options.scaleColor || !!this._options.trackColor) {
			// getImageData and putImageData are supported
			if (this._ctx.getImageData && this._ctx.putImageData) {
				if (!this._cachedBackground) {
					this.drawBackground();
					this._cachedBackground = this._ctx.getImageData(0, 0, this._options.size * this._scaleBy, this._options.size * this._scaleBy);
				} else {
					this._ctx.putImageData(this._cachedBackground, 0, 0);
				}
			} else {
				this.clear();
				this.drawBackground();
			}
		} else {
			this.clear();
		}

		this._ctx.lineCap = this._options.lineCap;

		// if barcolor is a function execute it and pass the percent as a value
		var color;
		if (typeof(this._options.barColor) === 'function') {
			color = this._options.barColor(percent);
		} else {
			color = this._options.barColor;
		}

		// draw bar
		this.drawCircle(color, this._options.lineWidth, percent / 100);
    }

    /**
	 * Animate from some percent to some other percentage
	 * @param {number} from Starting percentage
	 * @param {number} to   Final percentage
	 */
    animate(from: number, to: number) {
        const startTime = Date.now();
		this._options.onStart(from, to);
		const animation = () => {
			const process = Math.min(Date.now() - startTime, this._options.animate.duration);
			const currentValue = this._options.easing(this, process, from, to - from, this._options.animate.duration);
			this.draw(currentValue);
			this._options.onStep(from, to, currentValue);
			if (process >= this._options.animate.duration) {
				this._options.onStop(from, to);
			} else {
				this.reqAnimationFrame();
			}
		};

		this.reqAnimationFrame();
    }

    /** Canvas Accessor Getter and Setter */
    public get canvas(): HTMLCanvasElement {
        return this._canvas;
    }
    public set canvas(value: HTMLCanvasElement) {
        this._canvas = value;
    }

    public get ctx(): CanvasRenderingContext2D {
        return this._ctx;
    }
    public set ctx(value: CanvasRenderingContext2D) {
        this._ctx = value;
    }

    public get radius(): number {
        return this._radius;
    }
    public set radius(value: number) {
        this._radius = value;
    }
    
    public get scaleBy(): number {
        return this._scaleBy;
    }
    public set scaleBy(value: number) {
        this._scaleBy = value;
    }

    public get options(): any {
        return this._options;
    }
    public set options(value: any) {
        this._options = value;
    }

    public get cachedBackground(): ImageData {
        return this._cachedBackground;
    }
    public set cachedBackground(value: ImageData) {
        this._cachedBackground = value;
    }
}