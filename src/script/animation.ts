import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline({
  defaults: { ease: "ease.inOut", duration: 1 },
});

tl.to(".hero__image", {
  opacity: 1,
  clipPath: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)",
  duration: 2,
})
  .from(".hero__info h1", {
    opacity: 0,
    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
    duration: 1.5,
  })
  .from(".hero__info p", {
    opacity: 0,
    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
    duration: 1.5,
  })
  .from(".hero__info .custom-btn", {
    opacity: 0,
    duration: 1.5,
  });

gsap.utils.toArray<HTMLParagraphElement[]>("p").forEach((p) => {
  gsap.fromTo(
    p,
    {
      opacity: 0,
      y: -10,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1.5,
      scrollTrigger: p,
    }
  );
});

gsap.utils.toArray<HTMLDivElement[]>("div").forEach((div) => {
  gsap.fromTo(
    div,
    {
      opacity: 0.5,
      y: -10,
    },
    {
      opacity: 1,
      y: 0,
      duration: 2.2,
      scrollTrigger: {
        trigger: div,
        start: "top center",
      },
    }
  );
});
