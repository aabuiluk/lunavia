import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  apiSend,
  getAdminToken,
  setAdminToken,
} from '../api/client'
import './AdminPage.css'

export const pageMeta = {
  path: '/admin',
  title: 'Admin',
  order: 999,
  nav: false,
  listed: false,
  summary: 'Edit site page content from the FastAPI store.',
}

function Field({ label, value, onChange, type = 'text', multiline = false }) {
  return (
    <label className="admin-field">
      <span>{label}</span>
      {multiline ? (
        <textarea rows={4} value={value ?? ''} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input
          type={type}
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  )
}

function ListBlock({ title, items, onChange, blank, addLabel, children }) {
  return (
    <div className="admin-list">
      <div className="admin-list__head">
        <h3>{title}</h3>
        <button
          type="button"
          className="btn btn--ghost admin-btn-small"
          onClick={() =>
            onChange([
              ...(items || []),
              typeof blank === 'function' ? blank() : structuredClone(blank),
            ])
          }
        >
          {addLabel}
        </button>
      </div>
      {(items || []).map((item, index) => (
        <div key={item.id ?? index} className="admin-card">
          {children(item, index, (next) => {
            const copy = [...items]
            copy[index] = next
            onChange(copy)
          })}
          <button
            type="button"
            className="admin-remove"
            onClick={() => onChange(items.filter((_, i) => i !== index))}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  )
}

function patch(obj, key, value) {
  return { ...obj, [key]: value }
}

function HomeEditor({ draft, setDraft }) {
  return (
    <>
      <Field label="Brand" value={draft.brand} onChange={(v) => setDraft(patch(draft, 'brand', v))} />
      <Field label="Title" value={draft.title} onChange={(v) => setDraft(patch(draft, 'title', v))} />
      <Field
        label="Title highlight"
        value={draft.titleHighlight}
        onChange={(v) => setDraft(patch(draft, 'titleHighlight', v))}
      />
      <Field
        label="Title suffix"
        value={draft.titleSuffix}
        onChange={(v) => setDraft(patch(draft, 'titleSuffix', v))}
      />
      <Field
        label="Lead"
        multiline
        value={draft.lead}
        onChange={(v) => setDraft(patch(draft, 'lead', v))}
      />
      <Field label="Image URL" value={draft.image} onChange={(v) => setDraft(patch(draft, 'image', v))} />
      <Field
        label="Image alt"
        value={draft.imageAlt}
        onChange={(v) => setDraft(patch(draft, 'imageAlt', v))}
      />
      <ListBlock
        title="Actions"
        items={draft.actions}
        onChange={(actions) => setDraft(patch(draft, 'actions', actions))}
        blank={{ label: '', href: '/', variant: 'light' }}
        addLabel="Add action"
      >
        {(item, _i, update) => (
          <>
            <Field label="Label" value={item.label} onChange={(v) => update(patch(item, 'label', v))} />
            <Field label="Href" value={item.href} onChange={(v) => update(patch(item, 'href', v))} />
            <label className="admin-field">
              <span>Variant</span>
              <select
                value={item.variant || 'light'}
                onChange={(e) => update(patch(item, 'variant', e.target.value))}
              >
                <option value="light">light</option>
                <option value="ghost">ghost</option>
              </select>
            </label>
          </>
        )}
      </ListBlock>
    </>
  )
}

function ToursEditor({ draft, setDraft }) {
  const cta = draft.cta || { label: '', href: '/' }
  return (
    <>
      <Field label="Eyebrow" value={draft.eyebrow} onChange={(v) => setDraft(patch(draft, 'eyebrow', v))} />
      <Field label="Title" value={draft.title} onChange={(v) => setDraft(patch(draft, 'title', v))} />
      <Field label="Lead" multiline value={draft.lead} onChange={(v) => setDraft(patch(draft, 'lead', v))} />
      <Field
        label="Button label"
        value={cta.label}
        onChange={(v) => setDraft(patch(draft, 'cta', patch(cta, 'label', v)))}
      />
      <Field
        label="Button href"
        value={cta.href}
        onChange={(v) => setDraft(patch(draft, 'cta', patch(cta, 'href', v)))}
      />
    </>
  )
}

function RegisterEditor({ draft, setDraft }) {
  return (
    <>
      <Field label="Tag" value={draft.tag} onChange={(v) => setDraft(patch(draft, 'tag', v))} />
      <Field label="Title" value={draft.title} onChange={(v) => setDraft(patch(draft, 'title', v))} />
      <Field label="Lead" multiline value={draft.lead} onChange={(v) => setDraft(patch(draft, 'lead', v))} />
      <ListBlock
        title="Fields"
        items={draft.fields}
        onChange={(fields) => setDraft(patch(draft, 'fields', fields))}
        blank={{ name: '', label: '', type: 'text', placeholder: '' }}
        addLabel="Add field"
      >
        {(item, _i, update) => (
          <>
            <Field label="Name" value={item.name} onChange={(v) => update(patch(item, 'name', v))} />
            <Field label="Label" value={item.label} onChange={(v) => update(patch(item, 'label', v))} />
            <Field label="Type" value={item.type} onChange={(v) => update(patch(item, 'type', v))} />
            <Field
              label="Placeholder"
              value={item.placeholder}
              onChange={(v) => update(patch(item, 'placeholder', v))}
            />
          </>
        )}
      </ListBlock>
    </>
  )
}

function TemplateEditor({ draft, setDraft }) {
  const cta = draft.cta || { label: '', href: '/' }
  return (
    <>
      <Field label="Eyebrow" value={draft.eyebrow} onChange={(v) => setDraft(patch(draft, 'eyebrow', v))} />
      <Field label="Title" value={draft.title} onChange={(v) => setDraft(patch(draft, 'title', v))} />
      <Field label="Lead" multiline value={draft.lead} onChange={(v) => setDraft(patch(draft, 'lead', v))} />
      <ListBlock
        title="Steps"
        items={draft.steps}
        onChange={(steps) => setDraft(patch(draft, 'steps', steps))}
        blank={{ title: '', text: '' }}
        addLabel="Add step"
      >
        {(item, _i, update) => (
          <>
            <Field label="Title" value={item.title} onChange={(v) => update(patch(item, 'title', v))} />
            <Field
              label="Text"
              multiline
              value={item.text}
              onChange={(v) => update(patch(item, 'text', v))}
            />
          </>
        )}
      </ListBlock>
      <Field
        label="Button label"
        value={cta.label}
        onChange={(v) => setDraft(patch(draft, 'cta', patch(cta, 'label', v)))}
      />
      <Field
        label="Button href"
        value={cta.href}
        onChange={(v) => setDraft(patch(draft, 'cta', patch(cta, 'href', v)))}
      />
    </>
  )
}

function AboutEditor({ draft, setDraft, tab, setTab }) {
  const tabs = ['Hero', 'Story', 'Stats', 'Values', 'Team', 'CTA']
  const hero = draft.hero || {}
  const story = draft.story || {}
  const valuesIntro = draft.valuesIntro || {}
  const teamIntro = draft.teamIntro || {}
  const cta = draft.cta || {}

  return (
    <>
      <div className="admin-tabs" role="tablist">
        {tabs.map((name) => (
          <button
            key={name}
            type="button"
            className={tab === name ? 'is-active' : ''}
            onClick={() => setTab(name)}
          >
            {name}
          </button>
        ))}
      </div>

      {tab === 'Hero' ? (
        <>
          <Field label="Brand" value={hero.brand} onChange={(v) => setDraft(patch(draft, 'hero', patch(hero, 'brand', v)))} />
          <Field label="Title" value={hero.title} onChange={(v) => setDraft(patch(draft, 'hero', patch(hero, 'title', v)))} />
          <Field
            label="Title highlight"
            value={hero.titleHighlight}
            onChange={(v) => setDraft(patch(draft, 'hero', patch(hero, 'titleHighlight', v)))}
          />
          <Field
            label="Lead"
            multiline
            value={hero.lead}
            onChange={(v) => setDraft(patch(draft, 'hero', patch(hero, 'lead', v)))}
          />
          <Field label="Image URL" value={hero.image} onChange={(v) => setDraft(patch(draft, 'hero', patch(hero, 'image', v)))} />
          <Field
            label="Image alt"
            value={hero.imageAlt}
            onChange={(v) => setDraft(patch(draft, 'hero', patch(hero, 'imageAlt', v)))}
          />
          <ListBlock
            title="Actions"
            items={hero.actions}
            onChange={(actions) => setDraft(patch(draft, 'hero', patch(hero, 'actions', actions)))}
            blank={{ label: '', href: '#', variant: 'light' }}
            addLabel="Add action"
          >
            {(item, _i, update) => (
              <>
                <Field label="Label" value={item.label} onChange={(v) => update(patch(item, 'label', v))} />
                <Field label="Href" value={item.href} onChange={(v) => update(patch(item, 'href', v))} />
                <label className="admin-field">
                  <span>Variant</span>
                  <select
                    value={item.variant || 'light'}
                    onChange={(e) => update(patch(item, 'variant', e.target.value))}
                  >
                    <option value="light">light</option>
                    <option value="ghost">ghost</option>
                  </select>
                </label>
              </>
            )}
          </ListBlock>
        </>
      ) : null}

      {tab === 'Story' ? (
        <>
          <Field label="Eyebrow" value={story.eyebrow} onChange={(v) => setDraft(patch(draft, 'story', patch(story, 'eyebrow', v)))} />
          <Field label="Title" value={story.title} onChange={(v) => setDraft(patch(draft, 'story', patch(story, 'title', v)))} />
          <Field
            label="Title highlight"
            value={story.titleHighlight}
            onChange={(v) => setDraft(patch(draft, 'story', patch(story, 'titleHighlight', v)))}
          />
          <Field
            label="Paragraphs (one per line)"
            multiline
            value={(story.paragraphs || []).join('\n\n')}
            onChange={(v) =>
              setDraft(
                patch(draft, 'story', {
                  ...story,
                  paragraphs: v.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean),
                }),
              )
            }
          />
          <Field label="Image URL" value={story.image} onChange={(v) => setDraft(patch(draft, 'story', patch(story, 'image', v)))} />
          <Field
            label="Image alt"
            value={story.imageAlt}
            onChange={(v) => setDraft(patch(draft, 'story', patch(story, 'imageAlt', v)))}
          />
        </>
      ) : null}

      {tab === 'Stats' ? (
        <ListBlock
          title="Milestones"
          items={draft.milestones}
          onChange={(milestones) => setDraft(patch(draft, 'milestones', milestones))}
          blank={{ value: '', label: '' }}
          addLabel="Add milestone"
        >
          {(item, _i, update) => (
            <>
              <Field label="Value" value={item.value} onChange={(v) => update(patch(item, 'value', v))} />
              <Field label="Label" value={item.label} onChange={(v) => update(patch(item, 'label', v))} />
            </>
          )}
        </ListBlock>
      ) : null}

      {tab === 'Values' ? (
        <>
          <Field
            label="Eyebrow"
            value={valuesIntro.eyebrow}
            onChange={(v) => setDraft(patch(draft, 'valuesIntro', patch(valuesIntro, 'eyebrow', v)))}
          />
          <Field
            label="Title"
            value={valuesIntro.title}
            onChange={(v) => setDraft(patch(draft, 'valuesIntro', patch(valuesIntro, 'title', v)))}
          />
          <Field
            label="Lead"
            multiline
            value={valuesIntro.lead}
            onChange={(v) => setDraft(patch(draft, 'valuesIntro', patch(valuesIntro, 'lead', v)))}
          />
          <ListBlock
            title="Values"
            items={draft.values}
            onChange={(values) => setDraft(patch(draft, 'values', values))}
            blank={{ title: '', text: '' }}
            addLabel="Add value"
          >
            {(item, _i, update) => (
              <>
                <Field label="Title" value={item.title} onChange={(v) => update(patch(item, 'title', v))} />
                <Field
                  label="Text"
                  multiline
                  value={item.text}
                  onChange={(v) => update(patch(item, 'text', v))}
                />
              </>
            )}
          </ListBlock>
        </>
      ) : null}

      {tab === 'Team' ? (
        <>
          <Field
            label="Eyebrow"
            value={teamIntro.eyebrow}
            onChange={(v) => setDraft(patch(draft, 'teamIntro', patch(teamIntro, 'eyebrow', v)))}
          />
          <Field
            label="Title"
            value={teamIntro.title}
            onChange={(v) => setDraft(patch(draft, 'teamIntro', patch(teamIntro, 'title', v)))}
          />
          <Field
            label="Lead"
            multiline
            value={teamIntro.lead}
            onChange={(v) => setDraft(patch(draft, 'teamIntro', patch(teamIntro, 'lead', v)))}
          />
          <ListBlock
            title="Team"
            items={draft.team}
            onChange={(team) => setDraft(patch(draft, 'team', team))}
            blank={() => ({ id: Date.now(), name: '', role: '', photo: '' })}
            addLabel="Add member"
          >
            {(item, _i, update) => (
              <>
                <Field label="Name" value={item.name} onChange={(v) => update(patch(item, 'name', v))} />
                <Field label="Role" value={item.role} onChange={(v) => update(patch(item, 'role', v))} />
                <Field label="Photo URL" value={item.photo} onChange={(v) => update(patch(item, 'photo', v))} />
              </>
            )}
          </ListBlock>
        </>
      ) : null}

      {tab === 'CTA' ? (
        <>
          <Field label="Title" value={cta.title} onChange={(v) => setDraft(patch(draft, 'cta', patch(cta, 'title', v)))} />
          <Field
            label="Text"
            multiline
            value={cta.text}
            onChange={(v) => setDraft(patch(draft, 'cta', patch(cta, 'text', v)))}
          />
          <Field
            label="Button label"
            value={cta.buttonLabel}
            onChange={(v) => setDraft(patch(draft, 'cta', patch(cta, 'buttonLabel', v)))}
          />
          <Field label="Email" value={cta.email} onChange={(v) => setDraft(patch(draft, 'cta', patch(cta, 'email', v)))} />
          <Field label="Image URL" value={cta.image} onChange={(v) => setDraft(patch(draft, 'cta', patch(cta, 'image', v)))} />
        </>
      ) : null}
    </>
  )
}

function PageEditor({ slug, draft, setDraft, tab, setTab }) {
  if (slug === 'home') return <HomeEditor draft={draft} setDraft={setDraft} />
  if (slug === 'tours') return <ToursEditor draft={draft} setDraft={setDraft} />
  if (slug === 'register') return <RegisterEditor draft={draft} setDraft={setDraft} />
  if (slug === 'template') return <TemplateEditor draft={draft} setDraft={setDraft} />
  if (slug === 'about') {
    return <AboutEditor draft={draft} setDraft={setDraft} tab={tab} setTab={setTab} />
  }
  return (
    <Field
      label="JSON"
      multiline
      value={JSON.stringify(draft, null, 2)}
      onChange={(v) => {
        try {
          setDraft(JSON.parse(v))
        } catch {
          /* keep typing */
        }
      }}
    />
  )
}

export default function AdminPage() {
  const [session, setSession] = useState(null)
  const [authError, setAuthError] = useState('')
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('admin')
  const [pages, setPages] = useState([])
  const [slug, setSlug] = useState('about')
  const [draft, setDraft] = useState(null)
  const [tab, setTab] = useState('Hero')
  const [status, setStatus] = useState('')
  const [busy, setBusy] = useState(false)

  const current = useMemo(
    () => pages.find((page) => page.slug === slug),
    [pages, slug],
  )

  useEffect(() => {
    const token = getAdminToken()
    if (!token) return
    apiSend('/api/admin/me')
      .then((me) => setSession(me))
      .catch(() => {
        setAdminToken(null)
        setSession(null)
      })
  }, [])

  useEffect(() => {
    if (!session) return
    apiSend('/api/admin/pages')
      .then((list) => {
        setPages(list)
        setSlug((current) =>
          list.some((page) => page.slug === current) ? current : list[0]?.slug || current,
        )
      })
      .catch((err) => setStatus(err.message))
  }, [session])

  useEffect(() => {
    if (!session || !slug) return
    const controller = new AbortController()
    apiSend(`/api/${slug}`, { signal: controller.signal })
      .then(setDraft)
      .catch((err) => {
        if (err.name === 'AbortError') return
        setStatus(err.message)
      })
    return () => controller.abort()
  }, [session, slug])

  async function handleLogin(event) {
    event.preventDefault()
    setAuthError('')
    try {
      const result = await apiSend('/api/admin/login', {
        method: 'POST',
        body: { username, password },
        token: '',
      })
      setAdminToken(result.token)
      setSession({ username: result.username })
    } catch (err) {
      setAuthError(err.message || 'Login failed')
    }
  }

  async function handleLogout() {
    try {
      await apiSend('/api/admin/logout', { method: 'POST' })
    } catch {
      /* still clear locally */
    }
    setAdminToken(null)
    setSession(null)
    setDraft(null)
  }

  async function handleSave(event) {
    event.preventDefault()
    if (!draft) return
    setBusy(true)
    setStatus('')
    try {
      const saved = await apiSend(`/api/admin/pages/${slug}`, {
        method: 'PUT',
        body: draft,
      })
      setDraft(saved)
      setStatus('Saved. Open the public page to see the change.')
    } catch (err) {
      setStatus(err.message)
    } finally {
      setBusy(false)
    }
  }

  if (!session) {
    return (
      <div className="admin-login">
        <form className="admin-login__card" onSubmit={handleLogin}>
          <p className="eyebrow">Lunavia</p>
          <h1>Admin</h1>
          <p>Sign in to edit page content stored in FastAPI.</p>
          <Field label="Username" value={username} onChange={setUsername} />
          <Field
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
          />
          {authError ? <p className="admin-error">{authError}</p> : null}
          <button className="btn" type="submit">
            Sign in
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="admin-shell">
      <aside className="admin-side">
        <div>
          <p className="eyebrow">Lunavia</p>
          <h1>Admin</h1>
          <p className="admin-side__user">{session.username}</p>
        </div>
        <nav aria-label="Pages">
          {pages.map((page) => (
            <button
              key={page.slug}
              type="button"
              className={page.slug === slug ? 'is-active' : ''}
              onClick={() => {
                setSlug(page.slug)
                setTab('Hero')
              }}
            >
              <strong>{page.title}</strong>
              <span>{page.api}</span>
            </button>
          ))}
        </nav>
        <button type="button" className="btn btn--ghost" onClick={handleLogout}>
          Log out
        </button>
      </aside>

      <section className="admin-main">
        <header className="admin-main__head">
          <div>
            <span className="eyebrow">{current?.api || `/api/${slug}`}</span>
            <h2>{current?.title || slug}</h2>
          </div>
          {current?.path ? (
            <Link className="btn btn--ghost" to={current.path}>
              View page
            </Link>
          ) : null}
        </header>

        {draft ? (
          <form className="admin-form" onSubmit={handleSave}>
            <PageEditor
              slug={slug}
              draft={draft}
              setDraft={setDraft}
              tab={tab}
              setTab={setTab}
            />
            {status ? <p className="admin-status">{status}</p> : null}
            <button className="btn" type="submit" disabled={busy}>
              {busy ? 'Saving…' : 'Save changes'}
            </button>
          </form>
        ) : (
          <p>Loading page content…</p>
        )}
      </section>
    </div>
  )
}
