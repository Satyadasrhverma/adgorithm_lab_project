/* =========================================================
   contact.js — Working contact form
   - Validates the fields
   - Saves each submission in the browser (localStorage)
   - Shows a success message AND lists captured info in a table
     so you can clearly see the data was collected.

   NOTE: This is front-end only (no server). To email the data to
   your inbox, replace saveSubmission() with a call to a service
   like Formspree / FormSubmit / your own backend (see README).
   ========================================================= */

const STORAGE_KEY = 'vorldx_contact_submissions';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  renderSubmissions(); // show anything already saved

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validate(form)) return;

    const data = {
      name:    form.name.value.trim(),
      email:   form.email.value.trim(),
      company: form.company.value.trim(),
      type:    form.type.value,
      budget:  form.budget.value,
      message: form.message.value.trim(),
      date:    new Date().toLocaleString(),
    };

    saveSubmission(data);
    renderSubmissions();
    form.reset();

    const msg = document.getElementById('formMsg');
    msg.textContent = `Thanks, ${data.name}! Your message has been received. We'll reach out at ${data.email}.`;
    msg.classList.add('show');
    msg.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => msg.classList.remove('show'), 6000);
  });
});

/* Check required fields; mark invalid ones */
function validate(form) {
  let ok = true;
  const required = ['name', 'email', 'message'];

  // clear old states
  form.querySelectorAll('.field').forEach(f => f.classList.remove('invalid'));

  required.forEach(id => {
    const input = form[id];
    const field = input.closest('.field');
    if (!input.value.trim()) { field.classList.add('invalid'); ok = false; }
  });

  // basic email format check
  const email = form.email;
  if (email.value && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)) {
    email.closest('.field').classList.add('invalid'); ok = false;
  }
  return ok;
}

/* Save to localStorage (array of submissions) */
function saveSubmission(data) {
  const all = getSubmissions();
  all.unshift(data);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

function getSubmissions() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
}

/* Show captured submissions in the table */
function renderSubmissions() {
  const mount = document.getElementById('submissionsBody');
  if (!mount) return;
  const all = getSubmissions();

  if (!all.length) {
    mount.innerHTML = `<tr><td colspan="5" class="empty">No messages yet — submit the form above to see captured info here.</td></tr>`;
    return;
  }
  mount.innerHTML = all.map(s => `
    <tr>
      <td>${esc(s.date)}</td>
      <td>${esc(s.name)}</td>
      <td>${esc(s.email)}</td>
      <td>${esc(s.type || '-')}</td>
      <td>${esc(s.message)}</td>
    </tr>`).join('');
}

/* Clear all saved submissions (button under the table) */
function clearSubmissions() {
  if (confirm('Delete all saved messages?')) {
    localStorage.removeItem(STORAGE_KEY);
    renderSubmissions();
  }
}

/* Prevent HTML injection when showing user text */
function esc(str = '') {
  return String(str).replace(/[&<>"']/g, c =>
    ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
}
