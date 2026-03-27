import React, { useState, useCallback } from 'react';

// ─── TYPES ───────────────────────────────────────────────────────────────────

interface Option { label: string; desc: string; score: number; }
interface Question { text: string; type: 'confidence'|'progress'|'applicability'|'knowledge'; options: Option[]; }
interface Section { id: string; icon: string; title: string; desc: string; questions: Question[]; }
interface Answers { [secId: string]: { [qIdx: number]: number }; }
interface MemberInfo { name: string; company: string; stage: string; email: string; desc: string; }
interface AIResult {
  summary: string;
  top3_strengths: { category: string; score: number; note: string; }[];
  top3_weaknesses: { category: string; score: number; note: string; priority: string; }[];
  recommendations: string[];
  mentor_areas_needed: string[];
}

// ─── CONFIG ──────────────────────────────────────────────────────────────────
// Update PROXY_URL after deploying your Cloudflare Worker

const CONFIG = {
  PROXY_URL: 'https://YOUR-WORKER.YOUR-SUBDOMAIN.workers.dev',
  RELLIA_COPY_EMAIL: 'hello@relliahealth.com',
};

// ─── QUESTION DATA ───────────────────────────────────────────────────────────

const SECTIONS: Section[] = [
  { id:'product_design', icon:'✦', title:'Product Design & UI/UX', desc:'How well do you understand who you\'re building for and whether your product actually works for them?', questions:[
    { text:'How well do you understand the real-world workflow your product replaces or disrupts?', type:'confidence', options:[{label:'We haven\'t mapped this yet',desc:'Still focused on building the product itself',score:0},{label:'We have a general sense of it',desc:'Based on assumptions or desk research',score:33},{label:'We\'ve mapped it with input from users',desc:'We\'ve observed or interviewed people in that workflow',score:67},{label:'We know it deeply',desc:'Every handoff, pain point, and workaround — in detail',score:100}]},
    { text:'What\'s the current state of your usability testing?', type:'progress', options:[{label:'We haven\'t done any yet',desc:'Testing is on the roadmap but hasn\'t happened',score:0},{label:'We\'ve done informal testing',desc:'Friends, colleagues, or a couple of early users',score:33},{label:'We\'ve tested with real target users',desc:'People who match our intended user profile',score:67},{label:'We test regularly and act on findings',desc:'Usability is an ongoing part of our development cycle',score:100}]},
    { text:'Have you separately interviewed your primary user, economic buyer, and decision-maker?', type:'knowledge', options:[{label:'I\'m not sure these are different people for us',desc:'We haven\'t thought through these roles yet',score:0},{label:'We\'ve only spoken to one of these groups',desc:'Usually the end user, not the buyer or approver',score:25},{label:'We\'ve spoken to two of the three',desc:'Some gaps remain in our stakeholder understanding',score:67},{label:'Yes — all three, and we understand each perspective',desc:'We know how their priorities align and conflict',score:100}]},
    { text:'Do you have documented usability requirements separate from functional requirements?', type:'progress', options:[{label:'No — we don\'t have formal requirements yet',desc:'Everything is still informal',score:0},{label:'We have functional requirements but not usability ones',desc:'We know what it needs to do, not how it needs to feel',score:33},{label:'We\'re working on this',desc:'Partially documented or in progress',score:67},{label:'Yes — both documented and maintained',desc:'We treat usability as a first-class requirement',score:100}]},
    { text:'How independently can a new user onboard with your product today?', type:'confidence', options:[{label:'They can\'t — we walk everyone through it',desc:'Onboarding requires our direct involvement',score:0},{label:'They can start but often get stuck',desc:'We get a lot of the same questions',score:33},{label:'Most users can onboard without help',desc:'Occasional edge cases need support',score:67},{label:'Fully self-serve — and we\'ve validated this',desc:'We\'ve watched real users onboard without guidance',score:100}]},
  ]},
  { id:'product_dev', icon:'◈', title:'Product Development', desc:'How structured and traceable is your development process?', questions:[
    { text:'What\'s the current state of your product requirements documentation?', type:'progress', options:[{label:'It\'s all in our heads right now',desc:'Nothing formally written down',score:0},{label:'We have informal notes or a shared doc',desc:'Not structured, but something exists',score:33},{label:'We have defined requirements, but they lag behind what we\'ve built',desc:'Documentation isn\'t always current',score:67},{label:'Requirements are documented, versioned, and up to date',desc:'We maintain them as a living reference',score:100}]},
    { text:'How well does your version control connect requirements, code, and testing?', type:'progress', options:[{label:'We don\'t have version control in place yet',desc:'No formal process connecting these three',score:0},{label:'We use version control for code only',desc:'Requirements and tests aren\'t connected',score:33},{label:'We\'re working toward a connected system',desc:'Improving but still some gaps',score:67},{label:'All three are versioned and traceable to each other',desc:'Any feature can be traced from requirement to test result',score:100}]},
    { text:'How would you describe your verification and validation (V&V) process?', type:'knowledge', options:[{label:'I\'m not sure what V&V means in this context',desc:'This is a new concept for us',score:0},{label:'We test our product, but it\'s informal',desc:'No documented V&V protocol or records',score:25},{label:'We have some V&V activities but limited documentation',desc:'Records are incomplete or inconsistent',score:67},{label:'We have documented V&V protocols with full records',desc:'Fully traceable and audit-ready',score:100}]},
  ]},
  { id:'clinical', icon:'⬡', title:'Clinical Trials', desc:'Understanding whether clinical evidence is required — and what that path looks like for you.', questions:[
    { text:'Does your product require clinical evidence to support its claims or regulatory approval?', type:'applicability', options:[{label:'I\'m not sure yet',desc:'We haven\'t determined what evidence will be required',score:0},{label:'Probably not — but we haven\'t confirmed',desc:'We think we\'re outside scope but haven\'t verified',score:25},{label:'Yes — and we\'re figuring out what that looks like',desc:'We know it\'s required but don\'t have a plan yet',score:50},{label:'Yes — and we have a clinical evidence plan',desc:'Study design, population, and endpoints are defined',score:100}]},
    { text:'Do you know whether you can conduct testing with real users right now — without additional approvals?', type:'knowledge', options:[{label:'We haven\'t looked into this',desc:'Not sure what approvals might be needed',score:0},{label:'We\'re aware approvals may be needed but haven\'t confirmed',desc:'On our list to investigate',score:33},{label:'We\'ve looked into it and understand the requirements',desc:'We know what we can and can\'t do without approvals',score:67},{label:'We have a clear confirmed answer and are acting on it',desc:'Legal or regulatory counsel has weighed in',score:100}]},
    { text:'If a clinical study is required, how well defined is your study design?', type:'applicability', options:[{label:'This doesn\'t apply — clinical studies aren\'t required for us',desc:'We\'ve confirmed we\'re outside this scope',score:100},{label:'We know a study is needed but haven\'t designed it yet',desc:'Study parameters are undefined',score:25},{label:'We have a general study concept sketched out',desc:'Patient population and endpoints are roughly defined',score:60},{label:'Our study design is fully defined',desc:'Population, sites, endpoints, and success criteria are documented',score:100}]},
  ]},
  { id:'regulatory', icon:'⬢', title:'Regulatory & Quality', desc:'Whether you\'re a regulated device or not, knowing your regulatory position is foundational.', questions:[
    { text:'Do you have a drafted intended use statement?', type:'progress', options:[{label:'No — I\'m not sure what this is yet',desc:'The concept is new to me',score:0},{label:'I understand what it is but haven\'t drafted one',desc:'It\'s on my list',score:25},{label:'We have a draft but it needs refinement',desc:'Exists but hasn\'t been formally reviewed',score:67},{label:'Yes — drafted, reviewed, and documented',desc:'We reference it in our development process',score:100}]},
    { text:'Do you know your product\'s regulatory classification?', type:'knowledge', options:[{label:'No — still figuring out if we\'re regulated at all',desc:'The classification question is unresolved',score:0},{label:'We have a working hypothesis but haven\'t confirmed it',desc:'We think we know, but haven\'t validated with an expert',score:33},{label:'Yes — confirmed with confidence',desc:'Based on expert input or regulatory counsel',score:100}]},
    { text:'If entering the US as a device, what\'s the status of your predicate and device code?', type:'applicability', options:[{label:'This doesn\'t apply to us',desc:'We\'re not a device, or not targeting the US market',score:100},{label:'We haven\'t started this yet',desc:'Predicate selection hasn\'t been addressed',score:0},{label:'We\'re researching predicates but haven\'t finalized',desc:'Options are being evaluated',score:50},{label:'We have a device code and predicate selected',desc:'Confirmed and documented',score:100}]},
    { text:'If you\'re not a regulated device, how well have you mapped the claims you need to avoid?', type:'applicability', options:[{label:'This doesn\'t apply — we are a regulated device',desc:'We\'re pursuing device clearance or approval',score:100},{label:'We haven\'t done this analysis yet',desc:'Not sure what claims create regulatory risk',score:0},{label:'General awareness but nothing documented',desc:'We informally avoid certain language',score:40},{label:'We have a documented claims list we actively manage',desc:'Reviewed by legal or regulatory counsel',score:100}]},
    { text:'What\'s the status of your Quality Management System (QMS)?', type:'progress', options:[{label:'We don\'t have one — not sure if we need one',desc:'QMS requirements haven\'t been assessed',score:0},{label:'We know we need one and are in early planning',desc:'Not yet implemented',score:25},{label:'We\'re building it — partially implemented',desc:'Some procedures exist but the system isn\'t complete',score:60},{label:'Our QMS is implemented and operational',desc:'Procedures are documented, followed, and maintained',score:100}]},
  ]},
  { id:'legal', icon:'◉', title:'Legal, Privacy & Cybersecurity', desc:'Data obligations, breach response, and your security posture.', questions:[
    { text:'How well do you understand the privacy regulations that apply to your product and data storage?', type:'knowledge', options:[{label:'We haven\'t looked into this yet',desc:'Privacy obligations are an open question',score:0},{label:'Basic awareness but gaps remain',desc:'We know HIPAA or PIPEDA exist but haven\'t fully assessed our obligations',score:33},{label:'We\'ve assessed our obligations and have a plan',desc:'We know what applies and are building toward compliance',score:67},{label:'We\'re fully compliant with applicable privacy regulations',desc:'Confirmed by legal counsel and actively maintained',score:100}]},
    { text:'Do you have a documented incident response plan for a reportable breach?', type:'progress', options:[{label:'No — and not sure what reporting is required',desc:'Breach obligations haven\'t been assessed',score:0},{label:'We know reporting may be required but have no plan',desc:'A gap we\'re aware of',score:25},{label:'We have a basic plan but it\'s not fully documented',desc:'Some processes exist informally',score:60},{label:'Yes — documented, tested, and assigned to team members',desc:'We know exactly what to do and who is responsible',score:100}]},
    { text:'Have you assessed your product and domain for cybersecurity vulnerabilities?', type:'progress', options:[{label:'No assessment has been done',desc:'Security testing hasn\'t happened yet',score:0},{label:'We\'ve done an informal internal review',desc:'Not a formal assessment',score:33},{label:'We\'ve run automated scans or a basic assessment',desc:'Some vulnerabilities identified and addressed',score:67},{label:'We\'ve had a formal security assessment done',desc:'By an external party, findings documented and addressed',score:100}]},
  ]},
  { id:'ip', icon:'◎', title:'IP & Patents', desc:'Protecting what you\'ve built and knowing where you can operate safely.', questions:[
    { text:'What IP protection do you currently have in place?', type:'progress', options:[{label:'None — we haven\'t thought about this yet',desc:'IP strategy hasn\'t been addressed',score:0},{label:'Relying on trade secrets and confidentiality agreements',desc:'No formal IP filings',score:33},{label:'We have provisional or pending applications',desc:'Protection is in progress',score:67},{label:'We have granted patents or registered IP',desc:'Formally protected in our key markets',score:100}]},
    { text:'When did you last conduct or commission a freedom-to-operate (FTO) analysis?', type:'knowledge', options:[{label:'I\'m not sure what a freedom-to-operate analysis is',desc:'This is a new concept for me',score:0},{label:'We know we should do one but haven\'t yet',desc:'On the list but not actioned',score:25},{label:'We\'ve done an informal internal review',desc:'Not a formal legal opinion',score:50},{label:'We\'ve had a formal FTO done by IP counsel',desc:'Documented and up to date',score:100}]},
  ]},
  { id:'reimbursement', icon:'◇', title:'Reimbursement', desc:'How your product gets paid for — and whether that path is clear.', questions:[
    { text:'Do you know what billing codes or payment mechanisms apply to your product today?', type:'applicability', options:[{label:'Reimbursement doesn\'t apply to our business model',desc:'We\'re direct pay, B2B SaaS, or outside the billing code framework',score:100},{label:'We haven\'t looked into this yet',desc:'Reimbursement strategy is undefined',score:0},{label:'General sense but nothing confirmed',desc:'We know roughly which codes might apply',score:40},{label:'We know exactly which codes apply',desc:'Verified with payers or a reimbursement consultant',score:100}]},
    { text:'Do you understand what evidence payers require to cover your product?', type:'knowledge', options:[{label:'This doesn\'t apply to our business model',desc:'We\'re not seeking payer coverage',score:100},{label:'We haven\'t researched payer requirements yet',desc:'Unknown territory',score:0},{label:'General sense of the evidence bar',desc:'But haven\'t confirmed with actual payers',score:50},{label:'We know the requirements and are building toward them',desc:'Based on payer conversations or dossier research',score:100}]},
    { text:'How does your reimbursement landscape influence your pricing strategy?', type:'confidence', options:[{label:'We haven\'t connected these two things yet',desc:'Pricing and reimbursement are being developed separately',score:0},{label:'We\'re aware of the connection but haven\'t modelled it',desc:'A consideration we plan to integrate',score:33},{label:'Reimbursement rates inform our pricing model',desc:'We\'ve done some modelling',score:67},{label:'Our pricing strategy is built around our reimbursement reality',desc:'Fully integrated and validated with potential customers',score:100}]},
  ]},
  { id:'fundraising', icon:'◆', title:'Fundraising', desc:'Your capital strategy, financial model, and non-dilutive funding awareness.', questions:[
    { text:'Have you explored or applied for SR&ED and IRAP non-dilutive funding?', type:'knowledge', options:[{label:'I\'m not familiar with SR&ED or IRAP',desc:'These programs are new to me',score:0},{label:'I know about them but haven\'t applied yet',desc:'On the list but not actioned',score:33},{label:'We\'ve applied to one or are actively exploring both',desc:'In progress',score:67},{label:'We\'ve received funding from one or both programs',desc:'Non-dilutive funding is part of our capital strategy',score:100}]},
    { text:'Have you been through any formal investment readiness programming?', type:'progress', options:[{label:'No — figuring this out independently',desc:'No structured investment readiness support yet',score:0},{label:'We\'ve attended pitch events or workshops',desc:'Informal exposure but no structured program',score:33},{label:'We\'ve completed or are enrolled in an investment readiness program',desc:'Structured support underway',score:67},{label:'Yes — multiple programs and/or active investor relationships',desc:'Well-networked and coached for fundraising',score:100}]},
    { text:'How clearly defined is your funding ask and what it accomplishes?', type:'confidence', options:[{label:'We haven\'t defined a raise amount yet',desc:'The ask and milestone are still unclear',score:0},{label:'We have a rough number but the milestone isn\'t tight',desc:'Something like "12–18 months of runway"',score:33},{label:'Clear ask tied to a specific milestone',desc:'We can articulate what this round de-risks',score:67},{label:'Our ask, milestone, and de-risking narrative are airtight',desc:'Battle-tested in investor conversations',score:100}]},
    { text:'How confident are you in the assumptions underpinning your financial model?', type:'confidence', options:[{label:'We don\'t have a financial model yet',desc:'Financial projections haven\'t been built',score:0},{label:'We have a model but the assumptions feel shaky',desc:'Built it but not fully confident in the inputs',score:25},{label:'Solid model with grounded assumptions',desc:'Based on comparable benchmarks or real customer data',score:67},{label:'Assumptions have been stress-tested and validated',desc:'Pressure-tested with advisors or investors',score:100}]},
  ]},
  { id:'marketing', icon:'●', title:'Marketing', desc:'Whether your messaging connects with the people who actually make buying decisions.', questions:[
    { text:'How clearly can you describe your buyer — the person who signs the contract, not just the end user?', type:'confidence', options:[{label:'Still figuring out who our buyer actually is',desc:'We\'ve mostly focused on the end user',score:0},{label:'We have a hypothesis but haven\'t validated it',desc:'Based on assumption rather than conversation',score:33},{label:'We can describe our buyer clearly and have talked to several',desc:'Real conversations have shaped our understanding',score:67},{label:'We know our buyer deeply — their pressures, incentives, and decision process',desc:'Including what makes them say yes and what makes them stall',score:100}]},
    { text:'Can you express your core value proposition in one sentence — with and without industry jargon?', type:'confidence', options:[{label:'We struggle to articulate this concisely',desc:'Our pitch tends to run long or feel unclear',score:0},{label:'We have a version but it\'s not landing consistently',desc:'Different team members say it differently',score:33},{label:'We have a clear sentence that resonates',desc:'We get positive reactions when we use it',score:67},{label:'Sharp, tested, and used consistently by the whole team',desc:'It lands every time',score:100}]},
    { text:'Can you express your product\'s impact in financial terms for the buyer?', type:'confidence', options:[{label:'We lead with clinical outcomes and haven\'t translated to financial',desc:'The financial case hasn\'t been made explicitly',score:0},{label:'We have a rough sense of the financial impact',desc:'But can\'t back it up with numbers yet',score:33},{label:'We can articulate financial impact with some data',desc:'ROI framing is part of our pitch',score:67},{label:'We have a validated ROI model that resonates with buyers',desc:'Used in sales conversations and backed by evidence',score:100}]},
    { text:'How do you measure whether your marketing is working?', type:'progress', options:[{label:'No measurement in place yet',desc:'Marketing effectiveness is assessed informally',score:0},{label:'We track some basic metrics but inconsistently',desc:'Nothing tied to pipeline',score:33},{label:'We track metrics tied to pipeline and know our top channels',desc:'Some attribution clarity',score:67},{label:'Clear KPIs, tracked consistently, optimized based on data',desc:'Marketing and commercial outcomes are connected',score:100}]},
  ]},
  { id:'gtm', icon:'▲', title:'Go-To-Market & Commercial Strategy', desc:'Whether your sales motion is real, not just theoretical.', questions:[
    { text:'Have you mapped every touchpoint in your sales process — and actually engaged all of them?', type:'progress', options:[{label:'We haven\'t mapped our sales process yet',desc:'Still figuring out how deals happen',score:0},{label:'We\'ve mapped it on paper but haven\'t tested it in practice',desc:'Theoretical, not tested',score:25},{label:'We\'ve mapped it and engaged some touchpoints',desc:'Some gaps remain',score:60},{label:'We\'ve mapped it and spoken to every stakeholder in the chain',desc:'We know how deals actually get done',score:100}]},
    { text:'How well do you know the objections that come up in early sales conversations?', type:'confidence', options:[{label:'We haven\'t had enough conversations to know yet',desc:'Sales conversations are limited so far',score:0},{label:'We\'ve heard objections but don\'t have consistent responses',desc:'We improvise when they come up',score:33},{label:'We know the common objections and have prepared responses',desc:'We\'ve thought through how to address them',score:67},{label:'Objection handling is a practiced part of our pitch',desc:'Refined through real conversations',score:100}]},
    { text:'What sales materials exist beyond a pitch deck?', type:'progress', options:[{label:'We only have a pitch deck right now',desc:'No other sales materials developed',score:0},{label:'We have a deck and some basic materials',desc:'One-pager, case study, or demo in progress',score:33},{label:'We have a multi-asset sales toolkit',desc:'Deck, one-pager, demo, and proof points',score:67},{label:'A complete buyer-facing sales library',desc:'Separate buyer and investor decks, ROI tools, and references',score:100}]},
    { text:'How clearly do you know your deal economics?', type:'knowledge', options:[{label:'We haven\'t closed deals yet so we\'re estimating',desc:'No real data to draw from',score:0},{label:'Rough estimates based on early conversations',desc:'Not based on closed deals',score:33},{label:'We know our average deal size and sales cycle from experience',desc:'Based on real deals, even if the sample is small',score:67},{label:'Reliable deal economics used in planning',desc:'Deal size, cycle, and conversion rates tracked and inform decisions',score:100}]},
  ]},
  { id:'healthcare', icon:'⊕', title:'Navigating Healthcare Systems', desc:'Whether you understand the institutional landscape your product has to move through.', questions:[
    { text:'How clearly does your product fit into an existing care pathway?', type:'confidence', options:[{label:'We haven\'t mapped the care pathway yet',desc:'Where we fit in clinical workflow is still unclear',score:0},{label:'General sense but not mapped in detail',desc:'We know roughly where we fit',score:33},{label:'We\'ve mapped the care pathway and know our insertion point',desc:'We can describe exactly where and how we fit',score:67},{label:'Validated with clinicians or health system stakeholders',desc:'Real conversations confirm our place in the workflow',score:100}]},
    { text:'How well do you understand the incentives and disincentives affecting adoption?', type:'confidence', options:[{label:'We haven\'t thought deeply about adoption incentives yet',desc:'This analysis hasn\'t been done',score:0},{label:'We understand clinical incentives but not institutional or financial ones',desc:'Partial picture',score:33},{label:'We have a solid understanding of the incentive landscape',desc:'We know what motivates and what creates friction',score:67},{label:'We\'ve built our GTM strategy around this understanding',desc:'Adoption incentives are central to how we sell and position',score:100}]},
    { text:'Do you know who specifically must approve your product before it can be used in a clinical setting?', type:'knowledge', options:[{label:'We haven\'t mapped the approval chain yet',desc:'Decision-makers and gatekeepers are unknown',score:0},{label:'General sense of who\'s involved',desc:'But haven\'t confirmed the specific path at target accounts',score:33},{label:'We know who approves implementation at our target accounts',desc:'IT, clinical leadership, procurement — mapped this',score:67},{label:'We\'ve navigated the approval process at least once successfully',desc:'Real experience with institutional implementation',score:100}]},
  ]},
  { id:'customer_success', icon:'⊙', title:'Customer Success', desc:'How you retain customers, measure engagement, and close the feedback loop.', questions:[
    { text:'How do you measure whether customers are actually adopting and engaging with your product?', type:'progress', options:[{label:'No adoption measurement in place yet',desc:'Not sure how to track this',score:0},{label:'We check in with customers manually and informally',desc:'No product analytics or structured tracking',score:25},{label:'We have some usage metrics but they\'re not consistent',desc:'Incomplete picture',score:60},{label:'Clear adoption KPIs reviewed regularly',desc:'We can tell you exactly how our product is being used',score:100}]},
    { text:'What does your customer support model look like today?', type:'progress', options:[{label:'No formal support model yet',desc:'Support is ad hoc',score:0},{label:'We respond to issues as they come up',desc:'Reactive but no structured system',score:33},{label:'A basic support process is in place',desc:'Defined channels, response times, and an owner',score:67},{label:'Structured support model with escalation paths and SLAs',desc:'Proactive and reactive support are both defined',score:100}]},
    { text:'How do you collect and act on customer feedback?', type:'progress', options:[{label:'No formal feedback process yet',desc:'Feedback comes in ad hoc if at all',score:0},{label:'We collect feedback informally through conversations',desc:'No structured channel or tracking',score:33},{label:'Structured feedback collection that influences decisions',desc:'Surveys, interviews, or a feedback tool',score:67},{label:'Feedback is systematically collected, triaged, and closed-loop',desc:'Customers know their feedback is heard and acted on',score:100}]},
  ]},
  { id:'operations', icon:'▣', title:'Operations & Scaling', desc:'Whether your business can actually grow without breaking.', questions:[
    { text:'How aware are you of the manual processes in your business that won\'t scale?', type:'confidence', options:[{label:'We haven\'t thought about this systematically',desc:'Scaling constraints haven\'t been mapped',score:0},{label:'We\'re aware of some bottlenecks but haven\'t documented them',desc:'We know things will need to change but haven\'t planned it',score:33},{label:'We\'ve identified key manual processes and have a plan',desc:'Automation or delegation paths are being worked on',score:67},{label:'We\'ve already addressed scaling bottlenecks or are actively doing so',desc:'Operations are being built for scale proactively',score:100}]},
    { text:'How clearly have you defined the roles you need in the next 12 months?', type:'progress', options:[{label:'We haven\'t thought ahead to next year\'s team needs',desc:'Hiring plans are reactive rather than planned',score:0},{label:'We know we\'ll need to hire but haven\'t defined specific roles',desc:'Headcount growth is vague',score:33},{label:'We\'ve defined priority roles and roughly when we need them',desc:'A hiring roadmap exists',score:67},{label:'Hiring plans are specific, budgeted, and tied to our growth model',desc:'We know exactly who we need and when',score:100}]},
    { text:'How well do you understand your unit economics — now and at scale?', type:'confidence', options:[{label:'We haven\'t modelled our unit economics yet',desc:'CAC, LTV, margins are undefined',score:0},{label:'Rough estimates but we don\'t trust the numbers yet',desc:'Modelled but not grounded in real data',score:33},{label:'We understand our current unit economics and have a scaling model',desc:'Numbers are based on real experience',score:67},{label:'Unit economics are well understood, stress-tested, and improving',desc:'We can articulate exactly how the model gets better at scale',score:100}]},
  ]},
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function getSectionScore(secId: string, answers: Answers): number | null {
  const sec = SECTIONS.find(s => s.id === secId);
  if (!sec || !answers[secId] || !Object.keys(answers[secId]).length) return null;
  let sum = 0, count = 0;
  Object.entries(answers[secId]).forEach(([qi, oi]) => {
    const q = sec.questions[parseInt(qi)];
    if (q && q.options[oi] !== undefined) { sum += q.options[oi].score; count++; }
  });
  return count > 0 ? Math.round(sum / count) : null;
}

function scoreClass(s: number): string {
  return s >= 65 ? 'hi' : s >= 35 ? 'mid' : 'lo';
}

const TYPE_LABELS: Record<string, string> = {
  confidence: 'Confidence check', progress: 'Progress check',
  applicability: 'Applicability check', knowledge: 'Knowledge check',
};

// ─── STYLES ──────────────────────────────────────────────────────────────────

const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
.ds-root *, .ds-root *::before, .ds-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
.ds-root {
  --teal:#0c3d49;--teal-mid:#1a5f72;--teal-light:#a7dbd6;
  --cream:#f8f1e8;--cream-bright:#fdf8f2;--ink:#262624;--muted:#4a6a6e;
  --green:#1d9e75;--amber:#ba7517;--red:#a32d2d;
  font-family:'DM Sans',sans-serif; background:var(--teal); color:var(--ink); min-height:100vh;
}
.ds-shell { min-height:100vh; display:grid; grid-template-columns:268px 1fr; }
.ds-sidebar { background:var(--teal); position:sticky; top:0; height:100vh; display:flex; flex-direction:column; overflow:hidden; }
.ds-sidebar-top { padding:1.75rem 1.5rem 1.25rem; border-bottom:1px solid rgba(167,219,214,0.12); flex-shrink:0; }
.ds-logo-row { display:flex; align-items:center; gap:10px; margin-bottom:1.5rem; }
.ds-logo-mark { width:32px; height:32px; border-radius:50%; background:rgba(167,219,214,0.15); border:1px solid rgba(167,219,214,0.25); display:flex; align-items:center; justify-content:center; }
.ds-logo-text { font-family:'DM Serif Display',serif; font-size:19px; color:white; }
.ds-sp-top { display:flex; justify-content:space-between; align-items:baseline; margin-bottom:6px; }
.ds-sp-label { font-size:10px; text-transform:uppercase; letter-spacing:0.13em; color:rgba(167,219,214,0.6); }
.ds-sp-count { font-size:11px; color:rgba(255,255,255,0.5); }
.ds-sp-bar-bg { height:3px; background:rgba(255,255,255,0.1); border-radius:2px; }
.ds-sp-bar-fill { height:3px; background:var(--teal-light); border-radius:2px; transition:width 0.4s ease; }
.ds-sidebar-nav { flex:1; overflow-y:auto; padding:1rem; }
.ds-sidebar-nav::-webkit-scrollbar { width:0; }
.ds-nav-heading { font-size:10px; text-transform:uppercase; letter-spacing:0.13em; color:rgba(167,219,214,0.4); padding:0 0.5rem; margin-bottom:6px; }
.ds-nav-item { display:flex; align-items:center; gap:10px; padding:7px 10px; border-radius:8px; cursor:pointer; transition:background 0.15s; border:none; background:none; width:100%; text-align:left; margin-bottom:2px; }
.ds-nav-item:hover { background:rgba(255,255,255,0.06); }
.ds-nav-item.active { background:rgba(167,219,214,0.14); }
.ds-nav-dot { width:22px; height:22px; border-radius:50%; flex-shrink:0; border:1.5px solid rgba(167,219,214,0.25); display:flex; align-items:center; justify-content:center; font-size:9px; color:rgba(167,219,214,0.45); transition:all 0.2s; }
.ds-nav-item.active .ds-nav-dot { background:var(--teal-light); border-color:var(--teal-light); color:var(--teal); font-weight:600; }
.ds-nav-item.done .ds-nav-dot { background:rgba(167,219,214,0.2); border-color:rgba(167,219,214,0.4); color:var(--teal-light); }
.ds-nav-label { font-size:12px; color:rgba(255,255,255,0.6); line-height:1.3; }
.ds-nav-item.active .ds-nav-label { color:white; font-weight:500; }
.ds-nav-item.done .ds-nav-label { color:rgba(255,255,255,0.5); }
.ds-nav-divider { height:1px; background:rgba(167,219,214,0.1); margin:8px 0; }
.ds-main { background:var(--cream-bright); min-height:100vh; display:flex; flex-direction:column; }

/* INTRO */
.ds-gate { flex:1; padding:2.5rem; overflow-y:auto; display:flex; flex-direction:column; gap:1.25rem; }
.ds-hero-card { background:var(--teal); border-radius:20px; padding:2.25rem 2.5rem; position:relative; overflow:hidden; }
.ds-hero-card::before { content:''; position:absolute; top:-50px; right:-50px; width:200px; height:200px; border-radius:50%; background:rgba(167,219,214,0.08); }
.ds-hero-eyebrow { font-size:10px; text-transform:uppercase; letter-spacing:0.14em; color:var(--teal-light); margin-bottom:0.5rem; }
.ds-hero-card h1 { font-family:'DM Serif Display',serif; font-size:1.7rem; color:white; line-height:1.2; margin-bottom:0.6rem; }
.ds-hero-card p { font-size:14px; color:rgba(255,255,255,0.7); line-height:1.65; max-width:560px; }
.ds-card { background:white; border-radius:16px; border:1px solid rgba(12,61,73,0.08); padding:1.5rem; }
.ds-card h3 { font-size:11px; font-weight:600; color:var(--teal); text-transform:uppercase; letter-spacing:0.09em; margin-bottom:1.1rem; }
.ds-how-steps { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
.ds-how-step { display:flex; flex-direction:column; gap:8px; }
.ds-hstep-num { width:30px; height:30px; border-radius:50%; background:rgba(12,61,73,0.06); border:1px solid rgba(12,61,73,0.1); display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:600; color:var(--teal); }
.ds-hstep-text { font-size:13px; color:var(--muted); line-height:1.5; }
.ds-hstep-text b { color:var(--ink); font-weight:500; }
.ds-form-row { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px; }
.ds-form-row.full { grid-template-columns:1fr; }
.ds-field-group { display:flex; flex-direction:column; gap:4px; }
.ds-field-label { font-size:11px; text-transform:uppercase; letter-spacing:0.09em; color:var(--muted); }
.ds-field-input { padding:10px 13px; border-radius:9px; border:1px solid rgba(12,61,73,0.16); font-family:'DM Sans',sans-serif; font-size:14px; color:var(--ink); outline:none; transition:border-color 0.15s; background:var(--cream-bright); }
.ds-field-input:focus { border-color:var(--teal-mid); background:white; }
.ds-start-btn { width:100%; padding:13px; border-radius:32px; border:none; background:var(--teal); color:white; font-family:'DM Sans',sans-serif; font-size:14px; font-weight:500; cursor:pointer; transition:background 0.15s; margin-top:4px; }
.ds-start-btn:hover { background:var(--teal-mid); }
.ds-start-note { font-size:12px; color:#8a9ea2; text-align:center; margin-top:8px; line-height:1.5; }

/* SURVEY */
.ds-survey { flex:1; display:flex; flex-direction:column; }
.ds-survey-inner { padding:2.5rem; display:flex; flex-direction:column; gap:1.25rem; overflow-y:auto; flex:1; }
.ds-sec-hero { background:var(--teal); border-radius:20px; padding:2rem 2.5rem; position:relative; overflow:hidden; flex-shrink:0; }
.ds-sec-hero::before { content:''; position:absolute; top:-40px; right:-40px; width:160px; height:160px; border-radius:50%; background:rgba(167,219,214,0.08); }
.ds-sec-eyebrow { font-size:10px; text-transform:uppercase; letter-spacing:0.14em; color:var(--teal-light); margin-bottom:4px; }
.ds-sec-title { font-family:'DM Serif Display',serif; font-size:1.5rem; color:white; line-height:1.2; margin-bottom:4px; }
.ds-sec-desc { font-size:13px; color:rgba(255,255,255,0.65); line-height:1.55; }
.ds-q-card { background:white; border-radius:14px; border:1px solid rgba(12,61,73,0.08); padding:1.25rem 1.5rem; transition:border-color 0.2s; }
.ds-q-card.answered { border-color:rgba(12,61,73,0.16); }
.ds-q-type { font-size:10px; text-transform:uppercase; letter-spacing:0.1em; color:var(--teal-mid); background:rgba(12,61,73,0.06); display:inline-block; padding:2px 8px; border-radius:4px; margin-bottom:8px; font-weight:500; }
.ds-q-text { font-size:14px; color:var(--ink); line-height:1.6; margin-bottom:12px; font-weight:500; }
.ds-opts { display:flex; flex-direction:column; gap:6px; }
.ds-opt { display:flex; align-items:flex-start; gap:11px; padding:10px 13px; border-radius:9px; border:1px solid rgba(12,61,73,0.11); background:var(--cream-bright); cursor:pointer; transition:all 0.12s; text-align:left; width:100%; font-family:'DM Sans',sans-serif; }
.ds-opt:hover { border-color:rgba(12,61,73,0.22); background:white; }
.ds-opt.selected { background:var(--teal); border-color:var(--teal); }
.ds-opt-ind { width:17px; height:17px; border-radius:50%; flex-shrink:0; margin-top:2px; border:1.5px solid rgba(12,61,73,0.22); display:flex; align-items:center; justify-content:center; transition:all 0.12s; }
.ds-opt.selected .ds-opt-ind { background:white; border-color:white; }
.ds-opt-check { width:7px; height:4px; border-left:1.5px solid var(--teal); border-bottom:1.5px solid var(--teal); transform:rotate(-45deg) translateY(-1px); opacity:0; }
.ds-opt.selected .ds-opt-check { opacity:1; }
.ds-opt-label { font-size:13px; font-weight:500; color:var(--ink); line-height:1.3; }
.ds-opt.selected .ds-opt-label { color:white; }
.ds-opt-desc { font-size:12px; color:var(--muted); line-height:1.4; margin-top:2px; }
.ds-opt.selected .ds-opt-desc { color:rgba(255,255,255,0.7); }
.ds-sec-nav { display:flex; align-items:center; justify-content:space-between; margin-top:1.5rem; padding-top:1.25rem; border-top:1px solid rgba(12,61,73,0.08); }
.ds-nav-btn { display:inline-flex; align-items:center; gap:7px; padding:10px 22px; border-radius:22px; font-family:'DM Sans',sans-serif; font-size:13px; font-weight:500; cursor:pointer; transition:all 0.13s; border:none; }
.ds-nav-btn.prev { background:transparent; color:var(--muted); border:1px solid rgba(12,61,73,0.16); }
.ds-nav-btn.prev:hover { background:rgba(12,61,73,0.05); color:var(--teal); }
.ds-nav-btn.next { background:var(--teal); color:white; }
.ds-nav-btn.next:hover { background:var(--teal-mid); }
.ds-tally { font-size:12px; color:var(--muted); }
.ds-tally b { color:var(--teal); }

/* SUBMIT */
.ds-submit { flex:1; display:flex; flex-direction:column; padding:2.5rem; gap:1.25rem; overflow-y:auto; }
.ds-submit-hero { background:var(--teal); border-radius:20px; padding:2rem 2.5rem; position:relative; overflow:hidden; }
.ds-submit-hero::before { content:''; position:absolute; top:-40px; right:-40px; width:160px; height:160px; border-radius:50%; background:rgba(167,219,214,0.08); }
.ds-submit-hero h2 { font-family:'DM Serif Display',serif; font-size:1.5rem; color:white; line-height:1.2; margin-bottom:4px; }
.ds-submit-hero p { font-size:13px; color:rgba(255,255,255,0.65); line-height:1.55; }
.ds-submit-grid { display:grid; grid-template-columns:1fr 1fr; gap:1.25rem; }
.ds-score-sum { background:white; border-radius:14px; border:1px solid rgba(12,61,73,0.08); padding:1.25rem; }
.ds-score-sum h3 { font-size:11px; text-transform:uppercase; letter-spacing:0.09em; color:var(--teal); margin-bottom:1rem; font-weight:600; }
.ds-score-row { display:flex; align-items:center; justify-content:space-between; padding:6px 0; border-bottom:1px solid rgba(12,61,73,0.05); font-size:13px; }
.ds-score-row:last-child { border-bottom:none; }
.ds-score-cat { color:var(--muted); }
.ds-score-val { font-weight:500; }
.ds-score-val.hi { color:#1a6b50; } .ds-score-val.mid { color:#b07a10; } .ds-score-val.lo { color:var(--red); }
.ds-action-card { background:white; border-radius:14px; border:1px solid rgba(12,61,73,0.08); padding:1.5rem; display:flex; flex-direction:column; gap:12px; align-self:start; }
.ds-action-card h3 { font-family:'DM Serif Display',serif; font-size:1.25rem; color:var(--teal); line-height:1.25; }
.ds-action-card p { font-size:13px; color:var(--muted); line-height:1.65; }
.ds-member-callout { background:rgba(167,219,214,0.15); border:1px solid rgba(12,61,73,0.1); border-radius:10px; padding:12px 14px; }
.ds-member-callout p { font-size:13px; color:var(--teal); line-height:1.55; margin:0; }
.ds-submit-btn { width:100%; padding:13px; border-radius:28px; border:none; background:var(--teal); color:white; font-family:'DM Sans',sans-serif; font-size:14px; font-weight:500; cursor:pointer; transition:background 0.15s; }
.ds-submit-btn:hover { background:var(--teal-mid); }
.ds-submit-btn:disabled { opacity:0.5; cursor:not-allowed; }
.ds-submit-note { font-size:11px; color:#8a9ea2; text-align:center; line-height:1.5; }

/* PROCESSING */
.ds-processing { flex:1; display:flex; align-items:center; justify-content:center; padding:3rem; }
.ds-proc-card { background:white; border-radius:20px; border:1px solid rgba(12,61,73,0.08); padding:3rem 2.5rem; max-width:480px; width:100%; text-align:center; }
.ds-spinner { width:44px; height:44px; border-radius:50%; border:2px solid rgba(12,61,73,0.1); border-top-color:var(--teal); animation:ds-spin 0.8s linear infinite; margin:0 auto 1.5rem; }
@keyframes ds-spin { to { transform:rotate(360deg); } }
.ds-proc-card h2 { font-family:'DM Serif Display',serif; font-size:1.4rem; color:var(--teal); margin-bottom:0.75rem; }
.ds-proc-card p { font-size:13px; color:var(--muted); line-height:1.65; }
.ds-p-steps { margin-top:1.5rem; text-align:left; display:flex; flex-direction:column; gap:10px; }
.ds-p-step { display:flex; align-items:center; gap:10px; font-size:13px; color:var(--muted); }
.ds-p-dot { width:8px; height:8px; border-radius:50%; background:rgba(12,61,73,0.12); flex-shrink:0; transition:background 0.3s; }
.ds-p-step.done .ds-p-dot { background:var(--green); }
.ds-p-step.active .ds-p-dot { background:var(--teal); animation:ds-pulse 1s ease infinite; }
@keyframes ds-pulse { 0%,100%{opacity:1}50%{opacity:0.35} }

/* REPORT */
.ds-report { flex:1; display:flex; flex-direction:column; padding:2.5rem; gap:1.25rem; overflow-y:auto; }
.ds-report-hero { background:var(--teal); border-radius:20px; padding:2.25rem 2.5rem; position:relative; overflow:hidden; }
.ds-report-hero::before { content:''; position:absolute; top:-50px; right:-50px; width:200px; height:200px; border-radius:50%; background:rgba(167,219,214,0.08); }
.ds-r-eyebrow { font-size:10px; text-transform:uppercase; letter-spacing:0.14em; color:var(--teal-light); margin-bottom:6px; }
.ds-r-company { font-family:'DM Serif Display',serif; font-size:2rem; color:white; line-height:1.2; margin-bottom:4px; }
.ds-r-meta { font-size:13px; color:rgba(255,255,255,0.5); margin-bottom:1.25rem; }
.ds-r-summary { font-size:14px; color:rgba(255,255,255,0.82); line-height:1.65; max-width:620px; }
.ds-report-card { background:white; border-radius:16px; border:1px solid rgba(12,61,73,0.08); padding:1.5rem; }
.ds-report-card h3 { font-size:11px; font-weight:600; color:var(--teal); text-transform:uppercase; letter-spacing:0.09em; margin-bottom:1rem; }
.ds-scores-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(130px,1fr)); gap:10px; }
.ds-sc-card { background:var(--cream-bright); border-radius:10px; border:1px solid rgba(12,61,73,0.07); padding:0.9rem; }
.ds-sc-cat { font-size:11px; color:var(--muted); text-transform:uppercase; letter-spacing:0.07em; margin-bottom:5px; }
.ds-sc-val { font-size:22px; font-weight:600; margin-bottom:4px; }
.ds-sc-val.hi { color:#1a6b50; } .ds-sc-val.mid { color:#b07a10; } .ds-sc-val.lo { color:var(--red); }
.ds-sc-bar-bg { height:3px; background:rgba(12,61,73,0.08); border-radius:2px; }
.ds-sc-bar { height:3px; border-radius:2px; }
.ds-sc-bar.hi { background:var(--green); } .ds-sc-bar.mid { background:var(--amber); } .ds-sc-bar.lo { background:#e24b4a; }
.ds-str-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; }
.ds-str-card { background:rgba(167,219,214,0.15); border:1px solid rgba(12,61,73,0.08); border-radius:12px; padding:1.1rem; text-align:center; }
.ds-str-score { font-size:24px; font-weight:600; color:var(--teal); margin-bottom:4px; }
.ds-str-label { font-size:11px; color:var(--teal-mid); text-transform:uppercase; letter-spacing:0.07em; margin-bottom:6px; }
.ds-str-note { font-size:12px; color:var(--muted); line-height:1.5; }
.ds-gap { padding:1rem 0; border-bottom:1px solid rgba(12,61,73,0.06); }
.ds-gap:last-child { border-bottom:none; padding-bottom:0; }
.ds-gap-hdr { display:flex; align-items:center; justify-content:space-between; margin-bottom:6px; }
.ds-gap-cat { font-size:14px; font-weight:500; color:var(--teal); }
.ds-gap-badge { font-size:11px; font-weight:600; padding:2px 9px; border-radius:16px; }
.ds-gap-badge.critical { background:rgba(163,45,45,0.1); color:var(--red); }
.ds-gap-badge.high { background:rgba(186,117,23,0.1); color:var(--amber); }
.ds-gap-badge.medium { background:rgba(12,61,73,0.08); color:var(--teal); }
.ds-gap-note { font-size:13px; color:#3a4a4e; line-height:1.6; }
.ds-reco-list { list-style:none; }
.ds-reco { display:flex; gap:12px; align-items:flex-start; padding:10px 0; border-bottom:1px solid rgba(12,61,73,0.06); }
.ds-reco:last-child { border-bottom:none; }
.ds-reco-num { width:22px; height:22px; border-radius:50%; background:var(--teal); color:white; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:600; flex-shrink:0; margin-top:1px; }
.ds-reco-text { font-size:13px; color:#2a3a3e; line-height:1.6; }
.ds-mentor-gate { background:rgba(167,219,214,0.12); border:1.5px dashed rgba(12,61,73,0.2); border-radius:16px; padding:2rem; text-align:center; }
.ds-mentor-gate h3 { font-family:'DM Serif Display',serif; font-size:1.2rem; color:var(--teal); margin-bottom:0.5rem; }
.ds-mentor-gate p { font-size:13px; color:var(--muted); line-height:1.65; margin-bottom:1.25rem; }
.ds-join-btn { display:inline-flex; align-items:center; gap:8px; padding:11px 28px; border-radius:28px; border:none; background:var(--teal); color:white; font-family:'DM Sans',sans-serif; font-size:13px; font-weight:500; cursor:pointer; text-decoration:none; }
.ds-report-footer { text-align:center; padding-top:1rem; }
.ds-report-footer p { font-size:12px; color:#8a9ea2; line-height:1.6; }
.ds-report-footer a { color:var(--teal); }
.ds-reset-btn { display:inline-flex; align-items:center; gap:7px; padding:9px 22px; border-radius:22px; border:1px solid rgba(12,61,73,0.18); background:white; cursor:pointer; font-family:'DM Sans',sans-serif; font-size:12px; color:var(--teal); margin-top:1rem; transition:background 0.15s; }
.ds-reset-btn:hover { background:rgba(167,219,214,0.15); }
@keyframes ds-fade { from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)} }
.ds-fade { animation:ds-fade 0.25s ease; }
`;

// ─── VIEW TYPE ────────────────────────────────────────────────────────────────

type View = 'intro' | 'survey' | 'submit' | 'processing' | 'report';

// ─── LOGO ────────────────────────────────────────────────────────────────────

const LogoMark: React.FC = () => (
  <div className="ds-logo-mark">
    <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
      <path d="M9 1.5C9 1.5 5.5 4.5 5.5 8.5C5.5 10.5 7.1 12 9 12C10.9 12 12.5 10.5 12.5 8.5C12.5 4.5 9 1.5 9 1.5Z" fill="white" opacity="0.9"/>
      <path d="M5.5 10.5C3.5 11.5 2.5 13.5 3.5 15C4.5 16.5 7 16.5 9 15.5C11 16.5 13.5 16.5 14.5 15C15.5 13.5 14.5 11.5 12.5 10.5" stroke="white" strokeWidth="1.1" fill="none" opacity="0.65"/>
    </svg>
  </div>
);

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function DiagnosticSurvey() {
  const [view, setView] = useState<View>('intro');
  const [currentSection, setCurrentSection] = useState<number>(-1);
  const [answers, setAnswers] = useState<Answers>({});
  const [memberInfo, setMemberInfo] = useState<MemberInfo>({ name:'', company:'', stage:'', email:'', desc:'' });
  const [aiResult, setAiResult] = useState<AIResult | null>(null);
  const [processingSteps, setProcessingSteps] = useState<('idle'|'active'|'done')[]>(['idle','idle','idle','idle']);

  const completedSections = SECTIONS.filter(s =>
    answers[s.id] && Object.keys(answers[s.id]).length === s.questions.length
  ).length;
  const progress = Math.round((completedSections / SECTIONS.length) * 100);

  const selectAnswer = useCallback((secId: string, qIdx: number, optIdx: number) => {
    setAnswers(prev => ({
      ...prev,
      [secId]: { ...(prev[secId] || {}), [qIdx]: optIdx }
    }));
  }, []);

  const startSurvey = () => { setCurrentSection(0); setView('survey'); };
  const goToIntro = () => { setView('intro'); setCurrentSection(-1); };
  const goToSubmit = () => setView('submit');

  const submitSurvey = async () => {
    setView('processing');
    const steps: ('idle'|'active'|'done')[] = ['active','idle','idle','idle'];
    setProcessingSteps([...steps]);

    const scores: Record<string, number> = {};
    SECTIONS.forEach(s => { scores[s.id] = getSectionScore(s.id, answers) ?? 0; });
    const summaryLines = SECTIONS.map(s => `- ${s.title}: ${scores[s.id]}%`).join('\n');

    try {
      // Step 1 → 2
      const prompt = `You are a health tech startup advisor at Rellia Health. Analyze this startup diagnostic and return ONLY valid JSON (no markdown, no backticks).
Company: ${memberInfo.company}
Stage: ${memberInfo.stage}
Product: ${memberInfo.desc}
Section scores: ${summaryLines}
Return: {"summary":"2-3 sentences to founder in second person","top3_strengths":[{"category":"","score":0,"note":""}],"top3_weaknesses":[{"category":"","score":0,"note":"","priority":"Critical"}],"recommendations":[""],"mentor_areas_needed":[""]}`;

      setProcessingSteps(['done','active','idle','idle']);
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 1200, messages: [{ role: 'user', content: prompt }] })
      });
      const data = await res.json();
      const text = data.content.map((b: { text?: string }) => b.text || '').join('');
      const result: AIResult = JSON.parse(text.replace(/```json|```/g, '').trim());
      setAiResult(result);

      setProcessingSteps(['done','done','active','idle']);

      // Send emails
      try {
        const emailBody = buildEmailHTML(result, scores, memberInfo);
        await proxyPost('/gmail/send', { to: CONFIG.RELLIA_COPY_EMAIL, subject: `[Diagnostic] ${memberInfo.company} — ${new Date().toLocaleDateString('en-CA')}`, body: emailBody, isHtml: true });
        if (memberInfo.email) {
          await proxyPost('/gmail/send', { to: memberInfo.email, subject: `Your Rellia Startup Diagnostic — ${memberInfo.company}`, body: emailBody, isHtml: true });
        }
      } catch(e) { console.warn('Email send failed', e); }

      setProcessingSteps(['done','done','done','done']);
      setTimeout(() => setView('report'), 400);

    } catch(err) {
      console.error(err);
      setView('submit');
      alert('Something went wrong. Please try again.');
    }
  };

  const sec = currentSection >= 0 ? SECTIONS[currentSection] : null;
  const secAnswers = sec ? (answers[sec.id] || {}) : {};
  const answeredCount = Object.keys(secAnswers).length;
  const secScore = sec ? getSectionScore(sec.id, answers) : null;

  return (
    <div className="ds-root">
      <style>{css}</style>
      <div className="ds-shell">

        {/* ── SIDEBAR ── */}
        <aside className="ds-sidebar">
          <div className="ds-sidebar-top">
            <div className="ds-logo-row">
              <LogoMark />
              <span className="ds-logo-text">Rellia</span>
            </div>
            <div>
              <div className="ds-sp-top">
                <span className="ds-sp-label">Assessment progress</span>
                <span className="ds-sp-count">{completedSections} / {SECTIONS.length}</span>
              </div>
              <div className="ds-sp-bar-bg">
                <div className="ds-sp-bar-fill" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>
          <div className="ds-sidebar-nav">
            <p className="ds-nav-heading">Steps</p>
            <button className={`ds-nav-item ${view === 'intro' ? 'active' : ''}`} onClick={goToIntro}>
              <div className="ds-nav-dot" style={{ fontSize: 11 }}>→</div>
              <span className="ds-nav-label">Introduction</span>
            </button>
            <div className="ds-nav-divider" />
            <p className="ds-nav-heading" style={{ marginTop: 6 }}>Assessment Sections</p>
            {SECTIONS.map((s, i) => {
              const done = answers[s.id] && Object.keys(answers[s.id]).length === s.questions.length;
              const active = view === 'survey' && i === currentSection;
              return (
                <button key={s.id} className={`ds-nav-item ${active ? 'active' : ''} ${done ? 'done' : ''}`} onClick={() => { setCurrentSection(i); setView('survey'); }}>
                  <div className="ds-nav-dot">{i + 1}</div>
                  <span className="ds-nav-label">{s.title}</span>
                </button>
              );
            })}
            <div className="ds-nav-divider" />
            <button className={`ds-nav-item ${view === 'submit' ? 'active' : ''}`} onClick={goToSubmit}>
              <div className="ds-nav-dot">✓</div>
              <span className="ds-nav-label">Review & Submit</span>
            </button>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <main className="ds-main">

          {/* INTRO */}
          {view === 'intro' && (
            <div className="ds-gate ds-fade">
              <div className="ds-hero-card">
                <p className="ds-hero-eyebrow">Rellia Health · Startup Diagnostic</p>
                <h1>How ready is your startup, really?</h1>
                <p>Answer honestly across 13 domains — from regulatory and clinical to go-to-market and operations. Takes about 15 minutes. No right or wrong answers, just an accurate picture of where you are today.</p>
              </div>
              <div className="ds-card">
                <h3>How it works</h3>
                <div className="ds-how-steps">
                  {[
                    { n:1, title:'Tell us about your startup', desc:'So your results are in context' },
                    { n:2, title:'Work through 13 sections', desc:'At your own pace' },
                    { n:3, title:'Submit to get your report', desc:'Scores, gaps, strengths, and next steps' },
                    { n:4, title:'Members get mentor matching', desc:'Based on your top priority gaps' },
                  ].map(s => (
                    <div className="ds-how-step" key={s.n}>
                      <div className="ds-hstep-num">{s.n}</div>
                      <div className="ds-hstep-text"><b>{s.title}</b> — {s.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="ds-card">
                <h3>About your startup</h3>
                <div className="ds-form-row">
                  <div className="ds-field-group">
                    <label className="ds-field-label">Your name</label>
                    <input className="ds-field-input" type="text" placeholder="First name" value={memberInfo.name} onChange={e => setMemberInfo(p => ({...p, name: e.target.value}))} />
                  </div>
                  <div className="ds-field-group">
                    <label className="ds-field-label">Company name</label>
                    <input className="ds-field-input" type="text" placeholder="e.g. Gynaia Health" value={memberInfo.company} onChange={e => setMemberInfo(p => ({...p, company: e.target.value}))} />
                  </div>
                </div>
                <div className="ds-form-row">
                  <div className="ds-field-group">
                    <label className="ds-field-label">Company stage</label>
                    <select className="ds-field-input" value={memberInfo.stage} onChange={e => setMemberInfo(p => ({...p, stage: e.target.value}))}>
                      <option value="">Select your stage...</option>
                      <option>Idea / Pre-product</option>
                      <option>MVP / Early users</option>
                      <option>Seed / Traction</option>
                      <option>Series A+</option>
                    </select>
                  </div>
                  <div className="ds-field-group">
                    <label className="ds-field-label">Your email</label>
                    <input className="ds-field-input" type="email" placeholder="founder@yourcompany.com" value={memberInfo.email} onChange={e => setMemberInfo(p => ({...p, email: e.target.value}))} />
                  </div>
                </div>
                <div className="ds-form-row full">
                  <div className="ds-field-group">
                    <label className="ds-field-label">What does your product do?</label>
                    <input className="ds-field-input" type="text" placeholder="One sentence description" value={memberInfo.desc} onChange={e => setMemberInfo(p => ({...p, desc: e.target.value}))} />
                  </div>
                </div>
                <button className="ds-start-btn" onClick={startSurvey}>Begin Assessment →</button>
                <p className="ds-start-note">Free and open to all health tech founders · No account required to start</p>
              </div>
            </div>
          )}

          {/* SURVEY */}
          {view === 'survey' && sec && (
            <div className="ds-survey">
              <div className="ds-survey-inner ds-fade">
                <div className="ds-sec-hero">
                  <p className="ds-sec-eyebrow">Section {currentSection + 1} of {SECTIONS.length}</p>
                  <h2 className="ds-sec-title">{sec.title}</h2>
                  <p className="ds-sec-desc">{sec.desc}</p>
                </div>
                {sec.questions.map((q, qi) => {
                  const sel = secAnswers[qi] !== undefined ? secAnswers[qi] : -1;
                  return (
                    <div key={qi} className={`ds-q-card ${sel >= 0 ? 'answered' : ''}`}>
                      <span className="ds-q-type">{TYPE_LABELS[q.type]}</span>
                      <p className="ds-q-text">{q.text}</p>
                      <div className="ds-opts">
                        {q.options.map((opt, oi) => (
                          <button key={oi} className={`ds-opt ${sel === oi ? 'selected' : ''}`} onClick={() => selectAnswer(sec.id, qi, oi)}>
                            <div className="ds-opt-ind"><div className="ds-opt-check" /></div>
                            <div>
                              <div className="ds-opt-label">{opt.label}</div>
                              {opt.desc && <div className="ds-opt-desc">{opt.desc}</div>}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
                <div className="ds-sec-nav">
                  <button className="ds-nav-btn prev" onClick={() => currentSection === 0 ? goToIntro() : setCurrentSection(i => i - 1)}>
                    ← {currentSection === 0 ? 'Introduction' : 'Previous'}
                  </button>
                  <span className="ds-tally">
                    {answeredCount}/{sec.questions.length} answered
                    {answeredCount === sec.questions.length && secScore !== null && <> · <b>{secScore}%</b></>}
                  </span>
                  <button className="ds-nav-btn next" onClick={() => currentSection === SECTIONS.length - 1 ? goToSubmit() : setCurrentSection(i => i + 1)}>
                    {currentSection === SECTIONS.length - 1 ? 'Review & Submit →' : 'Next →'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SUBMIT */}
          {view === 'submit' && (
            <div className="ds-submit ds-fade">
              <div className="ds-submit-hero">
                <p className="ds-sec-eyebrow">Final step</p>
                <h2>Review your scores & unlock your report</h2>
                <p>Your diagnostic is complete. Submit below to generate your personalized report.</p>
              </div>
              <div className="ds-submit-grid">
                <div className="ds-score-sum">
                  <h3>Your scores by section</h3>
                  {SECTIONS.map(s => {
                    const sc = getSectionScore(s.id, answers);
                    const cls = sc === null ? '' : scoreClass(sc);
                    return (
                      <div key={s.id} className="ds-score-row">
                        <span className="ds-score-cat">{s.title}</span>
                        <span className={`ds-score-val ${cls}`}>{sc !== null ? `${sc}%` : '—'}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="ds-action-card">
                  <h3>Ready to see your full results?</h3>
                  <p>Your report includes scores across all 13 sections, your top three priority gaps, and five specific recommendations for what to tackle first.</p>
                  <div className="ds-member-callout">
                    <p><b>Rellia members</b> are also matched with a mentor whose expertise directly addresses their top gaps — bookable directly from the report.</p>
                  </div>
                  <button className="ds-submit-btn" onClick={submitSurvey}>Generate My Report →</button>
                  <p className="ds-submit-note">Your results are private. Members will be prompted to verify their membership to unlock mentor matching.</p>
                </div>
              </div>
            </div>
          )}

          {/* PROCESSING */}
          {view === 'processing' && (
            <div className="ds-processing">
              <div className="ds-proc-card">
                <div className="ds-spinner" />
                <h2>Analysing your results</h2>
                <p>We're reviewing your diagnostic across all 13 sections and building your personalized report.</p>
                <div className="ds-p-steps">
                  {['Analysing your section scores', 'Identifying strengths and gaps', 'Generating your recommendations', 'Sending your copy to Rellia'].map((label, i) => (
                    <div key={i} className={`ds-p-step ${processingSteps[i]}`}>
                      <div className="ds-p-dot" />{label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* REPORT */}
          {view === 'report' && aiResult && (
            <div className="ds-report ds-fade">
              <div className="ds-report-hero">
                <p className="ds-r-eyebrow">Startup Diagnostic Report · Rellia Health</p>
                <p className="ds-r-company">{memberInfo.company || 'Your Company'}</p>
                <p className="ds-r-meta">{memberInfo.stage} &nbsp;·&nbsp; {new Date().toLocaleDateString('en-CA', { year:'numeric', month:'long', day:'numeric' })}</p>
                <p className="ds-r-summary">{aiResult.summary}</p>
              </div>

              <div className="ds-report-card">
                <h3>Section Scores</h3>
                <div className="ds-scores-grid">
                  {[...SECTIONS].sort((a,b) => (getSectionScore(b.id, answers) ?? 0) - (getSectionScore(a.id, answers) ?? 0)).map(s => {
                    const sc = getSectionScore(s.id, answers) ?? 0;
                    const cls = scoreClass(sc);
                    return (
                      <div key={s.id} className="ds-sc-card">
                        <div className="ds-sc-cat">{s.title}</div>
                        <div className={`ds-sc-val ${cls}`}>{sc}%</div>
                        <div className="ds-sc-bar-bg"><div className={`ds-sc-bar ${cls}`} style={{ width: `${sc}%` }} /></div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="ds-report-card">
                <h3>Top 3 Strengths</h3>
                <div className="ds-str-grid">
                  {aiResult.top3_strengths.map((s, i) => (
                    <div key={i} className="ds-str-card">
                      <div className="ds-str-score">{s.score}%</div>
                      <div className="ds-str-label">{s.category}</div>
                      <div className="ds-str-note">{s.note}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="ds-report-card">
                <h3>Priority Gaps</h3>
                {aiResult.top3_weaknesses.map((w, i) => (
                  <div key={i} className="ds-gap">
                    <div className="ds-gap-hdr">
                      <span className="ds-gap-cat">{w.category}</span>
                      <span className={`ds-gap-badge ${w.priority.toLowerCase()}`}>{w.priority} · {w.score}%</span>
                    </div>
                    <p className="ds-gap-note">{w.note}</p>
                  </div>
                ))}
              </div>

              <div className="ds-report-card">
                <h3>Recommended Next Steps</h3>
                <ul className="ds-reco-list">
                  {aiResult.recommendations.map((r, i) => (
                    <li key={i} className="ds-reco">
                      <div className="ds-reco-num">{i + 1}</div>
                      <div className="ds-reco-text">{r}</div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="ds-report-card">
                <h3>Mentor Matching</h3>
                <div className="ds-mentor-gate">
                  <h3>Unlock your mentor matches</h3>
                  <p>Based on your results, we've identified three areas where a Rellia mentor can make the biggest difference. Join Rellia Health to see your matched mentors and book a session directly from this report.</p>
                  <a className="ds-join-btn" href="/join">Join Rellia Health →</a>
                </div>
              </div>

              <div className="ds-report-footer">
                <p>A copy of this report has been sent to {memberInfo.email || 'your email'} and to the Rellia team.<br />
                Questions? <a href="mailto:hello@relliahealth.com">hello@relliahealth.com</a></p>
                <button className="ds-reset-btn" onClick={() => { setView('intro'); setAnswers({}); setCurrentSection(-1); setAiResult(null); }}>
                  ← Start a new assessment
                </button>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

// ─── EMAIL ───────────────────────────────────────────────────────────────────

function buildEmailHTML(analysis: AIResult, scores: Record<string, number>, info: MemberInfo): string {
  const scoreRows = SECTIONS.map(s =>
    `<tr><td style="padding:4px 8px;font-size:13px;color:#5a6a6e;">${s.title}</td><td style="padding:4px 8px;font-size:13px;font-weight:500;color:#0c3d49;">${scores[s.id]}%</td></tr>`
  ).join('');
  return `<div style="font-family:sans-serif;max-width:680px;margin:0 auto;">
    <div style="background:#0c3d49;padding:2rem;border-radius:16px 16px 0 0;">
      <p style="color:#a7dbd6;font-size:11px;text-transform:uppercase;letter-spacing:0.12em;margin:0 0 4px;">Rellia Health — Startup Diagnostic</p>
      <h1 style="color:white;font-size:1.6rem;margin:0 0 4px;">${info.company}</h1>
      <p style="color:rgba(255,255,255,0.5);font-size:13px;margin:0;">${info.stage} · ${new Date().toLocaleDateString('en-CA')}</p>
    </div>
    <div style="background:white;padding:2rem;">
      <h2 style="color:#0c3d49;font-size:1rem;margin:0 0 8px;">Summary</h2>
      <p style="font-size:14px;color:#3a4a4e;line-height:1.65;">${analysis.summary}</p>
      <h2 style="color:#0c3d49;font-size:1rem;margin:1.5rem 0 8px;">Section Scores</h2>
      <table style="width:100%;border-collapse:collapse;">${scoreRows}</table>
      <h2 style="color:#0c3d49;font-size:1rem;margin:1.5rem 0 8px;">Priority Gaps</h2>
      ${analysis.top3_weaknesses.map(w => `<p style="font-size:14px;margin:5px 0;"><strong style="color:#a32d2d;">${w.priority}</strong> — <strong>${w.category}</strong> (${w.score}%): ${w.note}</p>`).join('')}
      <h2 style="color:#0c3d49;font-size:1rem;margin:1.5rem 0 8px;">Recommendations</h2>
      ${analysis.recommendations.map((r,i) => `<p style="font-size:14px;margin:4px 0;"><strong>${i+1}.</strong> ${r}</p>`).join('')}
    </div>
    <div style="background:#f8f1e8;padding:1rem 2rem;border-radius:0 0 16px 16px;">
      <p style="font-size:12px;color:#8a9ea2;margin:0;">Rellia Health Startup Diagnostic · hello@relliahealth.com</p>
    </div>
  </div>`;
}

async function proxyPost(path: string, body: object): Promise<unknown> {
  const res = await fetch(CONFIG.PROXY_URL + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error('Proxy error ' + res.status);
  return res.json();
}
