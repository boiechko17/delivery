$(document).ready(function() {

    //Секція Ціни для кнопки - Докладнішк
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

    //Параметри для слайдеру
    $(function () {
        $('.carousel').carousel({
          interval: false,
          keyboard: false,
        });
    });

    //Модальні вікна
    $('[data-modal=call]').on('click', function(){
		$('.overlay, #call').fadeIn('slow');
    });
    $('.modalw__close').on('click', function(){
        $('.overlay, #call, #order, #thanks').fadeOut('slow');
        $('.feed-form').each(function(){
            $(this).find('.rfield').each(function(){
                $(this).removeAttr('style');
            }); 
            this.reset();
        })
    });

    // Функція перевіряє чи були введені дані в форму
    function checkForms(Form){
        $(Form).each(function(){

            var form = $(this);
            var btn = form.find('.submit');
    
            form.find('.rfield').addClass('empty_field');
            
            function checkInput(){
                form.find('.rfield').each( function(){
    
                    if($(this).val() != ''){
                        $(this).removeClass('empty_field');
                        $(this).removeAttr('style');
                    } else {
                        $(this).addClass('empty_field');
                    }
                });
            }
            function lightEmpty() {
                form.find('.empty_field').css({'border':'1.5px #d8512d solid'});
            }

            setInterval(function(){
    
                checkInput();
                var size = form.find('.empty_field').length;
    
                if(size > 0){
                    if(btn.hasClass('disabled')){
                        return false;
                    } else {
                        btn.addClass('disabled');
                    }
                } else {
                    btn.removeClass('disabled');
                }
    
            }, 500);
            
            btn.on('click', function(){
                if($(this).hasClass('disabled')) {
                    lightEmpty();
                    return false;
                } else {
                    if(form.hasClass('feed-form_modal')){
                        $('#call').fadeOut('slow');
                    }
                    $('.overlay, #thanks').fadeIn('slow');
                    return false; 
                }
            });
        });
    }

    //Викликаємо функцію для всіх форм
    checkForms('.feed-form_consultation', '.consultation__button');
    checkForms('.feed-form_questions', '.button_questions');
    checkForms('.feed-form_modal', '.button_call');
    

    //показувати pageup коли проксролив до 1600px
    $(window).scroll(function(){
		if ($(this).scrollTop() > 1600) {
			$('.pageup').fadeIn();
		} else {
			$('.pageup').fadeOut();
		}
	});
    
    // плавний скролінг для локальних посилань
    function scroll(event){
        $(event).click(function(){

            const _href = $(this).attr("href");
            $("html, body").animate({scrollTop: $(_href).offset().top}, 1300);
            return false;
        });
    }

    let mashref = ["a[href='#up']","a[href='#advantages']","a[href='#work']",                   
    "a[href='#prices']", "a[href='#scheme']", "a[href='#feedback']", "a[href='#map']"];

    for(var i = 0; i < mashref.length; i++){
        scroll(mashref[i]);
    }
    
});