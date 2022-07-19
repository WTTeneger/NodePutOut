var f;
function sender(form, e) {
    f = form;
    data = {}
    let _t = 0
    // перебераем все инпуты и select
    form.find('input, select').each(function (i, el) {
        // console.log(el);

    })


    form.find('input, select').each(function (i, el) {
        console.log(el);
        if ($(el).attr('type') != 'submit' && $(el).attr('type') != 'button') {
            data[$(el).attr('name')] = $(el).val();
            if ($(el).attr('required') && $(el).val() == '') {
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
                let _url = data.url ? data.url : '/app';
                window.location.href = _url;
            }
            if (data.code == 0003) {
                let _url = data.url ? data.url : '/app';
                window.location.href = _url;
            }
            if (data.code == 0004) {
                window.location.href = window.location.href;
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
            try {
                alert(_data.message)
            } catch (e) {
                alert('Ошибка при отправке данных');
            }
        }

    });
}