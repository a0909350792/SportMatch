document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registerForm");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirm-password");
  const errorMessage = document.getElementById("errorMessage");
  const sendSmsButton = document.getElementById("send-sms");
  const phoneInput = document.getElementById("phone");
  const smsCodeInput = document.getElementById("sms-code");
  const sendCodeBtn = document.getElementById("sendCodeBtn");
  const emailInput = document.getElementById("email");

  // 註冊成功通知容器
  const successNotification = document.createElement("div");
  successNotification.id = "successNotification";
  successNotification.textContent = "註冊成功！歡迎加入！";
  successNotification.style.display = "none";
  document.body.appendChild(successNotification);

  // 隱藏通知
  const hideNotification = () => {
    successNotification.style.opacity = "0";
    setTimeout(() => {
      successNotification.style.display = "none";
      window.location.href = "../index/index.html"; // 跳轉到 index.html
    }, 300); // 與 CSS 過渡時間一致
  };

  // 顯示通知
  const showNotification = () => {
    successNotification.style.display = "block";
    setTimeout(() => {
      successNotification.style.opacity = "1";
    }, 10); // 確保過渡效果正常觸發
    setTimeout(hideNotification, 3000); // 3秒後隱藏並跳轉
  };

  // 表單提交處理
  if (form) {
    form.addEventListener("submit", function (event) {
      // 檢查密碼是否一致
      if (
        password &&
        confirmPassword &&
        password.value !== confirmPassword.value
      ) {
        errorMessage.textContent = "密碼不一致，請再次確認。";
        alert("密碼不一致，請再次確認。");
        event.preventDefault();
        return;
      } else {
        errorMessage.textContent = "";
      }

      // 通知註冊成功
      event.preventDefault(); // 停止實際表單提交，用於測試
      showNotification();
    });
  }

  // 發送驗證碼按鈕處理
  if (sendCodeBtn) {
    sendCodeBtn.addEventListener("click", function () {
      const email = emailInput.value;
      if (!email) {
        alert("請輸入電子郵件地址！");
        return;
      }

      // 模擬發送驗證碼
      alert("驗證碼已發送到您的電子郵件！");
    });
  }

  // 表單提交處理
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault(); // 防止表單提交

      // 簡單的前端驗證
      const username = document.getElementById("username").value;
      const email = emailInput.value;
      const verificationCode =
        document.getElementById("verification-code").value;
      const passwordValue = password.value;
      const confirmPasswordValue = confirmPassword.value;

      if (passwordValue !== confirmPasswordValue) {
        alert("密碼不一致！");
        return;
      }

      // 模擬註冊成功
      showNotification();
      form.reset();
    });
  }
});
