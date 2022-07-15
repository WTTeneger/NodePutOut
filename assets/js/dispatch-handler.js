var f;
function sender(form, e) {
    f = form;
    data = {}
    let _t = 0
    // перебераем все инпуты у которых type inpкоторые есть в форме
    form.find('input').each(function (index, element) {
        console.log(element);
        if ($(element).attr('type') != 'submit' && $(element).attr('type') != 'button') {

            data[$(element).attr('name')] = $(element).val();
            if ($(element).attr('required') && $(element).val() == '') {
                _t = 1;
            }
        }
    });
    if (_t) {
        return false;
    }
    e.preventDefault();

    $.ajax({
        url: form.attr('action'),
        type: form.attr('method'),
        headers: {
            "Content-Type": "application/json",
            'authorization': localStorage.getItem('token'),
        },
        data: JSON.stringify(data),
        success: function (data) {
            console.log(data);
            if (data.code == 0001) {
                localStorage['refreshToken'] = data.data.refreshToken;
            }
            if (data.code == 0002) {
                localStorage['refreshToken'] = data.data.refreshToken;
                // redicrect to login
                window.location.href = '/app';
            }
            if (data.status == 'success') {
                window.location.href = data.url;
            } else {
                alert(data.message);
            }
        }

        // если пришел плохой ответ
        , error: function (data) {
            let _data = data.responseJSON
            console.log(_data);
            // alert(_data.message)
        }

    });
}