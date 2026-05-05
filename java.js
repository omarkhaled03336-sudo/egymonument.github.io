/**
 * EGY_MONUMENTS - Master Script (Final Version 2026)
 * الميزات: تأثير الكتابة، التبديل بين المودات، الماوس المخصص، شاشة التحميل
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. نظام شاشة التحميل (Preloader) ---
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.innerHTML = '<div class="gold-spinner"></div>';
    document.body.appendChild(preloader);

    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => preloader.remove(), 600);
        }, 500);
    });

    // --- 2. إعدادات المود (Light/Dark Mode) ---
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    // التأكد من تطبيق المود المحفوظ فوراً
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
        if (themeIcon) themeIcon.innerText = '☀️';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            const isLight = body.classList.contains('light-mode');
            
            // حفظ الاختيار وتغيير الأيقونة
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            if (themeIcon) themeIcon.innerText = isLight ? '☀️' : '🌙';
            
            console.log("Current Mode:", isLight ? "Light" : "Dark");
        });
    }

    // --- 3. تأثير الكتابة السينمائي (Typewriter) ---
    const initTypewriter = () => {
        // البحث عن العنوان الرئيسي بأكثر من طريقة لضمان العمل في كل الصفحات
        const titleElement = document.querySelector('h1 b') || 
                             document.querySelector('.intro-section h1') || 
                             document.querySelector('h1');
        
        if (titleElement) {
            const fullText = titleElement.innerText;
            if (fullText.trim().length > 0) {
                titleElement.innerText = ''; 
                titleElement.style.opacity = '1';
                
                let i = 0;
                function type() {
                    if (i < fullText.length) {
                        titleElement.innerHTML += fullText.charAt(i);
                        i++;
                        setTimeout(type, 100); // سرعة الكتابة
                    }
                }
                setTimeout(type, 1000); // بدء الكتابة بعد ثانية
            }
        }
    };
    initTypewriter();

    // --- 4. تأثير الماوس المخصص (Custom Cursor) ---
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    // تفاعل الماوس مع العناصر القابلة للضغط
    const interactiveElements = document.querySelectorAll('a, button, .book-now, .photo-card, fieldset');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('cursor-active'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-active'));
    });

    // --- 5. أنيميشن الظهور عند التمرير (Scroll Reveal) ---
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('element-visible');
            }
        });
    }, observerOptions);

    // إضافة الكلاس للعناصر المراد تحريكها
    document.querySelectorAll('.pyramid-detail, .reveal-text, .main-pyramids-img, video').forEach(el => {
        el.classList.add('element-hidden');
        observer.observe(el);
    });
});