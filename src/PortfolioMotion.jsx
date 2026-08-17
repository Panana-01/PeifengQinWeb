import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function PortfolioMotion() {
  useLayoutEffect(() => {
    const compactViewport = window.matchMedia('(max-width: 760px)').matches;
    if (reducedMotion() || compactViewport) return undefined;

    const ctx = gsap.context(() => {
      const slowEase = 'expo.out';
      const revealEase = 'power4.out';

      document.documentElement.classList.add('motion-mounted');

      gsap.set('.hero', {
        '--hero-photo-scale': 1.14,
        '--hero-photo-brightness': 0.72,
        '--hero-after-opacity': 0.78
      });

      gsap.set('.hero-topline span, .hero-topline h1, .hero-tagline', {
        willChange: 'transform, clip-path, opacity, filter'
      });

      const openingTimeline = gsap
        .timeline({ defaults: { ease: slowEase } })
        .fromTo(
          '.sidebar-shell',
          { x: -42, autoAlpha: 0, filter: 'blur(14px)' },
          { x: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 1.2, clearProps: 'transform,filter' },
          0.12
        )
        .to(
          '.hero',
          {
            '--hero-photo-scale': 1.035,
            '--hero-photo-brightness': 1.08,
            '--hero-after-opacity': 0.58,
            duration: 2.1,
            ease: 'power3.out'
          },
          0.06
        )
        .fromTo(
          '.hero-topline span',
          { y: 34, autoAlpha: 0, clipPath: 'inset(0 0 100% 0)', filter: 'blur(8px)' },
          { y: 0, autoAlpha: 1, clipPath: 'inset(0 0 0% 0)', filter: 'blur(0px)', duration: 1.05 },
          0.48
        )
        .fromTo(
          '.hero-topline h1',
          {
            x: -96,
            scaleX: 0.64,
            autoAlpha: 0,
            clipPath: 'inset(0 100% 0 0)',
            filter: 'blur(12px)'
          },
          {
            x: 0,
            scaleX: 1,
            autoAlpha: 1,
            clipPath: 'inset(0 0% 0 0)',
            filter: 'blur(0px)',
            duration: 1.55,
            transformOrigin: 'left center'
          },
          0.62
        )
        .fromTo(
          '.hero-tagline',
          { y: 28, autoAlpha: 0, clipPath: 'inset(0 0 100% 0)', filter: 'blur(8px)' },
          { y: 0, autoAlpha: 1, clipPath: 'inset(0 0 0% 0)', filter: 'blur(0px)', duration: 1.2 },
          1.05
        )
        .fromTo(
          '.about-signpost',
          { y: 28, autoAlpha: 0, scale: 0.94, filter: 'blur(10px)' },
          {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            filter: 'blur(0px)',
            duration: 1.05,
            clearProps: 'transform,filter'
          },
          0.28
        )
        .fromTo(
          '.hero-section-switch',
          { y: 24, autoAlpha: 0, filter: 'blur(10px)' },
          { y: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 1.05, clearProps: 'transform,filter' },
          0.32
        );

      openingTimeline.set('.hero-topline span, .hero-topline h1, .hero-tagline', {
        clearProps: 'willChange,filter,clipPath'
      });

      const sections = gsap.utils.toArray('.projects, .personal-projects, .toolbox');

      sections.forEach((section) => {
        const eyebrow = section.querySelector('.section-header .eyebrow');
        const heading = section.querySelector('.section-header h2');
        const text = section.querySelector('.section-header p');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 72%',
            once: true
          },
          defaults: { ease: revealEase }
        });

        if (eyebrow) {
          tl.fromTo(
            eyebrow,
            { y: 42, autoAlpha: 0, clipPath: 'inset(0 0 100% 0)', filter: 'blur(8px)' },
            { y: 0, autoAlpha: 1, clipPath: 'inset(0 0 0% 0)', filter: 'blur(0px)', duration: 0.9 },
            0
          );
        }

        if (heading) {
          tl.fromTo(
            heading,
            {
              x: -120,
              y: 38,
              scaleX: 0.72,
              autoAlpha: 0,
              clipPath: 'inset(0 100% 0 0)',
              filter: 'blur(14px)'
            },
            {
              x: 0,
              y: 0,
              scaleX: 1,
              autoAlpha: 1,
              clipPath: 'inset(0 0% 0 0)',
              filter: 'blur(0px)',
              duration: 1.35,
              transformOrigin: 'left center'
            },
            0.08
          );
        }

        if (text) {
          tl.fromTo(
            text,
            { y: 40, autoAlpha: 0, filter: 'blur(8px)' },
            { y: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 1.0 },
            heading ? 0.38 : 0.16
          );
        }
      });

      const cardGroups = [
        { trigger: '#projects', targets: '#projects .project-card' },
        { trigger: '#personal-projects', targets: '#personal-projects .project-card' },
        { trigger: '#toolbox', targets: '#toolbox .toolbox-card' }
      ];

      cardGroups.forEach(({ trigger, targets }) => {
        const cards = gsap.utils.toArray(targets);
        if (!cards.length) return;

        gsap.fromTo(
          cards,
          {
            y: 96,
            autoAlpha: 0,
            scale: 0.94,
            clipPath: 'inset(18% 0 0 0)',
            filter: 'blur(14px)'
          },
          {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            clipPath: 'inset(0% 0 0 0)',
            filter: 'blur(0px)',
            duration: 1.25,
            ease: 'power4.out',
            stagger: { each: 0.12, from: 'start' },
            clearProps: 'transform,clipPath,filter',
            scrollTrigger: {
              trigger,
              start: 'top 66%',
              once: true
            }
          }
        );
      });

      const enableParallax = window.matchMedia('(min-width: 901px)').matches;

      gsap.utils.toArray('.project-image').forEach((imageFrame, index) => {
        const image = imageFrame.querySelector('img');
        if (!image) return;

        gsap.fromTo(
          imageFrame,
          { clipPath: index % 2 === 0 ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)' },
          {
            clipPath: 'inset(0 0% 0 0%)',
            duration: 1.2,
            ease: 'power4.inOut',
            clearProps: 'clipPath',
            scrollTrigger: {
              trigger: imageFrame,
              start: 'top 78%',
              once: true
            }
          }
        );

        gsap.fromTo(
          image,
          { scale: 1.16, yPercent: 7 },
          {
            scale: 1.04,
            yPercent: 0,
            duration: 1.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: imageFrame,
              start: 'top 78%',
              once: true
            }
          }
        );

        if (enableParallax) {
          gsap.to(image, {
            yPercent: -7,
            ease: 'none',
            scrollTrigger: {
              trigger: imageFrame,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.7
            }
          });
        }
      });

      ScrollTrigger.refresh();
    });

    return () => {
      document.documentElement.classList.remove('motion-mounted');
      ctx.revert();
    };
  }, []);

  return null;
}

export default PortfolioMotion;
