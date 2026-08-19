import { useEffect, useState } from 'react';

const defaultOptions = [
  { id: 'selected-works', label: 'Selected works', href: '#personal-projects' },
  { id: 'academic-works', label: 'Academic works', href: '#projects' },
  { id: 'toolbox', label: 'Toolbox', href: '#toolbox' }
];

function GlitchCheckbox({ options = defaultOptions }) {
  const [activeHref, setActiveHref] = useState(() => window.location.hash);

  useEffect(() => {
    const syncHash = () => setActiveHref(window.location.hash);
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, []);

  return (
    <div className="glitch-checkbox">
      {options.map((option) => {
        const isActive = activeHref === option.href;

        return (
          <a
            className="glitch-checkbox-item"
            key={option.id}
            href={option.href}
            aria-label={option.label}
            aria-current={isActive ? 'true' : undefined}
          >
            <input type="checkbox" tabIndex={-1} readOnly checked={isActive} />
            <span className="glitch-checkbox-box">
              <span className="glitch-checkbox-mark" />
            </span>
            <span className="glitch-checkbox-label" data-text={option.label}>
              {option.label}
            </span>
          </a>
        );
      })}
    </div>
  );
}

export default GlitchCheckbox;
