export function checkPhone(rule, value, callback) {
    var isPhone = /^(0\d{2,3})-?(\d{7,8})$/;
    var isMob = /^((\+?86)|(\(\+86\)))?(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/;
    if (!value) {
        return callback(new Error("手机号码不能为空"));
    }
    if (!(isMob.test(value) || isPhone.test(value))) {
        callback(new Error("手机号码格式不正确"));
    } else {
        callback();
    }
};

export function checkId(rule, value, callback) {
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!value) {
        return callback(new Error("身份证不能为空"));
    }
    if (!(reg.test(value) || isPhone.test(value))) {
        callback(new Error("身份证格式不正确"));
    } else {
        callback();
    }
}

export function checkEmail(rule, value, callback) {
    var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (!value) {
        return callback(new Error("邮箱不能为空"));
    }
    if (!(reg.test(value) || isPhone.test(value))) {
        callback(new Error("邮箱格式不正确"));
    } else {
        callback();
    }
}


/**
 * 过滤特殊字符
 */
export function stripscript(s) {
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&% ;—|{}【】‘；：”“'。，、？]")
    var rs = "";
    for (var i = 0; i < s.length; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, '');
    }
    return rs;
}
/**
 * 验证用户名
 */
export function calidateUser(user) {
    let reg = /^([a-zA-Z-z0-9]){3,18}$/;
    return !reg.test(user) ? false : true
}
/********************
 * 验证手机号
 */
export function calidatePhone(user) {
    let reg = /^1[3-9][0-9]{9}$/;
    return !reg.test(user) ? false : true
}
/********************
 * 年龄
 */
export function calidateage(user) {
    let reg = /^[0-9]{1,2}$/;
    return !reg.test(user) ? false : true
}
/**
 * 验证密码
 */
export function calidatePassword(pass) {
    let reg = /^[a-zA-Z0-9]{6,18}$/
    return !reg.test(pass) ? false : true
}
/****
 * 验证邮箱
 */
export function calidateEmail(email) {
    let reg = /^([a-zA-Z]|[0-9])(\w)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    return !reg.test(email) ? false : true
}
//座机验证
export function landline(email) {
    let reg = /^\d{3,4}[-]\d{7,8}$/;
    return !reg.test(email) ? false : true
}
//分机验证
export function extension(email) {
    let reg = /^\d{4}$/;
    return !reg.test(email) ? false : true
}