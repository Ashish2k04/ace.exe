import React, { useRef, useEffect } from 'react';

// Particles Around the Parent
class Particle {
  originX: number;
  originY: number;
  angle: number;
  radius: number;
  opacity: number;
  distance: number;
  speed: number;
  position: { x: number; y: number };

  constructor(x: number, y: number, distance: number) {
    this.originX = x;
    this.originY = y;
    this.angle = Math.random() * 2 * Math.PI;
    this.radius = Math.random();
    this.opacity = (Math.random() * 5 + 2) / 10;
    this.distance = (1 / this.opacity) * distance;
    this.speed = this.distance * 0.00003;

    this.position = {
      x: x + this.distance * Math.cos(this.angle),
      y: y + this.distance * Math.sin(this.angle),
    };
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'rgba(255,255,255,' + this.opacity + ')';
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
  }

  update(ctx: CanvasRenderingContext2D) {
    this.angle += this.speed;
    this.position = {
      x: this.originX + this.distance * Math.cos(this.angle),
      y: this.originY + this.distance * Math.sin(this.angle),
    };
    this.draw(ctx);
  }
}

class Emitter {
  position: { x: number; y: number };
  radius: number;
  count: number;
  particles: Particle[];

  constructor(x: number, y: number) {
    this.position = { x, y };
    this.radius = 30;
    this.count = 3000;
    this.particles = [];

    for (let i = 0; i < this.count; i++) {
      this.particles.push(new Particle(this.position.x, this.position.y, this.radius));
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
  }

  update(ctx: CanvasRenderingContext2D) {
    for (let i = 0; i < this.count; i++) {
      this.particles[i].update(ctx);
    }
    this.draw(ctx);
  }
}

interface BlackHoleProps {
  className?: string;
}

const BlackHole: React.FC<BlackHoleProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let emitter: Emitter;

    // Pre-drawn static star layer — painted once per init, sits behind particles
    let starCanvas: HTMLCanvasElement | null = null;

    const drawStars = (w: number, h: number) => {
      starCanvas = document.createElement('canvas');
      starCanvas.width = w;
      starCanvas.height = h;
      const sCtx = starCanvas.getContext('2d');
      if (!sCtx) return;
      const count = Math.floor((w * h) / 3000);
      for (let i = 0; i < count; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const r = Math.random() * 0.9 + 0.1;
        const opacity = Math.random() * 0.55 + 0.1;
        sCtx.beginPath();
        sCtx.arc(x, y, r, 0, Math.PI * 2);
        sCtx.fillStyle = `rgba(255,255,255,${opacity})`;
        sCtx.fill();
      }
    };

    const init = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      drawStars(canvas.width, canvas.height);
      emitter = new Emitter(canvas.width / 2, canvas.height / 2);
    };

    init();

    const handleResize = () => {
      init();
    };

    window.addEventListener('resize', handleResize);

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Draw the static star layer first so particles animate on top
      if (starCanvas) {
        ctx.drawImage(starCanvas, 0, 0);
      }
      emitter.update(ctx);
      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="particle"
      className={`absolute inset-0 w-full h-full block ${className}`}
    />
  );
};

export default BlackHole;

