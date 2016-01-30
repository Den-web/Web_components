
;(function(window, document, undefined) {

  'use strict';

  var NAME = 'Parallax';
  var MAGIC_NUMBER = 30;
  var DEFAULTS = {
    relativeInput: false,
    clipRelativeInput: false,
    calibrationThreshold: 100,
    calibrationDelay: 500,
    supportDelay: 500,
    calibrateX: false,
    calibrateY: true,
    invertX: true,
    invertY: true,
    limitX: false,
    limitY: false,
    scalarX: 15.0,
    scalarY: 0.0,
    frictionX: 0.1,
    frictionY: 0.1,
    originX: 0.0,
    originY: 0.5
  };

  function Parallax(element, options) {

    this.element = element;
    this.layers = element.getElementsByClassName('layer');

    var data = {
      calibrateX: this.data(this.element, 'calibrate-x'),
      calibrateY: this.data(this.element, 'calibrate-y'),
      invertX: this.data(this.element, 'invert-x'),
      invertY: this.data(this.element, 'invert-y'),
      limitX: this.data(this.element, 'limit-x'),
      limitY: this.data(this.element, 'limit-y'),
      scalarX: this.data(this.element, 'scalar-x'),
      scalarY: this.data(this.element, 'scalar-y'),
      frictionX: this.data(this.element, 'friction-x'),
      frictionY: this.data(this.element, 'friction-y'),
      originX: this.data(this.element, 'origin-x'),
      originY: this.data(this.element, 'origin-y')
    };

    for (var key in data) {
      if (data[key] === null) delete data[key];
    }

    this.extend(this, DEFAULTS, options, data);

    this.calibrationTimer = null;
    this.calibrationFlag = true;
    this.enabled = false;
    this.depths = [];
    this.raf = null;

    this.bounds = null;
    this.ex = 0;
    this.ey = 0;
    this.ew = 0;
    this.eh = 0;

    this.ecx = 0;
    this.ecy = 0;

    this.erx = 0;
    this.ery = 0;

    this.cx = 0;
    this.cy = 0;

    this.ix = 0;
    this.iy = 0;

    this.mx = 0;
    this.my = 0;

    this.vx = 0;
    this.vy = 0;

    this.onMouseMove = this.onMouseMove.bind(this);
    this.onDeviceOrientation = this.onDeviceOrientation.bind(this);
    this.onOrientationTimer = this.onOrientationTimer.bind(this);
    this.onCalibrationTimer = this.onCalibrationTimer.bind(this);
    this.onAnimationFrame = this.onAnimationFrame.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);

    this.initialise();
  }

  Parallax.prototype.extend = function() {
    if (arguments.length > 1) {
      var master = arguments[0];
      for (var i = 1, l = arguments.length; i < l; i++) {
        var object = arguments[i];
        for (var key in object) {
          master[key] = object[key];
        }
      }
    }
  };

  Parallax.prototype.data = function(element, name) {
    return this.deserialize(element.getAttribute('data-'+name));
  };

  Parallax.prototype.deserialize = function(value) {
    if (value === "true") {
      return true;
    } else if (value === "false") {
      return false;
    } else if (value === "null") {
      return null;
    } else if (!isNaN(parseFloat(value)) && isFinite(value)) {
      return parseFloat(value);
    } else {
      return value;
    }
  };

  Parallax.prototype.camelCase = function(value) {
    return value.replace(/-+(.)?/g, function(match, character){
      return character ? character.toUpperCase() : '';
    });
  };

  Parallax.prototype.transformSupport = function(value) {
    var element = document.createElement('div');
    var propertySupport = false;
    var propertyValue = null;
    var featureSupport = false;
    var cssProperty = null;
    var jsProperty = null;
    for (var i = 0, l = this.vendors.length; i < l; i++) {
      if (this.vendors[i] !== null) {
        cssProperty = this.vendors[i][0] + 'transform';
        jsProperty = this.vendors[i][1] + 'Transform';
      } else {
        cssProperty = 'transform';
        jsProperty = 'transform';
      }
      if (element.style[jsProperty] !== undefined) {
        propertySupport = true;
        break;
      }
    }
    switch(value) {
      case '2D':
        featureSupport = propertySupport;
        break;
      case '3D':
        if (propertySupport) {
          var body = document.body || document.createElement('body');
          var documentElement = document.documentElement;
          var documentOverflow = documentElement.style.overflow;
          if (!document.body) {
            documentElement.style.overflow = 'hidden';
            documentElement.appendChild(body);
            body.style.overflow = 'hidden';
            body.style.background = '';
          }
          body.appendChild(element);
          element.style[jsProperty] = 'translate3d(1px,1px,1px)';
          propertyValue = window.getComputedStyle(element).getPropertyValue(cssProperty);
          featureSupport = propertyValue !== undefined && propertyValue.length > 0 && propertyValue !== "none";
          documentElement.style.overflow = documentOverflow;
          body.removeChild(element);
        }
        break;
    }
    return featureSupport;
  };

  Parallax.prototype.ww = null;
  Parallax.prototype.wh = null;
  Parallax.prototype.wcx = null;
  Parallax.prototype.wcy = null;
  Parallax.prototype.wrx = null;
  Parallax.prototype.wry = null;
  Parallax.prototype.portrait = null;
  Parallax.prototype.desktop = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i);
  Parallax.prototype.vendors = [null,['-webkit-','webkit'],['-moz-','Moz'],['-o-','O'],['-ms-','ms']];
  Parallax.prototype.motionSupport = !!window.DeviceMotionEvent;
  Parallax.prototype.orientationSupport = !!window.DeviceOrientationEvent;
  Parallax.prototype.orientationStatus = 0;
  Parallax.prototype.transform2DSupport = Parallax.prototype.transformSupport('2D');
  Parallax.prototype.transform3DSupport = Parallax.prototype.transformSupport('3D');
  Parallax.prototype.propertyCache = {};

  Parallax.prototype.initialise = function() {

    // Configure Context Styles
    if (this.transform3DSupport) this.accelerate(this.element);
    var style = window.getComputedStyle(this.element);
    if (style.getPropertyValue('position') === 'static') {
      this.element.style.position = 'relative';
    }

    this.updateLayers();
    this.updateDimensions();
    this.enable();
    this.queueCalibration(this.calibrationDelay);
  };

  Parallax.prototype.updateLayers = function() {

    this.layers = this.element.getElementsByClassName('layer');
    this.depths = [];

    for (var i = 0, l = this.layers.length; i < l; i++) {
      var layer = this.layers[i];
      if (this.transform3DSupport) this.accelerate(layer);
      layer.style.position = i ? 'absolute' : 'relative';
      layer.style.display = 'block';
      layer.style.left = 0;
      layer.style.top = 0;

      this.depths.push(this.data(layer, 'depth') || 0);
    }
  };

  Parallax.prototype.updateDimensions = function() {
    this.ww = window.innerWidth;
    this.wh = window.innerHeight;
    this.wcx = this.ww * this.originX;
    this.wcy = this.wh * this.originY;
    this.wrx = Math.max(this.wcx, this.ww - this.wcx);
    this.wry = Math.max(this.wcy, this.wh - this.wcy);
  };

  Parallax.prototype.updateBounds = function() {
    this.bounds = this.element.getBoundingClientRect();
    this.ex = this.bounds.left;
    this.ey = this.bounds.top;
    this.ew = this.bounds.width;
    this.eh = this.bounds.height;
    this.ecx = this.ew * this.originX;
    this.ecy = this.eh * this.originY;
    this.erx = Math.max(this.ecx, this.ew - this.ecx);
    this.ery = Math.max(this.ecy, this.eh - this.ecy);
  };

  Parallax.prototype.queueCalibration = function(delay) {
    clearTimeout(this.calibrationTimer);
    this.calibrationTimer = setTimeout(this.onCalibrationTimer, delay);
  };

  Parallax.prototype.enable = function() {
    if (!this.enabled) {
      this.enabled = true;
      if (this.orientationSupport) {
        this.portrait = null;
        window.addEventListener('deviceorientation', this.onDeviceOrientation);
        setTimeout(this.onOrientationTimer, this.supportDelay);
      } else {
        this.cx = 0;
        this.cy = 0;
        this.portrait = false;
        window.addEventListener('mousemove', this.onMouseMove);
      }
      window.addEventListener('resize', this.onWindowResize);
      this.raf = requestAnimationFrame(this.onAnimationFrame);
    }
  };

  Parallax.prototype.disable = function() {
    if (this.enabled) {
      this.enabled = false;
      if (this.orientationSupport) {
        window.removeEventListener('deviceorientation', this.onDeviceOrientation);
      } else {
        window.removeEventListener('mousemove', this.onMouseMove);
      }
      window.removeEventListener('resize', this.onWindowResize);
      cancelAnimationFrame(this.raf);
    }
  };

  Parallax.prototype.calibrate = function(x, y) {
    this.calibrateX = x === undefined ? this.calibrateX : x;
    this.calibrateY = y === undefined ? this.calibrateY : y;
  };

  Parallax.prototype.invert = function(x, y) {
    this.invertX = x === undefined ? this.invertX : x;
    this.invertY = y === undefined ? this.invertY : y;
  };

  Parallax.prototype.friction = function(x, y) {
    this.frictionX = x === undefined ? this.frictionX : x;
    this.frictionY = y === undefined ? this.frictionY : y;
  };

  Parallax.prototype.scalar = function(x, y) {
    this.scalarX = x === undefined ? this.scalarX : x;
    this.scalarY = y === undefined ? this.scalarY : y;
  };

  Parallax.prototype.limit = function(x, y) {
    this.limitX = x === undefined ? this.limitX : x;
    this.limitY = y === undefined ? this.limitY : y;
  };

  Parallax.prototype.origin = function(x, y) {
    this.originX = x === undefined ? this.originX : x;
    this.originY = y === undefined ? this.originY : y;
  };

  Parallax.prototype.clamp = function(value, min, max) {
    value = Math.max(value, min);
    value = Math.min(value, max);
    return value;
  };

  Parallax.prototype.css = function(element, property, value) {
    var jsProperty = this.propertyCache[property];
    if (!jsProperty) {
      for (var i = 0, l = this.vendors.length; i < l; i++) {
        if (this.vendors[i] !== null) {
          jsProperty = this.camelCase(this.vendors[i][1] + '-' + property);
        } else {
          jsProperty = property;
        }
        if (element.style[jsProperty] !== undefined) {
          this.propertyCache[property] = jsProperty;
          break;
        }
      }
    }
    element.style[jsProperty] = value;
  };

  Parallax.prototype.accelerate = function(element) {
    this.css(element, 'transform', 'translate3d(0,0,0)');
    this.css(element, 'transform-style', 'preserve-3d');
    this.css(element, 'backface-visibility', 'hidden');
  };

  Parallax.prototype.setPosition = function(element, x, y) {
    x += 'px';
    y += 'px';
    if (this.transform3DSupport) {
      this.css(element, 'transform', 'translate3d('+x+','+y+',0)');
    } else if (this.transform2DSupport) {
      this.css(element, 'transform', 'translate('+x+','+y+')');
    } else {
      element.style.left = x;
      element.style.top = y;
    }
  };

  Parallax.prototype.onOrientationTimer = function(event) {
    if (this.orientationSupport && this.orientationStatus === 0) {
      this.disable();
      this.orientationSupport = false;
      this.enable();
    }
  };

  Parallax.prototype.onCalibrationTimer = function(event) {
    this.calibrationFlag = true;
  };

  Parallax.prototype.onWindowResize = function(event) {
    this.updateDimensions();
  };

  Parallax.prototype.onAnimationFrame = function() {
    this.updateBounds();
    var dx = this.ix - this.cx;
    var dy = this.iy - this.cy;
    if ((Math.abs(dx) > this.calibrationThreshold) || (Math.abs(dy) > this.calibrationThreshold)) {
      this.queueCalibration(0);
    }
    if (this.portrait) {
      this.mx = this.calibrateX ? dy : this.iy;
      this.my = this.calibrateY ? dx : this.ix;
    } else {
      this.mx = this.calibrateX ? dx : this.ix;
      this.my = this.calibrateY ? dy : this.iy;
    }
    this.mx *= this.ew * (this.scalarX / 80);
    this.my *= this.eh * (this.scalarY / 100);
    if (!isNaN(parseFloat(this.limitX))) {
      this.mx = this.clamp(this.mx, -this.limitX, this.limitX);
    }
    if (!isNaN(parseFloat(this.limitY))) {
      this.my = this.clamp(this.my, -this.limitY, this.limitY);
    }
    this.vx += (this.mx - this.vx) * this.frictionX;
    this.vy += (this.my - this.vy) * this.frictionY;
    for (var i = 0, l = this.layers.length; i < l; i++) {
      var layer = this.layers[i];
      var depth = this.depths[i];
      var xOffset = this.vx * depth * (this.invertX ? -1 : 1);
      var yOffset = this.vy * depth * (this.invertY ? -1 : 1);
      this.setPosition(layer, xOffset, yOffset);
    }
    this.raf = requestAnimationFrame(this.onAnimationFrame);
  };

  Parallax.prototype.onDeviceOrientation = function(event) {

    // Validate environment and event properties.
    if (!this.desktop && event.beta !== null && event.gamma !== null) {

      // Set orientation status.
      this.orientationStatus = 1;

      // Extract Rotation
      var x = (event.beta  || 0) / MAGIC_NUMBER; //  -90 :: 90
      var y = (event.gamma || 0) / MAGIC_NUMBER; // -180 :: 180

      // Detect Orientation Change
      var portrait = this.wh > this.ww;
      if (this.portrait !== portrait) {
        this.portrait = portrait;
        this.calibrationFlag = true;
      }

      // Set Calibration
      if (this.calibrationFlag) {
        this.calibrationFlag = false;
        this.cx = x;
        this.cy = y;
      }

      // Set Input
      this.ix = x;
      this.iy = y;
    }
  };

  Parallax.prototype.onMouseMove = function(event) {

    // Cache mouse coordinates.
    var clientX = event.clientX;
    var clientY = event.clientY;

    // Calculate Mouse Input
    if (!this.orientationSupport && this.relativeInput) {

      // Clip mouse coordinates inside element bounds.
      if (this.clipRelativeInput) {
        clientX = Math.max(clientX, this.ex);
        clientX = Math.min(clientX, this.ex + this.ew);
        clientY = Math.max(clientY, this.ey);
        clientY = Math.min(clientY, this.ey + this.eh);
      }

      // Calculate input relative to the element.
      this.ix = (clientX - this.ex - this.ecx) / this.erx;
      this.iy = (clientY - this.ey - this.ecy) / this.ery;

    } else {

      // Calculate input relative to the window.
      this.ix = (clientX - this.wcx) / this.wrx;
      this.iy = (clientY - this.wcy) / this.wry;
    }
  };

  // Expose Parallax
  window[NAME] = Parallax;

})(window, document);

