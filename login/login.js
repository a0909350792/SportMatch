// 確保頁面加載時模態框是隱藏的
window.onload = function () {
  const modal = document.getElementById("loginModal");
  modal.style.display = "none";
  modal.classList.remove("show");
};

// 打開模態框
window.openLoginModal = function () {
  const modal = document.getElementById("loginModal");
  modal.style.display = "flex";
  // modal.classList.add("show");
};

// 關閉模態框
window.closeModal = function () {
  const modal = document.getElementById("loginModal");
  modal.style.display = "none";
  // modal.classList.remove("show");
};

// 點擊外部關閉
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("loginModal");

  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // 處理登入表單提交
  const loginForm = document.getElementById("loginForm");
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault(); // 防止表單提交

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // 簡單的前端驗證
    if (username === "admin" && password === "password") {
      alert("登入成功！");
      closeModal();
    } else {
      alert("用戶名或密碼錯誤！");
    }
  });

  const togglePassword = document.querySelector(".toggle-password");
  const passwordInput = document.getElementById("password");

  togglePassword.addEventListener("click", function () {
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    this.querySelector("i").classList.toggle("fa-eye");
    this.querySelector("i").classList.toggle("fa-eye-slash");
  });

  if (localStorage.getItem("showLoginModal") === "true") {
    document.getElementById("loginModal").classList.add("show");
    localStorage.removeItem("showLoginModal");
  }
});

function openLoginModal() {
  document.getElementById("loginModal").classList.add("show");
}

function closeModal() {
  document.getElementById("loginModal").classList.remove("show");
}

const passwordField = document.getElementById("password");
const togglePasswordButton = document.getElementById("Pwhide");

togglePasswordButton.addEventListener("click", function () {
  const type =
    passwordField.getAttribute("type") === "password" ? "text" : "password";
  passwordField.setAttribute("type", type);
  // Toggle icon
  togglePasswordButton.name =
    togglePasswordButton.name === "eye-off-outline"
      ? "eye-outline"
      : "eye-off-outline";
});

document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("showLoginModal") === "true") {
    document.getElementById("loginModal").classList.add("show");
    localStorage.removeItem("showLoginModal");
  }

  // 自動填充帳號
  const savedEmail = localStorage.getItem("savedEmail");
  if (savedEmail) {
    document.getElementById("email").value = savedEmail;
    document.getElementById("remember").checked = true;
  }

  // 顯示當前登錄的帳號
  const loggedInEmail = localStorage.getItem("loggedInEmail");
  if (loggedInEmail) {
    document.querySelector(".btn-login").style.display = "none";
    document.querySelector(".btn-register").style.display = "none";
    const userActions = document.querySelector(".user-actions");
    const userEmailContainer = document.createElement("div");
    userEmailContainer.classList.add("user-email-container");

    const userEmail = document.createElement("span");
    userEmail.textContent = loggedInEmail;
    userEmail.classList.add("user-email");

    const dropdownContent = document.createElement("div");
    dropdownContent.classList.add("dropdown-content");

    const logoutButton = document.createElement("button");
    logoutButton.textContent = "登出";
    logoutButton.classList.add("btn-logout");
    logoutButton.onclick = function () {
      localStorage.removeItem("loggedInEmail");
      location.reload();
    };

    dropdownContent.appendChild(logoutButton);
    userEmailContainer.appendChild(userEmail);
    userEmailContainer.appendChild(dropdownContent);
    userActions.appendChild(userEmailContainer);
  }
});

function openLoginModal() {
  document.getElementById("loginModal").classList.add("show");
}

function closeModal() {
  document.getElementById("loginModal").classList.remove("show");
}

document
  .querySelector(".login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const remember = document.getElementById("remember").checked;

    if (remember) {
      localStorage.setItem("savedEmail", email);
    } else {
      localStorage.removeItem("savedEmail");
    }

    // 儲存當前登錄的帳號
    localStorage.setItem("loggedInEmail", email);

    // 關閉登入彈窗
    closeModal();

    // 顯示當前登錄的帳號
    document.querySelector(".btn-login").style.display = "none";
    document.querySelector(".btn-register").style.display = "none";
    const userActions = document.querySelector(".user-actions");
    const userEmailContainer = document.createElement("div");
    userEmailContainer.classList.add("user-email-container");

    const userEmail = document.createElement("span");
    userEmail.textContent = email;
    userEmail.classList.add("user-email");

    const dropdownContent = document.createElement("div");
    dropdownContent.classList.add("dropdown-content");

    const logoutButton = document.createElement("button");
    logoutButton.textContent = "登出";
    logoutButton.classList.add("btn-logout");
    logoutButton.onclick = function () {
      localStorage.removeItem("loggedInEmail");
      location.reload();
    };

    dropdownContent.appendChild(logoutButton);
    userEmailContainer.appendChild(userEmail);
    userEmailContainer.appendChild(dropdownContent);
    userActions.appendChild(userEmailContainer);

    // 在這裡添加你的登入邏輯
    alert("登入成功！");
  });
