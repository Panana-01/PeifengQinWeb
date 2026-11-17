import { ArrowLeft } from 'lucide-react';
import './AiAgentsPage.css';

function AiAgentsPage() {
  return (
    <div className="agents-page">
      <header className="agents-header">
        <a className="agents-back" href="#top" aria-label="Back to home">
          <ArrowLeft size={18} aria-hidden="true" />
        </a>
        <div className="agents-intro">
          <h1>My AI Agents</h1>
          <p>Personal agents I build and use.</p>
        </div>
      </header>
    </div>
  );
}

export default AiAgentsPage;
