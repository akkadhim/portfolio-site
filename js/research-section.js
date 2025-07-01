$(document).ready(function () {
  var cardsContainer = $('.js-cards');
  cardsContainer.on('click', '.js-toggle-modal', function(event) {
    var cardItem = $(event.currentTarget);
    var button = cardItem.find('button[type=button]');
    var cardContent = cardItem.find('.js-card-content'),
        cardModal = cardItem.find('.js-card-modal-content');

    button.toggleClass('c-card__button-field--is-active');
    // Only open as modal on desktop view
    if (window.matchMedia('(min-width: 1200px)').matches) {
      cardItem.toggleClass('c-card__item--modal');
    }
    cardContent.toggleClass('u-fade-out');
    cardModal.toggleClass('u-fade-in');
  });
});
