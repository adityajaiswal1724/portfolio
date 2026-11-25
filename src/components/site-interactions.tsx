"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, Pause, Play } from "lucide-react";

export function RevealEffects() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (
            !media.matches &&
            document.documentElement.dataset.motion !== "paused"
          ) {
            entry.target.animate(
              [
                { opacity: 0.15, transform: "translateY(25px)" },
                { opacity: 1, transform: "translateY(0)" },
              ],
              { duration: 650, easing: "cubic-bezier(.22,1,.36,1)" },
            );
          }
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08 },
    );
    document
      .querySelectorAll("[data-reveal]")
      .forEach((element) => observer.observe(element));
    const hero = document.querySelector<HTMLElement>(".hero-art");
    let visible = true;
    const updateMotion = () => {
      if (hero)
        hero.dataset.motion =
          visible && !document.hidden ? "running" : "paused";
    };
    const heroObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      updateMotion();
    });
    if (hero) heroObserver.observe(hero);
    document.addEventListener("visibilitychange", updateMotion);
    return () => {
      observer.disconnect();
      heroObserver.disconnect();
      document.removeEventListener("visibilitychange", updateMotion);
    };
  }, []);
  return null;
}

export function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timeout.current) clearTimeout(timeout.current);
    },
    [],
  );
  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setStatus("idle"), 3000);
  }
  return (
    <div className="copy-email">
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy email address ${email}`}
      >
        {status === "copied" ? <Check size={17} /> : <Copy size={17} />}
      </button>
      <span role="status">
        {status === "copied"
          ? "Email copied"
          : status === "error"
            ? "Please select and copy the email above."
            : ""}
      </span>
    </div>
  );
}

export function MotionToggle() {
  const [paused, setPaused] = useState(false);
  const [systemReduced, setSystemReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setSystemReduced(media.matches);
    update();
    media.addEventListener("change", update);
    try {
      const saved = localStorage.getItem("portfolio-motion") === "paused";
      setPaused(saved);
      document.documentElement.dataset.motion = saved ? "paused" : "running";
    } catch {
      /* Storage can be disabled in private browsers. */
    }
    return () => media.removeEventListener("change", update);
  }, []);
  function toggle() {
    const next = !paused;
    setPaused(next);
    document.documentElement.dataset.motion = next ? "paused" : "running";
    if (next)
      document.getAnimations().forEach((animation) => {
        if (
          animation instanceof Animation &&
          !(animation instanceof CSSAnimation)
        )
          animation.finish();
      });
    try {
      localStorage.setItem("portfolio-motion", next ? "paused" : "running");
    } catch {
      /* Preference still works for this visit. */
    }
  }
  return (
    <button
      className="motion-toggle"
      type="button"
      onClick={toggle}
      disabled={systemReduced}
      aria-pressed={paused || systemReduced}
    >
      {paused || systemReduced ? <Play size={13} /> : <Pause size={13} />}
      {systemReduced
        ? "Reduced motion"
        : paused
          ? "Motion paused"
          : "Pause motion"}
    </button>
  );
}
