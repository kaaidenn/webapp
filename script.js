console.clear(); // Start with a clean console on refesh
//--------------------------------//
// Menu slide animation
//--------------------------------//
// Menu slide animation
const navigationSlide = document.querySelector("#navigation-slide");
const q = gsap.utils.selector(navigationSlide);
const menuSlideAnimation = gsap.timeline({
  paused: true,
  reversed: true,
  defaults: { duration: 0.2, ease: "power4.in" }
});
gsap.set(navigationSlide, { xPercent: 100 });
// Animation
menuSlideAnimation.set(navigationSlide, { autoAlpha: 1 });
menuSlideAnimation.to(navigationSlide, { xPercent: 0, duration: 0.2 });
menuSlideAnimation.from(q("ul li"), {
  x: 100,
  opacity: 0,
  stagger: { amount: 0.3 }
});
menuSlideAnimation.from(q(".extra > *"), {
  opacity: 0,
  stagger: { amount: 0.3 }
});
// Menu toggle setup
let tlMenuToggleAll = []; // Collect all menu buttons;
const menuToggle = document.querySelectorAll(".menu-toggle");
// Animation function
function menuToggleAnimation(target) {
  const q = gsap.utils.selector(target);
  // Menu toggle animation
  const tl = gsap.timeline({
    paused: true,
    reversed: true,
    defaults: { duration: 0.3, ease: "power3.in" }
  });
  // // ---- Simple ----
  // tl.to(q(".anim"), {rotate: gsap.utils.wrap([-45, 45])});
  // tl.to(q(".anim"), { y: 0 }, "<");
  // tl.to(q(".text"), { duration: 0.1, opacity: 0 }, "<");

  //   // ---- Spinning ----
  //   tl.to(q(".inner"), { duration: 0.8, rotate: 360 * 3 });
  //   tl.to(q(".anim"), { y: 0 }, "<");
  //   tl.to(q(".text"), { duration: 0.1, opacity: 0 }, "<");
  //   tl.to(q(".anim"), {
  //     duration: 0.45,
  //     rotate: gsap.utils.wrap([45 * 3, 45 * 5])
  //   }, "-=0.6");

  // // ---- Rotate ----
  // tl.to(q(".inner"), { rotate: -90 });
  // tl.to(q(".anim"), { y: 0 }, "<");
  // tl.to(q(".anim"), {rotate: gsap.utils.wrap([45, -45])});
  // tl.to(q(".text"), { duration: 0.1, opacity: 0 }, "<");

  // // ---- Move out in ----
  // tl.to(q(".inner span"), { xPercent: -150, stagger: 0.1 });
  //   tl.set(q(".anim"), { y: 0 });
  // tl.set(q(".anim"), {
  //   duration: 0.45,
  //   rotate: gsap.utils.wrap([45 * 3, 45 * 5])
  // });
  // tl.set(q(".text"), { opacity: 0 }, "<");
  // tl.set(q(".inner span"), { xPercent: 0 });
  // tl.set(q(".inner .anim"), { xPercent: 150 });
  // tl.to(q(".inner .anim"), { xPercent: 0 });

  // ---- Rotate animation ----
  tl.to(q(".anim"), { y: 0 });
  tl.to(q(".anim"), {
    duration: 0.45,
    rotate: gsap.utils.wrap([45 * 3, 45 * 5])
  });
  tl.to(q(".text"), { duration: 0.1, opacity: 0 }, "<");
  tlMenuToggleAll.push(tl); // Capture all timelines
  return tl;
}
// 👆 Click logic function
function menuToggleClick(target) {
  // Setup aria roles
  target.setAttribute("aria-haspopup", "true");
  target.setAttribute("aria-expanded", "false");
  target.setAttribute("aria-controls", "navigation-slide");

  // Click logic
  target.addEventListener("click", (e) => {
    e.preventDefault();
    document.body.classList.toggle("showNavigationSlide");
    menuSlideAnimation.reversed()
      ? menuSlideAnimation.play()
      : menuSlideAnimation.reverse();
    tlMenuToggleAll.forEach((timeline, index) => {
      timeline.reversed() ? timeline.play() : timeline.reverse();
      // ♿️ Accessibility logic
      menuToggle[index].setAttribute(
        "aria-expanded",
        menuToggle[index].getAttribute("aria-expanded") == "false"
          ? "true"
          : "false"
      );
    });
  });
}
document.querySelectorAll(".menu-toggle").forEach((item) => {
  const q = gsap.utils.selector(item);
  const offset = item.getBoundingClientRect().height * 0.2;
  // Ready function
  function ready() {
    // Add animation to button
    if (item.tagName === "BUTTON") {
      menuToggleAnimation(item);
    }
    // 👆 Add click logic
    menuToggleClick(item);
  }
  // Page load animation
  const tl = gsap.timeline({
    onComplete: () => ready()
  });
  // Animate only if item is a button
  if (item.tagName === "BUTTON") {
    tl.set(item, { autoAlpha: 1 });
    tl.to(q(".anim"), {
      y: gsap.utils.wrap([offset, -offset]),
      duration: 0.15,
      ease: "power4.in"
    });
    tl.from(q(".text"), { opacity: 0 });
  }
});
// END Menu slide animation --------------//

document.querySelectorAll("#navigation-slide-large").forEach((container) => {
  const q = gsap.utils.selector(container);
  const tl = gsap.timeline({});
  tl.to(container, {
    clipPath: "circle(144% at 100% 0%)",
    duration: 0.8,
    ease: "power4.in"
  });

  tl.to(q("nav li"), {
    backgroundImage:
      "linear-gradient(90deg, var(--left) 0%, var(--left) 100%, var(--right) 100%)",
    duration: 0.3,
    stagger: {
      each: 0.1,
      ease: "power2.out"
    }
  });

  tl.to(q(".extra-content .alloy-card"), {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",

    duration: 0.3,
    stagger: {
      each: 0.1,
      ease: "power2.out"
    }
  });
});
