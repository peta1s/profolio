import { getProjectById, getProjectDisplayMeta, projectShowcases } from "../data/projectData";
import AboutMe from "./AboutMe";
import CameraWindow from "./CameraWindow";
import GalleryWindow from "./GalleryWindow";
import IpodWindow from "./IpodWindow";

function WindowContent({
  id,
  selectedProjectId,
  musicLibrary,
  musicPlayer,
  musicPlayerActions,
  openProject,
}) {
  if (id === "aboutWindow") {
    return (
      <AboutMe
        musicPlayer={musicPlayer}
        onMusicAction={musicPlayerActions?.onMusicAction}
        onOpenProject={openProject}
      />
    );
  }

  if (id === "cameraWindow") {
    return <CameraWindow />;
  }

  if (id === "galleryWindow") {
    return <GalleryWindow />;
  }

  if (id === "ipodWindow") {
    return <IpodWindow player={musicPlayer} library={musicLibrary} actions={musicPlayerActions} />;
  }

  if (id === "projectsWindow") {
    const selectedProject = getProjectById(selectedProjectId);
    const selectedMeta = getProjectDisplayMeta(selectedProject);
    const selectedProjectImages = selectedProject.images ?? [selectedProject.image];
    const detailSections = [
      { label: "Overview", body: selectedProject.overview, wide: true },
      { label: "Problem", body: selectedProject.problem },
      { label: "My Work", items: selectedProject.myWork },
      { label: "Key Features", items: selectedProject.keyFeatures },
      { label: "Technical Details", items: selectedProject.technicalDetails },
      { label: "Outcome", body: selectedProject.outcome, wide: true },
    ].filter((section) => section.body || section.items?.length);

    return (
      <div className="window-body projects-body">
        <article className="project-detail-card" aria-label={`${selectedMeta.title} project details`}>
          <div className="project-detail-identity">
            <span className={`project-mark project-mark-${selectedMeta.accent}`} aria-hidden="true">
              {selectedMeta.company.slice(0, 1)}
            </span>
            <h2>{selectedMeta.title}</h2>
          </div>

          <dl className="project-detail-meta">
            <div>
              <dt>Timeline</dt>
              <dd>{selectedMeta.timeline}</dd>
            </div>
            <div>
              <dt>Role</dt>
              <dd>{selectedMeta.role}</dd>
            </div>
            <div>
              <dt>Org</dt>
              <dd>{selectedMeta.org}</dd>
            </div>
            <div>
              <dt>With</dt>
              <dd>{selectedMeta.with}</dd>
            </div>
          </dl>

          <div
            className={[
              "project-detail-hero",
              `is-${selectedProject.id}`,
              selectedProjectImages.length > 1 ? "is-multi-image" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {selectedProjectImages.map((image, imageIndex) => (
              <img
                key={`${selectedProject.id}-${imageIndex}`}
                src={image}
                alt={
                  imageIndex === 0
                    ? `${selectedMeta.title} screenshot`
                    : `${selectedMeta.title} screenshot ${imageIndex + 1}`
                }
              />
            ))}
          </div>

          <div className="project-detail-copy">
            <span>
              {selectedMeta.company} - {selectedMeta.timeline}
            </span>
            <h3>{selectedMeta.title}</h3>
            <p>{selectedMeta.summary}</p>
          </div>

          {detailSections.length > 0 && (
            <div className="project-detail-sections">
              {detailSections.map((section) => (
                <section
                  className={`project-detail-section${section.wide ? " is-wide" : ""}`}
                  key={section.label}
                >
                  <h4>{section.label}</h4>
                  {section.body ? <p>{section.body}</p> : null}
                  {section.items?.length ? (
                    <ul>
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
          )}

          {selectedProject.detailImages?.length ? (
            <div className="project-detail-media">
              {selectedProject.detailImages.map((item) => (
                <figure key={item.caption ?? item.image}>
                  <img src={item.image} alt={item.caption ?? `${selectedMeta.title} detail`} />
                  {item.caption ? <figcaption>{item.caption}</figcaption> : null}
                </figure>
              ))}
            </div>
          ) : null}
        </article>

        <section className="project-gallery" aria-label="Project gallery">
          {projectShowcases.map((project, index) => {
            const meta = getProjectDisplayMeta(project);
            const projectImages = project.images ?? [project.image];

            return (
              <button
                key={project.id}
                className={`project-gallery-card project-gallery-card-${index % 4} is-${project.id}${
                  project.id === selectedProject.id ? " is-active" : ""
                }`}
                type="button"
                onClick={() => openProject?.(project.id)}
              >
                <span
                  className={[
                    "project-gallery-frame",
                    projectImages.length > 1 ? "is-multi-image" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {projectImages.map((image, imageIndex) => (
                    <img key={`${project.id}-${imageIndex}`} src={image} alt="" />
                  ))}
                  <span className="project-shot-pill">
                    {meta.company} - {meta.timeline}
                  </span>
                </span>
                <strong>{meta.title}</strong>
                <small>{meta.tags.join("  /  ")}</small>
              </button>
            );
          })}
        </section>
      </div>
    );
  }

  if (id === "notesWindow") {
    return (
      <div className="window-body notes-grid">
        <a href="#" aria-label="Open note">
          interface notes
        </a>
        <a href="#" aria-label="Open note">
          model prompts
        </a>
        <a href="#" aria-label="Open note">
          visual systems
        </a>
        <a href="#" aria-label="Open note">
          reading list
        </a>
      </div>
    );
  }

  if (id === "contactWindow") {
    return (
      <div className="window-body contact-body">
        <p>Open to frontend, product engineering, and AI tooling work.</p>
        <a href="mailto:2630376648@qq.com">2630376648@qq.com</a>
        <a href="https://github.com/" target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
      </div>
    );
  }

  return (
    <div className="window-body trash-body">
      <p>Nothing here. The good ideas were restored.</p>
    </div>
  );
}

export default WindowContent;
