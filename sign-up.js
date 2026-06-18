let form = document.getElementById("sign-up-form");
form.onsubmit = validateForm;

function validateForm() {
  let email = document.getElementById("email").value;
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
// Email không được để trống 
  if (email == "") {
    alert("Email không được bỏ trống");
    return false;
  }
// Tên người dùng không được để trống
  if (username == "") {
    alert("Tên người dùng không được bỏ trống");
    return false;
  }
  
// Mật khẩu không được để trống
  if (password == "") {
    alert("Mật khẩu không được bỏ trống");
    return false;
  }
  // Mật khẩu có độ dài <8 
  if (password.length < 8) {
  alert("Mật khẩu tối thiểu 8 ký tự");
  return false;
  }
  // Mật khẩu phải có chữ hoa hoặc chữ thường
    let hasUpperCase = false;
    let hasLowerCase = false;

    for (let i = 0; i < password.length; i++) {

        if (password[i] >= "A" && password[i] <= "Z") {
            hasUpperCase = true;
        }

        if (password[i] >= "a" && password[i] <= "z") {
            hasLowerCase = true;
        }

    }
    if (hasUpperCase === false || hasLowerCase === false) {
        alert("Mật khẩu phải có chữ hoa và chữ thường");
        return false;
    } 
    return true;
// Đăng ký thành công sẽ chuyển hướng về trang đăng nhập và thông báo

// Thầy xem giúp Em đoạn này, em chạy hàm nó không hiện Đăng ký thành công cũng như không chuyển trang đăng nhập
// ??? 
let users = JSON.parse(localStorage.getItem("users")) || [];

let newUser = {
    email: email,
    username: username,
    password: password
};

users.push(newUser);

localStorage.setItem("users", JSON.stringify(users));

// Thông báo thành công
alert("Đăng ký thành công");

// Chuyển sang trang đăng nhập
window.location.href = "./sign-in.html";

return false;
}

