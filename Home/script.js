document.addEventListener("DOMContentLoaded", function () {
  // 初始化所有功能
  initializeNavigation();
  initializeAnimations();
  initializeSliders();
  initializeModals();
  initializeSearch();
  initializeScrollEffects();
  initializeCarousel();
  initializeVenuesSlider();

  if (localStorage.getItem("showLoginModal") === "true") {
    document.getElementById("loginModal").classList.add("show");
    localStorage.removeItem("showLoginModal");
  }
});

// 導航欄功能
function initializeNavigation() {
  const header = document.querySelector(".main-header");
  let lastScroll = 0;

  // 滾動時改變導航欄樣式
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      header.classList.remove("scroll-up");
      return;
    }

    if (
      currentScroll > lastScroll &&
      !header.classList.contains("scroll-down")
    ) {
      // 向下滾動
      header.classList.remove("scroll-up");
      header.classList.add("scroll-down");
    } else if (
      currentScroll < lastScroll &&
      header.classList.contains("scroll-down")
    ) {
      // 向上滾動
      header.classList.remove("scroll-down");
      header.classList.add("scroll-up");
    }
    lastScroll = currentScroll;
  });
}

// 動畫效果
function initializeAnimations() {
  // 使用 Intersection Observer 監控元素出現
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
          observer.unobserve(entry.target); // 動畫只執行一次
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px",
    }
  );

  // 為所有需要動畫的元素添加觀察
  const animatedElements = document.querySelectorAll(
    ".feature-card, .event-card, .venue-card, .section-title"
  );
  animatedElements.forEach((el) => observer.observe(el));
}

// 輪播功能
function initializeSliders() {
  // 當季賽事輪播圖
  const carousel = document.querySelector(".events-carousel");
  if (carousel) {
    const track = carousel.querySelector(".carousel-track");
    const slides = Array.from(track.children);
    const nextButton = carousel.querySelector(".next");
    const prevButton = carousel.querySelector(".prev");
    const dotsContainer = carousel.querySelector(".carousel-dots");

    // 創建導航點
    slides.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.classList.add("carousel-dot");
      if (index === 0) dot.classList.add("active");
      dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.children);
    let currentSlide = 0;

    // 更新輪播圖位置
    const updateCarousel = (index) => {
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });
      currentSlide = index;
    };

    // 自動輪播
    let autoplayInterval = setInterval(() => {
      const nextIndex = (currentSlide + 1) % slides.length;
      updateCarousel(nextIndex);
    }, 5000);

    // 重置自動輪播計時器
    const resetAutoplay = () => {
      clearInterval(autoplayInterval);
      autoplayInterval = setInterval(() => {
        const nextIndex = (currentSlide + 1) % slides.length;
        updateCarousel(nextIndex);
      }, 5000);
    };

    // 按鈕事件
    nextButton.addEventListener("click", () => {
      const nextIndex = (currentSlide + 1) % slides.length;
      updateCarousel(nextIndex);
      resetAutoplay();
    });

    prevButton.addEventListener("click", () => {
      const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
      updateCarousel(prevIndex);
      resetAutoplay();
    });

    // 導航點事件
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        updateCarousel(index);
        resetAutoplay();
      });
    });

    // 觸控滑動支援
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
    });

    carousel.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].clientX;
      const difference = touchStartX - touchEndX;

      if (Math.abs(difference) > 50) {
        if (difference > 0) {
          // 向左滑
          const nextIndex = (currentSlide + 1) % slides.length;
          updateCarousel(nextIndex);
        } else {
          // 向右滑
          const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
          updateCarousel(prevIndex);
        }
        resetAutoplay();
      }
    });
  }

  // 場地滑動功能
  const venuesSlider = document.querySelector(".venues-slider");
  if (venuesSlider) {
    let isDown = false;
    let startX;
    let scrollLeft;

    venuesSlider.addEventListener("mousedown", (e) => {
      isDown = true;
      venuesSlider.classList.add("active");
      startX = e.pageX - venuesSlider.offsetLeft;
      scrollLeft = venuesSlider.scrollLeft;
    });

    venuesSlider.addEventListener("mouseleave", () => {
      isDown = false;
      venuesSlider.classList.remove("active");
    });

    venuesSlider.addEventListener("mouseup", () => {
      isDown = false;
      venuesSlider.classList.remove("active");
    });

    venuesSlider.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - venuesSlider.offsetLeft;
      const walk = (x - startX) * 2;
      venuesSlider.scrollLeft = scrollLeft - walk;
    });
  }
}

