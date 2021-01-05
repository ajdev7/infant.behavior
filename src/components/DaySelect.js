import React, { Component } from "react";

// a select with dynamically created options
const options = [
  "Select an Option",
  "First Option",
  "Second Option",
  "Third Option",
];

class DaySelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      month: this.props.month,
      day: this.props.day,
    };

    console.log(this.state);
    this.months = [];
    for (let i = 0; i <= 15; i++) {
      this.months.push(i);
    }

    this.days = [];
    for (let i = 0; i <= 31; i++) {
      this.days.push(i);
    }
  }

  onChangeMonth = (e) => {
    this.setState({
      month: e.target.value,
    });

    this.props.onUpdateDate(this.props.id, e.target.value, this.state.day);
  };

  onChangeDay = (e) => {
    this.setState({
      day: e.target.value,
    });

    this.props.onUpdateDate(this.props.id, this.state.month, e.target.value);
  };

  render() {
    return (
      <div className="form-group">
        {/* Months */}
        <select value={this.state.value} onChange={this.onChangeMonth}>
          {this.months.map((option) => {
            return (
              <option value={option} key={option}>
                {option}
              </option>
            );
          })}
        </select>
        <span>&nbsp;Month&nbsp;&nbsp;</span>

        {/* Days */}
        <select value={this.state.value} onChange={this.onChangeDay}>
          {this.days.map((option) => {
            return (
              <option value={option} key={option}>
                {option}
              </option>
            );
          })}
        </select>
        <span>&nbsp;Day</span>
      </div>
    );
  }
}

export default DaySelect;
