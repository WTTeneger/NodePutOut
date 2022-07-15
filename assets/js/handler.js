$(document).click(function (e) {
    // e.preventDefault();
    // console.log('click');
    // console.log(sender);

    // Если есть атрибут to-url переадрисовывать на это значение
    if ($(e.target).attr('to-url')) {
        window.location.href = $(e.target).attr('to-url');
    }
    if ($(e.target).attr('to-url-back')) {
        window.history.back();
    }
    if ($(e.target).attr('type') == 'submit') {
        console.log('submit');
        console.log(sender($(e.target).closest('form'), e));
    }


});
