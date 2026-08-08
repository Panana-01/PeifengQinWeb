import React, { useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Check,
  ChevronRight,
  CircleHelp,
  Database,
  ExternalLink,
  Github,
  Layers3,
  MessageCircle,
  PackagePlus,
  Play,
  Route,
  ShieldCheck,
  UserRound
} from 'lucide-react';

const technologyTags = [
  'Python',
  'scikit-learn',
  'pandas',
  'TF-IDF',
  'Cosine Similarity',
  'NLP'
];

const overviewItems = [
  ['Project Type', 'University AI / HCI Project'],
  ['My Role', '[Add role]'],
  ['Duration', '[Add duration]'],
  ['Tools', 'Python, pandas, scikit-learn, SciPy'],
  ['Focus', 'Conversational UX, NLP, Context Management']
];

const features = [
  {
    icon: Database,
    title: 'Dataset-backed Q&A',
    body: 'Retrieves answers from more than 1,400 question-answer pairs.'
  },
  {
    icon: PackagePlus,
    title: 'Kitchen Inventory',
    body: 'Adds, removes, and lists food items with quantities and units.'
  },
  {
    icon: UserRound,
    title: 'Identity Memory',
    body: 'Remembers, changes, recalls, or forgets the user鈥檚 name during a session.'
  },
  {
    icon: CircleHelp,
    title: 'Contextual Help',
    body: 'Adapts guidance according to the current conversation state.'
  },
  {
    icon: ShieldCheck,
    title: 'Error Recovery',
    body: 'Responds to repeated recognition failures with clear next-step guidance.'
  }
];

const processSteps = [
  ['01', 'User Input', 'A natural-language request enters the conversation loop.'],
  ['02', 'Intent Matching', 'TF-IDF vectors and cosine similarity identify the closest supported intent.'],
  ['03', 'Module Routing', 'The request is sent to question answering, identity, inventory, or small-talk logic.'],
  ['04', 'Context Update', 'ChatContext stores names, previous intent, inventory, and pending actions.'],
  ['05', 'Response', 'A confidence-aware, stateful response is returned to the user.']
];

const interactionFlows = [
  {
    number: '01',
    eyebrow: 'Flow 1 鈥?Personalisation',
    title: 'Remembering who the user is',
    body: 'The chatbot stores the name in the current session and uses it to personalise later responses.',
    messages: [
      ['user', 'My name is Alice.'],
      ['bot', 'Nice to meet you, Alice! I鈥檒l remember that.']
    ]
  },
  {
    number: '02',
    eyebrow: 'Flow 2 鈥?Inventory Management',
    title: 'Turning natural language into structured inventory data',
    body: 'Natural-language commands are parsed into an item, quantity, and normalised unit.',
    messages: [
      ['user', 'Add 1L milk.'],
      ['bot', 'Alice, I added 1 L milk to your inventory.'],
      ['user', 'Show my kitchen inventory.'],
      ['bot', 'Here is your kitchen inventory:\n鈥?milk: 1 L']
    ]
  },
  {
    number: '03',
    eyebrow: 'Flow 3 鈥?Confirmation Before Removal',
    title: 'Preventing accidental destructive actions',
    body: 'Potentially destructive actions require confirmation, helping users prevent accidental changes.',
    messages: [
      ['user', 'Remove 1L milk.'],
      ['bot', 'Do you want to remove 1 L milk from your inventory? Please type 鈥測es鈥?or 鈥渘o鈥?'],
      ['user', 'Yes.'],
      ['bot', 'OK, I removed 1 L milk.']
    ]
  }
];

const principles = [
  ['Discoverability', 'Users can request help and receive examples of supported commands.'],
  ['Feedback', 'Every inventory action returns an immediate status update.'],
  ['Error Prevention', 'Removal requires explicit confirmation.'],
  ['Context', 'Responses adapt to the user鈥檚 name, previous intent, and pending action.']
];

const nextSteps = [
  'Add persistent user and inventory storage',
  'Support a wider range of natural-language expressions',
  'Evaluate intent accuracy using a labelled test set',
  'Conduct usability testing on guidance and recovery flows',
  'Improve multilingual support',
  'Add automated tests and deployment documentation'
];

function ChatMessage({ role, children }) {
  return (
    <div className={`venem-message venem-message-${role}`}>
      <span>{role === 'bot' ? 'Venem' : 'You'}</span>
      <p>{children}</p>
    </div>
  );
}

