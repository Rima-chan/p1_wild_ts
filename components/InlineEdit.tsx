import React, { useState, FocusEvent, ChangeEvent, KeyboardEvent } from "react";
import styles from "../styles/components/InlineEdit.module.css";

interface InlineEditProps {
  value: string;
  classes: string;
  onCallback: (editingValue: string, id: string | undefined) => void;
  id: string | undefined;
}

export const InlineEdit = ({
  value,
  classes,
  onCallback,
  id,
}: InlineEditProps) => {
  const [editingValue, setEditingValue] = useState(value);
  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEditingValue(e.target.value);
  };
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Escape" || e.key === "Enter") {
      onCallback(editingValue, id);
      const element = e.target as HTMLElement;
      element.blur();
    }
  };
  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.value.trim() === "") {
      setEditingValue(value);
    } else {
      setEditingValue(e.target.value);
      onCallback(editingValue, id);
    }
  };
  return (
    <input
      className={`${styles.editable_input} ${classes}`}
      type="text"
      value={editingValue}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
    />
  );
};
