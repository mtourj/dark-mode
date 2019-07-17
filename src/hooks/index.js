import {  useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  })

  const setValue = value => {
    localStorage.setItem(key, JSON.stringify(value));
    setStoredValue(value);
  }

  return [storedValue, setValue];
}

export const useDarkMode = () => {
  const [darkMode, setDarkMode] = useLocalStorage('dark-mode', false);

  useEffect(() => {
    const bodyClassList = document.querySelector('body').classList;

    if(darkMode) {
      // Add class dark-mode to body element
      !bodyClassList.contains('dark-mode') && bodyClassList.add('dark-mode');
    } else {
      // Remove class dark-mode from body element
      bodyClassList.contains('dark-mode') && bodyClassList.remove('dark-mode');
    }
  }, [darkMode])

  return [darkMode, setDarkMode];
}