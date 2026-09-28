import React, { useState } from 'react';
import './Register.css';
import bungalowImg from '../components/bungalow.jpg';

export const pageMeta = {
  path: '/register',
  title: 'Register',
  order: 2,
  summary: 'Create your Lunavia account.',
};

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof apiSend === 'function') {
      apiSend('/api/register', form);
    } else {
      console.log('Отправленные данные:', form);
    }
  };

  return (
    <div className="split-layout">
      {/* Передаем импортированную картинку из src/components через инлайн-стиль */}
      <div className="left-side" style={{ backgroundImage: `url(${bungalowImg})` }}>
        <div className="left-overlay"></div>
        <div className="overlay-content">
          <div className="brand">
            <span className="brand-dot"></span> Lunavia
          </div>
          <div className="hero-text-container">
            <span className="small-top-label">YOUR ROUTE TO EVERYWHERE</span>
            <div className="hero-heading-wrapper">
              <h1>
                A little less<br />
                planning.<br />
                going.
              </h1>
              <span className="highlight-text-absolute">A lot more</span>
            </div>
          </div>
          <div className="footer-credits">
            Lunavia · Ukraine to anywhere
          </div>
        </div>
      </div>

      <div className="right-side">
        <div className="bg-circle-top"></div>
        <div className="bg-circle-bottom"></div>
        <div className="form-wrapper">
          <div className="form-header">
            <span className="create-account-tag">CREATE ACCOUNT</span>
            <h2>Let’s get you moving.</h2>
            <p>Create your Lunavia account to save routes and travel with more ease.</p>
          </div>

          <form onSubmit={handleSubmit} className="reg-form">
            <div className="input-group">
              <label htmlFor="name">YOUR NAME</label>
              <input
                id="name"
                type="text"
                placeholder="Jonny Dodep"
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">EMAIL ADDRESS</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">PASSWORD</label>
              <div className="password-wrapper">
                <input
                  id="password"
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
                  aria-label="Toggle password visibility"
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

          <button className="btn-google" type="button">
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