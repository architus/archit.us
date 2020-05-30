import React from "react";
import { FilterRendererProps } from "react-data-grid";
import styled from "@xstyled/emotion";
import deepEqual from "fast-deep-equal";
import { Option, Some, None } from "Utility/option";
import { HelpTooltip } from "Components";

const Styled = {
  HelpTooltip: styled(HelpTooltip)`
    top: 2px;
  `,
};

enum RuleType {
  Number = 1,
  Range = 2,
  GreaterThan = 3,
  LessThan = 4,
}

export type Rule =
  | { type: RuleType.Range; begin: number; end: number }
  | {
      type: RuleType.GreaterThan | RuleType.LessThan | RuleType.Number;
      value: number;
    };

type FilterInner = {
  rules: Rule[];
  rawValue: string;
};
export type NumericFilterValue = Option<FilterInner>;

export function NumericFilter<R, SR>({
  value,
  onChange,
}: FilterRendererProps<R, NumericFilterValue, SR>): React.ReactElement {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const rawValue = event.target.value.replace(/[^><,0-9-]/g, "");
    const filters = getRules(rawValue);
    const newValue =
      filters.length > 0 ? Some({ rules: filters, rawValue }) : None;
    // Bail if not changed to prevent datagrid re-render
    if (!newValue.equals(value, deepEqual)) {
      onChange(newValue);
    }
  }

  const tooltipText =
    "Input Methods: Range (x-y), Greater Than (>x), Less Than (<y)";

  return (
    <div className="rdg-filter-container">
      <input
        value={value.map((f) => f.rawValue).getOrElse("")}
        onChange={handleChange}
        className="rdg-filter"
        placeholder="e.g. 3,10-15,>20"
      />
      <Styled.HelpTooltip
        text={tooltipText}
        id="numeric-filter-help-tooltip"
        marginLeft="femto"
        fontSize="1.4em"
      />
    </div>
  );
}

export function applyNumericFilter(data: number, filter: FilterInner): boolean {
  for (const rule of filter.rules) {
    switch (rule.type) {
      case RuleType.Number:
        if (rule.value !== data) {
          return false;
        }
        break;
      case RuleType.GreaterThan:
        if (rule.value > data) {
          return false;
        }
        break;
      case RuleType.LessThan:
        if (rule.value < data) {
          return false;
        }
        break;
      case RuleType.Range:
        if (rule.begin > data || rule.end < data) {
          return false;
        }
        break;
      default:
        break;
    }
  }

  return true;
}

function getRules(value: string): Rule[] {
  if (value === "") {
    return [];
  }

  // handle each value with comma
  return value.split(",").map(
    (str): Rule => {
      // handle dash
      const dashIdx = str.indexOf("-");
      if (dashIdx > 0) {
        const begin = parseInt(str.slice(0, dashIdx), 10);
        const end = parseInt(str.slice(dashIdx + 1), 10);
        return { type: RuleType.Range, begin, end };
      }

      // handle greater then
      if (str.includes(">")) {
        const begin = parseInt(str.slice(str.indexOf(">") + 1), 10);
        return { type: RuleType.GreaterThan, value: begin };
      }

      // handle less then
      if (str.includes("<")) {
        const end = parseInt(str.slice(str.indexOf("<") + 1), 10);
        return { type: RuleType.LessThan, value: end };
      }

      // handle normal values
      const numericValue = parseInt(str, 10);
      return { type: RuleType.Number, value: numericValue };
    }
  );
}
