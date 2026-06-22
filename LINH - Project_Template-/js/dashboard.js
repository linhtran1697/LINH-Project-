
let users = JSON.parse(localStorage.getItem("users")) || []; // Danh sách user từ Local Storage

let tableBody = document.getElementById("table-body"); // Phần tbody để hiển thị bảng user
let searchBox = document.getElementById("search-box"); // Ô tìm kiếm


let paginationList = document.getElementById("pagination-list"); // Danh sách số trang
let arrowLeft = document.querySelector(".arrow-left"); //  Nút mũi tên trái
let arrowRight = document.querySelector(".arrow-right"); // Nút mũi tên phải


let currentPage = 1; // Trang hiện tại
let usersPerPage = 5; // Mỗi trang hiển thị 5 user
let filteredUsers = [...users]; // Mảng dùng để hiển thị và tìm kiếm

// Hàm hiển thị user ra bảng
function renderUsers() { 
tableBody.innerHTML = ""; // Xóa dữ liệu cũ trong bảng

let start = (currentPage - 1) * usersPerPage; // Tính vị trí bắt đầu của user trên trang hiện tại
let end = start + usersPerPage;   // Tính vị trí kết thúc
let usersOnPage = filteredUsers.slice(start, end); // Danh sách user của trang hiện tại

// Nếu không có user
if (usersOnPage.length === 0) {
tableBody.innerHTML = `
<tr>
<td colspan="7" style="text-align:center;">Không tìm thấy user</td>
</tr>`;
return;
}

// Dùng forEach để duyệt từng user để tạo từng dòng trong bảng
usersOnPage.forEach(function (user, index) {

let realIndex = users.indexOf(user); // Lấy vị trí thật của user trong mảng users gốc
let statusClass = "active";

if (user.status === "Deactive") {
statusClass = "deactive";
}
// Tạo một dòng user
let row = `
<tr>
  <td>${user.usercode || user.userCode || user.id || index + 1}</td>
  <td>${user.username || user.name || ""}</td>
  <td>${user.email || ""}</td>
  <td class="uppercase">${user.role || "User"}</td>
  <td>${user.birthday || ""}</td>
  <td>
  <span class="status-cell ${statusClass}">
  <span class="dot"></span>
    ${user.status || "Active"}
  </span>
   </td>
   <td>
    <i class="fa-solid fa-trash" onclick="deleteUser(${realIndex})"></i>
    <i class="fa-solid fa-pen" onclick="editUser(${realIndex})"></i>
  </td>
</tr>`;

// Thêm dòng user vào bảng
tableBody.innerHTML += row;
});
}

// Hàm hiển thị phân trang
function renderPagination() {
// Xóa phân trang cũ

paginationList.innerHTML = "";

let totalPages = Math.ceil(filteredUsers.length / usersPerPage); // Tính tổng số trang

// Nếu chỉ có 0 hoặc 1 trang thì vẫn xử lý bình thường
for (let i = 1; i <= totalPages; i++) {
// Tạo thẻ li cho từng số trang
let li = document.createElement("li");
li.innerText = i; // Gán số trang
li.className = "pagination-element"; // Gán class theo CSS

// Nếu là trang hiện tại thì thêm class highlight
if (i === currentPage) {
li.classList.add("highlight");
}

// Khi sự kiến bấm vào số trang
li.addEventListener("click", function () {
currentPage = i;
renderUsers();
renderPagination();
});
paginationList.appendChild(li); // Thêm số trang vào ul
}
}

// Hàm xóa user
function deleteUser(index) {
let confirmDelete = confirm("Bạn có chắc muốn xoá user này không?"); // Hỏi xác nhận trước khi xóa

// Nếu người dùng bấm OK
if (confirmDelete) {
users.splice(index, 1); // Xóa user khỏi mảng users
localStorage.setItem("users", JSON.stringify(users)); // Lưu lại Local Storage
filteredUsers = [...users]; // Cập nhật lại danh sách đang hiển thị
let totalPages = Math.ceil(filteredUsers.length / usersPerPage); // Tính lại tổng số trang

// Nếu sau khi xóa mà trang hiện tại không còn dữ liệu thì lùi về trang trước

if (currentPage > totalPages) {
currentPage = totalPages || 1;
}
renderUsers();
renderPagination();
}
}

// Tìm kiếm user theo username
searchBox.addEventListener("input", function () {

let keyword = searchBox.value.toLowerCase().trim(); // Lấy từ khóa người dùng nhập

// Lọc user có tên chứa từ khóa

filteredUsers = users.filter(function (user) {

let name = user.username || user.name || "";
return name.toLowerCase().includes(keyword);
});
currentPage = 1; // Khi tìm kiếm thì quay về trang 1
renderUsers();
renderPagination();
});

// Chuyển sang trang add-user
let addNewUserLink = document.querySelector(".add-new-user-link");

addNewUserLink.addEventListener("click", function (event) {
event.preventDefault();
window.location.href = "./add-user.html";
});

// Chuyển sang trang edit-user
function editUser(index) {
localStorage.setItem("editUserIndex", index);
window.location.href = "./edit-user.html";
}

// Bấm mũi tên trái để quay về trang trước
arrowLeft.addEventListener("click", function () {
if (currentPage > 1) {
currentPage--;
renderUsers();
renderPagination();
}
});

// Bấm mũi tên phải để sang trang tiếp theo
arrowRight.addEventListener("click", function () {
let totalPages = Math.ceil(filteredUsers.length / usersPerPage);

if (currentPage < totalPages) {
currentPage++;
renderUsers();
renderPagination();
}
});

// Đăng xuất
let signOutLink = document.querySelector(".sign-out-link");

signOutLink.addEventListener("click", function (event) {
event.preventDefault();
window.location.href = "./sign-in.html";
});

// Gọi hàm khi mở trang
renderUsers();
renderPagination();