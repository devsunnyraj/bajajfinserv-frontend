"use client";

import { useState } from "react";

export function Checkbox({ checked, onCheckedChange }) {
  const [isChecked, setIsChecked] = useState(checked || false);

  const toggleCheck = () => {
    setIsChecked(!isChecked);
    onCheckedChange(!isChecked);
  };

  return (
    <input
      type="checkbox"
      checked={isChecked}
      onChange={toggleCheck}
      className="w-5 h-5 accent-blue-500"
    />
  );
}
