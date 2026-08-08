import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowLeft,
  GraduationCap,
  Mail,
  MapPin
} from 'lucide-react';
import MagicBentoEffects from './MagicBentoEffects';
import PortfolioMotion from './PortfolioMotion';
import CircularGallery from './CircularGallery';
import VenemCaseStudyPage from './VenemCaseStudyPage';
import './styles.css';

const profile = {
  name: 'Peifeng Qin',
  title: 'Human-Computer Interaction Designer',
  tagline: 'Conversational AI · Mixed Reality · User Research · Interactive Prototyping',
  email: 'peifengqin01@163.com',
  phone: '7780 813859',
  location: 'Nottingham, UK',
  education: 'MSc Human-Computer Interaction, University of Nottingham'
};

const profilePhoto = '/assets/profile-rain-photo.jpg';
const personCutout = profilePhoto;

const projects = [
  {
    title: 'Kitchen Inventory Chatbot',
    detailHash: '#kitchen-inventory-chatbot',
    meta: 'Interactive NLP-Based AI System · 2025',
    image: '/assets/project-chatbot-screenshot.png',
    tags: ['Python', 'TF-IDF', 'Dialogue Logic'],
    description:
      'A Python-based NLP chatbot for kitchen inventory management, combining intent recognition, inventory actions, contextual help, small talk, and personalized responses.'
  },
  {
    title: 'Ethnography Study for a Shared Meal',
    detailHash: '#shared-meal-ethnography',
    meta: 'Ethnomethodological HCI Study 路 2026',
    image: '/assets/project-meal-photo.webp',
    tags: ['Ethnography', 'Interaction Analysis', 'Design Implications'],
    description:
      'A field research project across shared-meal sessions, documenting talk, gesture, spatial layout, tools, and coordination patterns in domestic settings.'
  },
  {
    title: 'Chaotic Rehab Clinic',
    detailHash: '#chaotic-rehab-clinic',
    meta: 'Unity Game Prototype · 2026',
    image: '/assets/project-rehab-screenshot.png',
    tags: ['Unity', 'Game Loop', 'Simulation'],
    description:
      'A rehabilitation clinic simulation game featuring diagnosis, exercise selection, posture and equipment correction, treatment feedback, payment, and clinic upgrades.'
  },
  {
    title: 'Attack and Defend',
    detailHash: '#attack-and-defend',
    meta: 'VR/MR Game Prototype · 2026',
    image: '/assets/project-attack-defend-screenshot.png',
    tags: ['VR/MR', 'Unity', 'Playtesting'],
    description:
      'An asymmetric two-player VR/MR game designed for an apartment common area, with routing, spawning, shooting, health systems, and safety-aware play boundaries.'
  }
];

const personalProjects = [
  {
    title: 'English Learning Content Account on Douyin',
    meta: 'Content Production · Personal Project',
    visual: 'douyin',
    image: '/assets/personal-douyin-account.jpg',
    detailHash: '#douyin-content-account',
    bullets: [
      'Produced educational videos from English-language media clips and refined video structure through audience retention and completion-rate analysis.',
      'Built an AI-assisted production workflow using PotPlayer, whisper.cpp, Large-v3-turbo, and ChatGPT to streamline subtitle extraction and explanation drafting.',
      'Grew the account to 8,000 followers within 4 months, with the best-performing video reaching 1.43 million views.'
    ],
    tags: ['AI Workflow', 'Video Editing', 'Audience Analytics']
  },
  {
    title: 'Rule-based quantitative trading stimulation',
    meta: 'Python Automation · Personal Project',
    visual: 'stock',
    image: '/assets/personal-alpaca-paper-trading.png',
    detailHash: '#stock-research-assistant',
    bullets: [
      'An end-to-end unattended workflow using Codex Scheduled Tasks and the authenticated Alpaca Paper Trading API to collect data, conduct web research, generate structured decisions, and automatically execute eligible simulated trades on US trading days; currently undergoing forward testing in a paper-trading environment.',
      'Built a hybrid agent-deterministic architecture with schema-validated interfaces, fail-closed safeguards, SQLite audit logging, and offline test scenarios for reliable and traceable execution.'
    ],
    tags: ['Python', 'Markdown Reports', 'Market Screening']
  }
];

const heroGalleryItems = [
  { text: 'Academic Project', image: '/assets/project-meal-photo.webp', target: '#projects' },
  { text: 'Personal Projects', image: '/assets/personal-douyin-account.jpg', target: '#personal-projects' },
  { text: 'About Me', image: profilePhoto, target: '#experience' }
];

