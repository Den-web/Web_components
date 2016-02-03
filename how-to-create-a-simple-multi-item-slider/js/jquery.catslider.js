;( function( $, window, undefined ) {

	'use strict';

	$.CatSlider = function( options, element ) {
		this.$el = $( element );
		this._init( options );
	};

	$.CatSlider.prototype = {

		_init : function( options ) {

			// Категории (ul)
			this.$categories = this.$el.children( 'ul' );
			// Навигация
			this.$navcategories = this.$el.find( 'nav > a' );
			var animEndEventNames = {
				'WebkitAnimation' : 'webkitAnimationEnd',
				'OAnimation' : 'oAnimationEnd',
				'msAnimation' : 'MSAnimationEnd',
				'animation' : 'animationend'
			};
			// Название анимации и события
			this.animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ];
			// Поддержка анимаций и событий
			this.support = Modernizr.csstransforms && Modernizr.cssanimations;
			// Если анимация проводится
			this.isAnimating = false;
			// Текущая категория
			this.current = 0;
			var $currcat = this.$categories.eq( 0 );
			if( !this.support ) {
				this.$categories.hide();
				$currcat.show();
			}
			else {
				$currcat.addClass( 'mi-current' );
			}
			// Текущая категория навигации
			this.$navcategories.eq( 0 ).addClass( 'mi-selected' );
			// Инициализация событий
			this._initEvents();

		},
		_initEvents : function() {

			var self = this;
			this.$navcategories.on( 'click.catslider', function() {
				self.showCategory( $( this ).index() );
				return false;
			} );

			// Сброс при измении размеров окна
			$( window ).on( 'resize', function() {
				self.$categories.removeClass().eq( 0 ).addClass( 'mi-current' );
				self.$navcategories.eq( self.current ).removeClass( 'mi-selected' ).end().eq( 0 ).addClass( 'mi-selected' );
				self.current = 0;
			} );

		},
		showCategory : function( catidx ) {

			if( catidx === this.current || this.isAnimating ) {
				return false;
			}
			this.isAnimating = true;
			// Обновляем выбранную навигацию
			this.$navcategories.eq( this.current ).removeClass( 'mi-selected' ).end().eq( catidx ).addClass( 'mi-selected' );

			var dir = catidx > this.current ? 'right' : 'left',
				toClass = dir === 'right' ? 'mi-moveToLeft' : 'mi-moveToRight',
				fromClass = dir === 'right' ? 'mi-moveFromRight' : 'mi-moveFromLeft',
				// Текущая категория
				$currcat = this.$categories.eq( this.current ),
				// Новая категория
				$newcat = this.$categories.eq( catidx ),
				$newcatchild = $newcat.children(),
				lastEnter = dir === 'right' ? $newcatchild.length - 1 : 0,
				self = this;

			if( this.support ) {

				$currcat.removeClass().addClass( toClass );
				
				setTimeout( function() {

					$newcat.removeClass().addClass( fromClass );
					$newcatchild.eq( lastEnter ).on( self.animEndEventName, function() {

						$( this ).off( self.animEndEventName );
						$newcat.addClass( 'mi-current' );
						self.current = catidx;
						var $this = $( this );
						// Решение для ошибки в Chrome 
						self.forceRedraw( $this.get(0) );
						self.isAnimating = false;

					} );

				}, $newcatchild.length * 90 );

			}
			else {

				$currcat.hide();
				$newcat.show();
				this.current = catidx;
				this.isAnimating = false;

			}

		},
		// На основании http://stackoverflow.com/a/8840703/989439
		forceRedraw : function(element) {
			if (!element) { return; }
			var n = document.createTextNode(' '),
				position = element.style.position;
			element.appendChild(n);
			element.style.position = 'relative';
			setTimeout(function(){
				element.style.position = position;
				n.parentNode.removeChild(n);
			}, 25);
		}

	}

	$.fn.catslider = function( options ) {
		var instance = $.data( this, 'catslider' );
		if ( typeof options === 'string' ) {
			var args = Array.prototype.slice.call( arguments, 1 );
			this.each(function() {
				instance[ options ].apply( instance, args );
			});
		}
		else {
			this.each(function() {
				instance ? instance._init() : instance = $.data( this, 'catslider', new $.CatSlider( options, this ) );
			});
		}
		return instance;
	};

} )( jQuery, window );