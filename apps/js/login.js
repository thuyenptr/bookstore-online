function validateForm() {
    let username = $('#username').val();
    let password = $('#password').val();
    let error = $('#error_login');
    if (!username) {
        error.text('Username không đúng định dạng');
        return false;
    }
    else if (!password) {
        error.text('Password không đúng định dạng');
        return false;
    }
    return {username, password};
}

$('#form_submit').submit(function (event) {
    let obj = validateForm();
    try {
        $.post('http://localhost:1001/Login',
            JSON.stringify(obj),
            (data) => {
                if (data) {
                    var xmlObj = JSON.parse(data);
                    let position = xmlObj.account.position;

                    //Tạo sessionStorage
                    sessionStorage.setItem('session', xmlObj.session);
                    sessionStorage.setItem('name', xmlObj.account.name);
                    
                    //check
                    if (position === 'admin')
                        location.href = '/admin.html';
                    else if (position === 'nhanvien')
                        location.href = '/nhanvien.html';
                    return true;
                }
                else {
                    alert('Tài khoản mật khẩu không hợp lệ');
                    return false;
                }
            },
            'text'
        );
    }
    catch (err) {
        console.log(err);
        return false;
    }
});

$('#btn_logout').click(() => {
    let session = sessionStorage.getItem('session');
    try {
        $.post('http://localhost:1001/Logout',
            session,
            (data) => {
                sessionStorage.removeItem('session');
                sessionStorage.removeItem('name');
                location.href = '/index.html';
            },
            'text'
        )
    }
    catch (err) {
        console.log(err);
    }
})
