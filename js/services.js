/* =========================================================
   services.js — Detailed service flowcharts
   Click a service card -> shows a long, animated vertical
   flowchart with the theory/explanation for each step,
   plus what you get (deliverables).
   ========================================================= */

const SERVICES = {
  content: {
    icon: '✦', title: 'Content Creation',
    intro: 'Great content is the engine of every brand. We turn your ideas into scroll-stopping videos, reels and posts that build trust and grow your audience — backed by data, not guesswork.',
    steps: [
      { t: 'Discovery & Ideation', d: 'We study your brand, audience and competitors, then brainstorm content ideas that actually resonate with the people you want to reach.' },
      { t: 'Scripting & Planning', d: 'Every reel, video and post is scripted and placed in a clear content calendar, so nothing is random and everything has a purpose.' },
      { t: 'Production & Design', d: 'Our creators shoot, design and produce high-quality assets — from short-form video to carousels and thumbnails.' },
      { t: 'Editing & AI Enhancement', d: 'We edit, add captions and use AI tools to polish, resize and optimize each asset for the platform it lives on.' },
      { t: 'Publishing & Distribution', d: 'Content is scheduled and published at the best times across all your channels for maximum reach.' },
      { t: 'Analytics & Iteration', d: 'We track what performs, learn from the numbers, and double down on the formats that drive real growth.' },
    ],
    deliverables: ['Social media posts', 'Reels & shorts', 'YouTube videos', 'Content calendar', 'Captions & hashtags', 'Monthly report'],
  },
  ai: {
    icon: '⚙', title: 'AI Automation',
    intro: 'Stop wasting hours on repetitive work. We design smart AI agents and automations that handle the busywork — so your team can focus on strategy, creativity and customers.',
    steps: [
      { t: 'Process Audit', d: 'We map your current workflows and find the repetitive, time-draining tasks that are perfect candidates for automation.' },
      { t: 'Solution Design', d: 'We design the automation blueprint — which tools, AI agents and triggers will do the job reliably.' },
      { t: 'Build & Train', d: 'We build the automations and train AI agents/chatbots on your data, tone and rules.' },
      { t: 'Integration', d: 'Everything is connected to the tools you already use — CRM, email, WhatsApp, sheets and more.' },
      { t: 'Testing & Launch', d: 'We test edge cases, fix issues and roll the automation out safely into your daily operations.' },
      { t: 'Monitor & Optimize', d: 'We keep an eye on performance and continuously improve accuracy, speed and savings.' },
    ],
    deliverables: ['AI agents', 'Chatbots', 'Workflow automation', 'CRM integrations', 'Documentation', 'Ongoing support'],
  },
  branding: {
    icon: '◈', title: 'Branding',
    intro: 'Your brand is how the world remembers you. We craft a distinct identity — visuals, voice and story — that makes you instantly recognizable and impossible to ignore.',
    steps: [
      { t: 'Brand Research', d: 'We dig into your mission, market and audience to understand what your brand should stand for.' },
      { t: 'Strategy & Concept', d: 'We define your positioning, personality and core message — the foundation everything else is built on.' },
      { t: 'Visual Identity', d: 'Logo, colors, typography and graphic style come together into a cohesive, memorable look.' },
      { t: 'Brand Guidelines', d: 'We document exactly how to use your brand so it stays consistent everywhere.' },
      { t: 'Asset Creation', d: 'We design the marketing assets you need — from business cards to social templates.' },
      { t: 'Launch & Rollout', d: 'We help you introduce the brand to the world with a confident, consistent rollout.' },
    ],
    deliverables: ['Logo design', 'Brand identity', 'Color & typography', 'Brand guidelines', 'Social templates', 'Marketing assets'],
  },
  growth: {
    icon: '↗', title: 'Growth Marketing',
    intro: 'Visibility means nothing without results. We run data-driven campaigns across search, social and ads that bring you real leads, customers and measurable revenue growth.',
    steps: [
      { t: 'Audience & Goals', d: 'We define who you want to reach and the exact business goals each campaign must hit.' },
      { t: 'Strategy & Channels', d: 'We choose the right mix of SEO, paid ads and social to reach your audience efficiently.' },
      { t: 'Campaign Build', d: 'We create the landing pages, ad creatives and copy designed to convert.' },
      { t: 'Launch & Track', d: 'Campaigns go live with full tracking so every click and rupee is measured.' },
      { t: 'Optimize', d: 'We A/B test and refine targeting, creative and budget to lower cost and lift results.' },
      { t: 'Scale', d: 'Once we find what works, we scale spend confidently to maximize return.' },
    ],
    deliverables: ['SEO optimization', 'Paid advertising', 'Landing pages', 'Lead generation', 'A/B testing', 'Performance dashboard'],
  },
};

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.service-cards .card');
  const detail = document.getElementById('serviceDetail');
  if (!cards.length || !detail) return;

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const key = card.dataset.service;
      // highlight the active card
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      renderDetail(key, detail);
      detail.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });
});

function renderDetail(key, mount) {
  const s = SERVICES[key];
  if (!s) return;

  mount.innerHTML = `
    <div class="sd-head">
      <div class="ic">${s.icon}</div>
      <h3>${s.title}</h3>
    </div>
    <p class="sd-intro">${s.intro}</p>
    <div class="sd-grid">
      <div>
        <p class="sd-sub">How we do it — step by step</p>
        <div class="vflow">
          ${s.steps.map((step, i) => `
            <div class="vstep" style="animation-delay:${i * 0.12}s">
              <div class="num">${i + 1}</div>
              <h4>${step.t}</h4>
              <p>${step.d}</p>
            </div>`).join('')}
        </div>
      </div>
      <div>
        <p class="sd-sub">What you get</p>
        <div class="deliverables">
          ${s.deliverables.map(d => `<span>${d}</span>`).join('')}
        </div>
        <a href="contact.html" class="btn btn-primary" style="margin-top:26px">Get Started →</a>
      </div>
    </div>`;

  mount.classList.add('show');
  // animate the flow steps in one-by-one
  const steps = mount.querySelectorAll('.vstep');
  steps.forEach((st, i) => setTimeout(() => st.classList.add('in'), 150 + i * 120));
}
