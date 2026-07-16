import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl';
import React, { useEffect, useRef } from 'react';
import './CircularGallery.css';

const lerp = (a, b, t) => a + (b - a) * t;

const bindMethods = (instance) => {
  Object.getOwnPropertyNames(Object.getPrototypeOf(instance)).forEach((key) => {
    if (key !== 'constructor' && typeof instance[key] === 'function') {
      instance[key] = instance[key].bind(instance);
    }
  });
};

const fontSizeFrom = (font) => {
  const match = font.match(/(\d+)px/);
  return match ? Number(match[1]) : 30;
};

function createTextTexture(gl, text, font, color) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = font;
  const metrics = context.measureText(text);
  const fontSize = fontSizeFrom(font);
  canvas.width = Math.ceil(metrics.width) + 48;
  canvas.height = Math.ceil(fontSize * 1.6) + 24;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.font = font;
  context.fillStyle = color;
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;
  return { texture, width: canvas.width, height: canvas.height };
}

class Label {
  constructor({ gl, parent, text, textColor, font }) {
    this.gl = gl;
    this.parent = parent;
    this.text = text;
    this.textColor = textColor;
    this.font = font;
    this.createMesh();
  }

  createMesh() {
    const { texture, width, height } = createTextTexture(this.gl, this.text, this.font, this.textColor);
    const geometry = new Plane(this.gl);
    const program = new Program(this.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.08) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: { tMap: { value: texture } },
      transparent: true
    });

    this.mesh = new Mesh(this.gl, { geometry, program });
    const aspect = width / height;
    const labelHeight = this.parent.scale.y * 0.15;
    this.mesh.scale.set(labelHeight * aspect, labelHeight, 1);
    this.mesh.position.y = -this.parent.scale.y * 0.63;
    this.mesh.setParent(this.parent);
  }
}

class GalleryItem {
  constructor({ gl, geometry, scene, image, text, target, index, length, screen, viewport, bend, textColor, borderRadius, font }) {
    bindMethods(this);
    this.gl = gl;
    this.geometry = geometry;
    this.scene = scene;
    this.image = image;
    this.text = text;
    this.target = target;
    this.index = index;
    this.length = length;
    this.screen = screen;
    this.viewport = viewport;
    this.bend = bend;
    this.textColor = textColor;
    this.borderRadius = borderRadius;
    this.font = font;
    this.extra = 0;
    this.createProgram();
    this.createMesh();
    this.createLabel();
    this.onResize();
  }

  createProgram() {
    const texture = new Texture(this.gl, { generateMipmaps: true });
    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z += (sin(p.x * 4.0 + uTime) + cos(p.y * 2.0 + uTime)) * (0.035 + abs(uSpeed) * 0.16);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform float uBorderRadius;
        varying vec2 vUv;

        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }

        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(vUv.x * ratio.x + (1.0 - ratio.x) * 0.5, vUv.y * ratio.y + (1.0 - ratio.y) * 0.5);
          vec4 color = texture2D(tMap, uv);
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          float alpha = 1.0 - smoothstep(-0.002, 0.002, d);
          gl_FragColor = vec4(color.rgb, color.a * alpha);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uImageSizes: { value: [1, 1] },
        uPlaneSizes: { value: [1, 1] },
        uSpeed: { value: 0 },
        uTime: { value: Math.random() * 100 },
        uBorderRadius: { value: this.borderRadius }
      },
      transparent: true
    });

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = this.image;
    img.onload = () => {
      texture.image = img;
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
    };
  }

  createMesh() {
    this.plane = new Mesh(this.gl, { geometry: this.geometry, program: this.program });
    this.plane.setParent(this.scene);
  }

  createLabel() {
    this.label = new Label({
      gl: this.gl,
      parent: this.plane,
      text: this.text,
      textColor: this.textColor,
      font: this.font
    });
  }

  onResize({ screen, viewport } = {}) {
    if (screen) this.screen = screen;
    if (viewport) this.viewport = viewport;

    const scale = this.screen.height / 920;
    this.plane.scale.y = (this.viewport.height * (520 * scale)) / this.screen.height;
    this.plane.scale.x = (this.viewport.width * (430 * scale)) / this.screen.width;
    this.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];

    this.padding = 1.15;
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }

  update(scroll, direction) {
    this.plane.position.x = this.x - scroll.current - this.extra;

    const x = this.plane.position.x;
    const half = this.viewport.width / 2;
    if (this.bend !== 0) {
      const bend = Math.abs(this.bend);
      const radius = (half * half + bend * bend) / (2 * bend);
      const clampedX = Math.min(Math.abs(x), half);
      const arc = radius - Math.sqrt(radius * radius - clampedX * clampedX);
      this.plane.position.y = this.bend > 0 ? -arc : arc;
      this.plane.rotation.z = (this.bend > 0 ? -1 : 1) * Math.sign(x) * Math.asin(clampedX / radius);
    }

    const speed = scroll.current - scroll.last;
    this.program.uniforms.uTime.value += 0.035;
    this.program.uniforms.uSpeed.value = speed;

    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width / 2;
    const before = this.plane.position.x + planeOffset < -viewportOffset;
    const after = this.plane.position.x - planeOffset > viewportOffset;
    if (direction === 'right' && before) this.extra -= this.widthTotal;
    if (direction === 'left' && after) this.extra += this.widthTotal;
  }
}

