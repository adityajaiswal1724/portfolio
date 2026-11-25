"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AudioLines,
  Bot,
  Check,
  CheckCheck,
  GitBranch,
  MessageSquare,
  Mic,
  PhoneCall,
  Play,
  RotateCcw,
  Sheet,
  Sparkles,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import "./agent-lab.css";

type FlowNode = {
  label: string;
  title: string;
  detail: string;
  icon: LucideIcon;
};
type System = {
  id: string;
  tab: string;
  name: string;
  description: string;
  stack: string[];
  nodes: FlowNode[];
  prompt: string;
  response: string;
  result: string;
};

const systems: System[] = [
  {
    id: "dental",
    tab: "Dental",
    name: "A conversation becomes an appointment.",
    description:
      "A voice agent for booking, rescheduling, and cancelling dental appointments, with appointment details synchronized to Google Sheets.",
    stack: ["Vapi", "n8n", "Google Sheets"],
    nodes: [
      {
        label: "INPUT",
        title: "Patient call",
        detail: "A spoken request",
        icon: PhoneCall,
      },
      {
        label: "AI AGENT",
        title: "Vapi",
        detail: "Understand the intent",
        icon: AudioLines,
      },
      {
        label: "WORKFLOW",
        title: "n8n",
        detail: "Appointment logic",
        icon: Workflow,
      },
      {
        label: "OUTCOME",
        title: "Google Sheets",
        detail: "Synchronized details",
        icon: Sheet,
      },
    ],
    prompt: "I'd like to book a dental appointment.",
    response:
      "Let's find a suitable time. I can also help you reschedule or cancel an existing appointment.",
    result:
      "Example flow: appointment details pass through n8n and sync with Google Sheets.",
  },
  {
    id: "real-estate",
    tab: "Real estate",
    name: "A first conversation. A useful next step.",
    description:
      "An outbound voice agent built with Dograh and n8n for Hinglish lead engagement and follow-up in real estate.",
    stack: ["Dograh", "n8n", "Hinglish"],
    nodes: [
      {
        label: "INPUT",
        title: "Outbound call",
        detail: "Start a conversation",
        icon: PhoneCall,
      },
      {
        label: "AI AGENT",
        title: "Dograh",
        detail: "Hinglish engagement",
        icon: Bot,
      },
      {
        label: "WORKFLOW",
        title: "n8n",
        detail: "Connect the next step",
        icon: Workflow,
      },
      {
        label: "OUTCOME",
        title: "Follow-up",
        detail: "Continue engagement",
        icon: MessageSquare,
      },
    ],
    prompt: "Mujhe 2 BHK ke options dekhne hain.",
    response:
      "Bilkul. Aapki preferred location kya hai? Main follow-up arrange kar sakta hoon.",
    result:
      "Example flow: the conversation establishes interest and leads into a follow-up workflow.",
  },
  {
    id: "conversational",
    tab: "Conversational",
    name: "Speak a question. Hear an answer.",
    description:
      "A voice-enabled conversational bot that connects browser speech capabilities with a Python and Flask application and Mistral AI.",
    stack: ["Flask", "Python", "JavaScript", "Mistral AI", "Web Speech API"],
    nodes: [
      {
        label: "INPUT",
        title: "Web Speech API",
        detail: "Capture the question",
        icon: Mic,
      },
      {
        label: "WORKFLOW",
        title: "Flask + Python",
        detail: "Route the conversation",
        icon: GitBranch,
      },
      {
        label: "AI AGENT",
        title: "Mistral AI",
        detail: "Generate a response",
        icon: Sparkles,
      },
      {
        label: "OUTCOME",
        title: "Voice response",
        detail: "Read the answer aloud",
        icon: AudioLines,
      },
    ],
    prompt: "Explain an API in one sentence.",
    response:
      "An API lets one piece of software request data or actions from another.",
    result:
      "Example flow: a spoken question becomes a model response, then a spoken answer in the browser.",
  },
];

