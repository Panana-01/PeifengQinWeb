import { ArrowLeft } from 'lucide-react';
import './WebsiteWorkflowPage.css';

const workflowSteps = [
  {
    id: 'reason-to-start',
    type: 'milestone',
    label: 'Starting point',
    title: 'A practical reason to build',
    body:
      'Ahead of graduating in September, I began preparing my CV and applying for roles. I quickly realised that the work I wanted to apply for needed more than a document - it needed a portfolio I could shape and keep developing.',
  },
  {
    id: 'first-prototype',
    type: 'milestone',
    label: 'First prototype',
    title: 'From a CV to a working homepage',
    body:
      'I had never built a website before. I followed tutorials, gave Codex my CV and used references from motion-design libraries to assemble the first version. The result proved that I could create a functioning site, but it also exposed the limits of a prompt-only workflow.',
    solutionTitle: 'Move to a hybrid workflow',
    solution:
      'I explored Figma-to-code bridges first, but the live two-way options available to me were not reliable enough for this project. I kept Codex for reasoning, debugging and larger changes, then used Cursor to inspect and directly edit React and CSS when I needed fast layout control.',
  },
  {
    id: 'prompt-bottleneck',
    type: 'problem',
    label: 'Problem',
    title: 'Conversation became the interface for every edit',
    problem: [
      'Even a small change - colour, spacing or alignment - required another AI conversation. The loop was convenient for generating ideas, but too indirect for precise visual iteration.',
      'I could recognise components, selectors and repeated patterns, but I did not yet have enough front-end knowledge to change them confidently or predict the side effects.'
    ],
    solutionTitle: 'Create a manual-code guide',
    solution:
      'I created a reusable manual-code-guide skill. Before making a change, it explains which file owns the behaviour, how the relevant HTML/React structure and CSS selectors work, and what should be tested afterwards. This turned each edit into a small learning loop instead of a blind patch.',
  },
  {
    id: 'screen-space',
    type: 'problem',
    label: 'Problem',
    title: 'One laptop screen could not support code and live preview',
    problem:
      'Switching constantly between the editor and the browser made visual comparison slow. It was difficult to keep the page state in view while adjusting layout values.',
    solutionTitle: 'Separate editing from observation',
    solution:
      'I used an iPad as a second display: Cursor stayed on the laptop and the local Vite preview stayed visible on the second screen. Hot reload made the browser update after each save, so layout decisions became much easier to compare in real time.',
  },
  {
    id: 'layout-ownership',
    type: 'problem',
    label: 'Problem',
    title: 'Generated components blurred layout responsibility',
    problem:
      'After several rounds of prompting, component CSS started to control both the component itself and its position on the page. AI also overused absolute positioning, so layouts that looked correct at one size could collapse at another.',
    solutionTitle: 'Encode layout responsibility as project rules',
    solution:
      'I wrote rules that separate responsibilities: a parent container owns page-level arrangement; a component owns its internal presentation. Flexbox or Grid is the default for major UI structure, using gap, padding, margin, max-width and alignment. Absolute positioning is reserved mainly for decorative layers such as particles, overlays and badges.',
  },
  {
    id: 'version-trust',
    type: 'problem',
    label: 'Problem',
    title: 'Different previews appeared to be different versions',
    problem:
      'Cursor preview, the browser and Codex could show different pages when an old dev server, another port, a stale dist build or a different checkout was still running. I could not confidently tell which page represented the current source.',
    solutionTitle: 'Make the running source traceable',
    solution:
      'I standardised the preview workflow around one Git checkout, an explicitly started Vite server and one known local URL. I verify the working directory and port, rebuild before checking static output, and treat src plus the active dev server as the editing source of truth.',
  },
  {
    id: 'responsive-qa',
    type: 'problem',
    label: 'Problem',
    title: 'A layout that worked at 1440px failed elsewhere',
    problem:
      'The same page could feel spacious on one display and crowded on another. Browser chrome, viewport width and fixed coordinates all changed the apparent composition.',
    solutionTitle: 'Turn responsiveness into a repeatable QA pass',
    solution:
      'I established a sequence instead of trying to perfect every size at once: make broad changes at 1440px, stabilise desktop, refine tablet, refine mobile, then run an all-size check. I use DevTools for observation and prefer responsive constraints such as Grid, Flexbox, clamp(), max-width and deliberate breakpoints.',
  }
];

function SolutionPanel({ step }) {
  return (
    <aside className="workflow-solution" aria-label={step.solutionTitle}>
      <span className="workflow-solution-kicker">Solution</span>
      <h3>{step.solutionTitle}</h3>
      <p>{step.solution}</p>
    </aside>
  );
}

function WorkflowStep({ step, index }) {
  const isProblem = step.type === 'problem';
  const headingId = `workflow-step-${step.id}`;

  return (
    <article
      className={`workflow-step${isProblem ? ' is-problem' : ' is-milestone'}`}
      aria-labelledby={headingId}
    >
      <div className="workflow-marker" aria-hidden="true">
        <span>{String(index + 1).padStart(2, '0')}</span>
      </div>

      <div className="workflow-node">
        <span className="workflow-node-label">{step.label}</span>
        <h3 id={headingId}>{step.title}</h3>
        {isProblem
          ? (Array.isArray(step.problem) ? step.problem : [step.problem]).map((text) => (
              <p className="workflow-problem-copy" key={text}>{text}</p>
            ))
          : <p>{step.body}</p>}
      </div>

      {step.solution ? <SolutionPanel step={step} /> : null}
    </article>
  );
}

function WebsiteWorkflowPage() {
  return (
    <div className="workflow-page">
      <header className="workflow-header">
        <a className="workflow-back" href="#top" aria-label="Back to home">
          <ArrowLeft size={18} aria-hidden="true" />
        </a>
        <div className="workflow-intro">
          <h1>How I built this website</h1>
          <p>From a CV to a site I can edit myself.</p>
        </div>
      </header>

      <main className="workflow-map">
        <div className="workflow-spine" aria-hidden="true" />
        {workflowSteps.map((step, index) => (
          <WorkflowStep step={step} index={index} key={step.id} />
        ))}
      </main>
    </div>
  );
}

export default WebsiteWorkflowPage;
