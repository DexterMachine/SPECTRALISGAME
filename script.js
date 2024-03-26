const cursor = document.querySelector(".custom-cursor");
const cards = document.querySelector(".cards");
const images = document.querySelectorAll(".card__img");
const backgrounds = document.querySelectorAll(".card__bg");
const range = 40;

const calcValue = (a, b) => (a / b * range - range / 2).toFixed(1);

let timeout;

document.addEventListener("mousemove", (event) => {
  if (timeout) {
    window.cancelAnimationFrame(timeout);
  }

  timeout = window.requestAnimationFrame(() => {
    const yValue = calcValue(event.y, window.innerHeight);
    const xValue = calcValue(event.x, window.innerWidth);

    // Actualizar las transformaciones de las tarjetas
    cards.style.transform = `rotateX(${yValue}deg) rotateY(${xValue}deg)`;
    [].forEach.call(images, (image) => {
      image.style.transform = `translateX(${-xValue}px) translateY(${yValue}px)`;
    });
    [].forEach.call(backgrounds, (background) => {
      background.style.backgroundPosition = `${xValue * 0.45}px ${-yValue * 0.45}px`;
    });

    // Actualizar la posición del cursor
    cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
  });
});




const DOMReady = ((
  callback  = () => {},
  element   = document,
  listener  = 'addEventListener'
) => {
  return (element[listener]) ? element[listener]('DOMContentLoaded', callback) : window.attachEvent('onload', callback);
});

/**
 *  @function   ProjectAPI
 *
 *  @type {{hasClass, addClass, removeClass}}
 */
const ProjectAPI = (() => {
  let hasClass,
      addClass,
      removeClass;

  hasClass = ((el, className) => {
    if (el === null) {
      return;
    }

    if (el.classList) {
      return el.classList.contains(className);
    }
    else {
      return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
    }
  });

  addClass = ((el, className) => {
    if (el === null) {
      return;
    }

    if (el.classList) {
      el.classList.add(className);
    }
    else if (!hasClass(el, className)) {
      el.className += ' ' + className
    }
  });

  removeClass = ((el, className) => {
    if (el === null) {
      return;
    }

    if (el.classList) {
      el.classList.remove(className);
    }
    else if (hasClass(el, className)) {
      let reg = new RegExp('(\\s|^)' + className + '(\\s|$)');

      el.className = el.className.replace(reg, ' ');
    }
  });

  return {
    hasClass:     hasClass,
    addClass:     addClass,
    removeClass:  removeClass
  };
})();


/*********************
 *    Application Code
 ********************/
/**
 *  @function   readyFunction
 *
 *  @type {Function}
 */
const readyFunction = (() => {

  const KEY_UP    = 38;
  const KEY_DOWN  = 40;

  let scrollingClass          = 'js-scrolling',
      scrollingActiveClass    = scrollingClass + '--active',
      scrollingInactiveClass  = scrollingClass + '--inactive',

      scrollingTime           = 1350,
      scrollingIsActive       = false,

      currentPage             = 1,
      countOfPages            = document.querySelectorAll('.' + scrollingClass + '__page').length,

      prefixPage              = '.' + scrollingClass + '__page-',

      _switchPages,
      _scrollingUp,
      _scrollingDown,

      _mouseWheelEvent,
      _keyDownEvent,

      init;

  /**
   *  @function _switchPages
   *
   *  @private
   */
  _switchPages = () => {

    let _getPageDomEl;

      /**
     *  @function _getPageDomEl
     *
     *  @param page
     *  @returns {Element}
     *  @private
       */
    _getPageDomEl      = (page = currentPage) => {
      return document.querySelector(prefixPage + page);
    };

    scrollingIsActive  = true;


    ProjectAPI.removeClass(
      _getPageDomEl(),
      scrollingInactiveClass
    );
    ProjectAPI.addClass(
      _getPageDomEl(),
      scrollingActiveClass
    );

    ProjectAPI.addClass(
      _getPageDomEl(currentPage - 1),
      scrollingInactiveClass
    );

    ProjectAPI.removeClass(
      _getPageDomEl(currentPage + 1),
      scrollingActiveClass
    );


    setTimeout(
      () => {
        return scrollingIsActive = false;
      },
      scrollingTime
    );
  };
    /**
   *  @function _scrollingUp
   *
   *  @private
   */
  _scrollingUp = () => {
    if (currentPage === 1) {
      return;
    }

    currentPage--;

    _switchPages();
  };
    /**
   *  @function _scrollingDown
   *
   *  @private
   */
  _scrollingDown = () => {
    if (currentPage === countOfPages) {
      return;
    }

    currentPage++;

    _switchPages();
  };
    /**
   *  @function _mouseWheelEvent
   *
   *  @param e
   *  @private
   */
  _mouseWheelEvent = (e) => {
    if (scrollingIsActive) {
      return;
    }

    if (e.wheelDelta > 0 || e.detail < 0) {
      _scrollingUp();
    }
    else if (e.wheelDelta < 0 || e.detail > 0) {
      _scrollingDown();
    }
  };
    /**
   *  @function _keyDownEvent
   *
   *  @param e
   *  @private
   */
  _keyDownEvent = (e) => {
    if (scrollingIsActive) {
      return;
    }

    let keyCode = e.keyCode || e.which;

    if (keyCode === KEY_UP) {
      _scrollingUp();
    }
    else if (keyCode === KEY_DOWN) {
      _scrollingDown();
    }
  };

  /**
   *  @function init
   *
   *  @note     auto-launch
   */
  init = (() => {
    document.addEventListener(
      'mousewheel',
      _mouseWheelEvent,
      false
    );
    document.addEventListener(
      'DOMMouseScroll',
      _mouseWheelEvent,
      false
    );

    document.addEventListener(
      'keydown',
      _keyDownEvent,
      false
    );
  })();

});





// Smooth scroll function
function smoothScroll(target, duration) {
  var targetElement = document.querySelector(target);
  var targetPosition = targetElement.offsetTop;
  var startPosition = window.pageYOffset;
  var distance = targetPosition - startPosition;
  var startTime = null;
  

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    var timeElapsed = currentTime - startTime;
    var run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

// Smooth scroll on anchor click with adjustable duration
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    var target = this.getAttribute('href');
    var duration = 2000; // Adjust duration here (in milliseconds)
    smoothScroll(target, duration);
  });
});

  /**
 *  Launcher
 */
DOMReady(readyFunction);

document.querySelector('#contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  e.target.elements.name.value = '';
  e.target.elements.email.value = '';
  e.target.elements.message.value = '';
});



if (window.innerWidth <= 412) {
  document.querySelectorAll(".holograma").forEach(function(element) {
    element.style.display = "none";
  });
}