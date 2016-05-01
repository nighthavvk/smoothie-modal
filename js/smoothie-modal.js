(function($){
  var smoothieModal = {
    currentScrollTop: 0,
    wrapperTop: 0,
    $modalWrapper: $('.js-modal-wrapper'),
    $mainContainer: $(window),
    $openTrigger: $('.js-modal-open'),
    $closeTrigger: $('.js-modal-close'),
    getScrollTop: function () {
      return this.$mainContainer.scrollTop();
    },
    getItems: function (trigger) {
      var mData = $(trigger).data('modal');
      var modalItems = {
        modalWindow: $('.js-modal-window[data-modal="'+ mData +'"]'),
        modalOverlay: $('.js-modal-overlay[data-modal="'+ mData +'"]')
      };
      return modalItems;
    },
    getNumOfOpenModals: function () {
      return parseInt($('.js-modal-window.smoothie-modal-open').length);
    },
    setModalIndex: function (modalWindow, modalOverlay) {
      var index = this.getNumOfOpenModals();
      var currIndex = parseInt(modalWindow.css('z-index'));
      modalWindow.css('z-index', currIndex * index);
      modalOverlay.css('z-index', currIndex * index - 10);
    },
    isAnyModalOpen: function () {
      if (this.getNumOfOpenModals() === 0) {
        return false;
      } else {
        return true;
      }
    },
    isModalOutOfBounds: function (modalWindow) {
      if (modalWindow.outerHeight() > this.$mainContainer.outerHeight()) {
        return true;
      } else {
        return false;
      }
    },
    open: function (modalWindow, modalOverlay) {
      if (!this.isAnyModalOpen()) {
        currentScrollTop = this.getScrollTop();
        wrapperTop = $('.js-modal-wrapper').css('top');
      }
      modalWindow.addClass('smoothie-modal-open');
      modalOverlay.addClass('smoothie-modal-open');
      this.setModalIndex(modalWindow, modalOverlay);
      this.$modalWrapper.addClass('smoothie-modal-fixed');
      this.$modalWrapper.css('top', -currentScrollTop);
      this.$mainContainer.scrollTop(0);
    },
    close: function (modalWindow, modalOverlay) {
      modalWindow.removeClass('smoothie-modal-open');
      modalOverlay.removeClass('smoothie-modal-open');
      if (!this.isAnyModalOpen()) {
        this.$modalWrapper.removeClass('smoothie-modal-fixed');
        this.$modalWrapper.css('top', wrapperTop);
        this.$mainContainer.scrollTop(currentScrollTop);
      }
    }
  };

  smoothieModal.$openTrigger.click(function(){
    modalItems = smoothieModal.getItems(this);
    smoothieModal.open(modalItems.modalWindow, modalItems.modalOverlay);
  });

  smoothieModal.$closeTrigger.click(function(){
    modalItems = smoothieModal.getItems(this);
    smoothieModal.close(modalItems.modalWindow, modalItems.modalOverlay);
  });
})(jQuery);
