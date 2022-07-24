// функция после загрузки страницы

$(document).ready(function () {
    console.log($('#sd_' + _page));
    $('#sd_' + _page).addClass('active');
});

function set_photo(el) {
    var input = el;
    if (input.files && input.files[0]) {
        if (input.files[0].type.match('image.*')) {
            var reader = new FileReader();
            reader.onload = function (e) {
                // console.log(e.target.result) 
                document.getElementsByName('image')[0].data = e.target.result;
                // console.log(input.f);
                $('#imgs').attr('src', e.target.result);
            }
            let as = reader.readAsDataURL(input.files[0]);
        } else {
            console.log('ошибка, не изображение');
        }
    } else {
        console.log('хьюстон у нас проблема');
    }
};

$('#reset-img-preview').click(function () {
    $('#img').val('');
    $('#img-preview').attr('src', '<?=SITE_TEMPLATE_PATH;?>/images/no_img.jpg');
});