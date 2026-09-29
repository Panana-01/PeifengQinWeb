import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { Bot } from 'lucide-react';
import './ProjectShowcase.css';

const projectShowcases = {
  '#kitchen-inventory-chatbot': {
    hash: '#kitchen-inventory-chatbot',
    returnHash: '#projects',
    eyebrow: 'Interactive NLP-Based AI System / 2025',
    title: 'Kitchen Inventory Chatbot',
    lede:
      'To make inventory tasks easier through conversation, I built a chatbot that understands commands, remembers context, and confirms actions before removing items.',
    hero: {
      src: '/assets/venem-demo-screenshot.png',
      alt: 'Venem chatbot demo running in PyCharm',
      caption:
        'Venem running in PyCharm. The terminal shows a live session: the bot introduces itself, answers a question, and waits for the next message.'
    },
    overview: [
      {
        label: 'Goal',
        text: 'Make common kitchen inventory tasks understandable through conversation, without a complex graphical interface.'
      },
      {
        label: 'My role',
        text: 'I structured the intents, built the Python dialogue flow, implemented TF-IDF matching, designed recovery responses, and tested the system against varied phrasing.'
      },
      {
        label: 'Methods and tools',
        text: 'Python, pandas, scikit-learn, and SciPy. TF-IDF and cosine similarity for matching, with rule-based dialogue control for inventory actions.'
      },
      {
        label: 'Outcome',
        text: 'A session can add, remove, search, and update items, answer questions, remember a name, and ask for confirmation before a removal.'
      }
    ],
    blocks: [
      {
        kind: 'steps',
        eyebrow: 'The challenge',
        title: 'Useful conversation without a large language model',
        intro:
          'The system had to recognise different goals, return relevant information, and keep enough context for the next turn. A failed match still needed a way forward.',
        steps: [
          ['User expression', 'Someone asks in their own words.'],
          ['Intent understanding', 'The closest supported intent is selected.'],
          ['Context-aware response', 'The reply uses what the session already knows.']
        ]
      },
      {
        kind: 'cards',
        eyebrow: 'What it can do',
        title: 'Five jobs, one conversation',
        items: [
          ['Dataset-backed Q&A', 'Retrieves answers from more than 1,400 question-answer pairs.'],
          ['Kitchen inventory', 'Adds, removes, and lists food items with quantities and units.'],
          ['Identity memory', 'Remembers, changes, recalls, or forgets the user’s name during a session.'],
          ['Contextual help', 'Adapts guidance according to the current conversation state.'],
          ['Error recovery', 'After repeated recognition failures, offers a clear next step.']
        ]
      },
      {
        kind: 'steps',
        eyebrow: 'How a reply is produced',
        title: 'From an utterance to a stateful response',
        intro:
          'CountVectorizer and TF-IDF turn text into vectors. Cosine similarity finds the closest intent or question. Confidence thresholds reject weak matches. ChatContext keeps the state the reply depends on.',
        steps: [
          ['01  User input', 'A natural-language request enters the conversation loop.'],
          ['02  Intent matching', 'TF-IDF vectors and cosine similarity identify the closest supported intent.'],
          ['03  Module routing', 'The request goes to question answering, identity, inventory, or small talk.'],
          ['04  Context update', 'ChatContext stores names, previous intent, inventory, and pending actions.'],
          ['05  Response', 'A confidence-aware, stateful response is returned.']
        ]
      },
      {
        kind: 'flows',
        eyebrow: 'Interaction flows',
        title: 'Three conversations the system can hold',
        items: [
          {
            eyebrow: 'Personalisation',
            title: 'Remembering who the user is',
            body: 'The name stays in the current session and is used in later replies.',
            messages: [
              ['user', 'My name is Alice.'],
              ['bot', "Nice to meet you, Alice! I'll remember that."]
            ]
          },
          {
            eyebrow: 'Inventory',
            title: 'Turning a sentence into structured stock',
            body: 'A command is parsed into an item, a quantity, and a normalised unit.',
            messages: [
              ['user', 'Add 1L milk.'],
              ['bot', 'Alice, I added 1 L milk to your inventory.'],
              ['user', 'Show my kitchen inventory.'],
              ['bot', 'Here is your kitchen inventory:\n• milk: 1 L']
            ]
          },
          {
            eyebrow: 'Confirmation',
            title: 'Asking before something is removed',
            body: 'A destructive action waits for an explicit yes or no.',
            messages: [
              ['user', 'Remove 1L milk.'],
              ['bot', 'Do you want to remove 1 L milk from your inventory? Please type “yes” or “no”.'],
              ['user', 'Yes.'],
              ['bot', 'OK, I removed 1 L milk.']
            ]
          }
        ]
      },
      {
        kind: 'stack',
        eyebrow: 'System structure',
        title: 'Modules that share one conversational state',
        groups: [
          { label: 'Interface and orchestration', items: ['chatbot_demo.py'] },
          {
            label: 'Conversation modules',
            items: [
              'Intent Management',
              'Question Answering',
              'Small Talk',
              'Identity Management',
              'Kitchen Inventory',
              'Discoverability'
            ]
          },
          { label: 'Shared services', items: ['ChatContext', 'Similarity Calculation'] },
          { label: 'Data', items: ['Intent Examples', 'Question–Answer Dataset', 'Small-Talk Dataset'] }
        ]
      },
      {
        kind: 'decisions',
        eyebrow: 'Design decisions',
        title: 'How the dialogue stays recoverable',
        items: [
          {
            problem: 'Different phrases can express the same inventory action.',
            response:
              'I grouped representative utterances by intent and used TF-IDF similarity to map varied wording onto a small set of dialogue actions.'
          },
          {
            problem: 'A failed match can make a chatbot feel broken.',
            response:
              'Staged fallbacks, contextual help, and discoverability prompts let someone continue without restarting the conversation.'
          },
          {
            problem: 'Task commands and social conversation need different logic.',
            response:
              'Task intents are separate from small talk and question answering. Lightweight state still keeps the name, the prior intent, and the failure count.'
          }
        ]
      },
      {
        kind: 'cards',
        eyebrow: 'Conversational UX',
        title: 'Decisions that make the system easier to follow',
        items: [
          ['Discoverability', 'People can ask for help and receive examples of supported commands.'],
          ['Feedback', 'Every inventory action returns an immediate status update.'],
          ['Error prevention', 'Removal requires an explicit confirmation.'],
          ['Context', 'Replies adapt to the name, the previous intent, and any pending action.']
        ]
      },
      {
        kind: 'ending',
        outcome:
          'Venem handles inventory commands, question answering, small talk, and name memory in one session, and it checks before it deletes an item.',
        reflection:
          'Conversational behaviour here comes from retrieval, explicit state, and feedback designed into the replies. The same work also showed the limits of a fixed dataset and rule-based language patterns.',
        next: [
          'Add persistent user and inventory storage',
          'Support a wider range of natural-language expressions',
          'Evaluate intent accuracy with a labelled test set',
          'Test the guidance and recovery flows with users',
          'Improve multilingual support',
          'Add automated tests and deployment documentation'
        ],
        note: 'Source code and a public demo link are not published on this page yet.'
      }
    ]
  },
  '#shared-meal-ethnography': {
    hash: '#shared-meal-ethnography',
    returnHash: '#projects',
    eyebrow: 'Ethnomethodological HCI Study / 2026',
    title: 'Ethnography Study for a Shared Meal',
    lede:
      'To understand how people coordinate during a shared meal, I studied their talk, gestures, movement, and use of space to identify design opportunities.',
    hero: {
      src: '/assets/project-meal-photo.webp',
      alt: 'People sharing a meal around a small table',
      caption:
        'The domestic setting of the study: people, food, and a constrained table where coordination has to stay visible to everyone present.'
    },
    overview: [
      {
        label: 'Goal',
        text: 'Understand how people make their actions understandable to one another while preparing, serving, and sharing food.'
      },
      {
        label: 'My role',
        text: 'I observed the sessions, wrote field notes, and reviewed sequences of talk, gesture, movement, object use, and spatial positioning.'
      },
      {
        label: 'Methods and tools',
        text: 'Unobtrusive observation and structured field notes. Analysis treated gesture, gaze, body orientation, and object placement alongside speech.'
      },
      {
        label: 'Outcome',
        text: 'Recurring coordination patterns, each connected to a constraint for collaborative systems: timing, visibility, roles, and shared attention.'
      }
    ],
    blocks: [
      {
        kind: 'steps',
        eyebrow: 'Research question',
        title: 'How is a shared meal coordinated in practice?',
        intro:
          'The study looked at naturally occurring activity in a constrained domestic setting, not at a scripted task in a lab.',
        steps: [
          ['Talk', 'What people say while the meal is underway.'],
          ['Gesture and movement', 'How bodies, gaze, and hands make the next action readable.'],
          ['Space and tools', 'How the table, objects, and positions shape who can act.']
        ]
      },
      {
        kind: 'decisions',
        eyebrow: 'Method',
        title: 'How the observations were gathered and read',
        items: [
          {
            problem: 'Important coordination is often non-verbal.',
            response:
              'Gesture, gaze, body orientation, movement, and object placement were analysed together with talk, rather than treating dialogue as the only source of meaning.'
          },
          {
            problem: 'The session had to stay natural while still producing usable evidence.',
            response:
              'Observation stayed unobtrusive. Field notes separated what was directly observed from later interpretation.'
          },
          {
            problem: 'Rich notes can stay too abstract to inform design.',
            response:
              'Recurring interaction patterns were organised, and each pattern was tied to a concrete opportunity or constraint for collaborative technology.'
          }
        ]
      },
      {
        kind: 'cards',
        eyebrow: 'Design implications',
        title: 'What the coordination suggests for collaborative systems',
        items: [
          ['Timing', 'Collaborative systems need to respect the timing of the activity.'],
          ['Visibility', 'They also need to respect how actions are made visible to other people.'],
          ['Roles', 'Roles are part of that coordination and need to stay readable.'],
          ['Shared attention', 'The system has to account for attention the group is already sharing.']
        ]
      },
      {
        kind: 'ending',
        outcome:
          'The study treats a shared meal as multimodal coordination: speech, gesture, movement, tools, and the layout of the room.',
        reflection:
          'The useful design material was not a single quote or count. It was the repeated ways people made the next action understandable, then connected those ways to constraints a collaborative system would have to respect.',
        next: []
      }
    ]
  },
  '#chaotic-rehab-clinic': {
    hash: '#chaotic-rehab-clinic',
    returnHash: '#projects',
    eyebrow: 'Unity Game Prototype / 2026',
    title: 'Chaotic Rehab Clinic',
    lede:
      'To make a complex clinic simulation understandable, I connected diagnosis, treatment, feedback, and progression into a clear, repeatable game loop.',
    hero: {
      src: '/assets/project-rehab-screenshot.png',
      alt: 'Chaotic Rehab Clinic prototype screenshot',
      caption:
        'The Unity prototype in play. The screen is the running clinic: patient, treatment, and the state the player has to read.'
    },
    overview: [
      {
        label: 'Goal',
        text: 'Let a player operate a busy rehabilitation clinic and understand the consequence of each treatment choice.'
      },
      {
        label: 'My role',
        text: 'I implemented and connected the principal Unity systems, shaped the interaction flow, and iterated the feedback that makes state changes readable.'
      },
      {
        label: 'Methods and tools',
        text: 'Unity. The loop was built by linking diagnosis, exercise choice, setup correction, outcome, payment, and upgrades, then playing the sequence and adjusting the feedback.'
      },
      {
        label: 'Outcome',
        text: 'A repeatable clinic loop in which a short treatment decision feeds a visible longer-term progression.'
      }
    ],
    blocks: [
      {
        kind: 'steps',
        eyebrow: 'Core loop',
        title: 'One visit, then the clinic changes',
        steps: [
          ['Diagnose', 'Read what the patient needs.'],
          ['Choose', 'Select an exercise and set up posture and equipment.'],
          ['Treat', 'Run the treatment and see the outcome.'],
          ['Progress', 'Payment and upgrades carry the result into the next visit.']
        ]
      },
      {
        kind: 'decisions',
        eyebrow: 'Design decisions',
        title: 'Keeping a busy clinic readable',
        items: [
          {
            problem: 'Several treatment states are easy to lose track of.',
            response:
              'State changes on the patient, the equipment, and the outcome are signalled immediately, so the player can see what changed and why.'
          },
          {
            problem: 'Mistakes should be challenging without feeling arbitrary.',
            response:
              'Incorrect posture, equipment, or treatment choices produce the same kind of consequence each time, so the next attempt can use what just happened.'
          },
          {
            problem: 'Separate mechanics need to feel like one system.',
            response:
              'Clinical decisions connect to payment and upgrades. A single visit contributes to a progression the player can see.'
          }
        ]
      },
      {
        kind: 'ending',
        outcome:
          'The prototype links diagnosis, exercise selection, setup correction, treatment feedback, payment, and clinic progression into one loop.',
        reflection:
          'The difficult part was not adding another clinic action. It was making each state change readable enough that the loop could be learned by playing it.',
        next: []
      }
    ]
  },
  '#attack-and-defend': {
    hash: '#attack-and-defend',
    returnHash: '#projects',
    eyebrow: 'VR/MR Game Prototype / 2026',
    title: 'Attack and Defend',
    lede:
      'To support two-player VR/MR play in a limited physical space, I designed asymmetric roles, readable feedback, and safety-aware movement boundaries.',
    hero: {
      src: '/assets/project-attack-defend-screenshot.png',
      alt: 'Attack and Defend VR/MR prototype screenshot',
      caption:
        'The prototype running in a simplified model of the apartment common area, where both roles share one physical room.'
    },
    overview: [
      {
        label: 'Goal',
        text: 'Give two players different roles and information while they share one physical room and one outcome.'
      },
      {
        label: 'My role',
        text: 'I designed the asymmetric responsibilities, the shared feedback, and the movement boundaries that keep play inside the real space.'
      },
      {
        label: 'Methods and tools',
        text: 'Unity, VR/MR. Routes, spawning, shooting, and health were built in a simplified model of the apartment common area.'
      },
      {
        label: 'Outcome',
        text: 'A two-player prototype where each role has a distinct job, and movement stays within a safety-aware play boundary.'
      }
    ],
    blocks: [
      {
        kind: 'steps',
        eyebrow: 'Shared play',
        title: 'Two roles, one room, one outcome',
        steps: [
          ['Navigate', 'Routes are simple enough to walk inside the real room.'],
          ['Act', 'One player’s spawning and the other’s shooting change the same encounter.'],
          ['Read', 'Health, hits, and spawns stay brief so spatial awareness remains.'],
          ['Stay inside', 'The play boundary is part of the rules, not an afterthought.']
        ]
      },
      {
        kind: 'decisions',
        eyebrow: 'Design decisions',
        title: 'Agency, legibility, and the size of the room',
        items: [
          {
            problem: 'Asymmetric roles can leave one player with less to do.',
            response:
              'Responsibilities are split, but both roles stay tied to the same shared outcome and the same feedback loop.'
          },
          {
            problem: 'Virtual action has to stay legible in a small physical room.',
            response:
              'Routes and environmental geometry were simplified, and interaction zones were aligned with practical movement boundaries.'
          },
          {
            problem: 'Combat feedback can crowd out spatial awareness.',
            response:
              'Health, spawning, and hit feedback stay concise so players can still track movement, orientation, and each other.'
          }
        ]
      },
      {
        kind: 'ending',
        outcome:
          'The prototype combines navigation, spawning, shooting, health, and role-specific feedback inside a safety-aware boundary.',
        reflection:
          'The room was a design material. If the virtual space asked for a step the physical room could not give, the action had to change.',
        next: []
      }
    ]
  },
  '#douyin-content-account': {
    hash: '#douyin-content-account',
    returnHash: '#personal-projects',
    eyebrow: 'Content operation',
    title: 'English Learning Content Account on Douyin',
    lede:
      'To make English-learning videos more engaging and sustainable to produce, I tested content formats and built an AI-assisted publishing workflow.',
    hero: {
      src: '/assets/personal-douyin-account.jpg',
      alt: 'Douyin profile for the English-learning account',
      caption:
        'The Douyin account page. This is the channel where the format tests, publishing time, and production workflow were run.'
    },
    overview: [
      {
        label: 'Goal',
        text: 'Turn film and television clips, plus the notes I was already making, into English explanations other learners could use.'
      },
      {
        label: 'My role',
        text: 'I handled topic selection, editing, subtitles, English explanations, publishing, and performance analysis on my own.'
      },
      {
        label: 'Methods and tools',
        text: 'Format comparisons, audience-interest data, and an AI-assisted pipeline: PotPlayer subtitles with whisper.cpp, then ChatGPT for a first draft of the teaching notes.'
      },
      {
        label: 'Outcome',
        text: 'About 8,000 followers in four months. The best video reached 1.428 million views. After a year without new posts, about 6,000 followers remained.'
      }
    ],
    blocks: [
      {
        kind: 'cards',
        eyebrow: 'What the account was',
        title: 'Spoken English, then a wider audience',
        items: [
          ['Starting point', 'Film and television clips I was already saving while studying in the UK.'],
          ['Format', 'Situational dialogue. Viewers watch a scene, then get an explanation of the language.'],
          ['Audience shift', 'Interest data also showed “English” and postgraduate entrance exams, so the scope widened beyond speaking practice.']
        ]
      },
      {
        kind: 'experiments',
        eyebrow: 'Experiments',
        title: 'What was changed, and what the account then did',
        items: [
          {
            problem: 'Early videos averaged only about 700 views, and there was no repeatable opening.',
            analysis:
              'The opening was the variable. Three formats were tested, with about four videos each: announce the lesson first, show a highlight before the explanation, or play the complete scene before the explanation. Exact historical retention data is no longer available, so the comparison uses the direction of performance rather than a precise completion rate.',
            action:
              'The third format was the most consistent. Viewers watch the complete scene, then the explanation begins. That order became the standard.',
            result:
              'Later videos stabilised above 10,000 views. During the comparison period, performance improved by about 40%.',
            metrics: ['~4 videos per format', '3 opening formats', '700 → 10K+ views']
          },
          {
            problem: 'A daily video took about an hour because transcription and language checking were repetitive.',
            analysis:
              'The bottleneck was not the edit. Each line was typed, checked, and then sent to ChatGPT to organise the explanation.',
            action:
              'Rough-cut the clip, generate subtitles in PotPlayer with whisper.cpp CUDA and the Large-v3-turbo model, correct the recognition errors by hand, then use ChatGPT to draft the teaching notes before the final edit.',
            result:
              'Average production time fell from about 60 minutes to 30 minutes. Publishing stayed at one video a day, with a manual check for language accuracy.',
            metrics: ['60 → 30 minutes', '50% faster', '1 upload per day']
          },
          {
            problem: 'Distribution was unstable, and 16:9 did not fit a vertical feed well.',
            analysis:
              'About 40% of followers showed interest in “English” and postgraduate entrance exams. 23:00–24:00 and 22:00–23:00 were the most active hours, but late publishing risked a drop after midnight. The 12:00–13:00 lunch window ranked third and was easier to sustain.',
            action:
              'Publishing was fixed at 12:00, and the canvas changed from 16:9 to 4:3 so the video occupied more of the vertical feed while remaining comfortable full screen.',
            result:
              'Initial distribution became more stable after the time change. The 4:3 frame fitted the platform better than the earlier 16:9 uploads.',
            metrics: ['12:00 publishing', '40% English / exam interest', '16:9 → 4:3']
          }
        ]
      },
      {
        kind: 'ending',
        outcome:
          'The account reached about 8,000 followers in four months, with a top video at 1.428 million views, and still had about 6,000 followers a year after posting stopped.',
        reflection:
          'The durable result was not one viral video. It was a scene-then-explanation format, a 30-minute production path, and a publishing time that could be repeated.',
        next: []
      }
    ]
  },
  '#stock-research-assistant': {
    hash: '#stock-research-assistant',
    returnHash: '#personal-projects',
    eyebrow: 'Paper trading workflow',
    title: 'Rule-based quantitative trading stimulation',
    lede:
      'To test trading ideas without relying on impulse or risking real money, I built a rule-based workflow that evaluates stocks and executes simulated trades.',
    hero: {
      src: '/assets/personal-alpaca-paper-trading.png',
      alt: 'Alpaca paper-trading account showing a simulated portfolio',
      caption:
        'The Alpaca paper account used to run the strategy. Orders here are simulated. No real capital is committed.'
    },
    overview: [
      {
        label: 'Goal',
        text: 'An unattended workflow that can evaluate conditions and place eligible simulated trades on US trading days.'
      },
      {
        label: 'My role',
        text: 'I built the workflow: market data, predefined rules, simulated execution, and a check that probabilistic suggestions cannot skip.'
      },
      {
        label: 'Methods and tools',
        text: 'Python, Alpaca’s paper-trading API, predefined strategies, and ChatGPT for investigating market movements. Daily reports track what the strategy did.'
      },
      {
        label: 'Outcome',
        text: 'A paper-trading workflow that collects data, applies rules, and executes simulated trades. It is a test harness, not a live account.'
      }
    ],
    blocks: [
      {
        kind: 'steps',
        eyebrow: 'Why it is simulated',
        title: 'A place to test rules before any real capital',
        intro:
          'Short-term trading is uncertain, and intuitive decisions are easy to rationalise after the fact. The workflow exists so a rule can be run the same way, on a paper account, before any real deployment is considered.',
        steps: [
          ['Collect', 'Pull the market data the watchlist needs.'],
          ['Evaluate', 'Apply predefined strategies instead of an in-the-moment decision.'],
          ['Check', 'Deterministic validation sits in front of any AI suggestion.'],
          ['Simulate', 'Eligible trades go to Alpaca’s paper API, not a funded account.']
        ]
      },
      {
        kind: 'cards',
        eyebrow: 'Constraint',
        title: 'The model can suggest. It cannot skip the rule.',
        items: [
          [
            'What the agent is for',
            'ChatGPT investigates market movements and helps explain what the data is showing.'
          ],
          [
            'What it is not allowed to do',
            'A probabilistic suggestion cannot bypass the deterministic checks or the safety controls.'
          ],
          [
            'What gets recorded',
            'Daily reports track strategy performance on the paper account.'
          ]
        ]
      },
      {
        kind: 'ending',
        outcome:
          'The system can collect data, evaluate a personal US watchlist with predefined strategies, and place simulated trades through Alpaca’s paper-trading API.',
        reflection:
          'The point of the paper account is to find out whether the workflow can keep running without impulse. Performance figures are not claimed here.',
        next: [
          'Add a weekly module that updates live returns and pushes the data to GitHub.'
        ],
        note: 'A public code link is not available yet. The GitHub step above is still the next task, not a published repository.'
      }
    ]
  }
};

