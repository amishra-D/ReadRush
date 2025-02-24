
var tl = gsap.timeline();
tl.from("#tit", {
   y: -20,
   opacity: 0,
   duration: 1,
   ease: "power2.out",
});

tl.fromTo("#des", {
   opacity: 0,
   x:80
}, {
   opacity: 1,
   x: 0,
   duration: 1,
   ease: "power2.out",
});
tl.pause();
document.addEventListener("DOMContentLoaded",()=>tl.play())
var til = gsap.timeline();
til.to("#side", {
   right: 0,
   duration: 1,
   ease: "power2.out"
});

til.from("#side h1", {
   x: 150,
   duration: 0.7,
   opacity: 0,
   stagger: 0.3,
   ease: "power2.out"
});

til.pause();
document.querySelector('#sidebar').addEventListener("click", () => {
   til.play();
});

gsap.fromTo("#tit", {
   color: "#FFFFFF",
}, {
   x: () => {
      const section = document.querySelector("section");
      const tit = document.querySelector("#tit");
      return (section.offsetWidth / 2) - (tit.offsetWidth / 2) - tit.getBoundingClientRect().left;
   },
   y: () => {
      const section = document.querySelector("section");
      const tit = document.querySelector("#tit");
      return (section.offsetHeight / 2) - (tit.offsetHeight / 2) - tit.getBoundingClientRect().top;
   },
   scale: 2,
   color: "#000000",
   duration: 1.8,
   ease: "power2.out",
   scrollTrigger: {
      trigger: "#des",
      scroller: "body",
      markers: false,
      start: "top 40%",
      end: "top 30%",
      scrub: 3,
   }
});

