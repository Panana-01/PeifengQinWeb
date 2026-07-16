import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './MagicBentoEffects.css';

const MOBILE_BREAKPOINT = 768;
const DEFAULT_GLOW_COLOR = '206, 229, 244';

const createParticle = (x, y, color) => {
  const particle = document.createElement('span');
  particle.className = 'magic-particle';
  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;
  particle.style.setProperty('--magic-glow-color', color);
  return particle;
};

const updateGlowPosition = (card, clientX, clientY, intensity, radius) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((clientX - rect.left) / rect.width) * 100;
  const relativeY = ((clientY - rect.top) / rect.height) * 100;

  card.style.setProperty('--glow-x', `${relativeX}%`);
  card.style.setProperty('--glow-y', `${relativeY}%`);
  card.style.setProperty('--glow-intensity', intensity.toString());
  card.style.setProperty('--glow-radius', `${radius}px`);
};

function MagicBentoEffects({
  selector = '.magic-bento-card',
  glowColor = DEFAULT_GLOW_COLOR,
  spotlightRadius = 320,
  particleCount = 8
}) {
  const [disabled, setDisabled] = useState(false);
  const cleanupRef = useRef(null);

  useEffect(() => {
    const checkDevice = () => {
      setDisabled(window.innerWidth <= MOBILE_BREAKPOINT || window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  useEffect(() => {
    cleanupRef.current?.();

    const cards = Array.from(document.querySelectorAll(selector)).filter(
      (card) => !card.classList.contains('magic-bento-static')
    );
    cards.forEach((card) => {
      card.style.setProperty('--magic-glow-color', glowColor);
      card.style.setProperty('--glow-intensity', '0');
    });

    if (disabled || cards.length === 0) {
      cleanupRef.current = null;
      return undefined;
    }

    const cardCleanups = cards.map((card) => {
      const particles = [];
      const timeouts = [];
      let hovered = false;
      let moveFrame = 0;
      let latestPointer = null;

      const clearParticles = () => {
        timeouts.forEach(clearTimeout);
        timeouts.length = 0;
        particles.splice(0).forEach((particle) => {
          gsap.killTweensOf(particle);
          gsap.to(particle, {
            scale: 0,
            opacity: 0,
            duration: 0.24,
            ease: 'power2.out',
            onComplete: () => particle.remove()
          });
        });
      };

      const spawnParticles = () => {
        const rect = card.getBoundingClientRect();
        for (let index = 0; index < particleCount; index += 1) {
          const timeout = window.setTimeout(() => {
            if (!hovered) return;
            const particle = createParticle(Math.random() * rect.width, Math.random() * rect.height, glowColor);
            card.appendChild(particle);
            particles.push(particle);

            gsap.fromTo(
              particle,
              { scale: 0, opacity: 0 },
              { scale: 1, opacity: 0.86, duration: 0.22, ease: 'back.out(1.8)' }
            );
            gsap.to(particle, {
              x: (Math.random() - 0.5) * 88,
              y: (Math.random() - 0.5) * 88,
              opacity: 0.24,
              duration: 1.6 + Math.random() * 1.4,
              ease: 'sine.inOut',
              repeat: -1,
              yoyo: true
            });
          }, index * 90);
          timeouts.push(timeout);
        }
      };

      const onMouseEnter = () => {
        hovered = true;
        card.style.willChange = 'transform';
        spawnParticles();
        gsap.to(card, {
          rotateX: 2.2,
          rotateY: -2.2,
          duration: 0.24,
          ease: 'power2.out',
          transformPerspective: 1100
        });
      };

      const onMouseLeave = () => {
        hovered = false;
        latestPointer = null;
        if (moveFrame) {
          window.cancelAnimationFrame(moveFrame);
          moveFrame = 0;
        }
        clearParticles();
        card.style.setProperty('--glow-intensity', '0');
        gsap.to(card, {
          x: 0,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto',
          onComplete: () => {
            card.style.willChange = '';
          }
        });
      };

      const onMouseMove = (event) => {
        latestPointer = { clientX: event.clientX, clientY: event.clientY };
        if (moveFrame) return;

        moveFrame = window.requestAnimationFrame(() => {
          moveFrame = 0;
          if (!latestPointer || !hovered) return;
          const rect = card.getBoundingClientRect();
          const x = latestPointer.clientX - rect.left;
          const y = latestPointer.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -3.5;
          const rotateY = ((x - centerX) / centerX) * 3.5;

          updateGlowPosition(card, latestPointer.clientX, latestPointer.clientY, 1, spotlightRadius);
          gsap.to(card, {
            x: (x - centerX) * 0.012,
            y: (y - centerY) * 0.012,
            rotateX,
            rotateY,
            duration: 0.16,
            ease: 'power2.out',
            transformPerspective: 1100,
            overwrite: 'auto'
          });
        });
      };

      const onClick = (event) => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const distance = Math.max(
          Math.hypot(x, y),
          Math.hypot(x - rect.width, y),
          Math.hypot(x, y - rect.height),
          Math.hypot(x - rect.width, y - rect.height)
        );
        const ripple = document.createElement('span');
        ripple.className = 'magic-ripple';
        ripple.style.setProperty('--magic-glow-color', glowColor);
        ripple.style.width = `${distance * 2}px`;
        ripple.style.height = `${distance * 2}px`;
        ripple.style.left = `${x - distance}px`;
        ripple.style.top = `${y - distance}px`;
        card.appendChild(ripple);

        gsap.fromTo(
          ripple,
          { scale: 0, opacity: 0.75 },
          { scale: 1, opacity: 0, duration: 0.72, ease: 'power2.out', onComplete: () => ripple.remove() }
        );
      };

      card.addEventListener('mouseenter', onMouseEnter);
      card.addEventListener('mouseleave', onMouseLeave);
      card.addEventListener('mousemove', onMouseMove);
      card.addEventListener('click', onClick);

      return () => {
        hovered = false;
        card.removeEventListener('mouseenter', onMouseEnter);
        card.removeEventListener('mouseleave', onMouseLeave);
        card.removeEventListener('mousemove', onMouseMove);
        card.removeEventListener('click', onClick);
        if (moveFrame) window.cancelAnimationFrame(moveFrame);
        gsap.killTweensOf(card);
        clearParticles();
      };
    });

    const spotlight = document.createElement('div');
    spotlight.className = 'magic-global-spotlight';
    spotlight.style.setProperty('--magic-glow-color', glowColor);
    document.body.appendChild(spotlight);

    let documentMoveFrame = 0;
    let latestDocumentPointer = null;

    const updateDocumentSpotlight = () => {
      documentMoveFrame = 0;
      if (!latestDocumentPointer) return;
      let minDistance = Infinity;

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance =
          Math.hypot(latestDocumentPointer.clientX - centerX, latestDocumentPointer.clientY - centerY) -
          Math.max(rect.width, rect.height) / 2;
        const effectiveDistance = Math.max(0, distance);
        const proximity = spotlightRadius * 0.55;
        const fadeDistance = spotlightRadius * 0.9;
        let intensity = 0;

        if (effectiveDistance <= proximity) {
          intensity = 1;
        } else if (effectiveDistance <= fadeDistance) {
          intensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
        }

        minDistance = Math.min(minDistance, effectiveDistance);
        updateGlowPosition(
          card,
          latestDocumentPointer.clientX,
          latestDocumentPointer.clientY,
          intensity,
          spotlightRadius
        );
      });

      const spotlightOpacity = minDistance <= spotlightRadius * 0.9 ? 0.48 : 0;
      gsap.to(spotlight, {
        left: latestDocumentPointer.clientX,
        top: latestDocumentPointer.clientY,
        opacity: spotlightOpacity,
        duration: 0.18,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    };

    const onDocumentMove = (event) => {
      latestDocumentPointer = { clientX: event.clientX, clientY: event.clientY };
      if (!documentMoveFrame) {
        documentMoveFrame = window.requestAnimationFrame(updateDocumentSpotlight);
      }
    };

    const onDocumentLeave = () => {
      cards.forEach((card) => card.style.setProperty('--glow-intensity', '0'));
      gsap.to(spotlight, { opacity: 0, duration: 0.24, ease: 'power2.out' });
    };

    document.addEventListener('mousemove', onDocumentMove);
    document.addEventListener('mouseleave', onDocumentLeave);

    let cleaned = false;
    const cleanup = () => {
      if (cleaned) return;
      cleaned = true;
      cardCleanups.forEach((cleanup) => cleanup());
      document.removeEventListener('mousemove', onDocumentMove);
      document.removeEventListener('mouseleave', onDocumentLeave);
      if (documentMoveFrame) window.cancelAnimationFrame(documentMoveFrame);
      gsap.killTweensOf(spotlight);
      spotlight.remove();
      if (cleanupRef.current === cleanup) {
        cleanupRef.current = null;
      }
    };

    cleanupRef.current = cleanup;

    return cleanup;
  }, [disabled, glowColor, particleCount, selector, spotlightRadius]);

  return null;
}

export default MagicBentoEffects;
