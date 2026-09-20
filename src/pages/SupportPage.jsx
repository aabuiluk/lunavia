import React, { useState, useEffect } from 'react';
import './SupportPage.css';

export const pageMeta = {
  path: '/support',
  title: 'Support',
  order: 4,
  summary: 'Support Center and FAQ',
};

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [faqList, setFaqList] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/support/faq?q=${encodeURIComponent(searchQuery)}`)
      .then(res => res.json())
      .then(data => {
        setFaqList(data.results);
      })
      .catch(err => console.error("Ошибка загрузки FAQ:", err));
  }, [searchQuery]);

  const handleTicketSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/support/ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Не удалось отправить запрос");
      }

      alert("Success! " + data.message);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="support-page container" style={{ padding: '40px 0' }}>
      <h1 style={{ marginBottom: '24px' }}>Support Center</h1>

      <div className="faq-search-section" style={{ marginBottom: '40px' }}>
        <input
          type="text"
          placeholder="Search for answers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="faq-search-input"
          style={{ width: '100%', padding: '12px', marginBottom: '16px', borderRadius: '8px', border: '1px solid #ccc' }}
        />
        <div className="faq-list">
          {faqList.map(faq => (
            <div key={faq.id} className="faq-item" style={{ marginBottom: '16px', padding: '16px', background: '#f9f9f9', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>{faq.question}</h3>
              <p style={{ color: '#555' }}>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleTicketSubmit} className="support-form" style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2>Submit a Request</h2>
        <input
          type="text"
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
          style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }}
        />
        <input
          type="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
          style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }}
        />
        <input
          type="text"
          placeholder="Subject"
          value={formData.subject}
          onChange={(e) => setFormData({...formData, subject: e.target.value})}
          required
          style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }}
        />
        <textarea
          placeholder="Describe your issue..."
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          required
          rows="5"
          style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '12px 24px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
          Send Message
        </button>
      </form>
    </div>
  );
}