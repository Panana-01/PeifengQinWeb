const sectionOptions = [
  { id: 'selected-works', label: 'Selected works' },
  { id: 'academic-works', label: 'Academic works' },
  { id: 'about-me', label: 'About me' }
];

function GlitchCheckbox() {
  return (
    <div className="glitch-checkbox-wrapper">
      {sectionOptions.map((option) => (
        <label className="glitch-checkbox-container" key={option.id}>
          <input type="checkbox" name={option.id} />
          <div className="checkbox-box">
            <div className="checkbox-mark" />
          </div>
          <span className="checkbox-label" data-text={option.label}>
            {option.label}
          </span>
        </label>
      ))}
    </div>
  );
}

export default GlitchCheckbox;
