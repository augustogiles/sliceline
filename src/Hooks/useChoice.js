import { useState } from 'react';

export default function useChoice() {
  const [value, setValue] = useState();

  function onChange(e) {
    setValue(e.target.value);
  }

  return { value, onChange };
}
