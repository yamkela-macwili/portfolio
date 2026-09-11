import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

interface Packet {
  x: number;
  y: number;
  tx: number; // Target x
  ty: number; // Target y
  progress: number;
  speed: number;
}

export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let packets: Packet[] = [];
    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(Math.floor((width * height) / 15000), 100);
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update and draw particles
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse interaction: slight repulsion/attraction or just connection
        const dxMouse = p.x - mouseRef.current.x;
        const dyMouse = p.y - mouseRef.current.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        
        if (distMouse < 200) {
            // Gentle attraction
            p.x -= dxMouse * 0.01;
            p.y -= dyMouse * 0.01;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fill();

        // Connect particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 150;

          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const opacity = 1 - distance / maxDistance;
            ctx.strokeStyle = `rgba(16, 185, 129, ${opacity * 0.15})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Randomly spawn a packet
            if (Math.random() < 0.0005) {
                packets.push({
                    x: p.x,
                    y: p.y,
                    tx: p2.x,
                    ty: p2.y,
                    progress: 0,
                    speed: 0.02 + Math.random() * 0.03
                });
            }
          }
        }
        
        // Connect to mouse
        if (distMouse < 200) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            const opacity = 1 - distMouse / 200;
            ctx.strokeStyle = `rgba(52, 211, 153, ${opacity * 0.2})`; // Emerald-400
            ctx.stroke();
        }
      });

      // Draw and update packets (data flow)
      for (let i = packets.length - 1; i >= 0; i--) {
          const pkt = packets[i];
          pkt.progress += pkt.speed;
          
          if (pkt.progress >= 1) {
              packets.splice(i, 1);
              continue;
          }

          const currX = pkt.x + (pkt.tx - pkt.x) * pkt.progress;
          const currY = pkt.y + (pkt.ty - pkt.y) * pkt.progress;

          ctx.beginPath();
          ctx.arc(currX, currY, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = '#34d399'; // Emerald-400
          ctx.fill();
          
          // Glow effect for packet
          ctx.shadowBlur = 4;
          ctx.shadowColor = '#34d399';
          ctx.fill();
          ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ background: 'transparent' }} 
    />
  );
}
