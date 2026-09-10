import React, { useState } from 'react';
import './Register.css';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Отправленные данные:', form);
  };

  return (
    <div className="split-layout">
      {/* Левая колонка с картинкой и текстом */}
      <div className="left-side">
        <div className="overlay-content">
          <div className="brand">
            <span className="brand-dot"></span> Lunavia
          </div>
          <div className="hero-text">
            <span className="small-top-label">YOUR ROUTE TO EVERYWHERE</span>
            <h1>A little less planning. <span className="highlight-text">A lot more going.</span></h1>
          </div>
          <div className="footer-credits">
            Lunavia · Ukraine to anywhere
          </div>
        </div>
      </div>

      {/* Правая колонка с формой регистрации */}
      <div className="right-side">
        <div className="form-wrapper">
          <div className="form-header">
            <span className="create-account-tag">CREATE ACCOUNT</span>
            <h2>Let’s get you moving.</h2>
            <p>Create your Lunavia account to save routes and travel with more ease.</p>
          </div>

          <form onSubmit={handleSubmit} className="reg-form">
            <div className="input-group">
              <label>YOUR NAME</label>
              <input
                type="text"
                placeholder="Alina Pupsic"
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                required
              />
            </div>

            <div className="input-group">
              <label>EMAIL ADDRESS</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}
                required
              />
            </div>

            <div className="input-group">
              <label>PASSWORD</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm({...form, password: e.target.value})}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  👁
                </button>
              </div>
            </div>

            <button type="submit" className="btn-primary">
              Create account →
            </button>
          </form>

          <div className="divider">
            <span>OR CONTINUE WITH</span>
          </div>

          <button className="btn-google">
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            Google
          </button>

          <p className="login-footer">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}