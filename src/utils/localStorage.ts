export function checkLocalStorage(name) {
  return localStorage.getItem(name);
}

export function setLocalStorage(name, value): void {
  return localStorage.setItem(name, value);
}

export function colorThemeInitCheck() {
  const check = checkLocalStorage("colorTheme");
  if (check === null) {
    return "poop";
  } else {
    return check;
  }
}

export function handleLocalStorageThemeChange(newThemeName): void {
  setLocalStorage("colorTheme", newThemeName);
}
