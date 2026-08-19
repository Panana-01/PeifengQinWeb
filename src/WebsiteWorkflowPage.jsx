import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, MonitorSmartphone } from 'lucide-react';
import './WebsiteWorkflowPage.css';

const workflowSteps = [
  {
    id: 'reason-to-start',
    type: 'milestone',
    label: 'Starting point',
    title: 'A practical reason to build',
    body:
      'Ahead of graduating in September, I began preparing my CV and applying for roles. I quickly realised that the work I wanted to apply for needed more than a document - it needed a portfolio I could shape and keep developing.',
    note: 'Decision: build a personal website from scratch.'
  },
  {
    id: 'first-prototype',
    type: 'milestone',
    label: 'First prototype',
    title: 'From a CV to a working homepage',
    body:
      'I had never built a website before. I followed tutorials, gave Codex my CV and used references from motion-design libraries to assemble the first version. The result proved that I could create a functioning site, but it also exposed the limits of a prompt-only workflow.',
    note: 'Outcome: a usable first version and a much clearer set of questions.'
  },
  {
    id: 'prompt-bottleneck',
    type: 'problem',
    label: 'Problem 01',
    title: 'Conversation became the interface for every edit',
    problem:
      'Even a small change - colour, spacing or alignment - required another AI conversation. The loop was convenient for generating ideas, but too indirect for precise visual iteration.',
    solutionTitle: 'Move to a hybrid workflow',
    solution:
      'I explored Figma-to-code bridges first, but the live two-way options available to me were not reliable enough for this project. I kept Codex for reasoning, debugging and larger changes, then used Cursor to inspect and directly edit React and CSS when I needed fast layout control.',
    takeaways: ['AI for reasoning and larger changes', 'Direct code editing for precise iteration', 'Browser preview as immediate feedback']
  },
  {
    id: 'code-literacy',
    type: 'problem',
    label: 'Problem 02',
    title: 'I could follow the structure, but I did not know HTML or CSS',
    problem:
      'I could recognise components, selectors and repeated patterns, but I did not yet have enough front-end knowledge to change them confidently or predict the side effects.',
    solutionTitle: 'Create a manual-code guide',
    solution:
      'I created a reusable manual-code-guide skill. Before making a change, it explains which file owns the behaviour, how the relevant HTML/React structure and CSS selectors work, and what should be tested afterwards. This turned each edit into a small learning loop instead of a blind patch.',
    takeaways: ['Understand ownership before editing', 'Explain selectors and layout rules', 'Test the result after every change']
  },
  {
    id: 'screen-space',
    type: 'problem',
    label: 'Problem 03',
    title: 'One laptop screen could not support code and live preview',
    problem:
      'Switching constantly between the editor and the browser made visual comparison slow. It was difficult to keep the page state in view while adjusting layout values.',
    solutionTitle: 'Separate editing from observation',
    solution:
      'I used an iPad as a second display: Cursor stayed on the laptop and the local Vite preview stayed visible on the second screen. Hot reload made the browser update after each save, so layout decisions became much easier to compare in real time.',
    takeaways: ['Editor on the primary screen', 'Live browser on the second screen', 'One local URL for continuous feedback']
  },
  {
    id: 'layout-ownership',
    type: 'problem',
    label: 'Problem 04',
    title: 'Generated components blurred layout responsibility',
    problem:
      'After several rounds of prompting, component CSS started to control both the component itself and its position on the page. AI also overused absolute positioning, so layouts that looked correct at one size could collapse at another.',
    solutionTitle: 'Encode layout responsibility as project rules',
    solution:
      'I wrote rules that separate responsibilities: a parent container owns page-level arrangement; a component owns its internal presentation. Flexbox or Grid is the default for major UI structure, using gap, padding, margin, max-width and alignment. Absolute positioning is reserved mainly for decorative layers such as particles, overlays and badges.',
    takeaways: ['Parent owns arrangement', 'Component owns internal styling', 'Flex/Grid before absolute positioning']
  },
  {
    id: 'version-trust',
    type: 'problem',
    label: 'Problem 05',
    title: 'Different previews appeared to be different versions',
    problem:
      'Cursor preview, the browser and Codex could show different pages when an old dev server, another port, a stale dist build or a different checkout was still running. I could not confidently tell which page represented the current source.',
    solutionTitle: 'Make the running source traceable',
    solution:
      'I standardised the preview workflow around one Git checkout, an explicitly started Vite server and one known local URL. I verify the working directory and port, rebuild before checking static output, and treat src plus the active dev server as the editing source of truth.',
    takeaways: ['One checkout and one active port', 'Verify the server working directory', 'Rebuild before static preview']
  },
  {
    id: 'responsive-qa',
    type: 'problem',
    label: 'Problem 06',
    title: 'A layout that worked at 1440px failed elsewhere',
    problem:
      'The same page could feel spacious on one display and crowded on another. Browser chrome, viewport width and fixed coordinates all changed the apparent composition.',
    solutionTitle: 'Turn responsiveness into a repeatable QA pass',
    solution:
      'I established a sequence instead of trying to perfect every size at once: make broad changes at 1440px, stabilise desktop, refine tablet, refine mobile, then run an all-size check. I use DevTools for observation and prefer responsive constraints such as Grid, Flexbox, clamp(), max-width and deliberate breakpoints.',
    takeaways: ['1440px broad edit', 'Desktop, tablet and mobile refinement', 'Final all-size QA']
  }
];