function isProjectShowcaseHash(hash) {
  return Object.prototype.hasOwnProperty.call(projectShowcases, hash);
}

function ChatTranscript({ messages }) {
  return (
    <div className="venem-chat-window venem-chat-window-compact showcase-chat">
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
          <div className={`venem-message venem-message-${role}`} key={`${role}-${index}`}>
            <span>{role === 'bot' ? 'Venem' : 'You'}</span>
            <p>{message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionIntro({ eyebrow, title, intro, headingId }) {
  return (
    <header className="showcase-section-intro">
      {eyebrow ? <p className="showcase-eyebrow">{eyebrow}</p> : null}
      {title ? <h3 id={headingId}>{title}</h3> : null}
      {intro ? <p>{intro}</p> : null}
    </header>
  );
}

function ShowcaseBlock({ block }) {
  if (block.kind === 'steps') {
    return (
      <section className="showcase-section">
        <SectionIntro eyebrow={block.eyebrow} title={block.title} intro={block.intro} />
        <ol className="showcase-steps">
          {block.steps.map(([title, text]) => (
            <li key={title}>
              <strong>{title}</strong>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>
    );
  }

  if (block.kind === 'cards') {
    return (
      <section className="showcase-section">
        <SectionIntro eyebrow={block.eyebrow} title={block.title} intro={block.intro} />
        <div className="showcase-cards">
          {block.items.map(([title, text]) => (
            <article key={title}>
              <h4>{title}</h4>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (block.kind === 'flows') {
    return (
      <section className="showcase-section">
        <SectionIntro eyebrow={block.eyebrow} title={block.title} intro={block.intro} />
        <div className="showcase-flows">
          {block.items.map((item) => (
            <article className="showcase-flow" key={item.title}>
              <div>
                <p className="showcase-eyebrow">{item.eyebrow}</p>
                <h4>{item.title}</h4>
                <p>{item.body}</p>
              </div>
              <ChatTranscript messages={item.messages} />
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (block.kind === 'stack') {
    return (
      <section className="showcase-section">
        <SectionIntro eyebrow={block.eyebrow} title={block.title} intro={block.intro} />
        <div className="showcase-stack">
          {block.groups.map((group) => (
            <article key={group.label}>
              <p>{group.label}</p>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (block.kind === 'decisions') {
    return (
      <section className="showcase-section">
        <SectionIntro eyebrow={block.eyebrow} title={block.title} intro={block.intro} />
        <div className="showcase-decisions">
          {block.items.map((item) => (
            <article key={item.problem}>
              <div>
                <p>Situation</p>
                <h4>{item.problem}</h4>
              </div>
              <div>
                <p>What I did</p>
                <p>{item.response}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (block.kind === 'experiments') {
    return (
      <section className="showcase-section">
        <SectionIntro eyebrow={block.eyebrow} title={block.title} intro={block.intro} />
        <div className="showcase-experiments">
          {block.items.map((item) => (
            <article key={item.problem}>
              <h4>{item.problem}</h4>
              {item.metrics?.length ? (
                <ul className="showcase-metrics" aria-label="Recorded figures">
                  {item.metrics.map((metric) => (
                    <li key={metric}>{metric}</li>
                  ))}
                </ul>
              ) : null}
              <div className="showcase-experiment-grid">
                <div>
                  <p>What I looked at</p>
                  <p>{item.analysis}</p>
                </div>
                <div>
                  <p>What changed</p>
                  <p>{item.action}</p>
                </div>
                <div>
                  <p>What followed</p>
                  <p>{item.result}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (block.kind === 'ending') {
    return (
      <section className="showcase-section showcase-ending">
        <SectionIntro eyebrow="Outcome" title="Where the project landed" />
        <p className="showcase-ending-lead">{block.outcome}</p>
        <div className="showcase-ending-grid">
          <article>
            <h4>Reflection</h4>
            <p>{block.reflection}</p>
          </article>
          {block.next?.length ? (
            <article>
              <h4>What comes next</h4>
              <ul>
                {block.next.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ) : null}
        </div>
        {block.links?.length ? (
          <div className="showcase-links">
            {block.links.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ))}
          </div>
        ) : null}
        {block.note ? <p className="showcase-note">{block.note}</p> : null}
      </section>
    );
  }

  return null;
}

function getFocusable(root) {
  return [...root.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])')]
    .filter((node) => !node.hasAttribute('disabled') && node.getClientRects().length > 0);
}

function playFolderOpen(layer, win, hash) {
  const backdrop = layer.querySelector('.showcase-backdrop');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const settle = () => {
    win.style.transition = 'none';
    win.style.transform = 'none';
    win.style.opacity = '1';
    if (backdrop) backdrop.style.opacity = '1';
  };

  if (reduceMotion) {
    settle();
    return;
  }

  const winRect = win.getBoundingClientRect();
  const card = document.querySelector(`a[data-project-card][href="${hash}"]`);
  const cardRect = card?.getBoundingClientRect();
  const cardInView = cardRect
    && cardRect.width > 0
    && cardRect.bottom > 0
    && cardRect.top < window.innerHeight
    && cardRect.right > 0
    && cardRect.left < window.innerWidth;

  let originX = winRect.width / 2;
  let originY = winRect.height / 2;
  let scale = 0.86;

  if (cardInView) {
    originX = cardRect.left + cardRect.width / 2 - winRect.left;
    originY = cardRect.top + cardRect.height / 2 - winRect.top;
    scale = Math.min(cardRect.width / winRect.width, cardRect.height / winRect.height);
    scale = Math.min(0.64, Math.max(0.2, scale));
  }

  win.style.transition = 'none';
  win.style.transformOrigin = `${originX}px ${originY}px`;
  win.style.transform = `scale(${scale})`;
  win.style.opacity = '0.72';
  if (backdrop) {
    backdrop.style.transition = 'none';
    backdrop.style.opacity = '0';
  }

  window.requestAnimationFrame(() => {
    win.style.transition = 'transform 460ms cubic-bezier(0.32, 0.72, 0, 1), opacity 220ms cubic-bezier(0.32, 0.72, 0, 1)';
    win.style.transform = 'scale(1)';
    win.style.opacity = '1';
    if (backdrop) {
      backdrop.style.transition = 'opacity 320ms ease-out';
      backdrop.style.opacity = '1';
    }
  });

  const onEnd = (event) => {
    if (event.target !== win || event.propertyName !== 'transform') return;
    win.removeEventListener('transitionend', onEnd);
    settle();
  };
  win.addEventListener('transitionend', onEnd);
}

function ProjectShowcase({ study, onClose }) {
  const layerRef = useRef(null);
  const dialogRef = useRef(null);
  const closeRef = useRef(null);

  useLayoutEffect(() => {
    const layer = layerRef.current;
    const win = dialogRef.current;
    if (!layer || !win) return undefined;
    playFolderOpen(layer, win, study.hash);
    return undefined;
  }, [study.hash]);

  useEffect(() => {
    const dialog = dialogRef.current;
    closeRef.current?.focus();
    document.documentElement.classList.add('showcase-open');

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !dialog) return;
      const focusable = getFocusable(dialog);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !dialog.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !dialog.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.documentElement.classList.remove('showcase-open');
    };
  }, [onClose, study.hash]);

  return (
    <div className="showcase-layer" ref={layerRef}>
      <div className="showcase-backdrop" onMouseDown={onClose} />
      <div
        className="showcase-window"
        role="dialog"
        aria-modal="true"
        aria-labelledby="showcase-title"
        aria-describedby="showcase-lede"
        ref={dialogRef}
        tabIndex={-1}
      >
        <div className="showcase-toolbar">
          <button className="showcase-close" type="button" onClick={onClose} ref={closeRef}>
            Close
          </button>
        </div>
        <div className="showcase-scroll" tabIndex={0}>
          <article className="showcase-article">
            <header className="showcase-hero">
              <p className="showcase-eyebrow">{study.eyebrow}</p>
              <h2 id="showcase-title">{study.title}</h2>
              <p id="showcase-lede">{study.lede}</p>
              <figure>
                <img src={study.hero.src} alt={study.hero.alt} />
                <figcaption>{study.hero.caption}</figcaption>
              </figure>
            </header>

            <section className="showcase-section" aria-labelledby="showcase-overview-title">
              <SectionIntro eyebrow="Project overview" title="At a glance" headingId="showcase-overview-title" />
              <div className="showcase-overview">
                {study.overview.map((item) => (
                  <article key={item.label}>
                    <h4>{item.label}</h4>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </section>

            {study.blocks.map((block) => (
              <ShowcaseBlock block={block} key={`${block.kind}-${block.title || block.eyebrow}`} />
            ))}
          </article>
        </div>
      </div>
    </div>
  );
}

export { isProjectShowcaseHash, projectShowcases };
export default ProjectShowcase;
