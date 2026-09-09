import './SupportPage.css'
import heroImage from '../assets/support/support_img_one.png'
import { useState } from 'react'
import phoneIcon from '../assets/support/phone.png'
import chatIcon from '../assets/support/massage.png'

export const pageMeta = {
    path: '/support',
    title: 'Support',
}

export default function SupportPage() {
    const [openFaq, setOpenFaq] = useState(0)

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
                            placeholder="Search for booking ID, destination, policies..."
                        />

                        <button
                            className="support-search__button"
                            type="button"
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
                                ✉
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

                            <a href="#">
                                Open Live Chat →
                            </a>
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
                        {faqs.map((faq, index) => {
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
                                    >
                                        <span>{faq.question}</span>

                                        <span className="support-faq__button">
                                            {isOpen ? '−' : '+'}
                                        </span>
                                    </button>

                                    {isOpen && (
                                        <p className="support-faq__answer">
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
}