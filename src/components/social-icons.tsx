import type { SVGProps } from "react";
type IconProps = SVGProps<SVGSVGElement> & { size?: number };
export function Github({ size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M9 19c-4.3 1.3-4.3-2.2-6-2.7M15 22v-3.8c0-1 .1-1.5-.5-2 3.3-.4 6.7-1.6 6.7-7.2a5.6 5.6 0 0 0-1.5-3.9 5.1 5.1 0 0 0-.1-3.8S18.3.9 15.5 2.8a13.3 13.3 0 0 0-7 0C5.7.9 4.4 1.3 4.4 1.3a5.1 5.1 0 0 0-.1 3.8A5.6 5.6 0 0 0 2.8 9c0 5.6 3.4 6.8 6.7 7.2-.6.5-.6 1.2-.5 2V22" />
    </svg>
  );
}
export function Linkedin({ size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M7.5 10v7M11.5 17v-7m0 3c0-4 5-4 5 0v4" />
      <circle cx="7.5" cy="7" r=".75" fill="currentColor" stroke="none" />
    </svg>
  );
}
