import {
  Atom,
  AudioLines,
  BookOpen,
  BrainCircuit,
  Code2,
  Database,
  Download,
  Flame,
  GraduationCap,
  Mail,
  Workflow,
} from "lucide-react";
import { Github, Linkedin } from "@/components/social-icons";
import { Navigation } from "@/components/navigation";
import { SystemOrbit } from "@/components/system-orbit";
import { Projects } from "@/components/projects";
import { AgentLab } from "@/components/agent-lab";
import {
  CopyEmail,
  MotionToggle,
  RevealEffects,
} from "@/components/site-interactions";
import { experience, profile, skillGroups } from "@/data/portfolio";

const skillIcons = {
  code: Code2,
  brain: BrainCircuit,
  workflow: Workflow,
  database: Database,
};

export default function Home() {
  return (
    <>
      <Navigation
        name={profile.name}
        initials={profile.initials}
        github={profile.github}
        cvUrl={profile.cvUrl}
        email={profile.email}
      />
      <main id="main">
        <section className="hero container" aria-labelledby="hero-heading">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="small-cross" aria-hidden="true">
                ✳
              </span>{" "}
              FULL-STACK DEVELOPER & AI AUTOMATION ENGINEER
            </p>
            <h1 id="hero-heading">
              Thoughtful code.
              <br />
              <span>Intelligent</span>
              <br />
              systems.
            </h1>
            <p className="hero-description">
              I’m <strong>Aditya Jaiswal.</strong> I build full-stack
              experiences and AI-powered workflows that turn complex problems
              into intuitive solutions.
            </p>
            <div className="hero-actions">
              <a href="#work" className="button button-primary">
                Explore my work <LayersIcon />
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-secondary"
              >
                <Github size={16} />
                GitHub
              </a>
            </div>
          </div>
          <div className="hero-art">
            <SystemOrbit />
          </div>
          <div className="hero-bottom">
            <span>
              <span className="role-indicator" /> CURRENTLY AT CRUSTAL ADS
            </span>
            <span>BUILD. CONNECT. AUTOMATE.</span>
            <a href="#work">
              SCROLL TO EXPLORE <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>
        <div
          className="stack-strip container"
          aria-label="Selected technologies"
        >
          <span className="stack-strip-label">
            TOOLS I
            <br />
            BUILD WITH
          </span>
          <span>
            <Atom />
            React
          </span>
          <span>
            <span className="next-symbol">N</span>Next.js
          </span>
          <span>
            <span className="ts-symbol">TS</span>TypeScript
          </span>
          <span>
            <Code2 />
            Python
          </span>
          <span>
            <Workflow />
            n8n
          </span>
          <span>
            <Flame />
            PyTorch
          </span>
        </div>
        <section
          id="work"
          className="container section work-section"
          aria-labelledby="work-heading"
        >
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow">
                <span className="section-dash" />
                SELECTED WORK
              </p>
              <h2 id="work-heading">
                Ideas, engineered<span className="lime">.</span>
              </h2>
            </div>
            <p>
              Real projects. Deliberate decisions.
              <br />A little of what I’ve been building.
            </p>
          </div>
          <Projects />
          <div className="github-note">
            <span>There’s more behind the interface.</span>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              <Github size={16} />
              Explore my GitHub
            </a>
          </div>
        </section>
        <section
          id="ai-systems"
          className="automation-section section"
          aria-labelledby="automation-heading"
        >
          <div className="container">
            <div className="section-heading" data-reveal>
              <div>
                <p className="eyebrow">
                  <span className="section-dash" />
                  BEYOND THE INTERFACE
                </p>
                <h2 id="automation-heading">
                  Less repetition.
                  <br />
                  <span className="lime">More intelligence.</span>
                </h2>
              </div>
              <p>
                I build agents that listen, understand, and act.
                <br />
                Explore the thinking behind three of my
                <br className="desktop-break" /> voice and automation projects.
              </p>
            </div>
            <AgentLab />
            <div className="automation-notes">
              <span>
                <AudioLines size={16} />
                Voice-first experiences
              </span>
              <span>
                <BrainCircuit size={16} />
                LLM-powered conversations
              </span>
              <span>
                <Workflow size={16} />
                Connected workflows
              </span>
            </div>
          </div>
        </section>
        <section
          id="expertise"
          className="container section expertise-section"
          aria-labelledby="expertise-heading"
        >
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow">
                <span className="section-dash" />
                THE TOOLKIT
              </p>
              <h2 id="expertise-heading">
                Different layers.
                <br />
                One connected mindset.
              </h2>
            </div>
            <p>
              From the first pixel to the final API call.
              <br />
              The technologies I use to make it work.
            </p>
          </div>
          <div className="skills-grid">
            {skillGroups.map((group) => {
              const Icon = skillIcons[group.icon as keyof typeof skillIcons];
              return (
                <article key={group.title} className="skill-card" data-reveal>
                  <div className="skill-icon">
                    <Icon size={23} strokeWidth={1.5} />
                  </div>
                  <h3>{group.title}</h3>
                  <p>{group.description}</p>
                  <div className="skill-tags">
                    {group.skills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
        <section
          id="about"
          className="container section about-section"
          aria-labelledby="about-heading"
        >
          <div className="about-introduction" data-reveal>
            <div>
              <p className="eyebrow">
                <span className="section-dash" />
                THE PERSON BEHIND THE CODE
              </p>
              <h2 id="about-heading">
                Curiosity is
                <br />
                the constant.
              </h2>
              <div className="signature">
                Aditya<span className="lime">.</span>
              </div>
            </div>
            <div className="about-copy">
              <p className="about-lead">
                I’m a developer who likes connecting the dots—between a good
                interface, the system behind it, and the people using it.
              </p>
              <p>
                My work spans full-stack web applications, applied machine
                learning, and conversational AI. At Crustal Ads, I build voice
                agents and automation that connect language models with business
                workflows.
              </p>
              <p>
                From researching image captioning to engineering finance
                interfaces, I care about making complex systems understandable,
                useful, and thoughtfully built.
              </p>
              <a
                href={profile.cvUrl}
                download="Aditya-Jaiswal-CV.pdf"
                className="text-link"
              >
                <Download size={16} />
                Download my CV <span className="file-label">PDF</span>
              </a>
            </div>
          </div>
          <div className="experience-heading">
            <h3>Where I’ve been building</h3>
            <span className="eyebrow">EXPERIENCE</span>
          </div>
          <div className="experience-list">
            {experience.map((item) => (
              <article
                className="experience-item"
                key={item.company}
                data-reveal
              >
                <div className="experience-period">
                  <span
                    className={`timeline-point ${item.current ? "is-current" : ""}`}
                  />
                  <span>{item.period}</span>
                  {item.current && (
                    <span className="current-badge">CURRENT</span>
                  )}
                </div>
                <div className="experience-company">
                  <h3>{item.company}</h3>
                  <p>{item.role}</p>
                  <span>{item.specialty}</span>
                </div>
                <div className="experience-description">
                  <p>{item.description}</p>
                  <div className="tags">
                    {item.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="foundation-grid">
            <article className="research-card" data-reveal>
              <div className="foundation-label">
                <BookOpen size={19} />
                <span>RESEARCH / ICICC 2025</span>
              </div>
              <h3>
                Teaching machines to see.
                <br />
                And make sense of it.
              </h3>
              <p>
                Authored and presented{" "}
                <em>
                  Complaint Categorization using Image Captioning and Generative
                  AI
                </em>
                , published in a Springer proceeding.
              </p>
              <div className="tags">
                <span>CNNs</span>
                <span>LSTMs</span>
                <span>Transformers</span>
                <span>Flickr8k / Flickr30k</span>
              </div>
            </article>
            <article className="education-card" data-reveal>
              <div className="foundation-label">
                <GraduationCap size={20} />
                <span>FOUNDATIONS</span>
              </div>
              <h3>
                B.Tech, Computer
                <br />
                Science Engineering
              </h3>
              <p>
                Bennett University
                <br />
                2022 — 2026 · CGPA 7.8
              </p>
              <details>
                <summary>
                  Beyond the classroom <span>+</span>
                </summary>
                <p>
                  Student Ambassador Intern, Admissions Department (Jun–Aug
                  2025). Management & Finance Head, Data Science Society (Jul
                  2023–May 2024).
                </p>
              </details>
            </article>
          </div>
        </section>
        <section
          id="contact"
          className="contact-section"
          aria-labelledby="contact-heading"
        >
          <div className="container contact-inner" data-reveal>
            <p className="eyebrow">
              <span className="section-dash" />
              LET’S CONNECT
            </p>
            <div className="contact-heading-row">
              <h2 id="contact-heading">
                Have a problem
                <br />
                worth <span>solving?</span>
              </h2>
              <div className="contact-asterisk" aria-hidden="true">
                ✳
              </div>
            </div>
            <div className="contact-bottom">
              <div>
                <p>
                  A product to build, a workflow to rethink,
                  <br />
                  or just a good conversation. I’m listening.
                </p>
                <div className="contact-email">
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>
                  <CopyEmail email={profile.email} />
                </div>
              </div>
              <div className="contact-links">
                <a
                  href={`mailto:${profile.email}`}
                  className="button button-primary"
                >
                  <Mail size={17} />
                  Let’s talk
                </a>
                <div className="social-links">
                  {profile.socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {social.icon === "github" ? (
                        <Github size={16} />
                      ) : (
                        <Linkedin size={16} />
                      )}
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="container site-footer">
        <a className="footer-brand" href="#" aria-label="Back to top">
          aj<span>.</span>
        </a>
        <p>© {new Date().getFullYear()} Aditya Jaiswal. Built with intent.</p>
        <div>
          <MotionToggle />
          <a href="#" className="back-to-top">
            Back to top
          </a>
        </div>
      </footer>
      <RevealEffects />
    </>
  );
}
function LayersIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m10 2 8 4.5-8 4.5-8-4.5L10 2Zm-8 9 8 4.5 8-4.5M2 15l8 4 8-4"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  );
}
