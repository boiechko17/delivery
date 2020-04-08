$(document).ready(function() {

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.prices-item__content').eq(i).toggleClass('prices-item__content_active');
                $('.prices-item__another').eq(i).toggleClass('prices-item__another_active');
            });
        });
    };

    toggleSlide('.button_prices');
    toggleSlide('.prices-item__back');

});