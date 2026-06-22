let addForm = document.getElementById("add-new-user-form"); // Lấy form Add User 
// console.log(addForm); 

let userCodeInput = document.getElementById("user-code"); // Nhập userCode
let usernameInput = document.getElementById("username"); // Nhập name
let emailInput = document.getElementById("email"); // Nhập email
let passwordInput = document.getElementById("password"); // Nhập password
let roleInput = document.getElementById("role"); // Ô chọn Quyền admin/user
let dobInput = document.getElementById("dob"); // Nhập ngày sinh
let descriptionInput = document.querySelector(".description-text-input"); // Ô nhập mô tả


let msg = document.getElementById("msg"); // Ô Thông báo to nhất

let addToast = document.getElementById("add-toast"); // Thêm toast thành công
let addError = document.getElementById("add-error"); // Thêm bị lỗi


// Lấy từng dòng lỗi trong HTML
let emptyError = document.querySelector(".email-username-password-empty"); // email, username, password trống
let emailExistError = document.querySelector(".email-exist"); // Email đã tồn tại
let emailFormatError = document.querySelector(".email-error"); // Email bị lỗi 
let passwordMinError = document.querySelector(".password-min-length-error"); // Mật khẩu không đủ độ dài
let passwordNumberError = document.querySelector(".password-number-required-error"); // mật khẩu phải gồm chữ và số
let passwordCaseError = document.querySelector(".password-uppercase-lowercase-error"); // mật khẩu phải có cả chữ thường và chữ hoa
let roleNotAdminError = document.querySelector(".role-not-admin"); // Không đủ quyền admin


let backBtn = document.querySelector(".back-btn"); // Nút back
let eyeOpen = document.querySelector(".fa-eye"); // Mắt hiển thị mật khẩu
let eyeClose = document.querySelector(".fa-eye-slash"); // Mắt ẩn mật khẩu

let users = JSON.parse(localStorage.getItem("users")) || [];

// Tạo user code tự động

function createUserCode() {
    
let number = users.length + 1;

if (number < 10) {
    return "U00" + number;
} else if (number < 100) {
    return "U0" + number;
} else {
    return "U" + number;
}
}

userCodeInput.value = createUserCode(); // Gán user code vào ô input bị disabled

// Ẩn toàn bộ thông báo
function hideAllErrors() {
msg.classList.remove("show");

addToast.classList.add("hidden");
addError.classList.add("hidden");

emptyError.classList.add("hidden");
emailExistError.classList.add("hidden");
emailFormatError.classList.add("hidden");
passwordMinError.classList.add("hidden");
passwordNumberError.classList.add("hidden");
passwordCaseError.classList.add("hidden");
roleNotAdminError.classList.add("hidden");
}

// Hiển thị một lỗi cụ thể
function showError(errorElement) {
msg.classList.add("show");
addError.classList.remove("hidden");
errorElement.classList.remove("hidden");
}

// Hiển thị thông báo thành công
function showSuccess() {
msg.classList.add("show");
addToast.classList.remove("hidden");
}

// Kiểm tra email đúng định dạng
function checkEmail(email) {
let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
return regex.test(email);
}

// Kiểm tra mật khẩu có số hay không
function hasNumber(password) {
return /\d/.test(password);
}

// Kiểm tra mật khẩu có cả chữ hoa và chữ thường
function hasUpperAndLower(password) {
let hasUpper = /[A-Z]/.test(password);
let hasLower = /[a-z]/.test(password);

return hasUpper && hasLower;
}

// Nút Back quay lại dashboard
backBtn.addEventListener("click", function (event) {
event.preventDefault();
window.location.href = "./dashboard.html";
});

// Ẩn / hiện mật khẩu
eyeClose.style.display = "none";

eyeOpen.addEventListener("click", function () {
passwordInput.type = "text";
eyeOpen.style.display = "none";
eyeClose.style.display = "inline";
});

eyeClose.addEventListener("click", function () {
passwordInput.type = "password";
eyeClose.style.display = "none";
eyeOpen.style.display = "inline";
});

// Xử lý khi submit form Add User
addForm.addEventListener("submit", function (event) {
event.preventDefault();

hideAllErrors();


let usercode = userCodeInput.value;
let username = usernameInput.value.trim();
let email = emailInput.value.trim();
let password = passwordInput.value.trim();
let role = roleInput.value;
let birthday = dobInput.value;
let description = descriptionInput.value.trim();

let statusInput = document.querySelector("input[name='status']:checked");
let status = statusInput.value;

// Email, username, password không được bỏ trống
if (username === "" || email === "" || password === "") {
    showError(emptyError);
    return;
}

// Email phải đúng định dạng
if (!checkEmail(email)) {
    showError(emailFormatError);
    return;
}
// Password tối thiểu 8 ký tự
if (password.length < 8) {
    showError(passwordMinError);
    return;
}

// Password phải có ít nhất 1 chữ số
if (!hasNumber(password)) {
    showError(passwordNumberError);
    return;
}

// Password phải có cả chữ hoa và chữ thường
if (!hasUpperAndLower(password)) {
    showError(passwordCaseError);
    return;
}

// Kiểm tra email đã tồn tại chưa
  
let emailExist = users.some(function (user) {
return user.email === email;
});
if (emailExist) {
    showError(emailExistError);
    return;
}

// Tạo object user mới
let newUser = {
    usercode: usercode,
    username: username,
    email: email,
    password: password,
    role: role,
    birthday: birthday,
    status: status,
    description: description
};

users.push(newUser); // Thêm user mới vào mảng users
localStorage.setItem("users", JSON.stringify(users)); // Lưu lại vào Local Storage
showSuccess();   // Hiển thị thông báo thành công
setTimeout(function () {
    window.location.href = "./dashboard.html";
  }, 1500);
});