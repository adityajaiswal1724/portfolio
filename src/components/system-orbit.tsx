import { useId } from "react";
import "./system-orbit.css";

const TAU = Math.PI * 2;

/** An orthographic projection keeps the sculpture crisp at every viewport size. */
function project(theta: number, phi: number) {
  const radius = 135 + 48 * Math.cos(phi);
  const x = radius * Math.cos(theta);
  const y = radius * Math.sin(theta);
  const z = 48 * Math.sin(phi);
  const tilt = 0.94;
  const turn = -0.42;
  const tiltedY = y * Math.cos(tilt) - z * Math.sin(tilt);
  const depth = y * Math.sin(tilt) + z * Math.cos(tilt);
  return {
    x: 280 + (x * Math.cos(turn) - tiltedY * Math.sin(turn)) * 1.13,
    y: 252 + (x * Math.sin(turn) + tiltedY * Math.cos(turn)) * 1.13,
    depth,
  };
}

function ringPath(fixed: number, meridian: boolean) {
  return (
    Array.from({ length: 81 }, (_, index) => {
      const angle = (index / 80) * TAU;
      const point = meridian ? project(fixed, angle) : project(angle, fixed);
      return `${index ? "L" : "M"}${point.x.toFixed(2)},${point.y.toFixed(2)}`;
    }).join(" ") + " Z"
  );
}

const meridians = Array.from({ length: 28 }, (_, index) => {
  const theta = (index / 28) * TAU;
  return { path: ringPath(theta, true), front: Math.sin(theta) > 0 };
});

const parallels = Array.from({ length: 12 }, (_, index) =>
  ringPath((index / 12) * TAU, false),
);

export function SystemOrbit() {
  const id = useId().replace(/:/g, "");

  return (
    <div className="system-orbit" aria-hidden="true">
      <svg className="system-orbit__drawing" viewBox="0 0 560 510" fill="none">
        <defs>
          <radialGradient id={`${id}-aura`}>
            <stop stopColor="#ceef79" stopOpacity=".095" />
            <stop offset=".6" stopColor="#ceef79" stopOpacity=".025" />
            <stop offset="1" stopColor="#ceef79" stopOpacity="0" />
          </radialGradient>
          <linearGradient
            id={`${id}-wire`}
            x1="100"
            y1="100"
            x2="430"
            y2="390"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#d6f896" stopOpacity=".8" />
            <stop offset=".48" stopColor="#b7d570" stopOpacity=".5" />
            <stop offset="1" stopColor="#d7fba0" stopOpacity=".16" />
          </linearGradient>
          <linearGradient
            id={`${id}-orbit`}
            x1="50"
            y1="380"
            x2="490"
            y2="130"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#c8ec8e" stopOpacity=".04" />
            <stop offset=".5" stopColor="#c8ec8e" stopOpacity=".46" />
            <stop offset="1" stopColor="#c8ec8e" stopOpacity=".08" />
          </linearGradient>
        </defs>

        <circle cx="280" cy="252" r="248" fill={`url(#${id}-aura)`} />

        <g
          className="system-orbit__guides"
          stroke="currentColor"
          strokeWidth=".7"
        >
          <circle cx="280" cy="252" r="224" strokeDasharray="2 9" />
          <path d="M280 15v24M280 465v24M43 252h24M493 252h24" />
          <path d="M109 80l8 8M443 415l8 8M109 424l8-8M443 89l8-8" />
        </g>

        <g className="system-orbit__far-orbit">
          <ellipse
            cx="280"
            cy="252"
            rx="238"
            ry="100"
            transform="rotate(-38 280 252)"
            stroke={`url(#${id}-orbit)`}
            strokeWidth="1"
          />
          <circle cx="467" cy="104" r="3" fill="#cbea99" />
          <circle
            cx="467"
            cy="104"
            r="8"
            stroke="#cbea99"
            strokeOpacity=".22"
          />
        </g>

        <g
          className="system-orbit__sculpture"
          stroke={`url(#${id}-wire)`}
          strokeWidth=".7"
        >
          {meridians
            .filter((ring) => !ring.front)
            .map((ring, index) => (
              <path key={`back-${index}`} d={ring.path} opacity=".46" />
            ))}
          {parallels.map((path, index) => (
            <path
              key={`parallel-${index}`}
              d={path}
              opacity={index < 6 ? ".67" : ".3"}
            />
          ))}
          {meridians
            .filter((ring) => ring.front)
            .map((ring, index) => (
              <path key={`front-${index}`} d={ring.path} opacity=".9" />
            ))}
        </g>

        <g className="system-orbit__core">
          <circle
            cx="280"
            cy="252"
            r="24"
            stroke="#d1f18a"
            strokeOpacity=".14"
          />
          <circle
            cx="280"
            cy="252"
            r="12"
            fill="#c8ed80"
            fillOpacity=".04"
            stroke="#d1f18a"
            strokeOpacity=".35"
          />
          <path d="M280 244l8 8-8 8-8-8 8-8Z" fill="#d1f18a" />
          <path
            d="M280 229v-8M280 275v8M257 252h-8M303 252h8"
            stroke="#d1f18a"
            strokeOpacity=".4"
          />
        </g>

        <g className="system-orbit__near-orbit">
          <ellipse
            cx="280"
            cy="252"
            rx="244"
            ry="81"
            transform="rotate(29 280 252)"
            stroke="#a6a0c9"
            strokeOpacity=".25"
            strokeWidth=".8"
          />
          <circle cx="91" cy="132" r="4" fill="#b5a3e6" />
          <circle cx="91" cy="132" r="9" stroke="#b5a3e6" strokeOpacity=".2" />
        </g>

        <g className="system-orbit__connectors" strokeWidth=".7">
          <path d="M142 126H91V99" stroke="#c8ec8e" strokeOpacity=".3" />
          <path d="M410 366h40v31" stroke="#c8ec8e" strokeOpacity=".3" />
          <circle cx="142" cy="126" r="2" fill="#c8ec8e" />
          <circle cx="410" cy="366" r="2" fill="#c8ec8e" />
        </g>
      </svg>

      <span className="system-orbit__chip system-orbit__chip--build">
        <svg
          viewBox="0 0 18 18"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.1"
        >
          <path d="m6 5-4 4 4 4m6-8 4 4-4 4M10.5 3 7.5 15" />
        </svg>
        BUILD
      </span>
      <span className="system-orbit__chip system-orbit__chip--automate">
        <svg
          viewBox="0 0 18 18"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.1"
        >
          <rect x="6" y="6" width="6" height="6" rx="1" />
          <path d="M7 2v4m4-4v4m-4 6v4m4-4v4M2 7h4m-4 4h4m6-4h4m-4 4h4" />
        </svg>
        AUTOMATE
      </span>
      <span className="system-orbit__caption">
        HUMAN IDEAS. ENGINEERED SYSTEMS.
      </span>
    </div>
  );
}