/**
 * Request Animation Frame Polyfill.
 * @author Tino Zijdel
 * @author Paul Irish
 * @see https://gist.github.com/paulirish/1579671
 */
;(function() {

  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];

  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() { callback(currTime + timeToCall); },
        timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
  }

}());

var scene = document.getElementById('scene');
	var parallax = new Parallax(scene);

var rectangleEmitter = {
	/**
	 * The canvas object
	 */
	canvas: null,

	/**
	 * CanvasContext  The canvas context object
	 */
	context: null,

	/**
	 * Object The blast zone for particles.
	 */
	blastZone: {
		x: 0,
		y: 0,
		width: 840,
		height: 600
	},

	/**
	 * Particle The type of particle to create.
	 */
	particle: null,

	/**
	 * array The list of particles in the emitter.
	 */
	particles: [],

	/**
	 * The max number of particles.
	 */
	maxParticles: 900,

	/**
	 * The intervalID for the FPS interval
	 */
	fpsId: null,

	/**
	 * The interval ID for the seconds tick.
	 */
	tickId: null,

	/**
	 * Sets the canvas object.
	 *
	 * @param canvas DOMCanvasElement  The canvas to draw on.
	 */
	setCanvas: function(canvas){
		this.canvas = canvas;
		this.context = canvas.getContext('2d');
	},

	/**
	 * Sets the blast zone.
	 *
	 * @param x      int  The x coord
	 * @param y      int  The y-coor
	 * @param width  int  The width
	 * @param height int  The height
	 */
	setBlastZone: function(x, y, width, height){
		this.blastZone = {
			'x': x,
			'y': y,
			'width': width,
			'height': height
		};
	},

	/** Starts the emitter.
	 *
	 * @param	fps	The frame rate or 30 by default
	 */
	start:function(fps){
		var rate = fps || 30;
		this.fpsId = setInterval(this.frameUpdate, 1000/rate, this); // Framerate update
		this.tickId = setInterval(this.tick, 1000, this); // Every second tick...
	},

	/**
	 * Pauses the emitter but doesn't clear the screen.
	 */
	pause:function(){
		clearInterval(this.intervalId);
	},

	/**
	 * Stops the emitter and clears the screen.
	 */
	stop:function(){
		clearInterval(this.intervalId);
		this.clear();
	},

	/**
	 * Clears off the particles.
	 */
	clear:function(){
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},

	/**
	 * Adds a particle to the screen.
	 *
	 * @param	particle	The particle to add
	 */
	addParticle:function(particle){
		if (this.particles.length < this.maxParticles){
			var p = Object.create(particle);
			p.randomize(this.blastZone);

			// Add the particle
			this.particles.push(p);
		}
	},

	/**
	 * Draws the whole canvas.
	 */
	draw:function(){
		this.clear();

		var i = this.particles.length;
		while (i--){
			this.particles[i].draw(this.context);
		}
	},

	/**
	 * Updates the particles on the screen.
	 */
	update:function(){
		var p; 
		var i = this.particles.length;
		
		while(i--){
			p = this.particles[i];
			p.update();

			// Remove the particle if it is "dead"
			if (p.y > this.canvas.height){
				this.particles.splice(i, 1);
			}
		}
	},

	/**
	 * Applies actions to all of the particles.
	 */
	applyActions:function(){
		var i = this.particles.length;
		
		while(i--){
			this.particles[i].action();
		}
	},

	/**
	 * Run the action ahead the number of seconds (so the screen isn't blank on init).
	 *
	 * @param seconds int  The number of seconds to run ahead.
	 */
	runAhead: function(seconds){
		for (i = 0; i < seconds; i += 1){
			this.frameUpdate(this);
		}
	},

	/**
	 * The FPS update
	 *
	 * @param	self	The reference to the emitter that is lost during setInterval.
	 */
	frameUpdate:function(self){
		self.addParticle(self.particle);
		self.update();
		self.draw();
	},

	/**
	 * The seconds "tick" interval
	 *
	 * @param	self	The reference to the emitter that is lost during setInterval.
	 */
	tick:function(self){
		self.applyActions();
	}

};

