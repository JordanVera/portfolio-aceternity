export const THEMES = ['dark', 'light', 'lsu'] as const;

export type Theme = (typeof THEMES)[number];

export const THEME_STORAGE_KEY = 'theme';
export const DEFAULT_THEME: Theme = 'lsu';

export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t!=='light'&&t!=='lsu'&&t!=='dark')t='${DEFAULT_THEME}';var d=document.documentElement;d.setAttribute('data-theme',t);d.classList.remove('dark','light','lsu');d.classList.add(t);if(t!=='light')d.classList.add('dark');}catch(e){}})();`;

export function isTheme(value: unknown): value is Theme {
  return THEMES.includes(value as Theme);
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.setAttribute('data-theme', theme);
  root.classList.remove('dark', 'light', 'lsu');
  root.classList.add(theme);
  if (theme !== 'light') {
    root.classList.add('dark');
  }
}
