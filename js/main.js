// var currentScrollTop = 0;
// var modalWrapper = $('.js-modal-wrapper');
// var mainContainer = $(window);
//
// var getScrollTop = function () {
//   return mainContainer.scrollTop();
// };
//
// var getItems = function (trigger) {
//   var mData = $(trigger).data('modal');
//   var modalItems = {
//     modalWindow: $('.js-modal-window[data-modal="'+ mData +'"]'),
//     modalOverlay: $('.js-modal-overlay[data-modal="'+ mData +'"]')
//   };
//   return modalItems;
// };
//
// var getNumOfOpenModals = function () {
//   return parseInt($('.js-modal-window.open').length);
// };
//
// var setModalIndex = function (modalWindow, modalOverlay) {
//   var index = getNumOfOpenModals();
//   var currIndex = parseInt(modalWindow.css('z-index'));
//   modalWindow.css('z-index', currIndex * index);
//   modalOverlay.css('z-index', currIndex * index - 10);
// };
//
// var isAnyModalOpen = function () {
//   if (getNumOfOpenModals() === 0) {
//     return false;
//   } else {
//     return true;
//   }
// };
//
// var modalOpen = function (modalWindow, modalOverlay) {
//   if (!isAnyModalOpen()) {
//     currentScrollTop = getScrollTop();
//   }
//   modalWindow.addClass('open');
//   modalOverlay.addClass('open');
//   setModalIndex(modalWindow, modalOverlay);
//   modalWrapper.addClass('fixed');
//   mainContainer.scrollTop(0);
// };
//
// var modalClose = function (modalWindow, modalOverlay) {
//   modalWindow.removeClass('open');
//   modalOverlay.removeClass('open');
//   modalWrapper.removeClass('fixed');
//   if (!isAnyModalOpen()) {
//     mainContainer.scrollTop(currentScrollTop);
//   }
// };
//
// $('.js-modal-open').click(function() {
//   modalItems = getItems(this);
//   modalOpen(modalItems.modalWindow, modalItems.modalOverlay);
// });
//
// $('.js-modal-close').click(function() {
//   modalItems = getItems(this);
//   modalClose(modalItems.modalWindow, modalItems.modalOverlay);
// });

var modal = {
  currentScrollTop: 0,
  modalWrapper: $('.js-modal-wrapper'),
  mainContainer: $(window),
  openTrigger: $('.js-modal-open'),
  closeTrigger: $('.js-modal-close'),
  getScrollTop: function () {
    return this.mainContainer.scrollTop();
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
    return parseInt($('.js-modal-window.open').length);
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
  open: function (modalWindow, modalOverlay) {
    if (!this.isAnyModalOpen()) {
      currentScrollTop = this.getScrollTop();
    }
    modalWindow.addClass('open');
    modalOverlay.addClass('open');
    this.setModalIndex(modalWindow, modalOverlay);
    this.modalWrapper.addClass('fixed');
    this.mainContainer.scrollTop(0);
  },
  close: function (modalWindow, modalOverlay) {
    modalWindow.removeClass('open');
    modalOverlay.removeClass('open');
    this.modalWrapper.removeClass('fixed');
    if (!this.isAnyModalOpen()) {
      this.mainContainer.scrollTop(currentScrollTop);
    }
  }
};

$(modal.openTrigger).click(function(){
  modalItems = modal.getItems(this);
  modal.open(modalItems.modalWindow, modalItems.modalOverlay);
});

$(modal.closeTrigger).click(function(){
  modalItems = modal.getItems(this);
  modal.close(modalItems.modalWindow, modalItems.modalOverlay);
});
