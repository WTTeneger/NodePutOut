export function generate_header(req, _header) {
    _header.site = _header.site ? _header.site : 'XCOMPANY';
    _header.page = _header.page ? _header.page : '';
    if (req.user) {
        req.user.balance = req.user.balance.toFixed(2);
    }

    let data = {
        user: req.user,
        settings: {
            token: 'TRTS'
        }
    }
    var res = Object.assign({}, _header, data);

    return res;
}

export default generate_header;