// 模態框功能
function initializeModals() {
  const loginBtn = document.querySelector(".btn-login");
  const modal = document.getElementById("loginModal");

  if (loginBtn && modal) {
    loginBtn.addEventListener("click", () => {
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.style.display === "flex") {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
  }
}

// 搜尋功能
function initializeSearch() {
  const searchInput = document.querySelector(".search-bar input");
  let searchTimeout;

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        // 這裡添加搜尋邏輯
        console.log("搜尋:", e.target.value);
      }, 500);
    });
  }
}

// 滾動效果
function initializeScrollEffects() {
  // 平滑滾動到錨點
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // 返回頂部按鈕
  const backToTop = document.createElement("button");
  backToTop.innerHTML = "↑";
  backToTop.className = "back-to-top";
  backToTop.style.display = "none";
  document.body.appendChild(backToTop);

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTop.style.display = "block";
    } else {
      backToTop.style.display = "none";
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// 輪播圖功能
function initializeCarousel() {
  const carousel = document.querySelector(".events-carousel");
  if (!carousel) return;

  const track = carousel.querySelector(".carousel-track");
  const slides = Array.from(track.children);
  const nextButton = carousel.querySelector(".next");
  const prevButton = carousel.querySelector(".prev");
  const dotsContainer = carousel.querySelector(".carousel-dots");

  // 創建導航點
  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.classList.add("carousel-dot");
    if (index === 0) dot.classList.add("active");
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.children);
  let currentSlide = 0;

  // 更新輪播圖位置
  const updateCarousel = (index) => {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
    currentSlide = index;
  };

  // 自動輪播
  let autoplayInterval = setInterval(() => {
    const nextIndex = (currentSlide + 1) % slides.length;
    updateCarousel(nextIndex);
  }, 5000);

  // 重置自動輪播計時器
  const resetAutoplay = () => {
    clearInterval(autoplayInterval);
    autoplayInterval = setInterval(() => {
      const nextIndex = (currentSlide + 1) % slides.length;
      updateCarousel(nextIndex);
    }, 5000);
  };

  // 按鈕事件
  nextButton.addEventListener("click", () => {
    const nextIndex = (currentSlide + 1) % slides.length;
    updateCarousel(nextIndex);
    resetAutoplay();
  });

  prevButton.addEventListener("click", () => {
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    updateCarousel(prevIndex);
    resetAutoplay();
  });

  // 導航點事件
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      updateCarousel(index);
      resetAutoplay();
    });
  });

  // 觸控滑動支援
  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  });

  carousel.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].clientX;
    const difference = touchStartX - touchEndX;

    if (Math.abs(difference) > 50) {
      if (difference > 0) {
        const nextIndex = (currentSlide + 1) % slides.length;
        updateCarousel(nextIndex);
      } else {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        updateCarousel(prevIndex);
      }
      resetAutoplay();
    }
  });
}

// 場地滑動功能
function initializeVenuesSlider() {
  const slider = document.querySelector(".venues-slider");
  if (!slider) return;

  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    slider.classList.add("active");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener("mouseleave", () => {
    isDown = false;
    slider.classList.remove("active");
  });

  slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.classList.remove("active");
  });

  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
  });
}

// 表單驗證
function validateForm(form) {
  const inputs = form.querySelectorAll("input[required]");
  let isValid = true;

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      isValid = false;
      showError(input, "此欄位為必填");
    } else {
      clearError(input);
    }

    if (input.type === "email" && input.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value)) {
        isValid = false;
        showError(input, "請輸入有效的電子郵件地址");
      }
    }
  });

  return isValid;
}

// 顯示錯誤訊息
function showError(input, message) {
  const errorDiv = input.nextElementSibling?.classList.contains("error-message")
    ? input.nextElementSibling
    : document.createElement("div");

  errorDiv.className = "error-message";
  errorDiv.textContent = message;

  if (!input.nextElementSibling?.classList.contains("error-message")) {
    input.parentNode.insertBefore(errorDiv, input.nextSibling);
  }

  input.classList.add("error");
}

// 清除錯誤訊息
function clearError(input) {
  const errorDiv = input.nextElementSibling;
  if (errorDiv?.classList.contains("error-message")) {
    errorDiv.remove();
  }
  input.classList.remove("error");
}
