import './RouteMap.css'

const STOPS = [
  { code: 'UA', title: 'Ukraine', note: 'Where you begin' },
  { code: '↗', title: 'Train', note: 'Fast transfer' },
  { code: 'PL', title: 'European hub', note: 'PL · MD · RO' },
  { code: '◇', title: 'Airport', note: 'Your connection' },
  { code: '✦', title: 'Destination', note: 'The world ahead', active: true },
]

const COUNTRIES = ['Poland', 'Moldova', 'Romania', 'Slovakia', 'Hungary']

export function RouteMap() {
  return (
    <section className="route container">
      <div className="route__head">
        <div className="route__head-left">
          <p className="route__eyebrow">THE SMART WAY</p>
          <h2 className="route__title">
            There is no
            <br />
            direct flight.
            <br />
            <span>We know the way.</span>
          </h2>
        </div>
        <p className="route__text">
          We select routes from Ukraine through the nearest airports in
          Europe — Poland, Moldova, Romania and other countries. One clear
          route, made for you.
        </p>
      </div>

      <div className="route__map">
        <div className="route__glow" aria-hidden="true" />

        <div className="route__stops">
          {STOPS.map((stop) => (
            <div className="route__stop" key={stop.title}>
              <span
                className={
                  'route__dot' + (stop.active ? ' route__dot--active' : '')
                }
              >
                {stop.code}
              </span>
              <strong>{stop.title}</strong>
              <span className="route__note">{stop.note}</span>
            </div>
          ))}
        </div>

        <div className="route__footer">
          <div className="route__pills">
            {COUNTRIES.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
          <a className="route__link" href="/tours">
            The route is ours. The choice is yours <span>↗</span>
          </a>
        </div>
      </div>
    </section>
  )
}
