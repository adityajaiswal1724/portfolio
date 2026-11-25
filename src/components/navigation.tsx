"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./navigation.css";

type NavigationProps = {
  name: string;
  initials: string;
  github: string;
  cvUrl?: string;
  email?: string;
};

const sections = [
  { label: "Work", href: "#work" },
  { label: "Expertise", href: "#expertise" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function CommandIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 8V5a3 3 0 1 0-3 3h3Zm0 0h8m0 0V5a3 3 0 1 1 3 3h-3ZM8 8v8m8-8v8M8 16H5a3 3 0 1 0 3 3v-3Zm0 0h8m0 0v3a3 3 0 1 0 3-3h-3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M14 3v6h6M8 13h8M8 17h5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Navigation({
  name,
  initials,
  github,
  cvUrl,
  email,
}: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const focusReturnRef = useRef<HTMLElement | null>(null);

  const commands = useMemo(
    () => [
      ...sections.map((section) => ({
        ...section,
        detail: "Jump to section",
        external: false,
      })),
      ...(github
        ? [
            {
              label: "GitHub",
              href: github,
              detail: "Explore the repositories",
              external: true,
            },
          ]
        : []),
      ...(cvUrl
        ? [
            {
              label: "View CV",
              href: cvUrl,
              detail: "Open curriculum vitae",
              external: true,
            },
          ]
        : []),
      ...(email
        ? [
            {
              label: "Send an email",
              href: `mailto:${email}`,
              detail: email,
              external: false,
            },
          ]
        : []),
    ],
    [github, cvUrl, email],
  );
  const filteredCommands = commands.filter((command) =>
    `${command.label} ${command.detail}`
      .toLowerCase()
      .includes(query.toLowerCase().trim()),
  );
  const selectedIndex = Math.min(
    selected,
    Math.max(0, filteredCommands.length - 1),
  );

  const openPalette = useCallback(() => {
    if (document.querySelector("dialog[open]") && !dialogRef.current?.open)
      return;
    if (dialogRef.current?.open) {
      dialogRef.current.close();
      return;
    }
    focusReturnRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    setMenuOpen(false);
    setQuery("");
    setSelected(0);
    setPaletteOpen(true);
    dialogRef.current?.showModal();
    searchRef.current?.focus();
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        openPalette();
      }
      if (event.key === "Escape" && menuOpen && !dialogRef.current?.open) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [menuOpen, openPalette]);

  useEffect(() => {
    if (paletteOpen)
      document
        .getElementById(`command-option-${selectedIndex}`)
        ?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex, paletteOpen]);

  useEffect(() => {
    if (!paletteOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [paletteOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting)
            setActiveSection(
              entry.target.classList.contains("hero")
                ? ""
                : `#${entry.target.id}`,
            );
        }
      },
      { rootMargin: "-15% 0px -45% 0px", threshold: 0 },
    );
    sections.forEach(({ href }) => {
      const section = document.querySelector(href);
      if (section) observer.observe(section);
    });
    const hero = document.querySelector(".hero");
    if (hero) observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 761px)");
    const closeAtDesktop = () => {
      if (query.matches) setMenuOpen(false);
    };
    query.addEventListener("change", closeAtDesktop);
    return () => query.removeEventListener("change", closeAtDesktop);
  }, []);

  return (
    <>
      <a className="nav-skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-navigation">
        <div className="navigation-inner">
          <a
            className="navigation-brand"
            href="#"
            aria-label={`${name}, home`}
            onClick={closeMenu}
          >
            <span className="navigation-monogram">
              {initials.toLowerCase()}
              <span>.</span>
            </span>
            <span className="navigation-brand-name">{name}</span>
          </a>

          <nav className="navigation-desktop" aria-label="Main navigation">
            {sections.map((section) => (
              <a
                key={section.href}
                href={section.href}
                aria-current={
                  activeSection === section.href ? "location" : undefined
                }
              >
                {section.label}
              </a>
            ))}
          </nav>

          <div className="navigation-actions">
            <button
              className="navigation-command"
              type="button"
              onClick={openPalette}
              aria-label="Open command menu, Command or Control K"
              aria-haspopup="dialog"
            >
              <CommandIcon />
              <span>K</span>
            </button>
            {cvUrl && (
              <a
                className="navigation-cv"
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <DocumentIcon />
                <span>View CV</span>
              </a>
            )}
            <button
              ref={menuButtonRef}
              className={`navigation-menu-toggle ${menuOpen ? "is-open" : ""}`}
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>

        <nav
          id="mobile-navigation"
          className="navigation-mobile"
          aria-label="Mobile navigation"
          hidden={!menuOpen}
        >
          {sections.map((section) => (
            <a
              key={section.href}
              href={section.href}
              onClick={closeMenu}
              aria-current={
                activeSection === section.href ? "location" : undefined
              }
            >
              {section.label}
            </a>
          ))}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
            >
              GitHub
            </a>
          )}
        </nav>
      </header>

      <dialog
        ref={dialogRef}
        className="command-dialog"
        aria-labelledby="command-title"
        onClose={() => {
          setPaletteOpen(false);
          focusReturnRef.current?.focus();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
      >
        <div className="command-panel">
          <h2 id="command-title" className="nav-visually-hidden">
            Go somewhere
          </h2>
          <div className="command-search-row">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="10.5"
                cy="10.5"
                r="6.5"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <path
                d="m16 16 4 4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            <input
              ref={searchRef}
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setSelected(0);
              }}
              placeholder="Where would you like to go?"
              aria-label="Search navigation"
              role="combobox"
              aria-expanded={paletteOpen}
              aria-controls="command-results"
              aria-autocomplete="list"
              aria-activedescendant={
                filteredCommands.length
                  ? `command-option-${selectedIndex}`
                  : undefined
              }
              autoComplete="off"
              onKeyDown={(event) => {
                if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                  event.preventDefault();
                  if (filteredCommands.length)
                    setSelected(
                      (current) =>
                        (current +
                          (event.key === "ArrowDown" ? 1 : -1) +
                          filteredCommands.length) %
                        filteredCommands.length,
                    );
                }
                if (event.key === "Enter" && filteredCommands.length) {
                  event.preventDefault();
                  document
                    .getElementById(`command-option-${selectedIndex}`)
                    ?.click();
                }
              }}
            />
            <button
              className="command-close"
              type="button"
              aria-label="Close command menu"
              onClick={() => dialogRef.current?.close()}
            >
              Esc
            </button>
          </div>
          <p className="command-section-label">QUICK NAVIGATION</p>
          <div
            id="command-results"
            className="command-results"
            role="listbox"
            aria-label="Navigation results"
          >
            {filteredCommands.map((command, index) => (
              <a
                id={`command-option-${index}`}
                key={command.href}
                className="command-result"
                role="option"
                aria-selected={selectedIndex === index}
                href={command.href}
                target={command.external ? "_blank" : undefined}
                rel={command.external ? "noopener noreferrer" : undefined}
                onMouseEnter={() => setSelected(index)}
                onFocus={() => setSelected(index)}
                onClick={() => dialogRef.current?.close()}
              >
                <span className="command-result-symbol" aria-hidden="true">
                  {command.external ? "@" : "#"}
                </span>
                <span>
                  <strong>{command.label}</strong>
                  <small>{command.detail}</small>
                </span>
                <kbd>Enter</kbd>
              </a>
            ))}
          </div>
          {!filteredCommands.length && (
            <p className="command-empty" role="status">
              No matches. Try “work”, “about”, or “contact”.
            </p>
          )}
          <div className="command-footer">
            <span>Use up / down to navigate</span>
            <span>Enter to open</span>
          </div>
        </div>
      </dialog>
    </>
  );
}
