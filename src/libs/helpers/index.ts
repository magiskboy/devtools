export function isDarkMode(): boolean {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function isTyping(): boolean {
  const activedEl = document.activeElement;

  if (!activedEl) {
    return false;
  }

  if (['INPUT', 'TEXTAREA'].includes(activedEl.tagName)) {
    return true;
  }

  const role = activedEl.getAttribute('role');              // for CodeMirror editor
  if (role && ['textbox'].includes(role)) {
    return true;
  }

  return false;
}

export async function getMyIP(): Promise<string> {
  const response = await fetch('https://api.ipify.org/?format=json');
  const data = await response.json();
  return data.ip;
}

