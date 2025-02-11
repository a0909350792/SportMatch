document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('forgotPasswordForm');
  const usernameEmailInput = document.getElementById('username-email');
  const messageDiv = document.getElementById('message');

  form.addEventListener('submit', function (event) {
      event.preventDefault();  // 防止表單提交

      const usernameOrEmail = usernameEmailInput.value.trim();

      if (!usernameOrEmail) {
          messageDiv.textContent = '請輸入帳號或電子郵件';
          messageDiv.style.color = '#dc3545'; // 顯示錯誤訊息 (紅色)
          return;
      }

      // 顯示發送成功訊息
      messageDiv.textContent = '我們已經發送了重設密碼的鏈接至您的電子郵件。';
      messageDiv.style.color = '#28a745';  // 顯示成功訊息 (綠色)
      usernameEmailInput.value = ''; // 清空輸入框
  });
});
