import React from "react";
import { FilterRendererProps } from "react-data-grid";

import { Option, Some } from "@architus/lib/option";

export function StringFilter<R, SR>({
  value,
  onChange,
}: FilterRendererProps<R, Option<string>, SR>): React.ReactElement {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const newValue = Some(event.target.value);
    // Bail if not changed to prevent datagrid re-render
    if (!newValue.equals(value)) {
      onChange(newValue);
    }
  }

  return (
    <div className="rdg-filter-container">
      <input
        className="rdg-filter"
        value={value.getOrElse("")}
        onChange={handleChange}
      />
    </div>
  );
}