function ConversationMockup({ messages, compact = false }) {
  return (
    <div className={`venem-chat-window${compact ? ' venem-chat-window-compact' : ''}`}>
      <div className="venem-chat-bar">
        <span className="venem-chat-avatar">
          <Bot size={18} />
        </span>
        <div>
          <strong>Venem</strong>
          <small><i /> Context ready</small>
        </div>
        <span className="venem-chat-mode">NLP</span>
      </div>
      <div className="venem-chat-messages">
        {messages.map(([role, message], index) => (
          <ChatMessage role={role} key={`${role}-${index}`}>
            {message}
          </ChatMessage>
        ))}
        {!compact ? (
          <div className="venem-typing" aria-label="Venem is typing">
            <i /><i /><i />
          </div>
        ) : null}
      </div>
      {!compact ? (
        <div className="venem-chat-input" aria-hidden="true">
          <span>Type a message...</span>
          <ArrowRight size={17} />
        </div>
      ) : null}
    </div>
  );
}

function VenemCaseStudyPage() {
  const scrollToSection = (id) => (event) => {
    event.preventDefault();
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById(id)?.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('.venem-reveal'));
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="venem-page">
      <div className="venem-content">
        <section className="venem-hero" id="venem-top">
          <div className="venem-hero-copy venem-reveal">
            <a className="venem-back-link" href="#projects">
              <ArrowLeft size={17} />
              Back to Academic Projects
            </a>
            <span className="venem-eyebrow">HCI 脳 Natural Language Processing</span>
            <div className="venem-tags" aria-label="Technologies used">
              {technologyTags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            <div className="venem-actions">
              <a
                className="venem-button"
                href="#kitchen-inventory-chatbot"
                onClick={scrollToSection('venem-interaction')}
              >
                <Play size={17} fill="currentColor" />
                View Demo
              </a>
              <a
                className="venem-button venem-button-secondary"
                href="#kitchen-inventory-chatbot"
                onClick={scrollToSection('venem-process')}
              >
                Explore the Process
                <ArrowRight size={17} />
              </a>
            </div>
          </div>

          <div className="venem-hero-demo venem-reveal" id="venem-demo">
            <div className="venem-demo-orbit" aria-hidden="true" />
            <figure className="venem-demo-image-card" aria-label="Venem chatbot running in PyCharm">
              <img src="/assets/venem-demo-screenshot.png" alt="Venem chatbot demo running in PyCharm" />
            </figure>
          </div>
        </section>

        <section className="venem-section venem-overview" id="venem-overview">
          <div className="venem-section-heading venem-reveal">
            <span className="venem-eyebrow">Project Overview</span>
            <h2>A lightweight system designed around understandable conversation.</h2>
          </div>
          <div className="venem-overview-grid venem-reveal">
            {overviewItems.map(([label, value]) => (
              <article key={label}>
                <span>{label}</span>
                <strong className={value.startsWith('[') ? 'venem-placeholder' : ''}>{value}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="venem-section venem-challenge venem-reveal">
          <div className="venem-section-heading">
            <span className="venem-eyebrow">The Challenge</span>
            <h2>Designing useful conversations without a large language model</h2>
            <p>
              The challenge was to build a chatbot capable of recognising different user goals, returning relevant
              information, and maintaining essential conversational context. The interaction also needed to remain
              understandable when the system could not confidently interpret a request.
            </p>
          </div>
          <div className="venem-challenge-flow" aria-label="Challenge flow">
            <div><MessageCircle size={24} /><span>User expression</span></div>
            <ChevronRight size={22} />
            <div><Route size={24} /><span>Intent understanding</span></div>
            <ChevronRight size={22} />
            <div><Bot size={24} /><span>Context-aware response</span></div>
          </div>
        </section>

        <section className="venem-section venem-solution" id="venem-process">
          <div className="venem-section-heading venem-reveal">
            <span className="venem-eyebrow">The Solution</span>
            <h2>A hybrid conversational architecture</h2>
            <p>
              Venem combines retrieval-based text matching with rule-based conversation management. TF-IDF and
              cosine similarity identify related intents and retrieve answers, while regular expressions and shared
              context support structured tasks such as remembering names and managing kitchen inventory.
            </p>
          </div>
          <div className="venem-feature-grid">
            {features.map(({ icon: Icon, title, body }) => (
              <article className="venem-feature-card venem-reveal" key={title}>
                <span><Icon size={22} /></span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="venem-section venem-how-it-works">
          <div className="venem-section-heading venem-reveal">
            <span className="venem-eyebrow">How It Works</span>
            <h2>From an utterance to a stateful response</h2>
            <p>
              CountVectorizer and TF-IDF transform text into vectors. Cosine similarity finds the closest intent or
              question, confidence thresholds prevent weak matches, and ChatContext preserves the state required
              for a coherent reply.
            </p>
          </div>
          <div className="venem-process-diagram venem-reveal">
            {processSteps.map(([number, title, body], index) => (
              <React.Fragment key={number}>
                <article>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
                {index < processSteps.length - 1 ? <ArrowRight className="venem-process-arrow" size={20} /> : null}
              </React.Fragment>
            ))}
          </div>
        </section>

        <section className="venem-section venem-interactions" id="venem-interaction">
          <div className="venem-section-heading venem-reveal">
            <span className="venem-eyebrow">Key Interaction Flows</span>
            <h2>Conversation patterns designed for clarity and control</h2>
          </div>
          <div className="venem-flow-list">
            {interactionFlows.map((flow, index) => (
              <article className={`venem-flow venem-reveal${index % 2 ? ' venem-flow-reverse' : ''}`} key={flow.number}>
                <div className="venem-flow-copy">
                  <span className="venem-flow-number">{flow.number}</span>
                  <span className="venem-eyebrow">{flow.eyebrow}</span>
                  <h3>{flow.title}</h3>
                  <p>{flow.body}</p>
                </div>
                <ConversationMockup messages={flow.messages} compact />
              </article>
            ))}
          </div>
        </section>

        <section className="venem-section venem-architecture">
          <div className="venem-section-heading venem-reveal">
            <span className="venem-eyebrow">System Architecture</span>
            <h2>A modular structure with shared conversational state</h2>
          </div>
          <div className="venem-architecture-diagram venem-reveal">
            <div className="venem-architecture-group">
              <span>Interface & Orchestration</span>
              <strong>chatbot_demo.py</strong>
            </div>
            <div className="venem-architecture-connector" aria-hidden="true"><i /></div>
            <div className="venem-architecture-group venem-architecture-wide">
              <span>Conversation Modules</span>
              <div>
                {['Intent Management', 'Question Answering', 'Small Talk', 'Identity Management', 'Kitchen Inventory', 'Discoverability'].map((item) => (
                  <strong key={item}>{item}</strong>
                ))}
              </div>
            </div>
            <div className="venem-architecture-connector" aria-hidden="true"><i /></div>
            <div className="venem-architecture-row">
              <div className="venem-architecture-group">
                <span>Shared Services</span>
                <strong>ChatContext</strong>
                <strong>Similarity Calculation</strong>
              </div>
              <div className="venem-architecture-group">
                <span>Data</span>
                <strong>Intent Examples</strong>
                <strong>Question鈥揂nswer Dataset</strong>
                <strong>Small-Talk Dataset</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="venem-section venem-principles">
          <div className="venem-section-heading venem-reveal">
            <span className="venem-eyebrow">Conversational UX Principles</span>
            <h2>Small design decisions that make the system easier to understand</h2>
          </div>
          <div className="venem-principle-grid">
            {principles.map(([title, body], index) => (
              <article className="venem-reveal" key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="venem-section venem-reflection" id="venem-reflection">
          <div className="venem-reflection-copy venem-reveal">
            <span className="venem-eyebrow">Reflection</span>
            <h2>What I learned</h2>
            <p>
              This project showed how conversational behaviour can emerge from a combination of retrieval, explicit
              state management, and carefully designed feedback. It also highlighted the limitations of fixed
              datasets and rule-based language patterns.
            </p>
          </div>
          <div className="venem-next-steps venem-reveal">
            <span className="venem-eyebrow">Next Steps</span>
            <ul>
              {nextSteps.map((item) => (
                <li key={item}><Check size={17} />{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="venem-final-cta venem-reveal" id="venem-final-cta">
          <div>
            <span className="venem-eyebrow">Explore the project</span>
            <h2>Interested in how Venem works?</h2>
            <p>Source code and demo links can be added here when they are ready to share.</p>
          </div>
          <div className="venem-actions">
            {/* Replace this disabled placeholder after the final GitHub URL is available. */}
            <button className="venem-button venem-button-disabled" type="button" disabled>
              <Github size={17} />
              View Source Code
            </button>
            <a
              className="venem-button venem-button-secondary"
              href="#kitchen-inventory-chatbot"
              onClick={scrollToSection('venem-interaction')}
            >
              <ExternalLink size={17} />
              Watch Demo
            </a>
            <a className="venem-button venem-button-ghost" href="#projects">
              <ArrowLeft size={17} />
              Back to Projects
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

export default VenemCaseStudyPage;
