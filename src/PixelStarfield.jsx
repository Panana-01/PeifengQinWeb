import React, { useCallback, useMemo, useState } from 'react';

const STAR_COLORS = ['#ffcbfc', '#ffffff', '#bdffabf5', 'hsla(229, 31%, 66%, 0.873)', ];
const BURST_ANGLES = [0, 72, 144, 216, 288];
const STAR_COUNT = 120;

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function createLife(first = false) {
  const burst = Math.random() < 0.22;
  return {
    key: `${Date.now()}-${Math.random()}`,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: burst ? 5 + Math.floor(Math.random() * 6) : 3 + Math.floor(Math.random() * 6),
    color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
    cross: !burst && Math.random() < 0.14,
    burst,
    delay: `${randomBetween(0, first ? 8 : 2.2).toFixed(2)}s`,
    duration: `${(burst ? randomBetween(2.8, 4.6) : randomBetween(2.2, 5.4)).toFixed(2)}s`,
    bright: randomBetween(0.55, 0.95),
    travel: 14 + Math.floor(Math.random() * 22)
  };
}

function PixelStar() {
  const [life, setLife] = useState(() => createLife(true));
  const recycle = useCallback((event) => {
    if (event.target !== event.currentTarget) return;
    setLife(createLife());
  }, []);

  return (
    <span
      key={life.key}
      className={`pixel-star${life.cross ? ' is-cross' : ''}${life.burst ? ' is-burst' : ' is-fade'}`}
      style={{
        left: life.left,
        top: life.top,
        width: life.size,
        height: life.size,
        background: life.burst ? 'transparent' : life.color,
        color: life.color,
        animationDelay: life.delay,
        animationDuration: life.duration,
        '--star-bright': life.bright,
        '--star-travel': `${life.travel}px`
      }}
      onAnimationEnd={recycle}
    >
      {life.burst ? (
        <>
          <i className="pixel-star-core" />
          {BURST_ANGLES.map((angle) => (
            <i key={angle} className="pixel-spark" style={{ '--star-angle': `${angle}deg` }} />
          ))}
        </>
      ) : null}
    </span>
  );
}

export default function PixelStarfield() {
  const stars = useMemo(() => Array.from({ length: STAR_COUNT }, (_, id) => id), []);

  return (
    <div className="pixel-starfield" aria-hidden="true">
      {stars.map((id) => (
        <PixelStar key={id} />
      ))}
    </div>
  );
}
