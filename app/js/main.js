
$(function () {

   $('.objects__slider').slick({
      fade: true,
      autoplay: true,
      autoplaySpeed: 3000,
      arrows: false
   });


   $('.product__slide-small').slick({
      focusOnSelect: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      vertical: true,
      draggable: false,
      infinite: true,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 2200,
      centerMode: true,
      clickable: true,
      asNavFor: '.product__slide-big',
   });
   $('.product__slide-big').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: '.product__slide-small',
   });

   $('.product__video-slider').slick({
      dots: false,
   });

   $('.plan__slider').slick({
      arrows: true,
      infinite: true,
      dots: true,
      centerMode: true,
      variableWidth: true,
      slidesToShow: 1,
      prevArrow: '<button type="button" class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path style="fill: #166966" d="M224 480c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l169.4 169.4c12.5 12.5 12.5 32.75 0 45.25C240.4 476.9 232.2 480 224 480z"/></svg></button>',
      nextArrow: '<button type="button" class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path style="fill: #166966" d="M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z"/></svg></button>'
   });

});

function onEntry(entry) {
   entry.forEach(change => {
      if (change.isIntersecting) {
         change.target.classList.add('element-show');
      }
   });
}

let options = {
   threshold: [0.5]
};
let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll('.element-animation');

for (let elm of elements) {
   observer.observe(elm);
}

$(document).ready(function ($) {
   $('.footer__social-btn, .call__btn').click(function () {
      $('.form__bg').fadeIn();
      return false;
   });

   $('.btn-close').click(function () {
      $(this).parents('.form__bg').fadeOut();
      return false;
   });

   $(document).keydown(function (e) {
      if (e.keyCode === 27) {
         e.stopPropagation();
         $('.form__bg').fadeOut();
      }
   });

   $('.form__bg').click(function (e) {
      if ($(e.target).closest('.form__body').length == 0) {
         $(this).fadeOut();
      }
   });
});

function send(event, php) {
   console.log("Отправка запроса");
   event.preventDefault ? event.preventDefault() : event.returnValue = false;
   var req = new XMLHttpRequest();
   req.open('POST', php, true);
   req.onload = function () {
      if (req.status >= 200 && req.status < 400) {
         json = JSON.parse(this.response); // Ебанный internet explorer 11
         console.log(json);

         // ЗДЕСЬ УКАЗЫВАЕМ ДЕЙСТВИЯ В СЛУЧАЕ УСПЕХА ИЛИ НЕУДАЧИ
         if (json.result == "success") {
            // Если сообщение отправлено
            alert("Сообщение отправлено");
         } else {
            // Если произошла ошибка
            alert("Ошибка. Сообщение не отправлено");
         }
         // Если не удалось связаться с php файлом
      } else { alert("Ошибка сервера. Номер: " + req.status); }
   };

   // Если не удалось отправить запрос. Стоит блок на хостинге
   req.onerror = function () { alert("Ошибка отправки запроса"); };
   req.send(new FormData(event.target));
};



//  

