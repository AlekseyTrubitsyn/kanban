export const loadFromLS = (key) => {
  let a = localStorage.getItem(key);

  if (a) return JSON.parse(a);

  return false;
}

export const saveToLS = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch(e) {
    return false;
  }
}