const profileEpisodes = [
  {
    number: '01',
    title: 'Hiking',
    duration: '',
    image: '/assets/profile-hiking.jpg'
  },
  {
    number: '02',
    title: 'Climbing',
    duration: '',
    image: '/assets/profile-climbing.jpg'
  },
  {
    number: '03',
    title: 'Camping',
    duration: '',
    image: '/assets/profile-camping.jpg'
  }
];

const toolboxItems = [
  {
    name: 'Unity',
    description: 'Interactive game systems, spatial prototypes and mixed reality',
    logo: '/assets/tool-unity.png',
    logoClass: 'toolbox-logo-invert',
    accent: '#ffd27a'
  },
  {
    name: 'Premiere Pro',
    description: 'Video editing, content structure and social media production',
    logo: '/assets/tool-premiere-pro.png',
    accent: '#b9b6ff'
  },
  {
    name: 'After Effects',
    description: 'Motion graphics, compositing and visual storytelling',
    logo: '/assets/tool-after-effects.png',
    accent: '#f2a8c4'
  },
  {
    name: 'AI-assisted Workflow',
    description: 'ChatGPT, Codex and whisper.cpp for faster prototyping and production',
    logo: '/assets/tool-openai.png',
    logoClass: 'toolbox-logo-invert',
    accent: '#ff9f87'
  }
];

const douyinCaseStudy = {
  title: 'English Learning Content Account on Douyin',
  eyebrow: 'Marketing / Social Media / Content Operation',
  image: '/assets/personal-douyin-account.jpg',
  processEyebrow: 'Problem Solving & Growth Experiments',
  processTitle: 'Turning an early content idea into a repeatable growth system.',
  focusTags: ['AI-assisted Workflow', 'Audience Analytics', 'Social Media Marketing'],
  summary:
    'An independently operated English-learning content account developed through format experiments, audience analysis, AI-assisted production and platform-specific publishing decisions.',
  stats: [
    ['8,000', 'peak followers'],
    ['1.428M', 'top video views'],
    ['60 → 30 min', 'production time'],
    ['10K+', 'stabilized views per video']
  ],
  sections: [
    {
      title: 'Why I Started',
      body:
        'When I first arrived in the UK, I used English-language films and television to improve my listening and speaking, saving memorable clips and learning notes along the way. I realized that this material could be shaped into accessible English explanations for a wider audience, which led me to build and operate the account from scratch.'
    },
    {
      title: 'Content & Audience',
      body:
        'The content focuses on spoken English and situational dialogue drawn from film and television clips. It was initially aimed at learners interested in speaking practice, but audience-interest data showed that “English” and “postgraduate entrance exams” were also common interests. I therefore broadened the content to support speaking, exam preparation and general English learning.'
    },
    {
      title: 'Ownership & Outcome',
      body:
        'I independently handled topic selection, editing, subtitles, English explanations, publishing and performance analysis. The account reached 8,000 followers in approximately four months, and its best-performing video achieved 1.428 million views. After a year without new posts, the account still retains around 6,000 followers.'
    }
  ],
  experiments: [
    {
      problem: 'Early videos averaged only around 700 views, and the content structure had no repeatable formula.',
      analysis:
        'I treated the opening structure as the main variable and tested three formats, with approximately four videos per format: clearly announcing the lesson first; showing a highlight before explanation; and playing the complete scene before the explanation. Exact historical retention data is no longer available, so I used the consistent direction of video performance rather than claiming precise completion-rate figures.',
      action:
        'The third format performed most consistently: first let viewers watch the complete scene, then explain the language. I standardized this structure so the narrative creates interest before the educational section begins.',
      result:
        'Later videos stabilized above 10,000 views. During the comparison period, performance improved by approximately 40%, giving the account a repeatable content format instead of relying on isolated viral results.',
      metrics: ['~4 videos per format', '3 opening formats', '700 → 10K+ views']
    },
    {
      problem: 'Daily production took about one hour because transcription and language checking were highly repetitive.',
      analysis:
        'The main bottleneck was not editing itself. I was manually typing every line, checking the English and then sending the text to ChatGPT to organize the explanation, which duplicated work and made daily publishing difficult to sustain.',
      action:
        'I built an AI-assisted workflow: rough-cut the clip, generate subtitles in PotPlayer using whisper.cpp CUDA and the Large-v3-turbo model, manually correct the small number of recognition errors, then use ChatGPT to draft the teaching notes before final editing.',
      result:
        'Average production time fell from around 60 minutes to 30 minutes, a 50% reduction, while I maintained one upload per day and retained human review for language accuracy.',
      metrics: ['60 → 30 minutes', '50% faster', '1 upload per day']
    },
    {
      problem: 'Distribution was unstable, and the original 16:9 videos did not fit a vertical-first platform well.',
      analysis:
        'Around 40% of followers showed interest in “English” and “postgraduate entrance exam” topics. Although 23:00–24:00 and 22:00–23:00 ranked highest for activity, late-night publishing risked a sharp audience decline after midnight. The 12:00–13:00 lunch period ranked third and better matched a sustainable viewing window.',
      action:
        'I fixed publishing at 12:00 each day and changed the video canvas from 16:9 to 4:3. The new ratio used more of the vertical feed while still providing a comfortable full-screen viewing experience.',
      result:
        'Videos began receiving more stable initial distribution after the timing adjustment, while the 4:3 format improved compatibility with the platform and reduced the volatility seen with earlier 16:9 uploads.',
      metrics: ['12:00 publishing', '40% English / exam interest', '16:9 → 4:3']
    }
  ]
};

