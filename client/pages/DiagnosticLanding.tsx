import React from 'react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

  .dl-root *, .dl-root *::before, .dl-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
  .dl-root {
    --teal: #0c3d49; --teal-mid: #1a5f72; --teal-light: #a7dbd6;
    --cream: #f8f1e8; --cream-dark: #ede6da; --ink: #262624; --muted: #5a6a6e;
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--ink);
    overflow-x: hidden;
  }
  .dl-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    padding: 1.25rem 2.5rem;
    display: flex; align-items: center; justify-content: space-between;
    background: rgba(248,241,232,0.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(12,61,73,0.08);
  }
  .dl-nav-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
  .dl-nav-logo-mark {
    width: 32px; height: 32px; border-radius: 50%; background: var(--teal);
    display: flex; align-items: center; justify-content: center;
  }
  .dl-nav-logo-text { font-family: 'DM Serif Display', serif; font-size: 20px; color: var(--teal); }
  .dl-nav-cta {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 9px 22px; border-radius: 24px; background: var(--teal); color: white;
    font-size: 13px; font-weight: 500; text-decoration: none; letter-spacing: 0.02em;
    transition: background 0.15s, transform 0.15s;
  }
  .dl-nav-cta:hover { background: var(--teal-mid); transform: translateY(-1px); }
  .dl-hero {
    min-height: 100vh; display: flex; flex-direction: column;
    align-items: center; justify-content: center; text-align: center;
    padding: 8rem 2rem 6rem; position: relative; overflow: hidden;
  }
  .dl-hero-circle {
    position: absolute; border-radius: 50%; background: rgba(12,61,73,0.045); pointer-events: none;
  }
  .dl-hero-circle.c1 { width: 500px; height: 500px; top: -100px; right: -150px; }
  .dl-hero-circle.c2 { width: 300px; height: 300px; bottom: 60px; left: -80px; background: rgba(167,219,214,0.18); }
  .dl-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 5px 14px; border-radius: 20px;
    background: rgba(167,219,214,0.3); border: 1px solid rgba(12,61,73,0.12);
    font-size: 12px; text-transform: uppercase; letter-spacing: 0.12em;
    color: var(--teal); margin-bottom: 1.5rem;
  }
  .dl-eyebrow-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--teal); }
  .dl-h1 {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(2.8rem, 6vw, 5rem);
    line-height: 1.1; color: var(--teal);
    max-width: 800px; margin: 0 auto 1.5rem;
  }
  .dl-h1 em { font-style: italic; color: var(--teal-mid); }
  .dl-sub {
    font-size: clamp(1rem, 2vw, 1.2rem); color: var(--muted);
    line-height: 1.7; max-width: 560px; margin: 0 auto 2.5rem;
  }
  .dl-cta-row { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; justify-content: center; }
  .dl-btn-primary {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 15px 36px; border-radius: 32px; background: var(--teal); color: white;
    font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 500;
    text-decoration: none; letter-spacing: 0.02em;
    transition: background 0.15s, transform 0.15s, box-shadow 0.15s;
    box-shadow: 0 4px 20px rgba(12,61,73,0.18);
  }
  .dl-btn-primary:hover { background: var(--teal-mid); transform: translateY(-2px); box-shadow: 0 8px 28px rgba(12,61,73,0.22); }
  .dl-btn-secondary {
    font-size: 14px; color: var(--teal); text-decoration: none;
    border-bottom: 1px solid rgba(12,61,73,0.3); padding-bottom: 1px;
    transition: color 0.15s;
  }
  .dl-btn-secondary:hover { color: var(--teal-mid); }
  .dl-hero-note { margin-top: 1.25rem; font-size: 12px; color: #8a9ea2; }
  .dl-what { padding: 6rem 2rem; max-width: 1100px; margin: 0 auto; }
  .dl-section-label { text-align: center; font-size: 11px; text-transform: uppercase; letter-spacing: 0.14em; color: var(--teal); margin-bottom: 0.75rem; }
  .dl-h2 { font-family: 'DM Serif Display', serif; font-size: clamp(1.8rem, 3.5vw, 2.8rem); text-align: center; color: var(--teal); line-height: 1.2; margin-bottom: 1rem; }
  .dl-lead { text-align: center; font-size: 16px; color: var(--muted); line-height: 1.7; max-width: 600px; margin: 0 auto 4rem; }
  .dl-three-col { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
  .dl-feature-card {
    background: white; border-radius: 20px; border: 1px solid rgba(12,61,73,0.08);
    padding: 2rem 1.75rem; transition: transform 0.2s, box-shadow 0.2s;
  }
  .dl-feature-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(12,61,73,0.08); }
  .dl-feature-icon {
    width: 44px; height: 44px; border-radius: 12px;
    background: rgba(167,219,214,0.3);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 1.25rem; font-size: 20px;
  }
  .dl-feature-title { font-size: 16px; font-weight: 500; color: var(--teal); margin-bottom: 0.5rem; }
  .dl-feature-desc { font-size: 14px; color: var(--muted); line-height: 1.65; }
  .dl-how { background: var(--teal); padding: 6rem 2rem; position: relative; overflow: hidden; }
  .dl-how::before { content: ''; position: absolute; top: -80px; right: -80px; width: 320px; height: 320px; border-radius: 50%; background: rgba(167,219,214,0.08); }
  .dl-how .dl-section-label { color: var(--teal-light); }
  .dl-how .dl-h2 { color: white; margin-bottom: 3.5rem; }
  .dl-steps-row { display: grid; grid-template-columns: repeat(4,1fr); gap: 0; max-width: 1000px; margin: 0 auto; position: relative; }
  .dl-steps-row::before { content: ''; position: absolute; top: 22px; left: 12.5%; right: 12.5%; height: 1px; background: rgba(167,219,214,0.25); }
  .dl-step { text-align: center; padding: 0 1rem; }
  .dl-step-num {
    width: 44px; height: 44px; border-radius: 50%;
    background: rgba(167,219,214,0.2); border: 1px solid rgba(167,219,214,0.4);
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 1.25rem; font-size: 14px; font-weight: 500; color: var(--teal-light);
  }
  .dl-step-title { font-size: 14px; font-weight: 500; color: white; margin-bottom: 0.5rem; }
  .dl-step-desc { font-size: 13px; color: rgba(255,255,255,0.6); line-height: 1.6; }
  .dl-topics { padding: 6rem 2rem; max-width: 900px; margin: 0 auto; }
  .dl-topics-grid { display: grid; grid-template-columns: repeat(auto-fill,minmax(190px,1fr)); gap: 10px; }
  .dl-topic-pill {
    display: flex; align-items: center; gap: 10px; padding: 12px 16px; border-radius: 12px;
    background: white; border: 1px solid rgba(12,61,73,0.08); font-size: 13px; color: var(--ink);
    transition: border-color 0.15s, background 0.15s;
  }
  .dl-topic-pill:hover { border-color: rgba(12,61,73,0.2); background: rgba(167,219,214,0.1); }
  .dl-topic-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--teal-light); flex-shrink: 0; }
  .dl-cta-section { padding: 6rem 2rem; text-align: center; }
  .dl-cta-box {
    max-width: 680px; margin: 0 auto; background: white; border-radius: 28px;
    border: 1px solid rgba(12,61,73,0.1); padding: 4rem 3rem;
    box-shadow: 0 8px 48px rgba(12,61,73,0.07);
  }
  .dl-cta-box .dl-eyebrow-text { font-size: 11px; text-transform: uppercase; letter-spacing: 0.14em; color: var(--teal); margin-bottom: 1rem; }
  .dl-cta-box .dl-h2 { margin-bottom: 1rem; }
  .dl-cta-box p { font-size: 15px; color: var(--muted); line-height: 1.7; margin-bottom: 2rem; }
  .dl-member-note { margin-top: 1rem; font-size: 12px; color: #9aabaf; }
  .dl-member-note a { color: var(--teal); }
  .dl-footer {
    padding: 2.5rem; border-top: 1px solid rgba(12,61,73,0.1);
    display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;
  }
  .dl-footer-logo { display: flex; align-items: center; gap: 8px; }
  .dl-footer-logo-text { font-family: 'DM Serif Display', serif; font-size: 16px; color: var(--teal); }
  .dl-footer p { font-size: 12px; color: #9aabaf; }
`;

const LogoMark: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <div style={{ width: size, height: size, borderRadius: '50%', background: '#0c3d49', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 18 18" fill="none">
      <path d="M9 1.5C9 1.5 5.5 4.5 5.5 8.5C5.5 10.5 7.1 12 9 12C10.9 12 12.5 10.5 12.5 8.5C12.5 4.5 9 1.5 9 1.5Z" fill="white" opacity="0.9"/>
      <path d="M5.5 10.5C3.5 11.5 2.5 13.5 3.5 15C4.5 16.5 7 16.5 9 15.5C11 16.5 13.5 16.5 14.5 15C15.5 13.5 14.5 11.5 12.5 10.5" stroke="white" strokeWidth="1.1" fill="none" opacity="0.65"/>
    </svg>
  </div>
);

const topics = [
  'Product Design & UI/UX', 'Product Development', 'Clinical Trials',
  'Regulatory & Quality', 'Legal, Privacy & Cybersecurity', 'IP & Patents',
  'Reimbursement', 'Fundraising', 'Marketing',
  'Go-To-Market Strategy', 'Navigating Healthcare Systems', 'Customer Success', 'Operations & Scaling',
];

export default function DiagnosticLanding() {
  return (
    <div className="dl-root">
      <style>{styles}</style>

      {/* NAV */}
      <nav className="dl-nav">
        <a className="dl-nav-logo" href="/">
          <LogoMark size={32} />
          <span className="dl-nav-logo-text">Rellia</span>
        </a>
        <a className="dl-nav-cta" href="/diagnostic">Begin Assessment →</a>
      </nav>

      {/* HERO */}
      <section className="dl-hero">
        <div className="dl-hero-circle c1" />
        <div className="dl-hero-circle c2" />
        <div className="dl-eyebrow"><div className="dl-eyebrow-dot" /> Free for all health tech founders</div>
        <h1 className="dl-h1">How ready is your<br /><em>startup, really?</em></h1>
        <p className="dl-sub">A structured assessment across 13 domains — from regulatory and clinical to go-to-market and operations. Honest answers give you an accurate picture of where you stand today.</p>
        <div className="dl-cta-row">
          <a className="dl-btn-primary" href="/diagnostic">Take the Diagnostic →</a>
          <a className="dl-btn-secondary" href="#how-it-works">See how it works</a>
        </div>
        <p className="dl-hero-note">Free · No account required · Takes ~15 minutes</p>
      </section>

      {/* WHAT YOU GET */}
      <section className="dl-what">
        <p className="dl-section-label">What you get</p>
        <h2 className="dl-h2">A real picture of where you are,<br />not where you think you are</h2>
        <p className="dl-lead">Most health tech founders have a few areas they know well and several they haven't touched yet. This diagnostic shows you the full picture — scored, prioritized, and actionable.</p>
        <div className="dl-three-col">
          <div className="dl-feature-card">
            <div className="dl-feature-icon">◈</div>
            <div className="dl-feature-title">Scored across 13 domains</div>
            <div className="dl-feature-desc">From product design and clinical evidence to fundraising and go-to-market. Every section gets a score based on your honest answers.</div>
          </div>
          <div className="dl-feature-card">
            <div className="dl-feature-icon">⬡</div>
            <div className="dl-feature-title">AI-powered analysis</div>
            <div className="dl-feature-desc">Your results are analyzed to surface your top strengths, your biggest gaps, and five specific recommendations for what to tackle first.</div>
          </div>
          <div className="dl-feature-card">
            <div className="dl-feature-icon">●</div>
            <div className="dl-feature-title">Mentor matching for members</div>
            <div className="dl-feature-desc">Rellia Health members are automatically matched with a mentor whose expertise directly addresses their top gaps.</div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="dl-how" id="how-it-works">
        <p className="dl-section-label">The process</p>
        <h2 className="dl-h2">From survey to insight in four steps</h2>
        <div className="dl-steps-row">
          {[
            { n:'01', title:'Tell us about your startup', desc:'Name, stage, and what you build — so your results are in context.' },
            { n:'02', title:'Complete the survey', desc:'Rate your startup across 13 sections. Honest answers give you the most useful results.' },
            { n:'03', title:'Get your report', desc:'A personalized diagnostic report with scores, gaps, strengths, and next steps.' },
            { n:'04', title:'Get matched (members)', desc:'Rellia members are automatically connected with a mentor based on their top gaps.' },
          ].map(s => (
            <div className="dl-step" key={s.n}>
              <div className="dl-step-num">{s.n}</div>
              <div className="dl-step-title">{s.title}</div>
              <div className="dl-step-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TOPICS */}
      <section className="dl-topics">
        <p className="dl-section-label">What's covered</p>
        <h2 className="dl-h2">13 domains, one clear picture</h2>
        <div className="dl-topics-grid">
          {topics.map(t => (
            <div className="dl-topic-pill" key={t}>
              <div className="dl-topic-dot" />{t}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="dl-cta-section">
        <div className="dl-cta-box">
          <p className="dl-eyebrow-text">Ready to begin?</p>
          <h2 className="dl-h2">Get your diagnostic report today</h2>
          <p>15 minutes of honest reflection. A clear picture of where you're strong, where you're exposed, and exactly what to do next.</p>
          <a className="dl-btn-primary" href="/diagnostic" style={{ display: 'inline-flex' }}>Take the Diagnostic →</a>
          <p className="dl-member-note">Rellia Health member? Your report includes mentor matching. <a href="/join">Join here →</a></p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="dl-footer">
        <div className="dl-footer-logo">
          <LogoMark size={26} />
          <span className="dl-footer-logo-text">Rellia Health</span>
        </div>
        <p>© 2026 Rellia Health</p>
      </footer>
    </div>
  );
}
