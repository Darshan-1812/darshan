/**
 * © 2026 Mohammad Fazil Firojkhan Malek. All rights reserved.
 * Watermark-ID: MF-FIROJKHAN-MALEK-2026
 * This codebase is protected under intellectual property laws.
 * Author: Mohammad Fazil Firojkhan Malek
 */

/* Hand-drawn style tech logos — simplified, sketchy SVG marks
   drawn with rough strokes to match the notebook theme. */

type LogoProps = { className?: string };

export const PythonLogo = ({ className = "" }: LogoProps) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <path d="M24 6c-6 0-9 2-9 6v4h9M15 16h18c3 0 5 2 5 6v6c0 4-2 6-6 6h-4"
      stroke="#3776ab" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M33 42c6 0 9-2 9-6v-4h-9M33 32H15c-3 0-5-2-5-6v-6c0-4 2-6 6-6h4"
      stroke="#ffd43b" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="20" cy="12" r="1.6" fill="#3776ab" />
    <circle cx="28" cy="36" r="1.6" fill="#ffd43b" />
  </svg>
);

export const TSLogo = ({ className = "" }: LogoProps) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <rect x="6" y="6" width="36" height="36" rx="6" stroke="#3178c6" strokeWidth="2.4" />
    <path d="M14 24h10M19 24v12" stroke="#3178c6" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M34 25c-3-2-6-1-6 2 0 3 6 2 6 5 0 3-4 3-6 1" stroke="#3178c6" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ReactLogo = ({ className = "" }: LogoProps) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <circle cx="24" cy="24" r="3" fill="#61dafb" />
    <ellipse cx="24" cy="24" rx="19" ry="8" stroke="#61dafb" strokeWidth="2.2" />
    <ellipse cx="24" cy="24" rx="19" ry="8" stroke="#61dafb" strokeWidth="2.2" transform="rotate(60 24 24)" />
    <ellipse cx="24" cy="24" rx="19" ry="8" stroke="#61dafb" strokeWidth="2.2" transform="rotate(120 24 24)" />
  </svg>
);

export const FlutterLogo = ({ className = "" }: LogoProps) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <path d="M30 6 L14 24 L20 30 L36 12 Z" stroke="#47c5fb" strokeWidth="2.2" strokeLinejoin="round" fill="none" />
    <path d="M30 24 L22 32 L30 40 L38 32 Z" stroke="#0553b1" strokeWidth="2.2" strokeLinejoin="round" fill="none" />
    <path d="M20 30 L26 36" stroke="#47c5fb" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

export const NodeLogo = ({ className = "" }: LogoProps) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <path d="M24 5 L40 14 V33 L24 43 L8 33 V14 Z" stroke="#3c873a" strokeWidth="2.4" strokeLinejoin="round" />
    <path d="M18 30c0 3 2 4 5 4 4 0 5-2 5-4 0-5-9-3-9-8 0-2 2-3 5-3s4 1 4 3"
      stroke="#3c873a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export const PyTorchLogo = ({ className = "" }: LogoProps) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <path d="M24 8 C 14 18, 14 32, 24 38 C 34 32, 34 20, 26 14"
      stroke="#ee4c2c" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <circle cx="29" cy="15" r="2.2" fill="#ee4c2c" />
  </svg>
);

export const DartLogo = ({ className = "" }: LogoProps) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <path d="M12 20 L28 6 L42 20 L28 36 Z" stroke="#00b4ab" strokeWidth="2.2" strokeLinejoin="round" fill="none" />
    <path d="M12 20 L12 36 L28 36" stroke="#00d2b8" strokeWidth="2.2" strokeLinejoin="round" fill="none" />
  </svg>
);

export const FastAPILogo = ({ className = "" }: LogoProps) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <circle cx="24" cy="24" r="18" stroke="#05998b" strokeWidth="2.4" />
    <path d="M26 12 L16 26 H24 L22 36 L32 22 H24 Z" stroke="#05998b" strokeWidth="2" strokeLinejoin="round" fill="none" />
  </svg>
);

export const DockerLogo = ({ className = "" }: LogoProps) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <g stroke="#2496ed" strokeWidth="1.8">
      <rect x="10" y="24" width="6" height="6" rx="1" />
      <rect x="18" y="24" width="6" height="6" rx="1" />
      <rect x="26" y="24" width="6" height="6" rx="1" />
      <rect x="18" y="16" width="6" height="6" rx="1" />
      <rect x="26" y="16" width="6" height="6" rx="1" />
    </g>
    <path d="M8 30 h30 c3 0 5-2 6-5 2 1 4 0 4 0 0 6-4 10-12 10-6 0-24 0-28-5z"
      stroke="#2496ed" strokeWidth="2" strokeLinejoin="round" fill="none" />
  </svg>
);

export const GitLogo = ({ className = "" }: LogoProps) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <path d="M24 6 L42 24 L24 42 L6 24 Z" stroke="#f05133" strokeWidth="2.2" strokeLinejoin="round" />
    <path d="M18 24 h10 M24 20 v12" stroke="#f05133" strokeWidth="2.2" strokeLinecap="round" />
    <circle cx="30" cy="18" r="2.4" stroke="#f05133" strokeWidth="2" />
  </svg>
);

export const OpenCVLogo = ({ className = "" }: LogoProps) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <circle cx="24" cy="12" r="6" stroke="#e63946" strokeWidth="2.4" />
    <circle cx="14" cy="30" r="6" stroke="#2a9d3f" strokeWidth="2.4" />
    <circle cx="34" cy="30" r="6" stroke="#3178c6" strokeWidth="2.4" />
  </svg>
);

export const TailwindLogo = ({ className = "" }: LogoProps) => (
  <svg viewBox="0 0 48 48" className={className} fill="none">
    <path d="M8 26 C 12 16, 18 16, 22 22 C 25 26, 28 26, 32 22 C 28 32, 22 32, 18 26 C 15 22, 12 22, 8 26 Z"
      stroke="#38bdf8" strokeWidth="2.2" strokeLinejoin="round" fill="none" />
    <path d="M20 34 C 24 24, 30 24, 34 30 C 37 34, 40 34, 44 30 C 40 40, 34 40, 30 34 C 27 30, 24 30, 20 34 Z"
      stroke="#38bdf8" strokeWidth="2.2" strokeLinejoin="round" fill="none" />
  </svg>
);

/* the marquee list */
export const techLogos: { name: string; C: (p: LogoProps) => React.ReactElement }[] = [
  { name: "Python", C: PythonLogo },
  { name: "TypeScript", C: TSLogo },
  { name: "React", C: ReactLogo },
  { name: "Flutter", C: FlutterLogo },
  { name: "Dart", C: DartLogo },
  { name: "PyTorch", C: PyTorchLogo },
  { name: "FastAPI", C: FastAPILogo },
  { name: "Node.js", C: NodeLogo },
  { name: "OpenCV", C: OpenCVLogo },
  { name: "Docker", C: DockerLogo },
  { name: "Git", C: GitLogo },
  { name: "Tailwind", C: TailwindLogo },
];
