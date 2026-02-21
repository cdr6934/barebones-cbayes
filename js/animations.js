// Wait for the DOM to be fully loaded before running animations
document.addEventListener("DOMContentLoaded", (event) => {
  // Register GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // 1. Text Reveal Animation (Fade up and in)
  // Select all elements that we want to reveal on scroll
  const revealElements = document.querySelectorAll('.reveal-text, .card');
  
  revealElements.forEach((element) => {
    gsap.fromTo(element, 
      {
        opacity: 0,
        y: 40
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%", // Trigger when the top of the element hits 85% from top of viewport
          toggleActions: "play none none reverse" // Play on enter, reverse on leave back
        }
      }
    );
  });

  // 2. High-end Paragraph Opacity Scroll Effect (reboot.studio style)
  // We apply this to specific paragraphs where we want the reading focus effect
  const focusTextElements = document.querySelectorAll('.focus-text');
  
  focusTextElements.forEach((element) => {
    // Instead of splitting text into characters (which is heavy), 
    // we'll do a smooth opacity scrub based on scroll position for the whole block
    gsap.fromTo(element,
      {
        opacity: 0.2
      },
      {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top 75%",
          end: "top 45%",
          scrub: true, // Ties the animation progress to the scrollbar
        }
      }
    );
  });
  
  // 3. Stagger Cards in Grid
  const cardGrids = document.querySelectorAll('.cards-grid');
  cardGrids.forEach((grid) => {
    const cards = grid.querySelectorAll('.card');
    
    // We clear individual card ScrollTriggers (from revealElements) if they are in a grid
    // to apply a group stagger effect instead.
    cards.forEach(card => {
       const stdTrigger = ScrollTrigger.getById(card);
       if(stdTrigger) stdTrigger.kill();
    });

    gsap.fromTo(cards,
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15, // Delay between each card
        ease: "back.out(1.2)", // Slight overshoot for a snappy apple feel
        scrollTrigger: {
          trigger: grid,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });
});
