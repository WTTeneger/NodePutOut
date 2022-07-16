$(document).click(function (e) {
    // e.preventDefault();



    // Если есть атрибут to-url переадрисовывать на это значение
    if ($(e.target).attr('to-url')) {
        window.location.href = $(e.target).attr('to-url');
    }
    if ($(e.target).attr('to-url-back')) {
        window.history.back();
    }
    if ($(e.target).attr('type') == 'submit') {
        sender($(e.target).closest('form'), e);
    }

    // если у таркета есть стиль button-box
    if ($(e.target).hasClass('button-box')) {

        // Дать стиль button-active 
        $(e.target).addClass('button-active');
    }
    // если нажатие не по блоку с классом button-box
    if (!$(e.target).hasClass('button-box')) {
        // Удалить стиль button-active у всех блоков с классом button-box
        $('.button-box').removeClass('button-active');
    }
});

