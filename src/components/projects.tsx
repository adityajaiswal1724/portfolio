"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Globe, Layers, X } from "lucide-react";
import { Github } from "./social-icons";
import { projects, type Project } from "@/data/portfolio";

const categories = ["All work", "Applications", "Web experiences"] as const;

export function Projects() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All work");
  const [selected, setSelected] = useState<Project | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const visible = projects.filter(
    (project) => filter === "All work" || project.category === filter,
  );

  useEffect(() => {
    if (!selected) return;
    dialog.current?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [selected]);

  function openProject(project: Project) {
    opener.current = document.activeElement as HTMLElement;
    setSelected(project);
  }

  return (
    <>
      <div className="project-toolbar">
        <div
          className="project-filters"
          role="group"
          aria-label="Filter projects"
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={filter === category}
              onClick={() => setFilter(category)}
            >
              {category}
              <span>
                {category === "All work"
                  ? projects.length
                  : projects.filter((p) => p.category === category).length}
              </span>
            </button>
          ))}
        </div>
        <span className="project-count" aria-live="polite">
          {visible.length} projects / built & shipped
        </span>
      </div>
      <div className="project-grid">
        {visible.map((project) => (
          <article
            key={project.id}
            className={`project-card ${project.featured ? "project-featured" : ""} project-${project.color}`}
          >
            <button
              className="project-visual"
              onClick={() => openProject(project)}
              aria-label={`Read about ${project.subtitle}`}
            >
              <div className="project-browser" aria-hidden="true">
                <span />
                <span />
                <span />
                <span className="browser-address">
                  {new URL(project.liveUrl).hostname}
                </span>
              </div>
              <div className="project-image-wrap">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  width={1000}
                  height={project.id === "finance" ? 530 : 625}
                  sizes={
                    project.featured
                      ? "(max-width: 760px) 100vw, 700px"
                      : "(max-width: 760px) 100vw, 600px"
                  }
                  className="project-image"
                />
              </div>
              <span className="project-inspect">
                <Layers size={14} /> Inside the build
              </span>
            </button>
            <div className="project-content">
              <div className="project-meta">
                <span>{project.subtitle}</span>
                {project.featured && (
                  <span className="featured-label">FEATURED</span>
                )}
              </div>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <div className="tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="project-links">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Globe size={15} />
                  Live demo
                </a>
                {project.repository && (
                  <a
                    href={project.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={15} />
                    Source code
                  </a>
                )}
                <button
                  onClick={() => openProject(project)}
                  aria-label={`Details about ${project.subtitle}`}
                >
                  Details <span>+</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="project-dialog"
        aria-labelledby="project-dialog-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
        onClose={() => {
          setSelected(null);
          opener.current?.focus();
        }}
      >
        {selected && (
          <div className="project-dialog-content">
            <div className="project-dialog-top">
              <span className="eyebrow">INSIDE THE BUILD</span>
              <button
                autoFocus
                aria-label="Close project details"
                onClick={() => dialog.current?.close()}
              >
                <X size={22} />
              </button>
            </div>
            <h2 id="project-dialog-title">{selected.subtitle}</h2>
            <p>{selected.overview}</p>
            <Image
              src={selected.image}
              alt={selected.imageAlt}
              width={1000}
              height={selected.id === "finance" ? 530 : 625}
              className="dialog-project-image"
            />
            <div className="tags">
              {selected.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <h3>Engineering notes</h3>
            <ul>
              {selected.engineering.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
            <div className="scope-note">
              <strong>Project scope</strong>
              <p>{selected.scope}</p>
            </div>
            <div className="hero-actions">
              <a
                className="button button-primary"
                href={selected.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe size={16} />
                Open live demo
              </a>
              {selected.repository && (
                <a
                  className="button button-secondary"
                  href={selected.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={16} />
                  View source
                </a>
              )}
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
