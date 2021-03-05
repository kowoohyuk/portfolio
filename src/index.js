import "./index.scss";

(() => {
  const textInOutItems = document.querySelector(".text-in-out-items").children;
  const body = document.querySelector("body");
  const horizonScroll = document.getElementById("horizonScroll");
  const sun = document.querySelector(".sun");
  const moon = document.querySelector(".moon");
  const anchor = document.getElementsByClassName("section-anchor");
  const section = document.getElementsByTagName("section");
  

  const textInOut = (target = [], idx = 0) => {
    const next = target.length === idx + 1 ? 0 : idx + 1;
    target[idx].classList.replace("ani__text-in", "ani__text-out");
    target[idx].classList.remove("active");
    target[next].classList.replace("ani__text-out", "ani__text-in");
    target[next].classList.add("active");
    setTimeout(() => {
      textInOut(target, next);
    }, 2000);
  };

  const horizonScrolling = (target) => {
    const maxScrollY = body.scrollHeight - window.innerHeight;
    window.addEventListener("scroll", () => {
      const nowScrollY = window.scrollY;
      horizonStatusChange(nowScrollY, maxScrollY);
    });
    const horizonStatusChange = (now, max) => {
      target.style.opacity = now / max + 0.5;
      target.style.width = (now / max) * 100 + "%";
    };
  };

  const handleDayNight = () => {
    body.classList.toggle("dark");
  };

  const handleAnchorActive = index => {
    Array.prototype.forEach.call(anchor, (elem, idx) => {
      if(index === idx) {
        elem.classList.add('active');
      } else {
        elem.classList.remove('active');
      }
    });
  };

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const editHeight = window.innerHeight/3;
    Array.prototype.forEach.call(section, (elem, index) => {
      if(scrollY + editHeight >= elem.offsetTop) {
        handleAnchorActive(index);
        return;
      }
    });
  };

  const handleAnchor = index => (() => {
    window.scroll({
      top: section[index].offsetTop,
      behavior: 'smooth'
    });
  });

  const init = () => {
    horizonScrolling(horizonScroll);
    textInOut(textInOutItems);
    sun.addEventListener("click", handleDayNight);
    moon.addEventListener("click", handleDayNight);
    window.addEventListener("scroll", handleScroll);
    Array.prototype.forEach.call(anchor, (elem, index) => {
      elem.addEventListener("click", handleAnchor(index));
    });
    handleScroll();
  };

  init();
})();