class GalleryApp {
  constructor(container, { items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase }) {
    bindMethods(this);
    this.container = container;
    this.items = items;
    this.bend = bend;
    this.textColor = textColor;
    this.borderRadius = borderRadius;
    this.font = font;
    this.scrollSpeed = scrollSpeed;
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };
    this.isIntersecting = true;
    this.isDocumentVisible = !document.hidden;
    this.motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.raf = 0;
    this.resizeRaf = 0;
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createItems();
    this.addEventListeners();
    this.update();
  }

  createRenderer() {
    const dprLimit = window.innerWidth <= 768 ? 1 : 1.5;
    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, dprLimit)
    });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.gl.canvas);
  }

  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
  }

  createScene() {
    this.scene = new Transform();
  }

  createGeometry() {
    this.geometry = new Plane(this.gl, { widthSegments: 48, heightSegments: 24 });
  }

  createItems() {
    const data = this.items.concat(this.items);
    this.medias = data.map((item, index) => (
      new GalleryItem({
        gl: this.gl,
        geometry: this.geometry,
        scene: this.scene,
        image: item.image,
        text: item.text,
        target: item.target,
        index,
        length: data.length,
        screen: this.screen,
        viewport: this.viewport,
        bend: this.bend,
        textColor: this.textColor,
        borderRadius: this.borderRadius,
        font: this.font
      })
    ));
  }

  onResize() {
    this.screen = { width: this.container.clientWidth, height: this.container.clientHeight };
    this.renderer?.setSize(this.screen.width, this.screen.height);
    this.camera?.perspective({ aspect: this.screen.width / this.screen.height });
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = { width, height };
    this.medias?.forEach((media) => media.onResize({ screen: this.screen, viewport: this.viewport }));
  }

  onWindowResize() {
    if (this.resizeRaf) return;
    this.resizeRaf = window.requestAnimationFrame(() => {
      this.resizeRaf = 0;
      this.onResize();
    });
  }

  onVisibilityChange() {
    this.isDocumentVisible = !document.hidden;
    this.syncAnimation();
  }

  onIntersection(entries) {
    this.isIntersecting = entries[0]?.isIntersecting ?? false;
    this.syncAnimation();
  }

  syncAnimation() {
    const shouldRun = this.isIntersecting && this.isDocumentVisible && !this.motionPreference.matches;
    if (shouldRun && !this.raf) {
      this.raf = window.requestAnimationFrame(this.update);
    } else if (!shouldRun && this.raf) {
      window.cancelAnimationFrame(this.raf);
      this.raf = 0;
    }
  }

  onWheel(event) {
    if (!this.container.matches(':hover')) return;
    const delta = event.deltaY || event.wheelDelta || event.detail;
    this.scroll.target += (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.22;
  }

  onPointerDown(event) {
    this.isDown = true;
    this.start = event.clientX;
    this.pointerStart = { x: event.clientX, y: event.clientY };
    this.pointerMoved = false;
    this.startTarget = this.scroll.target;
    this.container.setPointerCapture?.(event.pointerId);
  }

  onPointerMove(event) {
    if (!this.isDown) return;
    if (this.pointerStart) {
      const distance = Math.hypot(event.clientX - this.pointerStart.x, event.clientY - this.pointerStart.y);
      if (distance > 7) this.pointerMoved = true;
    }
    this.scroll.target = this.startTarget + (this.start - event.clientX) * 0.016 * this.scrollSpeed;
  }

  onPointerUp(event) {
    if (this.isDown && !this.pointerMoved) {
      this.openItemAt(event.clientX, event.clientY);
    }
    this.isDown = false;
    this.pointerStart = null;
    this.container.releasePointerCapture?.(event.pointerId);
  }

  openItemAt(clientX, clientY) {
    const rect = this.container.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width - 0.5) * this.viewport.width;
    const y = (0.5 - (clientY - rect.top) / rect.height) * this.viewport.height;

    const hit = this.medias
      ?.filter((media) => {
        const halfWidth = media.plane.scale.x * 0.58;
        const halfHeight = media.plane.scale.y * 0.64;
        return (
          x >= media.plane.position.x - halfWidth &&
          x <= media.plane.position.x + halfWidth &&
          y >= media.plane.position.y - halfHeight &&
          y <= media.plane.position.y + halfHeight
        );
      })
      .sort((a, b) => Math.abs(a.plane.position.x - x) - Math.abs(b.plane.position.x - x))[0];

    if (!hit?.target) return;

    const section = document.querySelector(hit.target);
    if (!section) return;

    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.pushState(null, '', hit.target);
  }

  onKeyDown(event) {
    if (event.key === 'ArrowRight') this.scroll.target += this.scrollSpeed * 1.8;
    if (event.key === 'ArrowLeft') this.scroll.target -= this.scrollSpeed * 1.8;
  }

  addEventListeners() {
    window.addEventListener('resize', this.onWindowResize, { passive: true });
    document.addEventListener('visibilitychange', this.onVisibilityChange);
    this.motionPreference.addEventListener?.('change', this.syncAnimation);
    this.container.addEventListener('wheel', this.onWheel, { passive: true });
    this.container.addEventListener('pointerdown', this.onPointerDown);
    this.container.addEventListener('pointermove', this.onPointerMove);
    this.container.addEventListener('pointerup', this.onPointerUp);
    this.container.addEventListener('pointercancel', this.onPointerUp);
    this.container.addEventListener('keydown', this.onKeyDown);
    this.visibilityObserver = new IntersectionObserver(this.onIntersection, { rootMargin: '180px 0px' });
    this.visibilityObserver.observe(this.container);
  }

  update() {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const direction = this.scroll.current > this.scroll.last ? 'right' : 'left';
    this.medias?.forEach((media) => media.update(this.scroll, direction));
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = 0;
    if (this.isIntersecting && this.isDocumentVisible && !this.motionPreference.matches) {
      this.raf = window.requestAnimationFrame(this.update);
    }
  }

  destroy() {
    window.cancelAnimationFrame(this.raf);
    window.cancelAnimationFrame(this.resizeRaf);
    window.removeEventListener('resize', this.onWindowResize);
    document.removeEventListener('visibilitychange', this.onVisibilityChange);
    this.motionPreference.removeEventListener?.('change', this.syncAnimation);
    this.container.removeEventListener('wheel', this.onWheel);
    this.container.removeEventListener('pointerdown', this.onPointerDown);
    this.container.removeEventListener('pointermove', this.onPointerMove);
    this.container.removeEventListener('pointerup', this.onPointerUp);
    this.container.removeEventListener('pointercancel', this.onPointerUp);
    this.container.removeEventListener('keydown', this.onKeyDown);
    this.visibilityObserver?.disconnect();
    this.renderer?.gl?.canvas?.remove();
  }
}

function CircularGallery({
  items,
  bend = 2.2,
  textColor = '#f4f1ea',
  borderRadius = 0.055,
  font = '700 30px Inter, sans-serif',
  scrollSpeed = 2,
  scrollEase = 0.055
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !items?.length) return undefined;
    const app = new GalleryApp(containerRef.current, {
      items,
      bend,
      textColor,
      borderRadius,
      font,
      scrollSpeed,
      scrollEase
    });
    return () => app.destroy();
  }, [items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase]);

  return (
    <div
      ref={containerRef}
      className="circular-gallery"
      tabIndex={0}
      role="region"
      aria-label="Featured portfolio category gallery. Drag or use arrow keys to navigate."
    />
  );
}

export default CircularGallery;
