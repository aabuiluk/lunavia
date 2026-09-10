import './WhyUs.css'

const REASONS = [
  {
    n: '01',
    title: 'Smart routes',
    text: 'The best mix of trains, transfers and flights.',
  },
  {
    n: '02',
    title: 'Better prices',
    text: 'We check departure cities so you get real value.',
  },
  {
    n: '03',
    title: 'Local Secrets',
    text: 'Discover hidden gems and authentic places beyond the usual tourist routes.',
  },
  {
    n: '04',
    title: 'Everything together',
    text: 'Transport, flights, hotels and transfers in one place.',
  },
  {
    n: '05',
    title: 'Personal support',
    text: 'Real people before you leave and while you travel.',
  },
  {
    n: '06',
    title: 'Easy Planning',
    text: 'Enjoy a seamless travel experience with every detail thoughtfully arranged for you.',
  },
]

export function WhyUs() {
  return (
    <section className="why container">
      <div className="why__head">
        <p className="why__eyebrow">WHY LUNAVIA</p>
        <h2 className="why__title">
          Less logistics.
          <br />
          <span>More living.</span>
        </h2>
      </div>

      <div className="why__grid">
        {REASONS.map((r) => (
          <div className="why__item" key={r.n}>
            <span className="why__num">{r.n}</span>
            <h4>{r.title}</h4>
            <p>{r.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
