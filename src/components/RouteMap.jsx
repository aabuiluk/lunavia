import { Fragment } from 'react'
import './RouteMap.css'

const STOPS = [
  { code: 'UA', title: 'Ukraine', note: 'Where you begin' },
  { code: '↗', title: 'Train', note: 'Fast transfer' },
  { code: 'PL', title: 'European hub', note: 'PL · MD · RO' },
  { code: '◇', title: 'Airport', note: 'Your connection' },
  { code: '✦', title: 'Destination', note: 'The world ahead', active: true },
]

const COUNTRIES = ['Poland', 'Moldova', 'Romania', 'Slovakia', 'Hungary']

export function RouteMap({ data }) {
  const stops = data?.stops ?? STOPS
  const countries = data?.countries ?? COUNTRIES
  const titleLines = data?.titleLines ?? ['There is no', 'direct flight.']

  return (
    <section className="route container">
      <div className="route__head">
        <div className="route__head-left">
          <p className="route__eyebrow">{data?.eyebrow ?? 'THE SMART WAY'}</p>
          <h2 className="route__title">
            {titleLines.map((line) => <Fragment key={line}>{line}<br /></Fragment>)}
            <span>{data?.titleHighlight ?? 'We know the way.'}</span>
          </h2>
        </div>
        <p className="route__text">
          {data?.text ?? 'We select routes from Ukraine through the nearest airports in Europe — Poland, Moldova, Romania and other countries. One clear route, made for you.'}
        </p>
      </div>

      <div className="route__map">
        <div className="route__glow" aria-hidden="true" />

        <div className="route__stops">
          {stops.map((stop) => (
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
            {countries.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
          <a className="route__link" href={data?.link?.href ?? '/tours'}>
            {data?.link?.label ?? 'The route is ours. The choice is yours'} <span>↗</span>
          </a>
        </div>
      </div>
    </section>
  )
}
