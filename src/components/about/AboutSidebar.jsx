function AboutSidebar({ activeSection, navItems, onNavClick }) {
  return (
    <aside className="about-sidebar" aria-label="About sections">
      <div className="about-identity">
        <strong>Petals</strong>
        <p>Frontend, interaction, and tiny useful tools.</p>
      </div>
      <nav>
        {navItems.map((item) => (
          <button
            key={item.id}
            className={activeSection === item.id ? "is-active" : ""}
            type="button"
            onClick={() => onNavClick(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default AboutSidebar;
