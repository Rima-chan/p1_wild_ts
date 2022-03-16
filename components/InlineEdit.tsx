import React, { useState } from "react";

export const InlineEdit = ({ value, classes, onCallback, id }) => {
  const [editingValue, setEditingValue] = useState(value);
  const onChange = (e) => {
    setEditingValue(e.target.value);
  };
  const onKeyDown = (e) => {
    if (e.key === "Escape" || e.key === "Enter") {
      e.target.blur();
      onCallback(editingValue, id);
    }
  };
  const onBlur = (e) => {
    if (e.target.value.trim() === "") {
      setEditingValue(value);
    } else {
      setEditingValue(e.target.value);
    }
  };
  return (
    <input
      className={`editable_input ${classes}`}
      type="text"
      value={editingValue}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
    />
  );
};
