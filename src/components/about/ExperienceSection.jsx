import { projectById } from "../../data/aboutData";
import { getProjectDisplayMeta } from "../../data/projectData";

function ExperienceSection({ sectionRef, experiences, onOpenProject }) {
  return (
    <section id="about-experience" ref={sectionRef} className="about-section">
      <div className="section-heading">
        <p className="section-eyebrow">Experience</p>
        <p className="section-description">实习与项目经历</p>
      </div>
      <div className="experience-list">
        {experiences.map((item) => (
          <article className="experience-card" key={`${item.role}-${item.time}`}>
            <div className="company-logo-slot">
              <img src={item.logo} alt={`${item.company} logo`} />
            </div>
            <div className="experience-copy">
              <span>{item.time}</span>
              <h3>{item.role}</h3>
              <p>{item.summary}</p>
              <div
                className={[
                  "experience-projects",
                  item.projectIds.length === 1 ? "is-single-project" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-label={`${item.company} projects`}
              >
                {item.projectIds.map((projectId) => {
                  const project = projectById.get(projectId);

                  if (!project) return null;

                  const meta = getProjectDisplayMeta(project);
                  const projectImages = project.images ?? [project.image];

                  return (
                    <button
                      key={project.id}
                      className={`experience-project-shot is-${project.id}`}
                      type="button"
                      onClick={() => onOpenProject?.(project.id)}
                    >
                      <span
                        className={[
                          "project-shot-frame",
                          projectImages.length > 1 ? "is-multi-image" : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                      >
                        {projectImages.map((image, imageIndex) => (
                          <img
                            draggable="false"
                            key={`${project.id}-${imageIndex}`}
                            src={image}
                            alt={
                              imageIndex === 0
                                ? `${project.title} screenshot`
                                : `${project.title} screenshot ${imageIndex + 1}`
                            }
                          />
                        ))}
                        <span className="project-shot-pill">
                          {meta.title} - {meta.timeline}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ExperienceSection;
