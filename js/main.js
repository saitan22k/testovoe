document.addEventListener("DOMContentLoaded", () => {
  const el = document.querySelector(".tocSwiper");
  if (!el) return;

  let tocSwiper = null;

  function initToc() {
    const isMobile = window.matchMedia("(max-width: 576px)").matches;

    if (isMobile && !tocSwiper) {
      tocSwiper = new Swiper(el, {
        slidesPerView: 1.5,
        spaceBetween: 16,
        grid: {
          rows: 2,
          fill: "row",
        },
        centeredSlides: false,
        watchOverflow: true,
      });
    }

    if (!isMobile && tocSwiper) {
      tocSwiper.destroy(true, true);
      tocSwiper = null;
    }
  }

  initToc();
  window.addEventListener("resize", initToc);
});


document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".featuresSwiper");
  if (!slider) return;

  const fill = slider.querySelector(".features-progress__fill");

  const swiper = new Swiper(slider, {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: false,
    navigation: {
      nextEl: slider.querySelector(".features-next"),
      prevEl: slider.querySelector(".features-prev"),
    },
    on: {
      init() { updateProgress(this); },
      slideChange() { updateProgress(this); },
    },
  });

  function updateProgress(sw) {
    const step = 33;
    let finalPercent = (sw.activeIndex + 1) * step;

    if (finalPercent > 100) finalPercent = 100;

    fill.style.width = `${finalPercent}%`;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".matches");
  if (!section) {
    console.log("matches section not found");
    return;
  }

  const el = section.querySelector(".matchesSwiper");
  const prev = section.querySelector(".matches-prev");
  const next = section.querySelector(".matches-next");


  const sw = new Swiper(el, {
    slidesPerView: 2.5,
    slidesPerGroup: 1,
    spaceBetween: 24,
    loop: true,
    navigation: { prevEl: prev, nextEl: next },
    breakpoints: {
    0:    { slidesPerView: 1, spaceBetween: 16 },
    576:  { slidesPerView: 1, spaceBetween: 16 },
    768:  { slidesPerView: 1.5,   spaceBetween: 20 },
    1280: { slidesPerView: 1.7,   spaceBetween: 24 },
  },
  });

  

  prev.addEventListener("click", () => console.log("prev click"));
  next.addEventListener("click", () => console.log("next click"));
});


document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".reviews");
  if (!section) return;

  const el = section.querySelector(".reviewsSwiper");
  const prev = section.querySelector(".reviews-prev");
  const next = section.querySelector(".reviews-next");
  if (!el || !prev || !next) return;

  new Swiper(el, {
    slidesPerView: 1.5,
    spaceBetween: 16,
    loop: true,
    navigation: { prevEl: prev, nextEl: next },
    breakpoints: {
    0: { slidesPerView: 1 },  
    768: { slidesPerView: 1.5 }, 
    1200: { slidesPerView: 1.5 }
  },
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const el = document.querySelector(".brandsSwiper");
  if (!el) return;

  new Swiper(el, {
    slidesPerView: 1.5,
    spaceBetween: 16,
    slidesPerGroup: 4,    
    grid: {
      rows: 2,
      fill: "row",
    },
    autoHeight: false,
    breakpoints: {
      577: {
        slidesPerView: 4,
        grid: { rows: 1 },  
        slidesPerGroup: 1,
      },
    },
  });
});


//Accoridon
document.addEventListener("DOMContentLoaded", () => {
  const accordions = document.querySelectorAll("[data-accordion]");
  if (!accordions.length) return;

  function openItem(item) {
    const panel = item.querySelector(".acc-panel");
    const btn = item.querySelector(".acc-btn");
    if (!panel || !btn) return;

    item.classList.add("is-open");
    btn.setAttribute("aria-expanded", "true");

    panel.style.maxHeight = "0px";
    requestAnimationFrame(() => {
      panel.style.maxHeight = panel.scrollHeight + "px";
    });
  }

  function closeItem(item) {
    const panel = item.querySelector(".acc-panel");
    const btn = item.querySelector(".acc-btn");
    if (!panel || !btn) return;

    item.classList.remove("is-open");
    btn.setAttribute("aria-expanded", "false");
    panel.style.maxHeight = "0px";
  }

  function refreshOpenPanels(root) {
    root.querySelectorAll(".acc-item.is-open .acc-panel").forEach(panel => {
      panel.style.maxHeight = panel.scrollHeight + "px";
    });
  }

  accordions.forEach((acc) => {
    const items = Array.from(acc.querySelectorAll(".acc-item"));

    items.forEach((item) => {
      if (item.classList.contains("is-open")) openItem(item);
      else closeItem(item);
    });

    acc.addEventListener("click", (e) => {
      const btn = e.target.closest(".acc-btn");
      if (!btn) return;

      const item = btn.closest(".acc-item");
      const isOpen = item.classList.contains("is-open");

      if (isOpen) closeItem(item);
      else openItem(item);
    });

    window.addEventListener("resize", () => refreshOpenPanels(acc));
  });

  window.addEventListener("load", () => {
    accordions.forEach(acc => refreshOpenPanels(acc));
  });

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      accordions.forEach(acc => refreshOpenPanels(acc));
    });
  }
});


//Burger
document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger");
  const menu = document.querySelector(".mobile-menu");
  if (!burger || !menu) return;

  const links = Array.from(menu.querySelectorAll("a"));

  function openMenu(){
    menu.classList.add("is-open");
    document.body.classList.add("menu-open");
    burger.setAttribute("aria-expanded", "true");
    menu.setAttribute("aria-hidden", "false");
  }

  function closeMenu(){
    menu.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    burger.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-hidden", "true");
  }

  burger.addEventListener("click", () => {
    menu.classList.contains("is-open") ? closeMenu() : openMenu();
  });

  links.forEach(a => a.addEventListener("click", closeMenu));

});



