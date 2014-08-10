(function($) {


  $.fn.inlineConfirm = function(options) {

    var opts = $.extend({}, $.fn.inlineConfirm.defaults, options);

    return this.each(function() {
      var el = $(this);
      var confirming = false;
      var timeout = null;

      var originalText = el.text();

      if (this.tagName != 'BUTTON') {
        throw new Error('Must be a button element');
      }

      if (el.attr('type') != 'submit') {
        throw new Error('Must have type="submit"');
      }

      var showConfirm = function() {
        confirming = true;
        el.text(opts.text);
        if (opts.confirmClass) {
          el.addClass(opts.confirmClass);
        }
        timeout = setTimeout(function() {
          hideConfirm();
        }, opts.delay);
      };

      var hideConfirm = function() {
        confirming = false;
        el.text(originalText);
        el.removeClass(opts.confirmClass);
        clearTimeout(timeout);
      };

      el.on('click', function(e) {
        if (!confirming) {
          e.preventDefault();
          showConfirm();
        } else {
          hideConfirm();
        }
      });
    });
  };

  $.fn.inlineConfirm.defaults = {
    delay: 5000,
    text: 'Are you sure?',
    confirmClass: false
  };
})(jQuery);
