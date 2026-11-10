import React, { useState, useRef, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';

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
    this.position = { x: x, y: y };
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

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({});
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let emitter: Emitter;

    const init = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      emitter = new Emitter(canvas.width / 2, canvas.height / 2);
    };

    init();

    const handleResize = () => {
      init();
    };

    window.addEventListener('resize', handleResize);

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      emitter.update(ctx);
      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const validateEmail = (val: string): string | undefined => {
    if (!val.trim()) {
      return 'Email is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val.trim())) {
      return 'Please enter a valid email address';
    }
    return undefined;
  };

  const validatePassword = (val: string): string | undefined => {
    if (!val) {
      return 'Password is required';
    }
    if (val.length < 6) {
      return 'Password must be at least 6 characters';
    }
    return undefined;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    if (touched.email) {
      setErrors((prev) => ({ ...prev, email: validateEmail(val) }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPassword(val);
    if (touched.password) {
      setErrors((prev) => ({ ...prev, password: validatePassword(val) }));
    }
  };

  const handleBlur = (field: 'email' | 'password') => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (field === 'email') {
      setErrors((prev) => ({ ...prev, email: validateEmail(email) }));
    } else {
      setErrors((prev) => ({ ...prev, password: validatePassword(password) }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);

    setErrors({
      email: emailErr,
      password: passwordErr,
    });

    if (!emailErr && !passwordErr) {
      // Form is valid - UI only, no backend submission
    }
  };

  return (
    <main className="relative min-h-screen w-full bg-black text-white flex flex-col md:flex-row antialiased selection:bg-white selection:text-black">
      {/* Left Section – Login Form */}
      <section className="relative z-10 w-full md:w-1/2 min-h-screen flex items-center justify-center p-6 sm:p-12 lg:p-16">
        <div className="w-full max-w-sm sm:max-w-md">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-white mb-2">
              Admin Login
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 font-light tracking-wide">
              Please enter your credentials to proceed.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-xs uppercase tracking-wider text-neutral-300 font-light"
              >
                Email
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={() => handleBlur('email')}
                  placeholder="admin@ace.exe"
                  className={`w-full bg-transparent border text-white placeholder:text-neutral-500 text-sm px-4 py-3.5 outline-none transition-colors duration-200 ${
                    touched.email && errors.email
                      ? 'border-neutral-400 focus:border-white'
                      : 'border-white/20 hover:border-white/40 focus:border-white'
                  }`}
                  aria-invalid={Boolean(touched.email && errors.email)}
                  aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
                />
              </div>
              {touched.email && errors.email && (
                <p id="email-error" className="text-xs text-neutral-400 tracking-wide mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-xs uppercase tracking-wider text-neutral-300 font-light"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={() => handleBlur('password')}
                  placeholder="••••••••"
                  className={`w-full bg-transparent border text-white placeholder:text-neutral-500 text-sm px-4 py-3.5 pr-11 outline-none transition-colors duration-200 ${
                    touched.password && errors.password
                      ? 'border-neutral-400 focus:border-white'
                      : 'border-white/20 hover:border-white/40 focus:border-white'
                  }`}
                  aria-invalid={Boolean(touched.password && errors.password)}
                  aria-describedby={
                    touched.password && errors.password ? 'password-error' : undefined
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-1 cursor-pointer focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {touched.password && errors.password && (
                <p id="password-error" className="text-xs text-neutral-400 tracking-wide mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit Button with Water-Fill Hover Effect */}
            <div className="pt-2">
              <button
                type="submit"
                className="group relative w-full h-12 overflow-hidden border border-white bg-transparent text-sm font-medium tracking-widest uppercase text-white transition-colors duration-500 ease-out focus:outline-none focus-visible:ring-1 focus-visible:ring-white cursor-pointer"
              >
                {/* Rising water fill layer */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-white translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0 group-focus-visible:translate-y-0 pointer-events-none"
                />
                {/* Button text */}
                <span className="relative z-10 transition-colors duration-500 ease-out group-hover:text-black group-focus-visible:text-black">
                  Login
                </span>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Right Section – Black Hole Canvas */}
      <section className="absolute inset-0 md:relative md:inset-auto z-0 w-full md:w-1/2 h-full md:min-h-screen flex items-center justify-center overflow-hidden bg-black">
        <canvas
          ref={canvasRef}
          id="particle"
          className="absolute inset-0 w-full h-full block pointer-events-none md:pointer-events-auto"
        />
      </section>
    </main>
  );
};

export default Login;
