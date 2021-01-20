window.TurboAnimate = window.TurboAnimate || new function() {
  this.options = {};
  this.inline = false;
  this.element = null;
  this.elements = null;
  this.disappearing = false;
  this.initialized = false;
  this.animations = [
    {name: 'fadeIn', disappear: 'fadeOut', reverse: null},
    {name: 'fadeOut', disappear: true, reverse: null},
    {name: 'fadeInUp', disappear: 'fadeOutUp', reverse: 'fadeInDown'},
    {name: 'fadeOutUp', disappear: true, reverse: 'fadeOutDown'},
    {name: 'fadeInDown', disappear: 'fadeOutDown', reverse: 'fadeInUp'},
    {name: 'fadeOutDown', disappear: true, reverse: 'fadeOutUp'},
    {name: 'fadeInLeft', disappear: 'fadeOutLeft', reverse: 'fadeInRight'},
    {name: 'fadeOutLeft', disappear: true, reverse: 'fadeOutRight'},
    {name: 'fadeInRight', disappear: 'fadeOutRight', reverse: 'fadeInLeft'},
    {name: 'fadeOutRight', disappear: true, reverse: 'fadeOutLeft'},
    {name: 'fadeInUpBig', disappear: 'fadeOutUpBig', reverse: 'fadeInDownBig'},
    {name: 'fadeOutUpBig', disappear: true, reverse: 'fadeOutDownBig'},
    {name: 'fadeInDownBig', disappear: 'fadeOutDownBig', reverse: 'fadeInUpBig'},
    {name: 'fadeOutDownBig', disappear: true, reverse: 'fadeOutUpBig'},
    {name: 'fadeInLeftBig', disappear: 'fadeOutLeftBig', reverse: 'fadeInRightBig'},
    {name: 'fadeOutLeftBig', disappear: true, reverse: 'fadeOutRightBig'},
    {name: 'fadeInRightBig', disappear: 'fadeOutRightBig', reverse: 'fadeInLeftBig'},
    {name: 'fadeOutRightBig', disappear: true, reverse: 'fadeOutLeftBig'},
    {name: 'bounceIn', disappear: 'bounceOut', reverse: null},
    {name: 'bounceOut', disappear: true, reverse: null},
    {name: 'bounceInUp', disappear: 'bounceOutUp', reverse: 'bounceInDown'},
    {name: 'bounceOutUp', disappear: true, reverse: 'bounceOutDown'},
    {name: 'bounceInDown', disappear: 'bounceOutDown', reverse: 'bounceInUp'},
    {name: 'bounceOutDown', disappear: true, reverse: 'bounceOutUp'},
    {name: 'bounceInLeft', disappear: 'bounceOutLeft', reverse: 'bounceInRight'},
    {name: 'bounceOutLeft', disappear: true, reverse: 'bounceOutRight'},
    {name: 'bounceInRight', disappear: 'bounceOutRight', reverse: 'bounceInLeft'},
    {name: 'bounceOutRight', disappear: true, reverse: 'bounceOutLeft'},
    {name: 'flipInX', disappear: 'flipOutX', reverse: 'flipInY'},
    {name: 'flipOutX', disappear: true, reverse: 'flipOutY'},
    {name: 'flipInY', disappear: 'flipOutY', reverse: 'flipInX'},
    {name: 'flipOutY', disappear: true, reverse: 'flipOutX'},
    {name: 'lightSpeedIn', disappear: 'lightSpeedOut', reverse: null},
    {name: 'lightSpeedOut', disappear: true, reverse: null},
    {name: 'rotateIn', disappear: 'rotateOut', reverse: null},
    {name: 'rotateOut', disappear: true, reverse: null},
    {name: 'rotateInDownLeft', disappear: 'rotateOutDownLeft', reverse: 'rotateInUpRight'},
    {name: 'rotateOutDownLeft', disappear: true, reverse: 'rotateOutUpRight'},
    {name: 'rotateInDownRight', disappear: 'rotateOutDownRight', reverse: 'rotateInUpLeft'},
    {name: 'rotateOutDownRight', disappear: true, reverse: 'rotateOutUpLeft'},
    {name: 'rotateInUpLeft', disappear: 'rotateOutUpLeft', reverse: 'rotateInDownRight'},
    {name: 'rotateOutUpLeft', disappear: true, reverse: 'rotateOutDownRight'},
    {name: 'rotateInUpRight', disappear: 'rotateOutUpRight', reverse: 'rotateInDownLeft'},
    {name: 'rotateOutUpRight', disappear: true, reverse: 'rotateOutDownLeft'},
    {name: 'rollIn', disappear: 'rollOut', reverse: null},
    {name: 'rollOut', disappear: true, reverse: null},
    {name: 'zoomIn', disappear: 'zoomOut', reverse: null},
    {name: 'zoomOut', disappear: true, reverse: null},
    {name: 'zoomInUp', disappear: 'zoomOutUp', reverse: 'zoomInDown'},
    {name: 'zoomOutUp', disappear: true, reverse: 'zoomOutDown'},
    {name: 'zoomInDown', disappear: 'zoomOutDown', reverse: 'zoomInUp'},
    {name: 'zoomOutDown', disappear: true, reverse: 'zoomOutUp'},
    {name: 'zoomInLeft', disappear: 'zoomOutLeft', reverse: 'zoomInRight'},
    {name: 'zoomOutLeft', disappear: true, reverse: 'zoomOutRight'},
    {name: 'zoomInRight', disappear: 'zoomOutRight', reverse: 'zoomInLeft'},
    {name: 'zoomOutRight', disappear: true, reverse: 'zoomOutLeft'},
    {name: 'slideInUp', disappear: 'slideOutUp', reverse: 'slideInDown'},
    {name: 'slideOutUp', disappear: true, reverse: 'slideOutDown'},
    {name: 'slideInDown', disappear: 'slideOutDown', reverse: 'slideInUp'},
    {name: 'slideOutDown', disappear: true, reverse: 'slideOutUp'},
    {name: 'slideInLeft', disappear: 'slideOutLeft', reverse: 'slideInRight'},
    {name: 'slideOutLeft', disappear: true, reverse: 'slideOutRight'},
    {name: 'slideInRight', disappear: 'slideOutRight', reverse: 'slideInLeft'},
    {name: 'slideOutRight', disappear: true, reverse: 'slideOutLeft'}
  ];
  let array = [];
  this.animations.forEach((animation) => array.push(animation.name));
  this.animateClasses = array;

  this.init = (options) => {
    let defaults = {
      element: document.querySelector('body'),
      animation: 'fadein',
      duration: '0.3s',
      delay: false,
      reversedDisappearing: false,
      breakpoints: [
        {name: 'mobile', width: 500},
        {name: 'tablet', width: 1024},
        {name: 'desktop', width: 1440}
      ],
      customListeners: false
    };
    options = extend({}, defaults, options);

    TurboAnimate.element = options.element;
    TurboAnimate.setOptions(options);
    if ('scrollRestoration' in history)
      history.scrollRestoration = 'manual';

    if (TurboAnimate.initialized == false && options.customListeners == false) {
      document.addEventListener('turbo:request-start', () => {
        TurboAnimate.disappear();
      });
      window.addEventListener('popstate', () => {
        TurboAnimate.disappear();
      });
      let ignoreBeforeunload = false;
      document.querySelectorAll('a[href^=mailto]').forEach((element) => element.addEventListener('click', () => ignoreBeforeunload = true));
      window.addEventListener('beforeunload', () => {
        if (!ignoreBeforeunload)
          TurboAnimate.disappear();
        ignoreBeforeunload = false;
      });
      document.addEventListener('turbo:before-render', (event) => {
        TurboAnimate.prepareTransition(event.data.newBody);
      });
      document.addEventListener('turbo:render', () => {
        TurboAnimate.transition();
      });
    }

    document.querySelectorAll('a, button').forEach((element) => {
      element.addEventListener('click', () => {
        if (typeof element.dataset.turboAnimateAnimation !== 'undefined')
          TurboAnimate.inline = true;
        TurboAnimate.options.animation = element.dataset.turboAnimateAnimation || options.animation;
        TurboAnimate.options.appear = element.dataset.turboAnimateAppear;
        TurboAnimate.options.duration = element.dataset.turboAnimateDuration || options.duration;
        TurboAnimate.options.delay = element.dataset.turboAnimateDelay || options.delay;
        TurboAnimate.options.type = element.dataset.turboAnimateType;
      });
    });

    TurboAnimate.initialized = true;
    if (options.customListeners == false)
      TurboAnimate.appear();
  };

  this.setOptions = (options) => {
    let previousType = TurboAnimate.options.type,
      appear = TurboAnimate.options.appear;

    TurboAnimate.options = {
      animation: options.animation,
      duration: options.duration,
      delay: options.delay,
      reversedDisappearing: options.reversedDisappearing,
      breakpoints: options.breakpoints,
      previousType: previousType,
      appear: appear
    };
  };

  this.prepareTransition = (newBody) => {
    document.querySelectorAll('[data-turbo-animate-transition]').forEach((element) => {
      let properties = element.dataset.turboAnimateTransition.split(','),
        matchingElements = newBody.querySelectorAll(element.tagName + '[data-turbo-animate-transition]'),
        newElement = null;

      if (matchingElements.length == 1) {
        newElement = matchingElements[0];
      } else if (matchingElements.length > 1) {
        newElement = newBody.querySelector('#' + element.id);
      } else {
        return;
      }

      properties.forEach((property) => {
        newElement.style[cssPropertyToCamelCase(property)] = getComputedStyle(element).getPropertyValue(property);
      });
    });
  };
  
  this.transition = () => {
    document.querySelectorAll('[data-turbo-animate-transition]').forEach((element) => {
      setTimeout(() => {
        let properties = element.dataset.turboAnimateTransition.split(',');
        properties.forEach((property) => {
          element.style[cssPropertyToCamelCase(property)] = null;
        });
      }, 1);
    });
  };

  this.appear = () => {
    TurboAnimate.disappearing = false;
    TurboAnimate.toggle();
  };
  this.disappear = () => {
    TurboAnimate.disappearing = true;
    TurboAnimate.toggle();
  };
  this.toggle = () => {
    if (TurboAnimate.options.animation != 'false') {
      TurboAnimate.resetClasses();
      TurboAnimate.getElements();
      TurboAnimate.useOptions();
      Turbo.clearCache();
      TurboAnimate.animate();
      TurboAnimate.reset();
    }
  };

  this.getElements = () => {
    TurboAnimate.elements = [];

    function getChildren(parent) {
      let type = TurboAnimate.options.type || TurboAnimate.options.previousType || 'true';
      if (parent.dataset.turboAnimatePersist == type) {
        return;
      } else if (parent.dataset.turboAnimatePersistItself == type || parent.querySelectorAll('[data-turbo-animate-persist]').length > 0 || parent.querySelectorAll('[data-turbo-animate-persist-itself]').length > 0) {
        let children = parent.children;
        for (let i = 0; i < children.length; i++) {
          getChildren(children[i]);
        }
      } else {
        TurboAnimate.elements.push(parent);
      }
    }

    getChildren(TurboAnimate.element);
  };
  this.useOptions = () => {
    if (TurboAnimate.elements != null) {
      TurboAnimate.elements.forEach((element) => {
        element.style.animationDuration = TurboAnimate.options.duration;
        if (TurboAnimate.options.delay != false)
          element.style.animationDelay = TurboAnimate.options.delay;
      });
    }
  };

  this.reset = () => {
    delete TurboAnimate.options.appear;
    delete TurboAnimate.options.previousType;
    TurboAnimate.inline = false;
  };
  this.resetClasses = () => {
    if (TurboAnimate.elements != null) {
      TurboAnimate.elements.forEach((element) => {
        TurboAnimate.animateClasses.forEach((animation) => element.classList.remove(animation));
      });
    }
  };

  this.animate = () => {
    let animation = TurboAnimate.getAnimation();

    TurboAnimate.element.addEventListener('webkitAnimationEnd mozAnimationEnd oAnimationEnd oanimationend animationend', (event) => {
      if (event.currentTarget.dataset.triggered)
        return;
      event.currentTarget.dataset.triggered = true;

      dispatchEvent('turbo:animation-end', {detail: {element: TurboAnimate.element, disappearing: TurboAnimate.disappearing}});
    });

    dispatchEvent('turbo:animation-start', {detail: {element: TurboAnimate.element, disappearing: TurboAnimate.disappearing, animation: animation}});

    TurboAnimate.elements.forEach((element) => {
      element.addEventListener('webkitAnimationEnd mozAnimationEnd oAnimationEnd oanimationend animationend', () => {
        if (event.currentTarget.dataset.triggered)
          return;
        event.currentTarget.dataset.triggered = true;
        setTimeout(() => {
          if (TurboAnimate.disappearing == false)
            TurboAnimate.resetClasses();
        }, 250);
      });
      TurboAnimate.getClassListFor(animation).forEach((animation) => element.classList.add(animation));
    });
  };
  this.getAnimation = () => {
    let animation;

    if (!TurboAnimate.disappearing)
      animation = TurboAnimate.options.appear;
    if (TurboAnimate.inline) {
      animation = TurboAnimate.options.animation;
    } else if (typeof TurboAnimate.element.dataset.turboAnimateAnimation !== 'undefined') {
      animation = TurboAnimate.element.dataset.turboAnimateAnimation;
    } else {
      animation = TurboAnimate.options.animation;
    }

    return animation;
  };
  this.getClassListFor = (animations) => {
    let classList = ['animated'],
      browserWidth = window.innerWidth,
      animation = null;

    let breakpoints = TurboAnimate.options.breakpoints.sort((a, b) => {
      return b.width - a.width;
    });
    breakpoints.forEach((k, breakpoint) => {
      if (animation == null && browserWidth <= breakpoint.width)
        animation = animations[breakpoint.name.toString];
    });
    if (animation == null)
      animation = animations;

    animation = TurboAnimate.animations.filter(object => object.name.toLowerCase() == animation.toLowerCase())[0];
    if (TurboAnimate.disappearing) {
      if (animation.disappear != true)
        animation = TurboAnimate.animations.filter(object => object.name.toLowerCase() == animation.disappear.toLowerCase())[0];
      if (TurboAnimate.options.reversedDisappearing && animation.reverse != null) {
        classList.push(animation.reverse);
      } else {
        classList.push(animation.name);
      }
    } else {
      classList.push(animation.name);
    }

    return classList;
  };
};


function dispatchEvent(name, options = {}) {
  let event = new Event(name, options);
  document.dispatchEvent(event);
}

function extend() {
  for (let i = 1; i < arguments.length; i++)
    for (let key in arguments[i])
      if (arguments[i].hasOwnProperty(key))
        arguments[0][key] = arguments[i][key];
  return arguments[0];
}

function cssPropertyToCamelCase(property) {
  return property.replace(/-([a-z])/gi, (s, group1) => group1.toUpperCase());
}

window.TurbolinksAnimate = window.TurboAnimate;