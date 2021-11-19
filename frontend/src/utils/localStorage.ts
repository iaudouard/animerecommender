export function checkLocalStorage(name) {
  return localStorage.getItem(name);
}

export function setLocalStorage(name, value) {
  localStorage.setItem(name, value);
}

export function colorThemeInitCheck() {
  const check = checkLocalStorage("colorTheme");
  if (check === null) {
    return "poop";
  } else {
    return check;
  }
}

export function handleLocalStorageColorThemeChange(newThemeName) {
  setLocalStorage("colorTheme", newThemeName);
}
