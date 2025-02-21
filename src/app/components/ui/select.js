import { useState } from "react";

export function Select({ children, multiple, placeholder, onValueChange, className }) {
  const [selected, setSelected] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    const newSelection = multiple ? [...selected, value] : [value];
    setSelected(newSelection);
    onValueChange(newSelection);
  };

  return (
    <select multiple={multiple} onChange={handleChange} className={`border p-2 rounded ${className}`}>
      <option value="">{placeholder}</option>
      {children}
    </select>
  );
}

export function SelectItem({ value, children }) {
  return <option value={value}>{children}</option>;
}
