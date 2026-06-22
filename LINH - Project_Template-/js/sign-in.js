
let form = document.getElementById("sign-in-form");
form.onsubmit = validateForm;

function validateForm() {
// Lấy dữ liệu từ người dùng 
let emailInput = document.getElementById("email").value;
let passwordInput = document.getElementById("password").value;

// Gán biến các thông báo khi người dùng thao tác
let msg = document.getElementById("msg"); // Vadidate thông báo
let loginValidation = document.getElementById("login-validation"); // Hộp thông báo lỗi
let loginToast = document.getElementById("login-toast"); // Đăng nhập thành công
let loginError = document.getElementById("login-error"); // Đăng nhập lỗi

let emailBlank = document.querySelector(".email-cannot-blank"); // email không được bỏ trống
let passwordBlank = document.querySelector(".password-cannot-blank"); // mật khẩu không được bỏ trống



// Ẩn thông báo để tránh hiện thị 1 lần khi kiểm tra
msg.classList.remove("show");

loginValidation.classList.add("hidden");
loginToast.classList.add("hidden");
loginError.classList.add("hidden");

emailBlank.classList.add("hidden");
passwordBlank.classList.add("hidden");


// Email không được để trống
if (emailInput == "") {
    msg.classList.add("show");
    loginValidation.classList.remove("hidden");
    emailBlank.classList.remove("hidden");
    return false;
}

// Password không được để trống
 if (passwordInput == "") {

    msg.classList.add("show");
    loginValidation.classList.remove("hidden");
    passwordBlank.classList.remove("hidden");
    return false;
}
// Lấy danh sách user từ localStorage
 
let userList = JSON.parse(localStorage.getItem("users")) || [];

// Kiểm tra tài khoản tồn tại hay không

let checkLogin = false;

for (let i = 0; i < userList.length; i++) {
    if (
    userList[i].email === emailInput && userList[i].password === passwordInput) {
    checkLogin = true;
    break;
    }
}

// Sai email hoặc password
if (checkLogin == false) {

    msg.classList.add("show");
    loginError.classList.remove("hidden");
    return false;
}
// Đăng nhập thành công
   msg.classList.add("show");
   loginToast.classList.remove("hidden");
   setTimeout(function () {
    window.location.href = "./dashboard.html";
    }, 1500);
    return false;
}
