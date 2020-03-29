/* eslint-disable class-methods-use-this */
import React from "react";
import PropTypes from "prop-types";

import HelpTooltip from "Components/HelpTooltip";

// Taken from react-data-grid-addons/src/cells/headerCells/filters/NumericFilter.js
// Forked to modify tree shape/style
// Repo licensed under MIT
// https://github.com/adazzle/react-data-grid/blob/master/packages/react-data-grid-addons/src/cells/headerCells/filters/NumericFilter.js

const RuleType = {
  Number: 1,
  Range: 2,
  GreaterThen: 3,
  LessThen: 4
};

class NumericFilter extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.getRules = this.getRules.bind(this);
  }

  filterValues(row, columnFilter, columnKey) {
    if (columnFilter.filterTerm == null) {
      return true;
    }
    let result = false;
    // implement default filter logic
    const value = parseInt(row[columnKey], 10);
    for (const ruleKey in columnFilter.filterTerm) {
      if (!columnFilter.filterTerm.hasOwnProperty(ruleKey)) {
        continue;
      }

      const rule = columnFilter.filterTerm[ruleKey];

      switch (rule.type) {
        case RuleType.Number:
          if (rule.value === value) {
            result = true;
          }
          break;
        case RuleType.GreaterThen:
          if (rule.value <= value) {
            result = true;
          }
          break;
        case RuleType.LessThen:
          if (rule.value >= value) {
            result = true;
          }
          break;
        case RuleType.Range:
          if (rule.begin <= value && rule.end >= value) {
            result = true;
          }
          break;
        default:
          // do nothing
          break;
      }
    }
    return result;
  }

  getRules(value) {
    const rules = [];
    if (value === "") {
      return rules;
    }
    // check comma
    const list = value.split(",");
    if (list.length > 0) {
      // handle each value with comma
      for (const key in list) {
        if (!list.hasOwnProperty(key)) {
          continue;
        }

        const obj = list[key];
        if (obj.indexOf("-") > 0) {
          // handle dash
          const begin = parseInt(obj.split("-")[0], 10);
          const end = parseInt(obj.split("-")[1], 10);
          rules.push({ type: RuleType.Range, begin: begin, end: end });
        } else if (obj.indexOf(">") > -1) {
          // handle greater then
          const begin = parseInt(obj.split(">")[1], 10);
          rules.push({ type: RuleType.GreaterThen, value: begin });
        } else if (obj.indexOf("<") > -1) {
          // handle less then
          const end = parseInt(obj.split("<")[1], 10);
          rules.push({ type: RuleType.LessThen, value: end });
        } else {
          // handle normal values
          const numericValue = parseInt(obj, 10);
          rules.push({ type: RuleType.Number, value: numericValue });
        }
      }
    }
    return rules;
  }

  handleKeyPress(e) {
    // Validate the input
    const regex = ">|<|-|,|([0-9])";
    const result = RegExp(regex).test(e.key);
    if (result === false) {
      e.preventDefault();
    }
  }

  handleChange(e) {
    const value = e.target.value;
    const filters = this.getRules(value);
    this.props.onChange({
      filterTerm: filters.length > 0 ? filters : null,
      column: this.props.column,
      rawValue: value,
      filterValues: this.filterValues
    });
  }

  render() {
    const inputKey = "header-filter-" + this.props.column.key;
    const columnStyle = {
      float: "left",
      maxWidth: "calc(100% - 32px)",
      width: "100%"
    };

    const tooltipText =
      "Input Methods: Range (x-y), Greater Then (>x), Less Then (<y)";

    return (
      <div>
        <div className="form-group" style={columnStyle}>
          <input
            key={inputKey}
            type="text"
            placeholder="e.g. 3,10-15,>20"
            className="form-control input-sm"
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />
        </div>
        <div className="input-sm">
          <HelpTooltip
            content={tooltipText}
            className="mr-2"
            style={{ top: "-5px" }}
          />
        </div>
      </div>
    );
  }
}

export default NumericFilter;

NumericFilter.propTypes = {
  onChange: PropTypes.func.isRequired,
  column: PropTypes.object
};