var snow = {
	/**
	 * float  The current x position
	 */
	x: 0,

	/**
	 * float  The current y position
	 */
	y: 0,

	/**
	 * float  Alpha
	 */
	alpha: 0.5,

	/**
	 * float  The radius of the circle.
	 */
	radius: 3,

	/**
	 * Velocity for the particle.
	 */
	velocity: {
		x: 0,
		y: 5
	},

	/**
	 * Draws the particle onto the canvas in context.
	 *
	 * @param	c	 The canvas context to draw onto
	 */
	draw:function(c){
		c.fillStyle = 'rgba(255,255,255,'+this.alpha+')';
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
		c.fill();
	},

	/**
	 * Updates the particle.
	 */
	update:function(){
		this.x += this.velocity.x
		this.y += this.velocity.y;


	},

	/**
	 * Randomizes the settings for the particle
	 *
	 * @param	zone	The blastZone
	 */
	randomize:function(zone){
		var s = this.getLocation(zone);
		this.x = s.x;
		this.y = s.y;

		this.alpha = this.randomRange(0.3, 1);
		this.radius = this.randomRange(1, 5);

		this.velocity = {
			x: this.randomRange(-0.35, 0.35),
			y: this.randomRange(0.75, 1.5)
		}
	},

	/**
	 * Adds a random drift type motion to the particle.
	 * Taken from the Flint particle system....
	 */
	action:function(){
		this.velocity.x += (Math.random() - 0.8) * 0.3;
	},

	/**
	 * Take a low and high number and gets a random number between them.
	 *
	 * @param	low		The low number
	 * @param	high	The high number
	 * @return	Number
	 */
	randomRange:function(low, high){
		return (Math.random() * (high - low)) + low;
	},

	/**
	 * Gets a random starting point for the particle.
	 * Taken from the Flint particle system in AS3
	 *
	 * @param	zone	The zone to get a location from
	 * @return	Object
	 */
	getLocation:function(z){
		var p = {};
		p.x = z.x + Math.random() * z.width;
		p.y = z.y + Math.random() * z.height;
		return p;
	}
};

