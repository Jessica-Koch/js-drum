    function debounce(func, wait = 20, immediate = true) {
      var timeout;
      return function() {
        var context = this, args = arguments;
        var later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    }

    const sliderImages = document.querySelectorAll('.slide-in');

    function checkSlide(e){
        sliderImages.forEach(sliderImage => {
            // scroll in halfway through the image
            const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 2;

            // pixel level of how far from teh top the bottom of the image actually is 
            const imageBottom = sliderImage.offsetTop + sliderImage.height;

            const isHalfShown = slideInAt > sliderImage.offsetTop;
            const isNotScrolledPast = window.scrollY < imageBottom;

            // if it is half shown on page and is not scrolled past
            if (isHalfShown && isNotScrolledPast) {
                sliderImage.classList.add('active');
            } else {
                sliderImage.classList.remove('active');
            }
        })
    }

    window.addEventListener('scroll', debounce(checkSlide));