const stockCaseStudy = {
  hash: '#stock-research-assistant',
  title: 'Automated Stock Research Assistant',
  eyebrow: 'Python Automation / AI Research Workflow / Personal Project',
  image: '/assets/personal-alpaca-paper-trading.png',
  visualMode: 'contain',
  processEyebrow: 'Cost-Aware Automation Workflow',
  processTitle: 'Turning an API-cost constraint into a sustainable daily research workflow.',
  showExperimentNumbers: false,
  focusTags: ['Python Automation', 'AI Analysis', 'Markdown Reports', 'Market Research'],
  summary:
    'A command-line research assistant designed to scan a personal NASDAQ and US stock watchlist, detect stocks falling relative to the previous regular-session close, use ChatGPT-assisted analysis to explain possible causes, and generate a daily report.',
  stats: [
    ['Python 3.11+', 'runtime'],
    ['Europe/London', 'scheduler timezone'],
    ['Markdown', 'daily report format'],
    ['pytest', 'test coverage']
  ],
  sections: [
    {
      title: 'Why I Started',
      body:
        'I wanted a short-term research support tool that could automatically check the NASDAQ and US stocks I follow every day, quickly surface names that had fallen compared with the previous regular trading close, and generate a concise Chinese research report for review.'
    },
    {
      title: 'Project Scope',
      body:
        'The tool reads a watchlist.csv file, fetches latest price data, previous close, percentage change and volume, filters falling stocks, sends the list to ChatGPT for Chinese analysis, writes reports to reports/YYYY-MM-DD.md, and can optionally send the report by SMTP email.'
    }
  ],
  experiments: [
    {
      problem: 'The first version depended on direct OpenAI API calls, creating an ongoing token cost I did not want for a personal research tool.',
      solution:
        'I redesigned the delivery workflow around a scheduled Codex task. Each day, Codex runs the research workflow using my existing Codex/ChatGPT usage, generates a Markdown report, and saves it to a local folder. OneDrive then syncs that report automatically, so the latest output is available without a separate API billing loop.'
    }
  ]
};

