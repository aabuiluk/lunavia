import './SupportPage.css'
import heroImage from '../assets/support/support_img_one.png'
import { useState } from 'react'
import phoneIcon from '../assets/support/phone.png'
import chatIcon from '../assets/support/message.png'
import mailIcon from '../assets/support/mail.png'

export const pageMeta = {
    path: '/support',
    title: 'Support',
    order: 5,
    summary: 'Help with bookings, routes, and travel questions.',
}

export default function SupportPage() {
    const [openFaq, setOpenFaq] = useState(0)
    const [searchInput, setSearchInput] = useState('')
    const [searchQuery, setSearchQuery] = useState('')

    const faqs = [
        {
            question: 'How do I make changes to my travel booking or route?',
            answer:
                'You can modify your flights, trains, and hotel connections directly through your Lunavia profile up to 48 hours prior to your scheduled departure. For last-minute structural changes, our dedicated 24/7 destination architects can re-route your itinerary instantly.',
        },
        {
            question: 'What is the cancellation and refund policy?',
            answer:
                'Cancellation and refund conditions depend on your booking type and selected travel package.',
        },
        {
            question: 'What payment methods do you accept?',
            answer:
                'We accept major credit and debit cards as well as supported online payment methods.',
        },
        {
            question: 'Are luggage rules and transfer baggage handles included?',
            answer:
                'Baggage rules depend on the airline, train operator, and travel package included in your booking.',
        },
        {
            question: 'Do you provide visa assistance for international destinations?',
            answer:
                'Yes, our support team can provide general guidance regarding visa requirements for your destination.',
        },
        {
            question: 'How does travel insurance cover emergency cancellations?',
            answer:
                'Coverage depends on your insurance provider and the specific policy attached to your booking.',
        },
    ]
    const filteredFaqs = faqs.filter((faq) => {
        const query = searchQuery.toLowerCase().trim()

        if (!query) return true

        return (
            faq.question.toLowerCase().includes(query) ||
            faq.answer.toLowerCase().includes(query)
        )
    })

    return (
        <main className="support-page">
            <section className="support-hero">
                <img
                    className="support-hero__background"
                    src={heroImage}
                    alt=""
                />

                <div className="support-hero__overlay" />

                <div className="support-hero__content">
                    <p className="support-hero__label">
                        ● LUNAVIA SUPPORT CENTER
                    </p>

                    <h1 className="support-hero__title">
                        How can we help?
                    </h1>

                    <p className="support-hero__description">
                        Find answers regarding your booking routes, cancellation
                        options, travel documents, and active tour packages.
                    </p>

                    <div className="support-search">
                        <input
                            className="support-search__input"
                            type="text"
                            placeholder="Search FAQ..."
                            value={searchInput}
                            onChange={(event) => setSearchInput(event.target.value)}
                        />

                        <button
                            className="support-search__button"
                            type="button"
                            onClick={() => setSearchQuery(searchInput)}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </section>
            <section className="support-contact">
                <div className="support-contact__container">

                    <p className="support-contact__label">
                        GET IN TOUCH
                    </p>

                    <h2 className="support-contact__title">
                        We're here for you 24/7
                    </h2>

                    <div className="support-contact__grid">

                        <article className="support-card">
                            <div className="support-card__icon">
                                <img src={phoneIcon} alt="" />
                            </div>

                            <h3>Phone Support</h3>

                            <p>
                                Talk directly to our destination route architects
                                who can assist with active transfers.
                            </p>

                            <a href="tel:+3801231231212">
                                +380 123 123 12 12 →
                            </a>
                        </article>

                        <article className="support-card">
                            <div className="support-card__icon">
                               <img src={mailIcon} alt="" />
                            </div>

                            <h3>Email Support</h3>

                            <p>
                                Send us your tour booking documents or bulk
                                group travel inquiries.
                            </p>

                            <a href="mailto:support@lunavia.ua">
                                support@lunavia.ua →
                            </a>
                        </article>

                        <article className="support-card">
                            <div className="support-card__icon">
                                <img src={chatIcon} alt="" />
                            </div>

                            <h3>Live Chat</h3>

                            <p>
                                Instant live help with your current train, hotel,
                                or flight connection on the go.
                            </p>

                            <button
                                className="support-card__link"
                                type="button"
                                onClick={() => alert('Live Chat coming soon')}
                            >
                                Open Live Chat →
                            </button>
                        </article>

                    </div>
                </div>
            </section>
            <section className="support-faq">
                <div className="support-faq__container">

                    <p className="support-faq__label">
                        COMMON INQUIRIES
                    </p>

                    <h2 className="support-faq__title">
                        Frequently Asked Questions
                    </h2>

                    <div className="support-faq__list">
                        {filteredFaqs.map((faq, index) => {
                            const isOpen = openFaq === index

                            return (
                                <div
                                    className={`support-faq__item ${isOpen ? 'support-faq__item--open' : ''
                                        }`}
                                    key={faq.question}
                                >
                                    <button
                                        className="support-faq__question"
                                        type="button"
                                        onClick={() => setOpenFaq(isOpen ? -1 : index)}
                                        aria-expanded={isOpen}
                                        aria-controls={`faq-answer-${index}`}
                                    >
                                        <span>{faq.question}</span>

                                        <span className="support-faq__button">
                                            {isOpen ? '−' : '+'}
                                        </span>
                                    </button>

                                    {isOpen && (
                                        <p
                                            id={`faq-answer-${index}`}
                                            className="support-faq__answer"
                                        >
                                            {faq.answer}
                                        </p>
                                    )}
                                </div>
                            )
                        })}
                    </div>

                </div>
            </section>
        </main>
    )
import React, { useState } from 'react';
import heroImage from '../assets/support_img_one.png';
import phoneIcon from '../assets/phone.png';
import chatIcon from '../assets/massage.png';
import mailIcon from '../assets/mail.png';
import './SupportPage.css';

export const pageMeta = {
  path: '/support',
  title: 'Support',
  order: 3,
  summary: 'Get help, contact our team, and browse FAQs.',
};

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      question: 'Is travel insurance included in my booking?',
      answer: 'Coverage depends on your insurance provider and the specific policy attached to your booking.',
    },
    {
      question: 'How can I change or cancel my travel route?',
      answer: 'You can modify or cancel your tickets directly through your account dashboard or by contacting our 24/7 support team.',
    },
    {
      question: 'What payment methods are supported?',
      answer: 'We accept credit cards, bank transfers, and major payment systems including Google Pay and Apple Pay.',
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query)
    );
  });

  return (
    <main className="support-page">
      <section className="support-hero">
        <img className="support-hero__background" src={heroImage} alt="Support background" />
        <div className="support-hero__overlay" />

        <div className="support-hero__content">
          <span className="support-hero__label">WE ARE HERE TO HELP</span>
          <h1 className="support-hero__title">How can we assist you?</h1>
          <p className="support-hero__description">
            Search our knowledge base or reach out to our team for help with your routes, bookings, and policies.
          </p>

          <div className="support-search">
            <input
              className="support-search__input"
              type="text"
              placeholder="Search FAQ, booking ID, destination..."
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
            />
            <button
              className="support-search__button"
              type="button"
              onClick={() => setSearchQuery(searchInput)}
            >
              Search
            </button>
          </div>
        </div>
      </section>


      <section className="support-contact">
        <div className="support-contact__container">
          <p className="support-contact__label">GET IN TOUCH</p>
          <h2 className="support-contact__title">Other ways to reach us</h2>

          <div className="support-contact__grid">
            <article className="support-card">
              <div className="support-card__icon">
                <img src={chatIcon} alt="Chat" />
              </div>
              <h3>Live Chat</h3>
              <p>Chat with our support assistant instantly for quick answers on the go.</p>
              <button
                className="support-card__link"
                type="button"
                onClick={() => alert('Live Chat coming soon')}
              >
                Open Live Chat →
              </button>
            </article>

            <article className="support-card">
              <div className="support-card__icon">
                <img src={phoneIcon} alt="Phone" />
              </div>
              <h3>Phone Support</h3>
              <p>Call our hotline directly if you have an urgent issue with your flight or train.</p>
              <a href="tel:+380000000000" className="support-card__link">
                +380 (00) 000-00-00 →
              </a>
            </article>

            <article className="support-card">
              <div className="support-card__icon">
                <img src={mailIcon} alt="Email" />
              </div>
              <h3>Email Support</h3>
              <p>Send us a detailed message and we will get back to you within 24 hours.</p>
              <a href="mailto:support@lunavia.com" className="support-card__link">
                support@lunavia.com →
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* FAQ СЕКЦИЯ */}
      <section className="support-faq">
        <div className="support-faq__container">
          <p className="support-faq__label">FAQ</p>
          <h2 className="support-faq__title">Frequently Asked Questions</h2>

          <div className="support-faq__list">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={index}
                  className={`support-faq__item ${isOpen ? 'support-faq__item--open' : ''}`}
                >
                  <button
                    className="support-faq__question"
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span>{faq.question}</span>
                    <span className="support-faq__button">{isOpen ? '−' : '+'}</span>
                  </button>

                  {isOpen && (
                    <p
                      id={`faq-answer-${index}`}
                      className="support-faq__answer"
                    >
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}