gsap.fromTo("#des", {
   opacity: 1,
}, {
   opacity: 0,
   duration: 0.5,
   ease: "power2.out",
   scrollTrigger: {
      trigger: "#des",
      scroller: "body",
      markers: false,
      start: "top 40%",
      end: "top 30%",
      scrub: 3,
      toggleActions: "play none none",
   }
});
gsap.fromTo("#overlay", {
   opacity: 0.4,
}, {
   opacity: 0.8,
   duration: 0.5,
   ease: "power2.out",
   scrollTrigger: {
      trigger: "#des",
      scroller: "body",
      markers: false,
      start: "top 40%",
      end: "top 30%",
      scrub: 3,
   }
});
gsap.registerPlugin(ScrollTrigger);

        let wrapp = document.querySelector("#wraps");
        let wrappWidth = wrapp.scrollWidth;
        let screenWidth = window.innerWidth;
        let scrollDistance = wrappWidth - screenWidth;

        gsap.to("#wraps", {
            x: -scrollDistance, 
            ease: "power1.out",
            duration: 2, 
            scrollTrigger: {
                trigger: "#wraps",
                scroller: "body",
                start: "top 60%",
                end: () => `+=${scrollDistance}`, 
                scrub: 1, 
                markers: false, 
            }
        });
        gsap.registerPlugin(ScrollTrigger);

        const lenis = new Lenis();

        lenis.on('scroll', (e) => {
            console.log(e);
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        let spl = document.querySelectorAll(".text-an");

        spl.forEach((chars, i) => {
            const text = new SplitType(chars, { types: 'chars' });

            gsap.from(text.chars, {
                scrollTrigger: {
                    trigger: chars,
                    start: "top 80%",
                    end: "top 20%",
                    scrub: true,
                    markers: false,
                },
                opacity: 0.2,
                stagger: 0.3,
            });
        });
        let jitt = document.querySelectorAll(".text-jit");

        jitt.forEach((chars, i) => {
            const text = new SplitType(chars, { types: 'chars' });

            gsap.from(text.chars, {
                scrollTrigger: {
                    trigger: chars,
                    start: "top 80%",
                    end: "top 20%",
                    scrub: true,
                    markers: false,
                },
                scaleY:0,
                transformOrigin:'top',
                opacity: 0.2,
                stagger: 0.3,
            });
        });
        let cards = document.querySelectorAll(".card");

        gsap.from(cards, {
           scrollTrigger: {
              trigger: cards,
              start: "top 80%", 
              end: "top 20%",   
              scrub: 1,         
              markers: false,   
           },
           x: -100,            
                   
           scale: 0.8,         
           rotateY: -20,       
           duration: 1.5,        
           stagger: 0.2,       
           ease: "power2.out", 
        });
        gsap.registerPlugin(ScrollTrigger);
        const more1 = document.querySelector(".more1");
        gsap.from(more1, {
         scrollTrigger: {
            trigger: more1,
            start: "top 60%",
            end: "top 20%",
            markers: false,
            scrub: 1,     
         },
      x:35,
         opacity:0,
         duration:0.3,
         rotation: "-=45",
         ease: "power2.out",
      });
        
        let cards1 = document.querySelectorAll(".card1");

        gsap.from(cards1, {
           scrollTrigger: {
              trigger: cards1,
              start: "top 80%", 
              end: "top 20%",   
              scrub: 1,         
              markers: false,   
           },
           x: -100,            
                   
           scale: 0.8,         
           rotateY: -20,       
           duration: 1.5,        
           stagger: 0.2,       
           ease: "power2.out", 
        });
        const more2 = document.querySelector(".more2");
        gsap.from(more2, {
         scrollTrigger: {
            trigger: more2,
            start: "top 60%",
            end: "top 20%",
            markers: false,
            scrub: 1,     
         },
      x:35,
         opacity:0,
         duration:0.3,
         rotation: "-=45",
         ease: "power2.out",
      });
      let cards2 = document.querySelectorAll(".card2");

        gsap.from(cards2, {
           scrollTrigger: {
              trigger: cards2,
              start: "top 80%", 
              end: "top 20%",   
              scrub: 1,         
              markers: false,   
           },
           x: -100,            
                   
           scale: 0.8,         
           rotateY: -20,       
           duration: 1.5,        
           stagger: 0.2,       
           ease: "power2.out", 
        });
        const more3 = document.querySelector(".more3");
        gsap.from(more3, {
         scrollTrigger: {
            trigger: more3,
            start: "top 60%",
            end: "top 20%",
            markers: false,
            scrub: 1,     
         },
      x:35,
         opacity:0,
         duration:0.3,
         rotation: "-=45",
         ease: "power2.out",
      });
      let cards3 = document.querySelectorAll(".card3");

        gsap.from(cards3, {
           scrollTrigger: {
              trigger: cards3,
              start: "top 80%", 
              end: "top 20%",   
              scrub: 1,         
              markers: false,   
           },
           x: -100,            
                   
           scale: 0.8,         
           rotateY: -20,       
           duration: 1.5,        
           stagger: 0.2,       
           ease: "power2.out", 
        });
        const more4 = document.querySelector(".more4");
        gsap.from(more4, {
         scrollTrigger: {
            trigger: more4,
            start: "top 60%",
            end: "top 20%",
            markers: false,
            scrub: 1,     
         },
      x:35,
         opacity:0,
         duration:0.3,
         rotation: "-=45",
         ease: "power2.out",
      });
   const zoom=document.querySelector(".zoom-im")
   let xd=(window.innerWidth-zoom.offsetWidth)/2;
   let yd=(window.innerHeight-zoom.offsetHeight)/2;
   gsap.from(zoom, {
      scrollTrigger: {
         trigger: zoom,
         start: "top 40%",
         end: "top 20%",
         markers: true,
         scrub:2,
      },
      y:-10,
      scale: 1.4,
      duration: 0.2,
      ease:"power2.out",
   });
   const zoomb=document.querySelector(".zoom-b")
   gsap.from(zoomb, {
      scrollTrigger: {
         trigger: zoomb,
         start: "top 40%",
         end: "top 20%",
         markers: true,
         scrub:2,
      },
      x:-100,
      opacity:0.6,
      delay:0.3,
      duration: 0.5,
      ease:"power1.out",
   });
   