const academicCaseStudies = [
  {
    hash: '#kitchen-inventory-chatbot',
    backLabel: 'Back to Academic Projects',
    backHash: '#projects',
    title: 'Kitchen Inventory Chatbot',
    eyebrow: 'Interactive NLP-Based AI System / 2025',
    image: '/assets/project-chatbot-screenshot.png',
    heroBackground: true,
    visualMode: 'contain',
    processEyebrow: 'Conversation Design & Implementation',
    processTitle: 'Turning kitchen inventory tasks into a usable dialogue flow.',
    focusTags: ['Python', 'TF-IDF', 'Intent Recognition', 'Dialogue Logic'],
    summary: 'A Python-based conversational system for managing kitchen inventory through natural-language requests, contextual assistance and personalized responses.',
    stats: [['Python', 'implementation'], ['TF-IDF', 'intent matching'], ['Rule-based', 'dialogue control'], ['Inventory', 'task domain']],
    sections: [
      { title: 'Project Goal', body: 'The project explored how a lightweight conversational interface could make common inventory tasks faster and easier to understand without requiring a complex graphical interface.' },
      { title: 'Core Experience', body: 'Users can add, remove, search and update inventory items, ask for contextual help, engage in small talk and receive responses that preserve basic conversational context.' },
      { title: 'My Contribution', body: 'I structured the intents, built the Python dialogue flow, implemented TF-IDF-based matching, designed recovery responses and tested the system against varied user phrasing.' }
    ],
    experiments: [
      { problem: 'Different phrases can express the same inventory action.', solution: 'I grouped representative utterances by intent and used TF-IDF similarity to map varied wording to a manageable set of dialogue actions.' },
      { problem: 'A failed match can make a chatbot feel abruptly broken.', solution: 'I added staged fallback behavior, contextual help and discoverability prompts so users could recover without restarting the conversation.' },
      { problem: 'Task commands and social conversation need different response logic.', solution: 'I separated task intents from small-talk and question-answer paths while retaining lightweight state for names, prior intent and failure count.' }
    ]
  },
  {
    hash: '#shared-meal-ethnography',
    backLabel: 'Back to Academic Projects',
    backHash: '#projects',
    title: 'Ethnography Study for a Shared Meal',
    eyebrow: 'Ethnomethodological HCI Study / 2026',
    image: '/assets/project-meal-photo.webp',
    heroBackground: true,
    processEyebrow: 'Field Research & Analysis',
    processTitle: 'Understanding how people coordinate a shared meal in practice.',
    focusTags: ['Ethnography', 'Field Notes', 'Interaction Analysis', 'Design Implications'],
    summary: 'A field study of shared-meal sessions examining how talk, gesture, spatial arrangement, tools and moment-to-moment coordination shape collaborative domestic activity.',
    stats: [['Fieldwork', 'research method'], ['Shared meal', 'study setting'], ['Multimodal', 'interaction data'], ['HCI', 'design synthesis']],
    sections: [
      { title: 'Research Focus', body: 'The study investigated how participants make their actions understandable to one another while preparing, serving and sharing food in a constrained domestic setting.' },
      { title: 'Method', body: 'I documented naturally occurring interaction through observation and field notes, then reviewed sequences of talk, gesture, movement, object use and spatial positioning.' },
      { title: 'Design Value', body: 'The analysis translated subtle coordination practices into implications for collaborative systems that need to respect timing, visibility, roles and shared attention.' }
    ],
    experiments: [
      { problem: 'Important coordination is often non-verbal and easy to overlook.', solution: 'I analyzed gesture, gaze, body orientation, movement and object placement alongside spoken interaction rather than treating dialogue as the only source of meaning.' },
      { problem: 'The researcher must preserve natural behavior while gathering useful evidence.', solution: 'I used unobtrusive observation and structured field notes, separating direct observations from later interpretation.' },
      { problem: 'Rich qualitative observations can remain too abstract for design.', solution: 'I organized recurring interaction patterns and connected each pattern to concrete opportunities and constraints for collaborative technology.' }
    ]
  },
  {
    hash: '#chaotic-rehab-clinic',
    backLabel: 'Back to Academic Projects',
    backHash: '#projects',
    title: 'Chaotic Rehab Clinic',
    eyebrow: 'Unity Game Prototype / 2026',
    image: '/assets/project-rehab-screenshot.png',
    heroBackground: true,
    visualMode: 'contain',
    processEyebrow: 'Game Systems & Prototyping',
    processTitle: 'Building a readable rehabilitation clinic simulation loop.',
    focusTags: ['Unity', 'Simulation', 'Game Loop', 'Feedback Design'],
    summary: 'A Unity rehabilitation clinic prototype combining patient diagnosis, exercise selection, posture and equipment correction, treatment feedback, payment and clinic progression.',
    stats: [['Unity', 'engine'], ['Simulation', 'genre'], ['Patients', 'core agents'], ['Iteration', 'design method']],
    sections: [
      { title: 'Game Concept', body: 'Players operate a busy rehabilitation clinic, interpret patient needs and select appropriate treatments while managing errors, feedback and progression.' },
      { title: 'Core Loop', body: 'The prototype links diagnosis, exercise choice, setup correction, treatment outcome, payment and upgrades into a repeatable sequence with visible consequences.' },
      { title: 'My Contribution', body: 'I implemented and connected the principal Unity systems, shaped the interaction flow and iterated the feedback needed to make state changes understandable.' }
    ],
    experiments: [
      { problem: 'Multiple treatment states can become difficult for players to read.', solution: 'I used clear state transitions and immediate feedback around patients, equipment and outcomes to communicate what changed and why.' },
      { problem: 'Mistakes should create challenge without making the game feel arbitrary.', solution: 'Incorrect posture, equipment or treatment choices produce consistent consequences that players can learn from on the next attempt.' },
      { problem: 'Separate mechanics need to feel like one coherent system.', solution: 'I connected clinical decisions to payment and upgrades so short interactions contribute to a visible longer-term progression loop.' }
    ]
  },
  {
    hash: '#attack-and-defend',
    backLabel: 'Back to Academic Projects',
    backHash: '#projects',
    title: 'Attack and Defend',
    eyebrow: 'VR/MR Game Prototype / 2026',
    image: '/assets/project-attack-defend-screenshot.png',
    heroBackground: true,
    visualMode: 'contain',
    processEyebrow: 'Spatial Interaction & Playtesting',
    processTitle: 'Designing asymmetric play for a shared mixed-reality space.',
    focusTags: ['VR/MR', 'Unity', 'Asymmetric Play', 'Spatial Safety'],
    summary: 'An asymmetric two-player VR/MR prototype for an apartment common area, combining navigation, spawning, shooting, health systems and safety-aware play boundaries.',
    stats: [['2 players', 'asymmetric roles'], ['Unity', 'engine'], ['VR / MR', 'interaction mode'], ['Spatial', 'play boundary']],
    sections: [
      { title: 'Experience Goal', body: 'The project explored how two players with different roles and information could share one physical environment while experiencing distinct virtual responsibilities.' },
      { title: 'System Design', body: 'The prototype combines route selection, enemy spawning, shooting, health and role-specific feedback in a simplified model of the intended apartment space.' },
      { title: 'Safety & Space', body: 'Movement and play boundaries were treated as core mechanics so the virtual experience remained compatible with the limits of the real common area.' }
    ],
    experiments: [
      { problem: 'Asymmetric roles can leave one player with less agency.', solution: 'I separated responsibilities while keeping each role connected to the same shared outcome and feedback loop.' },
      { problem: 'Virtual action must remain legible within a constrained physical room.', solution: 'I simplified routes and environmental geometry, then aligned interaction zones with practical movement boundaries.' },
      { problem: 'Combat feedback must be readable without overwhelming spatial awareness.', solution: 'I kept health, spawning and hit feedback concise so players could maintain attention on movement, orientation and their partner.' }
    ]
  }
];

