const track = document.querySelector(".logo-track");

// Get total scroll width (width including duplicates)
const totalWidth = track.scrollWidth;

gsap.to(track, {
  x: `-=${totalWidth / 2}`, // move left by half the width
  duration: 20,
  ease: "none",
  repeat: -1,
  modifiers: {
    x: gsap.utils.unitize(x => {
      // Parse current value and mod by half width (positive)
      let val = parseFloat(x);
      const limit = totalWidth / 2;
      if (val <= -limit) {
        val += limit;
      }
      return val;
    })
  }
});

if (window.innerWidth > 768) {
  const textBlocks = document.querySelectorAll(".text-block");
  const video = document.querySelector(".video-content video");

  textBlocks.forEach(block => {
    block.addEventListener("click", () => {
      const newVideoSrc = block.getAttribute("data-video");
      if (newVideoSrc) {
        video.src = newVideoSrc;
        video.play();
      }

      // Highlight selected
      textBlocks.forEach(b => b.querySelector(".heading").classList.remove("purple"));
      block.querySelector(".heading").classList.add("purple");
    });
  });
}

const swiper = new Swiper(".mySwiper", {
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".info-card").forEach((card, i) => {
  gsap.fromTo(
    card,
    { opacity: 0, y: 50, scale: 0.95 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play reverse play reverse", // play on enter, reverse on leave and back
        scrub: 0.3, // smooth scrubbing on scroll
      },
      delay: i * 0.1,
    }
  );
});


gsap.registerPlugin(ModifiersPlugin);

document.querySelectorAll(".marquee-content").forEach((content) => {
  const container = content.parentElement; // .tag-marquee
  const containerWidth = container.offsetWidth;

  // Clone children until content is at least twice container width
  while (content.scrollWidth < containerWidth * 2) {
    Array.from(content.children).forEach(child => {
      content.appendChild(child.cloneNode(true));
    });
  }

  const isRight = content.closest(".tag-marquee").classList.contains("direction-right");
  const direction = isRight ? 1 : -1;
  const distance = content.scrollWidth / 2;

  // For right direction, start the content shifted left by distance, so it scrolls right into view
  gsap.set(content, { x: isRight ? -distance : 0 });

  gsap.to(content, {
    x: isRight ? 0 : direction * -distance,
    duration: 20,
    ease: "none",
    repeat: -1,
    modifiers: {
      x: gsap.utils.unitize(x => {
        const val = parseFloat(x);
        if (direction === -1) {
          // Left scroll: wrap between 0 and -distance
          return ((val % distance) + distance) % distance * -1;
        } else {
          // Right scroll: wrap between -distance and 0
          // Modulo within [-distance, 0]
          let modX = ((val + distance) % distance) - distance;
          return modX;
        }
      })
    }
  });
});

gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".info-card").forEach((card, i) => {
  gsap.fromTo(
    card,
    { opacity: 0, y: 50, scale: 0.95 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play reverse play reverse",
        scrub: 0.3,
      },
      delay: i * 0.1,
    }
  );
});

gsap.registerPlugin(ScrollTrigger);

gsap.fromTo(".section-seven-container",
  { opacity: 0, y: 50 },
  {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".section-seven",
      start: "top 90%",
      end: "top 50%",
      toggleActions: "play none none none",
      markers: false
    }
  }
);

document.addEventListener("DOMContentLoaded", () => {
  const textEl = document.querySelector(".hero-badge-text");

  if (textEl && window.innerWidth <= 768) {
    const textWidth = textEl.offsetWidth;
    const parentWidth = textEl.parentElement.offsetWidth;

    gsap.fromTo(
      textEl,
      { x: parentWidth },            // start just outside right
      {
        x: -textWidth,               // move to just outside left
        duration: 8,                 // adjust speed here (seconds)
        ease: "linear",
        repeat: -1,                  // infinite loop
      }
    );
  }
});
