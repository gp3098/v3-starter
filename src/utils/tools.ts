const COLLAPSE_KEY = 'collapse';
export function getLocalItem(key: string) {
  return localStorage.getItem(key);
}

export function setLocalItem(key: string, value: string) {
  return localStorage.setItem(key, value);
}

export function removeLocalItem(key: string) {
  return localStorage.removeItem(key);
}

export function isCollapse() {
  return getLocalItem(COLLAPSE_KEY) === 'true';
}

export function setCollapse(value: string) {
  return setLocalItem(COLLAPSE_KEY, value);
}