const caseStudiesByHash = {
  '#douyin-content-account': douyinCaseStudy,
  '#stock-research-assistant': stockCaseStudy,
  ...Object.fromEntries(academicCaseStudies.map((study) => [study.hash, study]))
};

function VideoBackdrop() {
  const videoRef = useRef(null);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', { alpha: false });
    const width = 1920;
    const height = 1080;
    canvas.width = width;
    canvas.height = height;

    let animationId = 0;
    let stream;

    const draw = (time) => {
      const t = time * 0.00018;
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#06080d');
      gradient.addColorStop(0.48, '#0a0d12');
      gradient.addColorStop(1, '#12100d');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = 'screen';
      for (let layer = 0; layer < 3; layer += 1) {
        ctx.strokeStyle = layer === 0 ? 'rgba(68, 214, 196, 0.18)' : layer === 1 ? 'rgba(205, 171, 94, 0.12)' : 'rgba(146, 157, 255, 0.1)';
        ctx.lineWidth = 1.4 + layer * 0.4;
        ctx.beginPath();
        for (let i = 0; i <= 28; i += 1) {
          const x = (i / 28) * width;
          const y = height * (0.28 + layer * 0.14) + Math.sin(i * 0.58 + t * (2 + layer)) * 44;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
      ctx.lineWidth = 1;
      const gridOffset = (t * 90) % 96;
      for (let x = -96 + gridOffset; x < width + 96; x += 96) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + 280, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 90) {
        ctx.beginPath();
        ctx.moveTo(0, y + Math.sin(t + y * 0.01) * 12);
        ctx.lineTo(width, y + Math.cos(t + y * 0.01) * 12);
        ctx.stroke();
      }

      ctx.globalCompositeOperation = 'screen';
      const sweep = (Math.sin(t * 1.7) * 0.5 + 0.5) * width;
      const sweepGradient = ctx.createLinearGradient(sweep - 260, 0, sweep + 260, 0);
      sweepGradient.addColorStop(0, 'rgba(67, 198, 184, 0)');
      sweepGradient.addColorStop(0.5, 'rgba(67, 198, 184, 0.18)');
      sweepGradient.addColorStop(1, 'rgba(67, 198, 184, 0)');
      ctx.fillStyle = sweepGradient;
      ctx.fillRect(sweep - 260, 0, 520, height);

      for (let i = 0; i < 34; i += 1) {
        const x = ((i * 389 + t * 260) % (width + 120)) - 60;
        const y = 120 + ((i * 173) % (height - 220)) + Math.sin(t * 2 + i) * 26;
        ctx.fillStyle = i % 3 === 0 ? 'rgba(222, 184, 92, 0.45)' : 'rgba(75, 225, 205, 0.35)';
        ctx.beginPath();
        ctx.arc(x, y, i % 5 === 0 ? 2.3 : 1.4, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.24)';
      ctx.fillRect(0, 0, width, height);

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    if (canvas.captureStream && videoRef.current) {
      stream = canvas.captureStream(30);
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch(() => {});
    }

    return () => {
      cancelAnimationFrame(animationId);
      if (stream) stream.getTracks().forEach((track) => track.stop());
    };
  }, []);

  return <video ref={videoRef} className="hero-video" autoPlay muted playsInline aria-hidden="true" />;
}

function SectionHeader({ eyebrow, title, text }) {
  return (
    <div className="section-header">
      <span className="eyebrow">{eyebrow}</span>
      {title ? <h2>{title}</h2> : null}
      {text ? <p>{text}</p> : null}
    </div>
  );
}

function CinematicProfileHero({ profileData, backgroundImage, personCutoutImage, episodes }) {
  return (
    <div className="cinematic-profile-shell">
      <div className="cinematic-media-card magic-bento-card">
        {/* Layer order: background frame sits lowest, personCutout floats above it, text/UI sit highest. */}
        <div className="cinematic-card-background" aria-hidden="true">
          <img src={backgroundImage} alt="" loading="lazy" decoding="async" />
        </div>

        <img
          className="cinematic-person-cutout"
          src={personCutoutImage}
          alt={profileData.name}
          loading="lazy"
          decoding="async"
        />

        <div className="cinematic-orbit-lines" aria-hidden="true" />

        <div className="cinematic-topbar">
          <span className="cinematic-network">About me</span>
        </div>

        <div className="cinematic-copy">
          <span className="cinematic-kicker">Profile / MSc HCI</span>
          <h2>{profileData.name}</h2>
          <p>
            Hi, I’m Peifeng. I’m an HCI researcher and designer based in the UK. I’m currently studying for a master’s
            degree at the University of Nottingham and will graduate later this year. I use user research, interaction
            design, and AI tools to create digital products that are simple, useful, and easy to use. In my free time,
            I enjoy hiking, climbing, swimming, and camping.
          </p>
        </div>

        <div className="cinematic-contact-strip">
          <span>
            <Mail size={16} />
            {profileData.email}
          </span>
          <span>
            <MapPin size={16} />
            {profileData.location}
          </span>
          <span>
            <GraduationCap size={16} />
            MSc HCI
          </span>
        </div>

        <div className="cinematic-episode-list" aria-label="Profile preview cards">
          {episodes.map((episode) => (
            <article className="cinematic-episode-card" key={episode.number} tabIndex={0}>
              <div className="cinematic-episode-copy">
                <strong>{episode.number}</strong>
                <span>{episode.title}</span>
                <small>{episode.duration}</small>
              </div>
              <img className="cinematic-episode-thumbnail" src={episode.image} alt="" loading="lazy" decoding="async" />
              <div className="cinematic-episode-preview" aria-hidden="true">
                <img src={episode.image} alt="" loading="lazy" decoding="async" />
                <span>{episode.title}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectCaseStudyPage({ caseStudy }) {
  const isStockResearchCaseStudy = caseStudy.hash === '#stock-research-assistant';

  return (
    <div className="case-study-page">
      <div className="case-study-shell">
        <a className="case-study-back" href={caseStudy.backHash || '#personal-projects'}>
          <ArrowLeft size={18} />
          {caseStudy.backLabel || 'Back to Personal Projects'}
        </a>

        <section
          className={`case-study-hero magic-bento-card${caseStudy.heroBackground ? ' case-study-hero-background' : ''}`}
          style={caseStudy.heroBackground ? { '--case-study-background': `url(${caseStudy.image})` } : undefined}
        >
          <div className={`case-study-copy${isStockResearchCaseStudy ? ' case-study-copy-stock' : ''}`}>
            <span className="eyebrow">{caseStudy.eyebrow}</span>
            <h1>{caseStudy.title}</h1>
            <p>{caseStudy.summary}</p>
            <div className="case-study-tags" aria-label="Project focus areas">
              {caseStudy.focusTags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
          {caseStudy.heroBackground ? null : (
            <div className={`case-study-visual${caseStudy.visualMode === 'contain' ? ' case-study-visual-contain' : ''}`}>
              <img src={caseStudy.image} alt={`${caseStudy.title} screenshot`} decoding="async" fetchPriority="high" />
            </div>
          )}
        </section>

        <section className="case-study-stats" aria-label="Project results">
          {caseStudy.stats.map(([value, label]) => (
            <div className="magic-bento-card" key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </section>

        <section className="case-study-grid">
          {caseStudy.sections.map((section) => (
            <article className="case-study-panel magic-bento-card" key={section.title}>
              <span>{section.title}</span>
              <p>{section.body}</p>
            </article>
          ))}
        </section>

        <section
          className={`case-study-process magic-bento-card magic-bento-static${
            caseStudy.experiments.some((item) => item.analysis) ? ' case-study-process-structured' : ''
          }`}
        >
          <div>
            <span className="eyebrow">{caseStudy.processEyebrow}</span>
            <h2>{caseStudy.processTitle}</h2>
          </div>
          <div className="case-study-problems">
            {caseStudy.experiments.map((item, index) => (
              <article
                className={`${item.analysis ? 'case-study-experiment-structured' : ''}${
                  caseStudy.showExperimentNumbers === false && !item.metrics ? ' case-study-experiment-no-heading' : ''
                }`}
                key={item.problem}
              >
                {caseStudy.showExperimentNumbers !== false || item.metrics ? (
                  <div className="case-study-experiment-heading">
                    {caseStudy.showExperimentNumbers !== false ? <strong>{String(index + 1).padStart(2, '0')}</strong> : null}
                    {item.metrics ? (
                      <div className="case-study-experiment-metrics" aria-label="Experiment evidence">
                        {item.metrics.map((metric) => (
                          <span key={metric}>{metric}</span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ) : null}
                <h3>{item.problem}</h3>
                {item.analysis ? (
                  <div className="case-study-experiment-flow">
                    <div>
                      <span>Analysis</span>
                      <p>{item.analysis}</p>
                    </div>
                    <div>
                      <span>Action</span>
                      <p>{item.action}</p>
                    </div>
                    <div>
                      <span>Result</span>
                      <p>{item.result}</p>
                    </div>
                  </div>
                ) : (
                  <p>{item.solution}</p>
                )}
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(
    () => window.matchMedia('(max-width: 760px)').matches || window.scrollY > 80
  );
  const [currentHash, setCurrentHash] = useState(() => window.location.hash);
  const navItems = useMemo(
    () => [
      ['About me', '#experience'],
      ['Academic Projects', '#projects'],
      ['Personal Projects', '#personal-projects'],
      ['Toolbox', '#toolbox']
    ],
    []
  );

  useEffect(() => {
    let frameId = 0;

    const handleScroll = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(() => {
        const shouldCollapse = window.scrollY > 80 || window.matchMedia('(max-width: 760px)').matches;
        setIsSidebarCollapsed((current) => (current === shouldCollapse ? current : shouldCollapse));
        frameId = 0;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    const handleHashChange = () => setCurrentHash(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (caseStudiesByHash[currentHash]) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentHash) {
      window.requestAnimationFrame(() => {
        document.querySelector(currentHash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }, [currentHash]);

  const showSidebar = () => setIsSidebarCollapsed(false);
  const collapseSidebarAfterHover = () => {
    if (window.scrollY > 80) {
      setIsSidebarCollapsed(true);
    }
  };

  const activeCaseStudy = caseStudiesByHash[currentHash];
  const isCaseStudy = Boolean(activeCaseStudy);

  return (
    <>
      <main>
      <MagicBentoEffects />
      {isCaseStudy ? null : <PortfolioMotion />}
      {isCaseStudy ? null : (
        <div
          className={`sidebar-shell${isSidebarCollapsed ? ' is-collapsed' : ''}`}
          onMouseEnter={showSidebar}
          onMouseLeave={collapseSidebarAfterHover}
        >
          <button
            className="sidebar-edge-indicator"
            type="button"
            aria-label="Open navigation"
            onClick={showSidebar}
          />
          <header className="site-nav">
            <a className="brand" href="#top" aria-label="Go to top">
              <span className="brand-mark">PQ</span>
              <span>{profile.name}</span>
            </a>
            <nav aria-label="Main navigation">
              {navItems.map(([label, href]) => (
                <a key={`${label}-${href}`} href={href}>
                  {label}
                </a>
              ))}
            </nav>
            <a className="nav-contact" href={`mailto:${profile.email}`}>
              <Mail size={18} />
              Contact
            </a>
          </header>
        </div>
      )}
      {isCaseStudy ? (
        currentHash === '#kitchen-inventory-chatbot' ? (
          <VenemCaseStudyPage />
        ) : (
          <ProjectCaseStudyPage caseStudy={activeCaseStudy} />
        )
      ) : (
      <>
      <section className="hero" id="top">
        <div className="hero-shade" />

        <div className="hero-editorial page-shell">
          <div className="hero-topline">
            <span>MSc HCI / University of Nottingham</span>
            <h1>{profile.name}</h1>
            <p className="hero-tagline">{profile.tagline}</p>
          </div>

          <div className="hero-gallery" aria-label="Portfolio sections">
            <CircularGallery
              items={heroGalleryItems}
              bend={1.6}
              textColor="#f4fbff"
              borderRadius={0.055}
              font="700 28px Inter, sans-serif"
              scrollSpeed={1.6}
              scrollEase={0.045}
            />
          </div>

        </div>
      </section>

      <section className="experience page-shell" id="experience">
        <CinematicProfileHero
          profileData={profile}
          backgroundImage={profilePhoto}
          personCutoutImage={personCutout}
          episodes={profileEpisodes}
        />
      </section>

      <section className="projects page-shell" id="projects">
        <SectionHeader eyebrow="Academic Projects" />
        <div className="project-grid">
          {projects.map((project, index) => (
            <article className={`project-card project-card-${index + 1} magic-bento-card`} key={project.title}>
              <a className="personal-project-card-link personal-project-detail-link" href={project.detailHash}>
                <div className="project-image">
                  <img src={project.image} alt={`${project.title} project visual`} loading="lazy" decoding="async" />
                  <span className="visual-link-label">View Case Study</span>
                </div>
                <div className="project-content">
                  <span>{project.meta}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tag-row">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="personal-projects page-shell" id="personal-projects">
        <SectionHeader eyebrow="Personal Projects" />
        <div className="project-grid personal-project-grid">
          {personalProjects.map((project) => {
            const visualClass = `project-image personal-project-visual personal-project-visual-${project.visual}${
              project.image ? ' personal-project-visual-image' : ''
            }`;
            const visualContent = project.image ? (
              <img src={project.image} alt={`${project.title} project screenshot`} loading="lazy" decoding="async" />
            ) : (
              <div className="personal-visual-panel">
                <span>{project.meta}</span>
                <strong>{project.title}</strong>
              </div>
            );
            const cardContent = (
              <>
                <div className={visualClass}>
                  {visualContent}
                  {project.detailHash ? <span className="visual-link-label">View Case Study</span> : null}
                </div>
                <div className="project-content">
                  <span>{project.meta}</span>
                  <h3>{project.title}</h3>
                  <ul className="project-bullets">
                    {project.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                  <div className="tag-row">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </>
            );

            return (
              <article className="project-card personal-project-card magic-bento-card" key={project.title}>
                {project.detailHash ? (
                  <a className="personal-project-card-link personal-project-detail-link" href={project.detailHash}>
                    {cardContent}
                  </a>
                ) : (
                  cardContent
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section className="toolbox page-shell" id="toolbox">
        <div className="toolbox-layout">
          <div className="toolbox-editorial">
            <span className="toolbox-label">
              <i aria-hidden="true" />
              Tools & Skills
            </span>
            <h2>
              <span>My</span>
              {' '}toolbox
            </h2>
          </div>

          <div className="toolbox-list">
            {toolboxItems.map(({ name, description, logo, logoClass, accent }) => (
              <article
                className="toolbox-card magic-bento-card"
                key={name}
                style={{ '--tool-accent': accent }}
              >
                <div className="toolbox-icon" aria-hidden="true">
                  <img className={`toolbox-logo ${logoClass || ''}`} src={logo} alt="" loading="lazy" decoding="async" />
                </div>
                <div className="toolbox-card-copy">
                  <h3>{name}</h3>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="site-footer page-shell" id="contact">
        <div className="site-footer-heading">
          <span>Contact</span>
          <h2>Let&apos;s connect.</h2>
        </div>
        <div className="site-footer-links">
          <a href="mailto:peifengqin01@163.com">peifengqin01@163.com</a>
          <a
            href="https://www.linkedin.com/in/peifeng-qin-9130863ba/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>
        <span className="site-footer-signature">Peifeng Qin / HCI Portfolio</span>
      </footer>

      </>
      )}

      </main>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
