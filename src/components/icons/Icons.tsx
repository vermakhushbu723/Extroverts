import type { SVGProps } from "react";

/**
 * Hand-authored icon set (no icon-library import) so the wizard reads as a
 * bespoke product rather than a generic AI-scaffolded UI.
 */
type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (props: IconProps, size = 22) => ({
  width: props.size ?? size,
  height: props.size ?? size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...props,
});

export function SparkIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3c1 4.5 3 6.5 7 7.5-4 1-6 3-7 7.5-1-4.5-3-6.5-7-7.5 4-1 6-3 7-7.5Z" />
    </svg>
  );
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M19 12H5" />
      <path d="m11 18-6-6 6-6" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6.5 3h3l1.5 4.5-2.3 1.6a11.5 11.5 0 0 0 5.7 5.7l1.6-2.3L20.5 14v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3Z" />
    </svg>
  );
}

export function LockIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="4.5" y="10.5" width="15" height="9.5" rx="2.5" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

export function CheckCircleIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12.5 2.5 2.5L16 9.5" />
    </svg>
  );
}

export function AlertIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3.5 21.5 20h-19L12 3.5Z" />
      <path d="M12 10v4" />
      <path d="M12 17.2v.1" />
    </svg>
  );
}

export function EditIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 20h4L18.5 9.5a2.4 2.4 0 0 0-4-4L4 16v4Z" />
      <path d="m13.5 6.5 4 4" />
    </svg>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M4.8 20a7.2 7.2 0 0 1 14.4 0" />
    </svg>
  );
}

export function CakeIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 21v-6.5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2V21" />
      <path d="M4 21h16" />
      <path d="M4 17.5h16" />
      <path d="M9 12.5V9M12 12.5V9M15 12.5V9" />
      <path d="M12 3c-1.2 1-1.2 2 0 3s1.2 2 0 3" />
    </svg>
  );
}

export function PronounsIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 4.5 19.5 12 12 19.5 4.5 12 12 4.5Z" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m6 6 12 12" />
      <path d="m18 6-12 12" />
    </svg>
  );
}

export function EyeIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.6" />
    </svg>
  );
}

export function EyeOffIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3.5 3.5l17 17" />
      <path d="M10.6 5.7A10.8 10.8 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a15 15 0 0 1-3.2 3.9M6.6 6.9C4 8.7 2.5 12 2.5 12S6 18.5 12 18.5a9.8 9.8 0 0 0 3.6-.7" />
      <path d="M9.9 10.1a2.6 2.6 0 0 0 3.6 3.7" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3.5 19 6v6c0 5-3 7.8-7 8.5-4-.7-7-3.5-7-8.5V6l7-2.5Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function AppleMark(props: IconProps) {
  return (
    <svg {...base(props, 18)}>
      <path d="M16.4 12.9c0-2.1 1.7-3.1 1.8-3.2-1-1.4-2.5-1.6-3-1.6-1.3-.1-2.5.8-3.2.8-.6 0-1.7-.7-2.8-.7-1.4 0-2.8.8-3.5 2.1-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.6 2.2 2.7 2.1 1.1 0 1.5-.7 2.8-.7s1.7.7 2.8.7c1.2 0 1.9-1 2.6-2 .8-1.2 1.2-2.3 1.2-2.4 0 0-2.5-1-2.5-3.7Z" fill="currentColor" stroke="none" />
      <path d="M14.1 6.2c.6-.7 1-1.6.9-2.6-.9 0-2 .6-2.6 1.4-.5.6-1 1.6-.9 2.5 1 .1 2-.5 2.6-1.3Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function PlayMark(props: IconProps) {
  return (
    <svg {...base(props, 18)}>
      <path d="M5 3.6c-.3.3-.5.7-.5 1.2v14.4c0 .5.2.9.5 1.2l8.3-8.4L5 3.6Z" fill="currentColor" stroke="none" />
      <path d="m14.1 11.2 2.8-1.6c.8-.5.8-1.7 0-2.2l-2.9-1.6-2.6 2.7 2.7 2.7Z" fill="currentColor" stroke="none" />
      <path d="m14.1 12.8-2.7 2.7 2.7 2.7 2.9-1.6c.8-.5.8-1.7 0-2.2l-2.9-1.6Z" fill="currentColor" stroke="none" />
    </svg>
  );
}
