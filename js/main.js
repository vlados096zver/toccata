 $(window).on('load', function() {
   window.setTimeout(function() {
     $('body').addClass('loaded');
   }, 1000);
 })

 $(document).ready(function() {

   let initialYOffset = window.pageYOffset;
   let parallaxContainers = document.querySelectorAll('.parallax');

   window.addEventListener('scroll', function(event) {
     if (window.pageYOffset > initialYOffset) { // При скролле вниз

       parallaxContainers.forEach(function(item) {
         let currentBackgroundPos = item.style.backgroundPositionY;

         if (currentBackgroundPos) {
           if (parseInt(currentBackgroundPos) > -50) {
             item.style.backgroundPositionY = (parseInt(currentBackgroundPos) - 2) + 'px';
           }
         } else {
           item.style.backgroundPositionY = '0px';
         }
       });

     } else { // При скролле вверх

       parallaxContainers.forEach(function(item) {
         let currentBackgroundPos = item.style.backgroundPositionY;

         if (parseInt(currentBackgroundPos) != 0) {
           item.style.backgroundPositionY = (parseInt(currentBackgroundPos) + 2) + 'px';
         }
       });
     }

     initialYOffset = window.pageYOffset;
   });


   $('.mobile-wrap').on('click', function() {
     $('.line-burger').toggleClass('line-active');
     $('.main-header__list').slideToggle();
   });

   $(window).resize(function() {
     if ($(window).width() >= 840) {
       $('.main-header__list').attr('style', '');
       $('.line-burger').removeClass('line-active');
     }
     winWidth = $(window).width();
   });

   if (window.Swiper) {
     let swiper = new Swiper(".rules__wrap", {
       loop: true,
       navigation: {
         nextEl: ".swiper-button-next",
         prevEl: ".swiper-button-prev",
       },
       pagination: {
         clickable: true,
         el: ".swiper-pagination",
       },
       allowTouchMove: true,
     });
   }

   $('#c_name, #c_email, #c_msg').on('focus', function() {
     $(this).next().addClass('contacts__label--active');
   });

   $('#c_name, #c_email, #c_msg').on('blur', function() {
     if ($(this).val() == '') {
       $(this).next().removeClass('contacts__label--active');
     }
   });

   $('.main-footer__btn').on('click', function() {
     $('html, body').animate({
       scrollTop: 0
     }, '300');
     return false;
   });

   (function() {

     // Используется, чтобы различные обработчики не конфликтовали,
     // а именно: при клике по табам, - где у нас автопрокрутка, -
     // блокируем обработчик прокрутки на window и mouseover и mouseout на табах
     var stop = false

     // Действительный активный таб
     var active = $('.main-header__link.main-header__link--active')
     var $fixedMenu = $('.main-header')
     var $sections = $('.elem');
     var $intersection = $(".js-intersection");

     // Плавная прокрутка
     $('.main-header__link').on('click', function(e) {
       e.preventDefault();

       var This = $(this)
       var link = This.attr('href');
       var heightMenu = $fixedMenu.height();
       var target = $(link);

       // ссылка - это якорь и target есть на странице
       if (link.indexOf('#') === 0 && target.length !== 0) {
         stop = true

         $('.main-header__link.main-header__link--active').removeClass('main-header__link--active');
         This.addClass('main-header__link--active');

         $('html, body').animate({
           scrollTop: target.offset().top - heightMenu
         }, 1000, function() {
           if ($(window).width() <= 960) {
             $('.line-burger').removeClass('line-active');
             $('.main-header__list').slideUp();
           };

           active = This
           stop = false
         });
       }
     });

     function update() {
       if (stop) return

       var headerHeight = $fixedMenu.height()
       $sections.each(function(i, el) {
         var el = $(el)
         var top = el.offset().top - headerHeight - $(window).height() * .3;
         var bottom = top + el.height();
         var scroll = $(window).scrollTop();
         var id = el.attr('id');

         if (scroll > top) {
           changeActiveLink(id)
         } else if (scroll < 10) {
           // шапка слишком низкая, чтобы определиться, поэтому делаем это принудительно
           changeActiveLink("top")
         }
       })
     }

     function changeActiveLink(id) {
       $('.main-header__link.main-header__link--active').removeClass('main-header__link--active');
       // держим переменную с текущим табом актуальной
       active = $('.main-header__link[href="#' + id + '"]')
       active.addClass('main-header__link--active');
     }

     function fixContrastBg() {

       if ($intersection.offset().top < $(window).scrollTop()) {
         $fixedMenu.addClass("contrast-bg");

       } else {
         $fixedMenu.removeClass("contrast-bg");
       }
     }

     update()
     fixContrastBg()
     $(window).scroll(function() {
       update()
       fixContrastBg()
     });

   })()

   var regName = /^[a-zA-Zа-яА-ЯёЁIi]+/;
   var regPhone = /[_]/i;

   function validate(input, length, regExp, error, phone) {

     $(input).on('blur keyup', function() {
       var value = $(this).val();
       var that = $(this);

       regExp = regExp == '' ? /./ : regExp;

       if (phone === true) {
         bool_reg = !regExp.test(value);
       } else {
         bool_reg = regExp.test(value);
       }

       if (value.length > length && value !== '' && bool_reg) {
         that.removeClass('form-fail').addClass('form-done');
         $(error).slideUp();
       } else {
         that.removeClass('form-done').addClass('form-fail');
         $(error).slideDown();
       }
     });

   }

   // РґРµР°РєС†РёРІР°С†РёСЏ РєРЅРѕРїРєРё РµСЃР»Рё РµСЃС‚СЊ РїРѕР»Рµ СЃ РѕС€РёР±РєРѕР№

   function disBtn(input, btn, bool) {
     var input = $(input);
     input.on('blur keyup', function() {

       if (input.hasClass('form-fail') || bool == true) {
         $(btn).attr('disabled', 'disabled');
       } else {
         $(btn).removeAttr('disabled');
       }

     });

   }

   // РґР»СЏ РїСЂРѕРІРµСЂРєРё РїСЂРё РЅР°Р¶Р°С‚РёРё

   function valClick(input, length, regExp, error, phone) {
     var value = $(input).val();

     regExp = regExp == '' ? /./ : regExp;

     if (phone === true) {
       bool_reg = regExp.test(value);
     } else {
       bool_reg = !regExp.test(value);
     }

     if (value.length < length || value === '' || bool_reg) {
       $(input).addClass('form-fail');
       $(error).slideDown();
     }
   }

   //  РґРµР°РєС†РёРІР°С†РёСЏ РєРЅРѕРїРєРё РїСЂРё РЅР°Р¶Р°С‚РёРё

   function disBtnClick(input, btn) {
     var input = $(input);

     if (input.hasClass('form-fail')) {
       $(btn).attr('disabled', 'disabled');
       return false;
     } else {
       return true;
     }

   }

   var name = $('#c_name').val();
   var msg = $('#c_email').val();
   var regEmail = /[-.\w]+@[-.\w]+\.[-.\w]+/i;

   $('#btn--contacts').on('click', function() {
     sendForm();
   });

   function sendForm() {


     valClick('#c_name', 1, regName, '.contacts__error--name');
     valClick('#c_email', 1, regEmail, '.contacts__error--email');
     disBtnClick('#c_name, #c_email', '#btn--contacts');
     return false;
   }

   validate('#c_name', 1, regName, '.contacts__error--name');
   validate('#c_email', 1, regEmail, '.contacts__error--email');
   disBtn('#c_name, #c_msg', '#btn--contacts');



   $('.map__wrap').on('click', function() {
     $('.map__block').slideToggle(200);
     $('.map__wrap').toggleClass('map__wrap--active');
   })

   function loading(entries, observer) {
     const $this = $(entries[0].target);
     const $value = $this.find('.facts__counter');
     const value = $this.find('.facts__counter').data('progress-value');
     if (entries[0].isIntersecting) {
       $({
         value: 1
       }).animate({
         value,
       }, {
         duration: 1000,
         step: function load_animate(val) {
           $value.text(`${val.toFixed(0).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1")} `);
         },
         complete: function() {
           observer.disconnect();
         }
       });
     }
   }

   var options = {
     rootMargin: '0px',
     threshold: .2
   }

   function animateBlock(entries, observer) {
     for (let i = 0; i < entries.length; i++) {
       const $this = $(entries[i].target);
       if (entries[i].isIntersecting) {
         $('.container-anim', $this).addClass('animate');
         elemObserver.unobserve(entries[i].target);
       }
     }
   }

   let elem = $('.item');
   var elemObserver = new IntersectionObserver(animateBlock, options);
   elem.each((i, e) => elemObserver.observe(e));

   $('.facts__item').each(function() {
     var sectionObserver = new IntersectionObserver(loading, options);
     sectionObserver.observe(this);
   })



 });