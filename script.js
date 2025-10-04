document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // از ریلود صفحه جلوگیری می‌کند

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // در اینجا معمولاً اطلاعات به یک سرور ارسال می‌شد
    // اما از آنجایی که این یک نمونه استاتیک است، فقط یک پیام نشان می‌دهیم

    const messageDiv = document.getElementById('message');
    
    // یک بررسی ساده (فقط برای نمایش)
    if(username && password) {
        messageDiv.textContent = `خوش آمدید، ${username}! (این یک شبیه‌سازی است)`;
        messageDiv.style.color = "green";
        
        // می‌توانید کاربر را به صفحه دیگری هدایت کنید
        // window.location.href = "dashboard.html";
        
    } else {
        messageDiv.textContent = "لطفاً تمام فیلدها را پر کنید.";
        messageDiv.style.color = "red";
    }
});
