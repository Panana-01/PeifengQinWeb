import React from 'react';
import ASCIIText from './ASCIIText';

function wrapCanvasWords(context, text, maxWidth) {
  const words = text.split(/\s+/).filter(Boolean);
  if (!words.length) return [text];
  if (context.measureText(text).width <= maxWidth) return [text];

  const lines = [];
  let current = words[0];

  for (let i = 1; i < words.length; i += 1) {
    const next = `${current} ${words[i]}`;
    if (context.measureText(next).width <= maxWidth) {
      current = next;
    } else {
      lines.push(current);
      current = words[i];
    }
  }

  lines.push(current);
  return lines;
}

function wrapCanvasLines(context, text, maxWidth) {
  if (!text.includes('→')) {
    return wrapCanvasWords(context, text, maxWidth);
  }

  const trailingArrow = /\s*→\s*$/.test(text);
  const tokens = text.split(/\s*→\s*/).map((token) => token.trim()).filter(Boolean);
  const lines = [];
  let current = '';

  const appendChunk = (chunk, joiner) => {
    const next = current ? `${current}${joiner}${chunk}` : chunk;
    if (!current || context.measureText(next).width <= maxWidth) {
      current = next;
      return;
    }
    lines.push(current);
    current = chunk;
  };

  tokens.forEach((token) => {
    wrapCanvasWords(context, token, maxWidth).forEach((chunk) => {
      appendChunk(chunk, ' → ');
    });
  });

  if (trailingArrow) {
    const withArrow = current ? `${current} →` : '→';
    if (!current || context.measureText(withArrow).width <= maxWidth) {
      current = withArrow;
    } else {
      lines.push(current);
      current = '→';
    }
  }

  if (current) lines.push(current);
  return lines.length ? lines : [text];
}

function drawAboutGlowCardTexture(context, canvas, { text, color, fontFamily }) {
  const { width, height } = canvas;
  const scale = width / 190;
  const inset = 8 * scale;
  const padX = 10 * scale;
  const padY = 16 * scale;
  const gap = 16 * scale;
  const fontSize = 18 * scale;
  const lineHeight = fontSize * 1.2;
  const paragraphs = text.split('\n');

  const gradient = context.createLinearGradient(0, height, width, 0);
  gradient.addColorStop(0, '#03a9f4');
  gradient.addColorStop(1, '#ff0058');
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  context.fillStyle = 'rgba(0, 0, 0, 0.6)';
  context.fillRect(inset, inset, width - inset * 2, height - inset * 2);

  context.fillStyle = color;
  context.font = `700 ${Math.round(fontSize)}px ${fontFamily}`;
  context.textAlign = 'center';
  context.textBaseline = 'top';

  const maxWidth = width - inset * 2 - padX * 2;
  const wrapped = paragraphs.map((paragraph) => wrapCanvasLines(context, paragraph, maxWidth));
  const total = wrapped.reduce((sum, lines) => sum + lines.length * lineHeight, 0)
    + gap * Math.max(0, wrapped.length - 1);
  const innerTop = inset + padY;
  const innerHeight = height - inset * 2 - padY * 2;
  let y = innerTop + Math.max(0, (innerHeight - total) / 2);
  const cx = width / 2;

  wrapped.forEach((lines, index) => {
    lines.forEach((line) => {
      context.fillText(line, cx, y);
      y += lineHeight;
    });
    if (index < wrapped.length - 1) {
      y += gap;
    }
  });
}

class GlowCardAsciiSafe extends React.Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.error('ASCIIText crashed', error);
  }

  render() {
    if (this.state.failed) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function AboutGlowCard({
  href,
  title = 'How I built this website',
  process = 'IDEA → DESIGN → AI→ CODE → ITERATE',
  cta = 'Explore my workflow →'
}) {
  const Tag = href ? 'a' : 'div';
  const fallback = (
    <div className="about-glow-card-inner">
      <p className="about-glow-card-line">{title}</p>
      <p className="about-glow-card-line">{process}</p>
      <p className="about-glow-card-line">{cta}</p>
    </div>
  );

  return (
    <Tag
      className="about-glow-card"
      href={href}
      aria-label={`${title}. ${process}. ${cta}`}
    >
      <GlowCardAsciiSafe fallback={fallback}>
        <div className="about-glow-card-ascii" aria-hidden="true">
          <ASCIIText
            text={`${title}\n${process}\n${cta}`}
            enableWaves={false}
            enableRotation={false}
            asciiFontSize={1}
            textColor="#fdf9f3"
            planeBaseHeight={24.85}
            textureRenderer={drawAboutGlowCardTexture}
            textureWidth={380}
            textureHeight={508}
          />
        </div>
      </GlowCardAsciiSafe>
    </Tag>
  );
}

export default AboutGlowCard;
