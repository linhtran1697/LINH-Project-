// Lưu dữ liệu lên localStorage
let userList = JSON.parse(localStorage.getItem('users')) || []; 

// Tắt thông báo lỗi 
let closeBtn = document.querySelector(".fa-circle-xmark");

closeBtn.addEventListener("click", function () {
  document.getElementById("msg").classList.remove("show");
});

// Hiện/ ẩn mật khẩu
let passwordInput = document.getElementById("password"); // Nhập vào input
let eye = document.querySelector(".fa-eye"); // Hiện mật khẩu
let eyeSlash = document.querySelector(".fa-eye-slash"); // Ẩn mật khẩu

eye.addEventListener("click", () => {
  passwordInput.type = "text";
  eye.style.display = "none";
  eyeSlash.style.display = "block";
});

eyeSlash.addEventListener("click", () => {
  passwordInput.type = "password";
  eye.style.display = "block";
  eyeSlash.style.display = "none";
});

// Vadidate 

let form = document.getElementById("sign-up-form");
form.onsubmit = validateForm;

function validateForm() {
  // alert("Hàm validate đang chạy");

// Khai báo biến

  let emailInput = document.getElementById("email").value;
  let usernameInput = document.getElementById("username").value;
  let passwordInput = document.getElementById("password").value;
  let msg = document.getElementById("msg"); // Hiện bảng thông báo validation
  let validationHeader = document.querySelector('.sign-up-validation-header'); //Phần đầu của hộp Tb lỗi gồm ( dấu gạch đỏ, Error, x)
  

//  Gán các biến khi đăng nhập chứa lỗi rỗng
  let signupValidate = document.getElementById('sign-up-validation'); // Chứa Error và các phần báo rỗng
  let emailBlank = document.querySelector('.email-cannot-blank'); //Báo mail trống
  let usernameBlank = document.querySelector('.username-cannot-blank'); //Báo username trống
  let passwordBlank = document.querySelector('.password-cannot-blank'); //Báo pass trống

// Gán các biến khi đăng nhập sai ( mật khẩu thiếu, sai định dạng)
let signupError = document.getElementById("sign-up-error"); // Bảng hiện thị báo lỗi sai
let emailErrorformat  = document.querySelector(".email-error"); // Email bị sai định dạng
let passwordminLengtherror = document.querySelector(".password-min-length-error"); // Mật khẩu tối thiểu 8 ký tự
let passwordNonumbererror = document.querySelector(".password-number-required-error"); // Mật khẩu phải bao gồm cả chữ số
let passwordUpperLowererror = document.querySelector(".password-uppercase-lowercase-error"); // Mật khẩu có cả chữ thường và chữ hoa
let signupToast = document.getElementById("sign-up-toast");




// Ẩn các thông báo để chỉ hiện thị đúng 1 lỗi người dùng sai.
signupValidate.classList.add("hidden");
msg.classList.remove("show");
emailBlank.classList.add("hidden");
usernameBlank.classList.add("hidden");
passwordBlank.classList.add("hidden");

signupError.classList.add("hidden");
emailErrorformat.classList.add("hidden");

passwordminLengtherror.classList.add("hidden");
passwordNonumbererror.classList.add("hidden");
passwordUpperLowererror.classList.add("hidden");

signupToast.classList.add("hidden");




// Email không được để trống 
  if (emailInput == "") {
    msg.classList.add("show");
    signupValidate.classList.remove("hidden");
    emailBlank.classList.remove("hidden");
    return false;
}
// Tên người dùng không được để trống
  if (usernameInput == "") {
    msg.classList.add("show");
    signupValidate.classList.remove("hidden");
    usernameBlank.classList.remove("hidden");
    return false;
}
// Mật khẩu không được để trống
  if (passwordInput == "") {
    msg.classList.add("show");
    signupValidate.classList.remove("hidden");
    passwordBlank.classList.remove("hidden");
    return false;
}
// Mật khẩu có độ dài <8 

  if (passwordInput.length < 8) {
    msg.classList.add("show");
    signupError.classList.remove("hidden");
    passwordminLengtherror.classList.remove("hidden");
  return false;
}

// Email không đúng định dạng 
 let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(emailInput)) {

   msg.classList.add("show");
   signupValidate.classList.remove("hidden");
   emailErrorformat.classList.remove("hidden");
  return false;
}

// Mật khẩu phải có chứa ký tự chữ và số => Nếu không có số là sai 
let RegexNumber = /[0-9]/;
  if (!RegexNumber.test(passwordInput)) {
    msg.classList.add("show");
    signupError.classList.remove("hidden");
    passwordNonumbererror.classList.remove("hidden");
   return false;
  }

// Mật khẩu phải có chữ hoa hoặc chữ thường
    let RegexUppercase = /[A-Z]/;
    let RegexLowercase = /[a-z]/;
  if (!RegexUppercase.test(passwordInput) ||!RegexLowercase.test(passwordInput)) {
    msg.classList.add("show");
    signupError.classList.remove("hidden");
    passwordUpperLowererror.classList.remove("hidden");
    return false; 
  }


// Kiểm tra email còn tồn tại ko
let emailExit = document.querySelector(".email-exist");
emailExit.classList.add("hidden");

for(let i = 0; i < userList.length; i++){

    if(userList[i].email === emailInput){

    msg.classList.add("show");
    signupError.classList.remove("hidden");
    emailExit.classList.remove("hidden");
    return false;
    }
}
// Đăng ký thành công sẽ chuyển hướng về trang đăng nhập và thông báo
//Lấy dữ liệu tài khoản từ localStorage


let newUser = { 
  usercode: "U00" + (userList.length + 1),
  username: usernameInput,
  email: emailInput,
  password: passwordInput,
  role: 'admin',
  birthday: '1997-07-05',
  status: 'Deactive',
  description:
  'National again month truth. Actually civil table put nearly base.',
  };
userList.push(newUser);
localStorage.setItem('users', JSON.stringify(userList));
console.log ("đăng ký thành công");
// Thông báo đăng ký thành công
msg.classList.add("show");
signupToast.classList.remove('hidden'); 

setTimeout(function () {
    window.location.href = "./sign-in.html";
  }, 1500);
  return false;
};

