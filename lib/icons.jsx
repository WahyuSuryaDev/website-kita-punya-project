// Pustaka ikon stroke 24px — dipakai situs & panel admin
const PATHS = {
  check: <path d="M20 6 9 17l-5-5" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  x: <path d="M18 6 6 18M6 6l12 12" />,
  spark: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.9 2.9M15.5 15.5l2.9 2.9M18.4 5.6l-2.9 2.9M8.5 15.5l-2.9 2.9" />,
  layers: (<><path d="M12 2.5 21 7l-9 4.5L3 7l9-4.5z" /><path d="m3 12 9 4.5 9-4.5" /><path d="m3 17 9 4.5 9-4.5" /></>),
  bulb: (<><path d="M12 3a6 6 0 0 1 6 6c0 2.5-1.5 4-2.5 5.5-.6.9-.9 1.6-1 2.5h-5c-.1-.9-.4-1.6-1-2.5C7.5 13 6 11.5 6 9a6 6 0 0 1 6-6z" /><path d="M9.5 20.5h5M10.5 23h3" /></>),
  calendar: (<><rect x="3" y="4.5" width="18" height="17" rx="2.5" /><path d="M8 2.5v4M16 2.5v4M3 10h18M8 14.5h3M8 18h6" /></>),
  flag: (<><path d="M4 21V5a1 1 0 0 1 1-1h9l-1.5 3.5L14 11H5" /><path d="M4 21h4" /></>),
  wand: (<><path d="M12 21c-1-2.5-3-4-5.5-4.5C9 15 10.5 13 11 10c.5 3 2 5 4.5 6.5C13 17.5 12.5 19 12 21z" /><path d="M18 3l.9 2.1L21 6l-2.1.9L18 9l-.9-2.1L15 6l2.1-.9L18 3z" /><path d="M5 4l.6 1.4L7 6l-1.4.6L5 8l-.6-1.4L3 6l1.4-.6L5 4z" /></>),
  megaphone: (<><path d="m3 11 18-5v12L3 14v-3z" /><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" /></>),
  users: (<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>),
  chart: (<><path d="M3 3v17a1 1 0 0 0 1 1h17" /><path d="M8 17v-5M13 17V8M18 17v-7" /></>),
  scale: (<><path d="M12 3v18M7 21h10" /><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" /><path d="m5 7 3 7c-.9.7-1.9 1-3 1s-2.1-.3-3-1l3-7z" /><path d="m19 7 3 7c-.9.7-1.9 1-3 1s-2.1-.3-3-1l3-7z" /></>),
  route: (<><circle cx="6" cy="19" r="3" /><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" /><circle cx="18" cy="5" r="3" /></>),
  gem: (<><path d="M6 3h12l4 6-10 13L2 9l4-6z" /><path d="M11 3 8 9l4 13 4-13-3-6" /><path d="M2 9h20" /></>),
  grid: (<><rect x="3" y="3" width="7.5" height="7.5" rx="1.5" /><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" /><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" /><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" /></>),
  shield: (<><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></>),
  target: (<><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="1" /></>),
  mail: (<><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></>),
  chat: <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22l5.9-2z" />,
  instagram: (<><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37a4 4 0 1 1-7.75 1.26A4 4 0 0 1 16 11.37z" /><path d="M17.5 6.5h.01" /></>),
  pin: (<><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></>),
  info: (<><circle cx="12" cy="12" r="9.5" /><path d="M12 8h.01M12 11v5" /></>),
  home: (<><path d="m3 10 9-7 9 7v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9z" /><path d="M9 21v-8h6v8" /></>),
  file: (<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" /><path d="M14 2v6h6M8 13h8M8 17h5" /></>),
  briefcase: (<><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M2 13h20" /></>),
  folder: (<><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.7-.9L9.2 3.9A2 2 0 0 0 7.5 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z" /></>),
  phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />,
  image: (<><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" /></>),
  download: (<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m7 10 5 5 5-5M12 15V3" /></>),
  upload: (<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m17 8-5-5-5 5M12 3v12" /></>),
  eye: (<><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></>),
  refresh: (<><path d="M3 12a9 9 0 0 1 15.5-6.2L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-15.5 6.2L3 16" /><path d="M3 21v-5h5" /></>),
  trash: (<><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M10 11v6M14 11v6" /></>),
  settings: (<><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.01a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.01a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.01a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></>),
};

// Pilihan ikon untuk item layanan/keunggulan di panel admin
export const ICON_CHOICES = [
  ['bulb', 'Lampu (ide)'], ['calendar', 'Kalender'], ['flag', 'Bendera'], ['wand', 'Kilau'],
  ['megaphone', 'Megafon'], ['users', 'Orang'], ['chart', 'Grafik'], ['scale', 'Timbangan'],
  ['route', 'Rute'], ['gem', 'Permata'], ['grid', 'Kotak-kotak'], ['shield', 'Perisai'],
  ['target', 'Target'], ['spark', 'Percikan'], ['layers', 'Lapisan'], ['briefcase', 'Koper'],
];

export default function Icon({ name, size, stroke = 1.8, className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      {PATHS[name] || PATHS.spark}
    </svg>
  );
}
