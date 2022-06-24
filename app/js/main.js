
$(function () {

   $('.objects__slider').slick({
      fade: true,
      autoplay:true,
      autoplaySpeed: 3000,
      arrows:false
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

$(document).ready(function($) {
	$('.footer__social-btn, .call__btn').click(function() {
		$('.form__bg').fadeIn();
		return false;
	});	
	
	$('.btn-close').click(function() {
		$(this).parents('.form__bg').fadeOut();
		return false;
	});		
 
	$(document).keydown(function(e) {
		if (e.keyCode === 27) {
			e.stopPropagation();
			$('.form__bg').fadeOut();
		}
	});
	
	$('.form__bg').click(function(e) {
		if ($(e.target).closest('.form__body').length == 0) {
			$(this).fadeOut();					
		}
	});
});
 function send(event, php){
       console.log("Отправка запроса");
       event.preventDefault ? event.preventDefault() : event.returnValue = false;
       var req = new XMLHttpRequest();
       req.open('POST', php, true);
       req.onload = function() {
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
           } else {alert("Ошибка сервера. Номер: "+req.status);}}; 
       
       // Если не удалось отправить запрос. Стоит блок на хостинге
       req.onerror = function() {alert("Ошибка отправки запроса");};
       req.send(new FormData(event.target));
 }
 
