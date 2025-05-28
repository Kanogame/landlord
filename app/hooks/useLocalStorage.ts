import React, { useState, useEffect } from 'react';

export function UseLocalStorage(
  key: string,
  initialValue: string
): [string, (value: string) => void] {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