export function AgentLab() {
  const [selectedSystem, setSelectedSystem] = useState(0);
  const [step, setStep] = useState(-1);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const system = systems[selectedSystem];
  const complete = step === 4;
  const running = step >= 0 && !complete;

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  function reset() {
    clearTimers();
    setStep(-1);
  }

  function selectSystem(index: number) {
    if (index === selectedSystem) return;
    reset();
    setSelectedSystem(index);
  }

  function runSimulation() {
    clearTimers();
    if (
      document.documentElement.dataset.motion === "paused" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setStep(4);
      return;
    }
    setStep(0);
    for (let nextStep = 1; nextStep <= 4; nextStep++) {
      timers.current.push(setTimeout(() => setStep(nextStep), nextStep * 650));
    }
  }

  useEffect(() => clearTimers, [clearTimers]);

  useEffect(() => {
    if (!running) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finishWithoutMotion = () => {
      if (
        document.documentElement.dataset.motion === "paused" ||
        reducedMotion.matches
      ) {
        clearTimers();
        setStep(4);
      }
    };
    const observer = new MutationObserver(finishWithoutMotion);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-motion"],
    });
    reducedMotion.addEventListener("change", finishWithoutMotion);
    // Also cover a motion preference changed between the click and this effect.
    finishWithoutMotion();

    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", finishWithoutMotion);
      clearTimers();
    };
  }, [running, clearTimers]);

  return (
    <div className="agent-lab">
      <div className="agent-lab-toolbar">
        <div
          className="agent-lab-tabs"
          role="tablist"
          aria-label="Explore agent systems"
        >
          {systems.map((item, index) => (
            <button
              key={item.id}
              ref={(element) => {
                tabs.current[index] = element;
              }}
              type="button"
              role="tab"
              id={`agent-tab-${item.id}`}
              aria-controls="agent-system-panel"
              aria-selected={selectedSystem === index}
              tabIndex={selectedSystem === index ? 0 : -1}
              onClick={() => selectSystem(index)}
              onKeyDown={(event) => {
                let nextIndex: number;
                if (event.key === "ArrowRight")
                  nextIndex = (index + 1) % systems.length;
                else if (event.key === "ArrowLeft")
                  nextIndex = (index - 1 + systems.length) % systems.length;
                else if (event.key === "Home") nextIndex = 0;
                else if (event.key === "End") nextIndex = systems.length - 1;
                else return;
                event.preventDefault();
                selectSystem(nextIndex);
                tabs.current[nextIndex]?.focus();
              }}
            >
              {item.tab}
            </button>
          ))}
        </div>
        <span className="agent-lab-caption">
          <GitBranch size={14} aria-hidden="true" />
          SYSTEM EXPLORER
        </span>
      </div>

      <div
        id="agent-system-panel"
        role="tabpanel"
        aria-labelledby={`agent-tab-${system.id}`}
        tabIndex={0}
        className="agent-lab-panel"
      >
        <div
          className="agent-flow"
          aria-label={`${system.tab} system architecture`}
          aria-busy={running}
        >
          {system.nodes.map((node, index) => {
            const Icon = node.icon;
            const passed = step > index;
            const active = step === index;
            return (
              <div
                className={`agent-flow-item${active ? " is-active" : ""}${passed ? " is-complete" : ""}`}
                key={`${system.id}-${node.title}`}
              >
                <div className="agent-flow-node">
                  <span className="agent-flow-label">{node.label}</span>
                  <span className="agent-flow-icon">
                    <Icon size={24} strokeWidth={1.4} aria-hidden="true" />
                  </span>
                  <strong>{node.title}</strong>
                  <span className="agent-flow-detail">{node.detail}</span>
                  <span className="agent-flow-state" aria-hidden="true">
                    {passed ? <Check size={12} strokeWidth={2} /> : <span />}
                  </span>
                </div>
                {index < system.nodes.length - 1 && (
                  <span className="agent-flow-connector" aria-hidden="true">
                    <span />
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="agent-lab-bottom">
          <div className="agent-lab-story">
            <span className="agent-lab-small-label">FROM INTENT TO ACTION</span>
            <h3>{system.name}</h3>
            <p>{system.description}</p>
            <div
              className="agent-lab-stack"
              aria-label="Technologies and capabilities"
            >
              {system.stack.map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>
            <div className="agent-lab-controls">
              <button
                type="button"
                className="agent-run-button"
                onClick={runSimulation}
                disabled={running}
              >
                {complete ? (
                  <RotateCcw size={15} aria-hidden="true" />
                ) : (
                  <Play size={15} aria-hidden="true" />
                )}
                {running
                  ? "Tracing the flow…"
                  : complete
                    ? "Replay simulation"
                    : "Run simulation"}
              </button>
              <button
                type="button"
                className="agent-reset-button"
                onClick={reset}
                disabled={step === -1}
                aria-label="Reset simulation"
              >
                <RotateCcw size={17} aria-hidden="true" />
              </button>
            </div>
            <p className="agent-lab-disclaimer">
              Interactive illustration. No live calls or AI requests.
            </p>
          </div>

          <div className={`agent-transcript${complete ? " is-complete" : ""}`}>
            <div className="agent-transcript-heading">
              <span>ILLUSTRATIVE TRANSCRIPT</span>
              <MessageSquare size={15} aria-hidden="true" />
            </div>
            <div className="agent-transcript-message">
              <span className="agent-transcript-speaker">
                {system.id === "conversational" ? "USER" : "CALLER"}
              </span>
              <p>“{system.prompt}”</p>
            </div>
            {complete ? (
              <>
                <div className="agent-transcript-message agent-transcript-response">
                  <span className="agent-transcript-speaker">AGENT</span>
                  <p>{system.response}</p>
                </div>
                <p className="agent-transcript-result">
                  <CheckCheck size={16} aria-hidden="true" />
                  <span>{system.result}</span>
                </p>
              </>
            ) : (
              <div className="agent-transcript-waiting">
                <div
                  className={`agent-waveform${running ? " is-running" : ""}`}
                  aria-hidden="true"
                >
                  {Array.from({ length: 25 }, (_, index) => (
                    <span
                      key={index}
                      style={{
                        height: `${[8, 13, 21, 12, 27, 17, 34, 23, 15, 29, 19, 37, 24, 16, 31, 19, 26, 13, 33, 18, 24, 11, 20, 14, 8][index]}px`,
                        animationDelay: `${index * 45}ms`,
                      }}
                    />
                  ))}
                </div>
                <p>
                  {running
                    ? "Following the request through the system…"
                    : "Run the simulation to follow this request through the system."}
                </p>
              </div>
            )}
            <span className="agent-transcript-note">
              Fictional example · demonstrates the workflow
            </span>
          </div>
        </div>
      </div>
      <span
        className="agent-lab-announcement"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {complete
          ? `${system.tab} simulation complete. An illustrative transcript is now available.`
          : ""}
      </span>
    </div>
  );
}
