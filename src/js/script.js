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
    
    $('.carousel').carousel({
        interval: false,
        keyboard: false,
        pause: false
    });
    
    //Модальні вікна
    $('[data-modal=call]').on('click', function(){
		$('.overlay, #call').fadeIn('slow');
    });

    $('[data-modal=order]').on('click', function(){
		$('.overlay, #order').fadeIn('slow');
    });

    //Коли закриваємо будь-яке модальне вікно
    $('.modalw__close').on('click', function(){
        $('.overlay, #call, #order, #thanks').fadeOut('slow');
        $('.feed-form').each(function(){
            $(this).find('.rfield').each(function(){
                $(this).removeAttr('style');
            }); 
            this.reset();
        })
        $('#result').fadeOut('fast');
        $('.feed-form_order').removeAttr("style","min-height:400px;");
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
                    // Рахуємо та виводимо вартість доставки
                    if(form.hasClass('feed-form_order')){
                        var kg = document.getElementById('kilo').value;
                        var metr = document.getElementById('metres').value;
                        var multi = 200;
                        if(kg >= 10) {
                            multi *= 1.05;
                        }
                        if (metr >= 15) {
                            multi *= 1.05;
                        }
                        var result = kg * metr * multi;
                        
                        document.getElementById('res').innerHTML = result;
                        
                        if(!window.matchMedia("(max-width: 575px)").matches){
                            form.attr("style","min-height:400px;");
                        } else {
                            form.attr("style","min-height:350px;");
                        }
                        $('#result').fadeIn('slow');
                        return false;
                    }
                    $('.overlay, #thanks').fadeIn('slow');
                    return false; 
                }
            });
        });
    }

    //Викликаємо функцію для всіх форм
    checkForms('.feed-form_consultation');
    checkForms('.feed-form_questions');
    checkForms('.feed-form_modal');
    checkForms('.feed-form_order');
    

    //показувати pageup коли проксролив до 1600px та тільки на широких екранах
    if(!window.matchMedia("(max-width: 991px)").matches){
        $(window).scroll(function(){
            if ($(this).scrollTop() > 1600) {
                $('.pageup').fadeIn();
            } else {
                $('.pageup').fadeOut();
            }
        });
    }
    
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

    // Маска вводу для телефона
    $('input[name=phone]').inputmask("+38 (099) 999-99-99");

    // Маска вводу для електронної пошти
    $("input[name=email]").inputmask({
        mask: "*{1,20}[*{1,20}][*{1,20}][*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]",
        greedy: false,
        onBeforePaste: function (pastedValue) {
            pastedValue = pastedValue.toLowerCase();
            return pastedValue.replace("mailto:", "");
        },
        definitions: {
            '*': {
                validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~\-]",
                cardinality: 1,
                casing: "lower"
            }
        }
    });

    // Маска вводу для міста
    $("input[name=from]").inputmask("м. [*{1,20}][*{1,20}]");
    $("input[name=where]").inputmask("м. [*{1,20}][*{1,20}]");

    new WOW().init();

});

// зручне меню для мобільних пристроїв
window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.header__list'),
    menuItem = document.querySelectorAll('.header__list_item'),
    hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('header__list_active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('header__list_active');
        })
    })
})