/**
 * Auto-discovers site pages next to this file (`src/pages/*Page.jsx`).
 * Each page that should appear in the site must export `pageMeta`:
 *
 *   export const pageMeta = {
 *     path: '/tours',
 *     title: 'Tours',
 *     order: 2,
 *     summary: 'Short blurb for the About menu',
 *   }
 *
 * Students: add YourPage.jsx in this folder with `pageMeta` + default export.
 * It will show up in routes, header nav, and the About page menu automatically.
 */

const modules = import.meta.glob('./*Page.jsx', { eager: true })

function toPage(mod) {
  if (!mod?.pageMeta || !mod.default) return null
  const { path, title, order = 100, summary = '', nav = true } = mod.pageMeta
  if (!path || !title) return null
  return {
    path,
    title,
    order,
    summary,
    nav,
    Component: mod.default,
  }
}

export const sitePages = Object.values(modules)
  .map(toPage)
  .filter(Boolean)
  .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title))

/** Pages shown in the main header */
export const navPages = sitePages.filter((page) => page.nav !== false)

/** Sibling pages for menus (excludes the current path) */
export function getSiblingPages(currentPath) {
  return sitePages.filter((page) => page.path !== currentPath)
}