(function() {

	'use strict';

	var merrywrap = document.getElementById( 'merrywrap' ),
		box = merrywrap.querySelector( '.giftbox' ),
		step = 1, stepTimes = [1000,1000,2000,2000];

	function init() {
		box.addEventListener( 'click', runAnimation );
	}

	function runAnimation() {
		if( step === 1 ) {
			box.removeEventListener( 'click', runAnimation );
		}
		incStep( step );
		if( step === 4 ) {
			letitsnow();
			return;
		}
		if( step === 3 ) {
			setGridDelays();
		}
		setTimeout(function() { runAnimation(); }, stepTimes[ step - 1 ] );
		++step;
	}

	function incStep( step ) {
		classie.remove( merrywrap, 'step-' + Number( step - 1 ) );
		classie.add( merrywrap, 'step-' + step );
	}

	function setGridDelays() {
		[].slice.call( merrywrap.querySelectorAll( '.row' ) ).forEach( function( row, i ) {
			var itemsrow = [].slice.call( row.querySelectorAll( 'span' ) ),
				itemsrowCount = itemsrow.length,
				factor = (itemsrowCount - 1) * 0.01,
				delays = [ itemsrowCount - 1 ];

			for( var k = 0; k < itemsrowCount; ++k )
				delays[k] = k * 0.01 + ( ( itemsrowCount - 1 - i ) * factor );

			shuffle( itemsrow );

			itemsrow.forEach( function( item, j ) {
				var delay = delays[ j ];
				item.style.webkitTransition = '-webkit-transform 0.4s ease-out ' + delay + 's, opacity 0.4s ' + delay + 's';
				item.style.transition = 'transform 0.4s ease-out ' + delay + 's, opacity 0.4s ' + delay + 's';
			} );
		} )
	}

	function letitsnow() {
		var canvas = document.getElementById("snowfall");
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		// Now the emitter
		var emitter = Object.create(rectangleEmitter);
		emitter.setCanvas(canvas);
		emitter.setBlastZone(0, -10, canvas.width, 1);
		emitter.particle = snow;
		emitter.runAhead(0);
		emitter.start(60);
	}

	function shuffle( array ) {
		var currentIndex = array.length
		, temporaryValue
		, randomIndex
		;

		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	}

	init();

})();

( function( window ) {

'use strict';


function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}


var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};


if ( typeof define === 'function' && define.amd ) {

  define( classie );
} else {

  window.classie = classie;
}

})( window );