# Vorldx Adgorithm Lab — Website

A simple, multi-page website built with plain **HTML, CSS, and JavaScript**.
No build tools, no frameworks — just open the files in a browser.

## How to run

Just double-click **`index.html`** to open it in your browser.

> Tip: For the cleanest experience (so all links and scripts behave like a real
> site), run a tiny local server instead:
> ```
> python -m http.server 8000
> ```
> Then open http://localhost:8000

## Pages

| Page      | File            | What it shows                                  |
|-----------|-----------------|------------------------------------------------|
| Home      | `index.html`    | Hero, what we do, stats, process, CTA          |
| About     | `about.html`    | Story, mission/vision/values, journey stats    |
| Services  | `services.html` | 4 service cards + process timeline             |
| Blog      | `blog.html`     | 6 article cards                                |
| Careers   | `careers.html`  | Perks + open positions                         |
| Contact   | `contact.html`  | **Working form** that captures info            |

> The **Portfolio** page from the original design was removed on purpose.

## File structure

```
adgorithm_lab/
├── index.html, about.html, services.html, blog.html, careers.html, contact.html
├── css/
│   └── style.css        ← all styling (colors are at the top in :root)
└── js/
    ├── components.js     ← builds the navbar + footer on every page
    ├── main.js           ← scroll animations + number counters
    └── contact.js        ← contact form: validate, save, show messages
```

## The contact form

When someone submits the form:
1. It checks that Name, Email and Message are filled in correctly.
2. It saves the submission in the browser (`localStorage`).
3. It shows a success message and lists the captured info in a table below.

This is **front-end only** — the data stays in the visitor's browser. To actually
receive submissions in your inbox, connect a free form service:

### Option A — Formspree (easiest)
1. Sign up at https://formspree.io and create a form (you get a URL).
2. In `contact.html`, change the `<form>` tag to:
   ```html
   <form id="contactForm" action="https://formspree.io/f/YOUR_ID" method="POST">
   ```
3. In `js/contact.js`, let the form submit normally (remove `e.preventDefault()`),
   or use `fetch()` to POST the data to that URL.

### Option B — Your own backend
Send the `data` object in `contact.js` to your API with `fetch('/api/contact', {...})`.

## Customizing

- **Colors / fonts:** edit the variables at the top of `css/style.css` (`:root`).
- **Menu links:** edit `NAV_ITEMS` in `js/components.js`.
- **Footer:** edit `buildFooter()` in `js/components.js`.
# adgorithm_lab_project
