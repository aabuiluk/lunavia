import heroImage from '../assets/tickets/tickets_bus_img.png'
import greeceImg from '../assets/tickets/greece.png'
import barcelonaImg from '../assets/tickets/barcelona.png'
import antalyaImg from '../assets/tickets/turkey.png'

import './TicketsPage.css'

export const pageMeta = {
  path: '/tickets',
  title: 'Airline tickets',
  order: 3,
}

export default function TicketsPage() {
  return (
    <>
      {/* HERO */}

      <section
        className="tickets-hero"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="container tickets-hero__inner">

          <div className="tickets-hero__title">
            <h1>tickets</h1>
            <p>choose where you go</p>
          </div>

          <div className="tickets-search">

            <div className="tickets-search__field">
              <span>STARTING FROM</span>
              <strong>Ukraine</strong>
            </div>

            <div className="tickets-search__field">
              <span>TYPE OF VEHICLE</span>
              <strong>Intercity bus</strong>
            </div>

            <div className="tickets-search__field">
              <span>WHERE TO?</span>
              <strong>In Europe</strong>
            </div>

            <div className="tickets-search__row">

              <div className="tickets-search__field">
                <span>WHEN?</span>
                <strong>This autumn</strong>
              </div>

              <div className="tickets-search__field">
                <span>BUDGET</span>
                <strong>€100–300+</strong>
              </div>

            </div>

            <button
              type="button"
              className="tickets-search__button"
            >
              Find →
            </button>

          </div>

        </div>
      </section>


      {/* DESTINATIONS */}

      <section className="tickets-destinations">
        <div className="container">

          <p className="tickets-destinations__season">
            AUTUMN, 2026
          </p>

          <h2 className="tickets-destinations__title">
            Where do you
            <br />
            want to go?
          </h2>


          {/* DESTINATION PHOTOS */}

          <div className="tickets-destinations__photos">

            <div
              className="tickets-photo tickets-photo--large"
              style={{ backgroundImage: `url(${greeceImg})` }}
            >
              <span className="tickets-photo__tag">
                BEACH
              </span>

              <div className="tickets-photo__bottom">
                <span>Greek Islands</span>
                <strong>€299</strong>
              </div>
            </div>


            <div
              className="tickets-photo tickets-photo--large"
              style={{ backgroundImage: `url(${barcelonaImg})` }}
            >
              <span className="tickets-photo__tag">
                CITY
              </span>

              <div className="tickets-photo__bottom">
                <span>Barcelona</span>
                <strong>€279</strong>
              </div>
            </div>


            <div
              className="tickets-photo tickets-photo--small"
              style={{ backgroundImage: `url(${antalyaImg})` }}
            >
              <span className="tickets-photo__tag">
                FAMILY
              </span>

              <div className="tickets-photo__bottom">
                <span>Antalya</span>
                <strong>€319</strong>
              </div>
            </div>

          </div>


          {/* OFFER CARDS */}

          <div className="tickets-offers">

            <div className="tickets-offer">

              <div className="tickets-offer__top">
                <span>CURATED ROUTE</span>
                <span className="tickets-offer__sale">
                  -16%
                </span>
              </div>

              <h3>ANTALYA</h3>

              <p>
                7 nights · 4★ hotel
              </p>

              <div className="tickets-offer__route">
                Ukraine → Chișinău → Antalya
              </div>

              <div className="tickets-offer__bottom">
                <strong>€294</strong>

                <button type="button">
                  →
                </button>
              </div>

            </div>


            <div className="tickets-offer">

              <div className="tickets-offer__top">
                <span>CURATED ROUTE</span>
                <span className="tickets-offer__sale">
                  -17%
                </span>
              </div>

              <h3>RHODES</h3>

              <p>
                7 nights · 4★ hotel
              </p>

              <div className="tickets-offer__route">
                Ukraine → Warsaw → Rhodes
              </div>

              <div className="tickets-offer__bottom">
                <strong>€333</strong>

                <button type="button">
                  →
                </button>
              </div>

            </div>


            <div className="tickets-offer">

              <div className="tickets-offer__top">
                <span>CURATED ROUTE</span>
                <span className="tickets-offer__sale">
                  -16%
                </span>
              </div>

              <h3>MALLORCA</h3>

              <p>
                5 nights · boutique stay
              </p>

              <div className="tickets-offer__route">
                Ukraine → Kraków → Palma
              </div>

              <div className="tickets-offer__bottom">
                <strong>€157</strong>

                <button type="button">
                  →
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>
    </>
  )
}