function SolutionControl({ step, side }) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverId = `${step.id}-solution`;

  const closeWhenFocusLeaves = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setIsOpen(false);
  };

  return (
    <div
      className={`workflow-solution-control is-${side}${isOpen ? ' is-open' : ''}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onBlur={closeWhenFocusLeaves}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          setIsOpen(false);
          event.currentTarget.querySelector('button')?.focus();
        }
      }}
    >
      <button
        className="workflow-solution-button"
        type="button"
        aria-expanded={isOpen}
        aria-controls={popoverId}
        onClick={() => setIsOpen((current) => !current)}
      >
        Solution
        <ArrowRight size={16} aria-hidden="true" />
      </button>

      <aside className="workflow-solution-popover" id={popoverId} aria-hidden={!isOpen}>
        <span className="workflow-solution-kicker">Solution</span>
        <h3>{step.solutionTitle}</h3>
        <p>{step.solution}</p>
        <ul>
          {step.takeaways.map((takeaway) => (
            <li key={takeaway}>
              <Check size={15} aria-hidden="true" />
              <span>{takeaway}</span>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}

function WorkflowStep({ step, index }) {
  const side = index % 2 === 0 ? 'left' : 'right';
  const isProblem = step.type === 'problem';

  return (
    <article className={`workflow-step is-${side}${isProblem ? ' is-problem' : ' is-milestone'}`}>
      <div className="workflow-marker" aria-hidden="true">
        <span>{String(index + 1).padStart(2, '0')}</span>
      </div>

      <div className="workflow-node">
        <span className="workflow-node-label">{step.label}</span>
        <h2>{step.title}</h2>
        {isProblem ? <p className="workflow-problem-copy">{step.problem}</p> : <p>{step.body}</p>}
        {isProblem ? (
          <SolutionControl step={step} side={side} />
        ) : (
          <p className="workflow-milestone-note">{step.note}</p>
        )}
      </div>
    </article>
  );
}

function WebsiteWorkflowPage() {
  return (
    <div className="workflow-page">
      <header className="workflow-header">
        <a className="workflow-back" href="#top">
          <ArrowLeft size={18} aria-hidden="true" />
          Back to home
        </a>
      </header>

      <main className="workflow-map" aria-label="Website development workflow">
        <div className="workflow-spine" aria-hidden="true" />
        {workflowSteps.map((step, index) => (
          <WorkflowStep step={step} index={index} key={step.id} />
        ))}
      </main>

      <footer className="workflow-outcome">
        <MonitorSmartphone size={28} aria-hidden="true" />
        <div>
          <span>Current loop</span>
          <h2>Intent → AI reasoning → direct code → live browser → responsive QA → Git checkpoint</h2>
          <p>The website is still evolving, but the process is now deliberate, testable and recoverable.</p>
        </div>
      </footer>
    </div>
  );
}

export default WebsiteWorkflowPage;
