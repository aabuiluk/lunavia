import { Link } from 'react-router-dom'
import './PlaceholderPage.css'
import './ToursPage.css'

export const pageMeta = {
  path: '/tours',
  title: 'Tours',
  order: 2,
  summary: 'Explore all our tours and packages.',
}

const TOURS_HERO = 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=2000&q=80'

export default function ToursPage() {
  return (
    <main className="tours-page">
      <section className="tours-hero">
        <img className="tours-hero__media" src={TOURS_HERO} alt="Ocean from above" />
        <div className="tours-hero__veil" />
        <div className="container tours-hero__content">
          <p className="tours-hero__eyebrow rise">FIND YOUR NEXT ADVENTURE</p>
          <h1 className="rise rise-delay-1">
            All our tours <br /><span>&</span> Packages
          </h1>
        </div>
      </section>

      <div className="container search-wrapper rise rise-delay-2">
        <div className="search-panel">
          <div className="search-item">
            <span className="search-label">START?</span>
            <span className="search-value">Ukraine</span>
            <span className="search-sub">Flights + trains + hotels — compared for you.</span>
          </div>
          <div className="search-divider"></div>
          <div className="search-item">
            <span className="search-label">WHERE?</span>
            <span className="search-value">Anywhere</span>
          </div>
          <div className="search-divider"></div>
          <div className="search-item">
            <span className="search-label">DATES</span>
            <span className="search-value">Choose dates</span>
          </div>
          <div className="search-divider"></div>
          <div className="search-item">
            <span className="search-label">TRAVELERS</span>
            <span className="search-value">2</span>
          </div>
          <button className="btn search-btn">Find route &rarr;</button>
        </div>
      </div>

      <section className="container filters-section">
        <button className="filter-btn active">All</button>
        <button className="filter-btn">Beach</button>
        <button className="filter-btn">City</button>
        <button className="filter-btn">Mountain</button>
        <button className="filter-btn">Family</button>
        <button className="filter-btn">Last-minute</button>
      </section>

      <section className="container tours-grid">
        <div className="tour-card">
          <div className="tour-card__image-wrap">
            <img src="https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800" alt="Greek Island" />
            <div className="tour-card__badges">
              <span className="badge badge--white">BEACH</span>
              <span className="badge badge--teal">-€86</span>
            </div>
          </div>
          <div className="tour-card__info">
            <h3>GREEK ISLAND</h3>
            <p className="tour-card__meta">7 nights • 4★ hotel</p>
            <p className="tour-card__route">Ukraine &rarr; Chișinău &rarr; Greek island</p>
            <div className="tour-card__bottom">
              <p className="tour-card__price">&euro;299 <span>/person</span></p>
              <button className="tour-card__arrow">&rarr;</button>
            </div>
          </div>
        </div>
        <div className="tour-card">
          <div className="tour-card__image-wrap">
            <img src="https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=800" alt="Barcelona" />
            <div className="tour-card__badges">
              <span className="badge badge--white">CITY</span>
              <span className="badge badge--teal">-€65</span>
            </div>
          </div>
          <div className="tour-card__info">
            <h3>BARCELONA</h3>
            <p className="tour-card__meta">7 nights • 4★ hotel</p>
            <p className="tour-card__route">Ukraine &rarr; Chișinău &rarr; Barcelona</p>
            <div className="tour-card__bottom">
              <p className="tour-card__price">&euro;279 <span>/person</span></p>
              <button className="tour-card__arrow">&rarr;</button>
            </div>
          </div>
        </div>
        <div className="tour-card">
          <div className="tour-card__image-wrap">
            <img src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=800" alt="Antalya" />
            <div className="tour-card__badges">
              <span className="badge badge--white">FAMILY</span>
              <span className="badge badge--teal">-€50</span>
            </div>
          </div>
          <div className="tour-card__info">
            <h3>ANTALYA</h3>
            <p className="tour-card__meta">7 nights • 4★ hotel</p>
            <p className="tour-card__route">Ukraine &rarr; Chișinău &rarr; Antalya</p>
            <div className="tour-card__bottom">
              <p className="tour-card__price">&euro;319 <span>/person</span></p>
              <button className="tour-card__arrow">&rarr;</button>
            </div>
          </div>
        </div>
        <div className="tour-card">
          <div className="tour-card__image-wrap">
            <img src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800" alt="Paris" />
            <div className="tour-card__badges">
              <span className="badge badge--white">CITY</span>
            </div>
          </div>
          <div className="tour-card__info">
            <h3>PARIS</h3>
            <p className="tour-card__meta">7 nights • 4★ hotel</p>
            <p className="tour-card__route">Ukraine &rarr; Warsaw &rarr; Paris</p>
            <div className="tour-card__bottom">
              <p className="tour-card__price">&euro;550 <span>/person</span></p>
              <button className="tour-card__arrow">&rarr;</button>
            </div>
          </div>
        </div>
        <div className="tour-card">
          <div className="tour-card__image-wrap">
            <img src="https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=800" alt="Rome" />
            <div className="tour-card__badges">
              <span className="badge badge--white">CITY</span>
            </div>
          </div>
          <div className="tour-card__info">
            <h3>ROME</h3>
            <p className="tour-card__meta">7 nights • 4★ hotel</p>
            <p className="tour-card__route">Ukraine &rarr; Chișinău &rarr; Rome</p>
            <div className="tour-card__bottom">
              <p className="tour-card__price">&euro;620 <span>/person</span></p>
              <button className="tour-card__arrow">&rarr;</button>
            </div>
          </div>
        </div>
        <div className="tour-card">
          <div className="tour-card__image-wrap">
            <img src="https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=800" alt="Tokyo" />
            <div className="tour-card__badges">
              <span className="badge badge--white">FAMILY</span>
            </div>
          </div>
          <div className="tour-card__info">
            <h3>TOKYO</h3>
            <p className="tour-card__meta">7 nights • 4★ hotel</p>
            <p className="tour-card__route">Ukraine &rarr; Chișinău &rarr; Istanbul &rarr; Tokyo</p>
            <div className="tour-card__bottom">
              <p className="tour-card__price">&euro;1250 <span>/person</span></p>
              <button className="tour-card__arrow">&rarr;</button>
            </div>
          </div>
        </div>
        <div className="tour-card">
          <div className="tour-card__image-wrap">
            <img src="https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?q=80&w=800" alt="Phuket" />
            <div className="tour-card__badges">
              <span className="badge badge--white">BEACH</span>
            </div>
          </div>
          <div className="tour-card__info">
            <h3>PHUKET</h3>
            <p className="tour-card__meta">7 nights • 4★ hotel</p>
            <p className="tour-card__route">Ukraine &rarr; Chișinău &rarr; Istanbul &rarr; Phuket</p>
            <div className="tour-card__bottom">
              <p className="tour-card__price">&euro;899 <span>/person</span></p>
              <button className="tour-card__arrow">&rarr;</button>
            </div>
          </div>
        </div>
        <div className="tour-card">
          <div className="tour-card__image-wrap">
            <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800" alt="Bali" />
            <div className="tour-card__badges">
              <span className="badge badge--white">BEACH</span>
            </div>
          </div>
          <div className="tour-card__info">
            <h3>BALI</h3>
            <p className="tour-card__meta">7 nights • 4★ hotel</p>
            <p className="tour-card__route">Ukraine &rarr; Chișinău &rarr; Istanbul &rarr; Bali</p>
            <div className="tour-card__bottom">
              <p className="tour-card__price">&euro;1250 <span>/person</span></p>
              <button className="tour-card__arrow">&rarr;</button>
            </div>
          </div>
        </div>
        <div className="tour-card">
          <div className="tour-card__image-wrap">
            <img src="https://res.klook.com/image/upload/fl_lossy.progressive,q_60/Mobile/City/mto5pdt9gm6p1hsiedhz.jpg" alt="Beijing" />
            <div className="tour-card__badges">
              <span className="badge badge--white">CITY</span>
            </div>
          </div>
          <div className="tour-card__info">
            <h3>BEIJING</h3>
            <p className="tour-card__meta">7 nights • 4★ hotel</p>
            <p className="tour-card__route">Ukraine &rarr; Chișinău &rarr; Istanbul &rarr; Beijing</p>
            <div className="tour-card__bottom">
              <p className="tour-card__price">&euro;1500 <span>/person</span></p>
              <button className="tour-card__arrow">&rarr;</button>
            </div>
          </div>
        </div>
        <div className="tour-card">
          <div className="tour-card__image-wrap">
            <img src="https://startpeak.ru/wp-content/uploads/2018/09/DSCF6694.jpg" alt="Amsterdam" />
            <div className="tour-card__badges">
              <span className="badge badge--white">CITY</span>
            </div>
          </div>
          <div className="tour-card__info">
            <h3>AMSTERDAM</h3>
            <p className="tour-card__meta">7 nights • 4★ hotel</p>
            <p className="tour-card__route">Ukraine &rarr; Warsaw &rarr; Amsterdam</p>
            <div className="tour-card__bottom">
              <p className="tour-card__price">&euro;450 <span>/person</span></p>
              <button className="tour-card__arrow">&rarr;</button>
            </div>
          </div>
        </div>
        <div className="tour-card">
          <div className="tour-card__image-wrap">
            <img src="https://images.unsplash.com/photo-1519677100203-a0e668c92439?q=80&w=800" alt="Prague" />
            <div className="tour-card__badges">
              <span className="badge badge--white">CITY</span>
            </div>
          </div>
          <div className="tour-card__info">
            <h3>PRAGUE</h3>
            <p className="tour-card__meta">7 nights • 4★ hotel</p>
            <p className="tour-card__route">Ukraine &rarr; Prague</p>
            <div className="tour-card__bottom">
              <p className="tour-card__price">&euro;380 <span>/person</span></p>
              <button className="tour-card__arrow">&rarr;</button>
            </div>
          </div>
        </div>
        <div className="tour-card">
          <div className="tour-card__image-wrap">
            <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800" alt="Dubai" />
            <div className="tour-card__badges">
              <span className="badge badge--white">CITY</span>
            </div>
          </div>
          <div className="tour-card__info">
            <h3>DUBAI</h3>
            <p className="tour-card__meta">7 nights • 4★ hotel</p>
            <p className="tour-card__route">Ukraine &rarr; Chișinău &rarr; Dubai</p>
            <div className="tour-card__bottom">
              <p className="tour-card__price">&euro;850 <span>/person</span></p>
              <button className="tour-card__arrow">&rarr;</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}