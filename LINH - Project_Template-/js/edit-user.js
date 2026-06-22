let editForm = document.getElementById("edit-user-form"); // form Edit User

let userCodeInput = document.getElementById("user-code"); // User code
let usernameInput = document.getElementById("username"); // Username
let emailInput = document.getElementById("email");  // Email
let passwordInput = document.getElementById("password"); // Password
let roleInput = document.getElementById("role"); // Role admin/user
let dobInput = document.getElementById("dob"); // Birthday
let descriptionInput = document.querySelector(".description-text-input"); // Description

let backBtn = document.querySelector(".back-btn"); // Nút Back

let msg = document.getElementById("msg"); // Khung thông báo lớn

let editToast = document.getElementById("edit-toast");  // toast sửa thành công
let editError = document.getElementById("edit-error");  // khung lỗi

// Lấy từng dòng lỗi
let emptyError = document.querySelector(".username-and-password-empty");
let passwordMinError = document.querySelector(".password-min-length-error");
let passwordNumberError = document.querySelector(".password-number-required-error");
let passwordCaseError = document.querySelector(".password-uppercase-lowercase-error");
 
// Lấy icon mắt hiện / ẩn mật khẩu
let eyeOpen = document.querySelector(".fa-eye");
let eyeClose = document.querySelector(".fa-eye-slash"); 

// Lấy danh sách users từ Local Storage
let users = JSON.parse(localStorage.getItem("users")) || [];
let editUserIndex = localStorage.getItem("editUserIndex"); // Lấy vị trí user cần sửa từ Local Storage

// Nếu không có user cần sửa thì quay lại dashboard
if (editUserIndex === null) {
  window.location.href = "./dashboard.html";
}

let userEdit = users[editUserIndex]; // Lấy user cần sửa

// Hiển thị thông tin user cũ lên form
userCodeInput.value = userEdit.usercode || userEdit.userCode || "";
usernameInput.value = userEdit.username || "";
emailInput.value = userEdit.email || "";
passwordInput.value = userEdit.password || "";
roleInput.value = userEdit.role || "user";
dobInput.value = userEdit.birthday || "";
descriptionInput.value = userEdit.description || "";

// Hiển thị đúng trạng thái Active / Deactive
if (userEdit.status === "Deactive") {document.getElementById("status-deactive").checked = true;
} else {document.getElementById("status-active").checked = true;
}

// Ẩn toàn bộ thông báo
function hideAllMessages() {
msg.classList.remove("show");

editToast.classList.add("hidden");
editError.classList.add("hidden");

emptyError.classList.add("hidden");
passwordMinError.classList.add("hidden");
passwordNumberError.classList.add("hidden");
passwordCaseError.classList.add("hidden");
}

// Hiển thị lỗi cụ thể
function showError(errorElement) {
msg.classList.add("show");
editError.classList.remove("hidden");
errorElement.classList.remove("hidden");
}

// Hiển thị thông báo thành công
function showSuccess() {
msg.classList.add("show");
editToast.classList.remove("hidden");
}

// Kiểm tra mật khẩu có số hay không
function hasNumber(password) {
return /\d/.test(password);
}

// Kiểm tra mật khẩu có cả chữ hoa và chữ thường không
function hasUpperAndLower(password) {
    
let hasUpper = /[A-Z]/.test(password);
let hasLower = /[a-z]/.test(password);

return hasUpper && hasLower;
}

// Back về dashboard
backBtn.addEventListener("click", function () {
window.location.href = "./dashboard.html";
});


// Hiện / ẩn mật khẩu
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

// Save thông tin user
editForm.addEventListener("submit", function (event) {
event.preventDefault();

hideAllMessages();


let username = usernameInput.value.trim();
let password = passwordInput.value.trim();
let role = roleInput.value;
let birthday = dobInput.value;
let description = descriptionInput.value.trim();

let statusInput = document.querySelector("input[name='status']:checked");
let status = statusInput.value;

  // Validate username và password không được để trống
if (username === "" || password === "") {
    showError(emptyError);
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

//Cập nhật lại thông tin user
users[editUserIndex] = {
usercode: userCodeInput.value,
username: username,
email: emailInput.value,
password: password,
role: role,
birthday: birthday,
status: status,
description: description
};

localStorage.setItem("users", JSON.stringify(users));
showSuccess(); // Hiển thị thông báo thành công

setTimeout(function () {
    window.location.href = "./dashboard.html";
}, 1500);
});