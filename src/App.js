import React, { Component } from "react";
import "./App.css";
import moment from "moment";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import LineChart from "./components/LineChart";
import DaySelect from "./components/DaySelect";

export class App extends Component {
  constructor(props) {
    super(props);

    let startDate = moment();

    this.state = {
      guide: 30,
      month: 1,
      day: 0,
      items: [
        {
          key: "1",
          name: "Listening by keeping quiet, responds to pain, and touch.",
          value: "1",
          date: moment(startDate).toDate(),
          month: 0,
          day: 1,
          totalDays: 1,
        },
        {
          key: "2",
          name:
            "Communicates, seeks attention by crying or rapidly turning head sideways, and moving arms, legs and body.",
          value: "2",
          date: moment(startDate).add(2, "days").toDate(),
          month: 0,
          day: 2,
          totalDays: 2,
        },
        {
          key: "3",
          name: "Notices mother’s or caregiver’s presence, or absence.",
          value: "3",
          date: moment(startDate).add(5, "days").toDate(),
          month: 0,
          day: 5,
          totalDays: 5,
        },
        {
          key: "4",
          name:
            "Begins studying faces, gazing at mother’s or caregiver’s face with interest. Can tell when mother or caregiver is around.",
          value: "4",
          date: moment(startDate).add(21, "days").toDate(),
          month: 0,
          day: 21,
          totalDays: 21,
        },
        {
          key: "5",
          name: "Smiles to parents or smiles back.",
          value: "5",
          date: moment(startDate).add(49, "days").toDate(),
          month: 1,
          day: 21,
          totalDays: 51,
        },
        {
          key: "6",
          name:
            "Reaches for familiar people or objects. Waits eagerly to be fed.",
          value: "6",
          date: moment(startDate).add(3, "months").toDate(),
          month: 2,
          day: 0,
          totalDays: 60,
        },
        {
          key: "7",
          name: "Babbles, laughs, orient to voice, and enjoy looking.",
          value: "7",
          date: moment(startDate).add(4, "months").toDate(),
          month: 4,
          day: 0,
          totalDays: 120,
        },
        {
          key: "8",
          name: "Develops a fear of strangers.",
          value: "8",
          date: moment(startDate).add(6, "months").add(15, "days").toDate(),
          month: 6,
          day: 0,
          totalDays: 180,
        },
        {
          key: "9",
          name: "Indicates objects of interest by pointing fingers.",
          value: "9",
          date: moment(startDate).add(8, "months").toDate(),
          month: 8,
          day: 0,
          totalDays: 240,
        },
        {
          key: "10",
          name: "Waves bye-bye, plays pat-a-cake, peke-a-boo.",
          value: "10",
          date: moment(startDate).add(9, "months").toDate(),
          month: 9,
          day: 0,
          totalDays: 270,
        },
        {
          key: "11",
          name: "Develops Joint attention, actively explores environment.",
          value: "11",
          date: moment(startDate).add(10, "months").toDate(),
          month: 10,
          day: 0,
          totalDays: 300,
        },
        {
          key: "12",
          name: "Says Dada, Mama, knows his name, and comes when called.",
          value: "12",
          date: moment(startDate).add(11, "months").toDate(),
          month: 11,
          day: 0,
          totalDays: 330,
        },
        {
          key: "13",
          name:
            "Checks with caregiver before doing certain activities (Social referencing), learns rules and cooperates with parents.",
          value: "13",
          date: moment(startDate).add(12, "months").toDate(),
          month: 12,
          day: 0,
          totalDays: 360,
        },
        {
          key: "14",
          name:
            "Points to indicate needs, has a budding vocabulary of at least 3-6 news words other than mama and Dada.",
          value: "14",
          date: moment(startDate).add(14, "months").toDate(),
          month: 14,
          day: 0,
          totalDays: 425,
        },
      ],
    };
  }

  onUpdateDate = (month, day) => {
    // let index = this.state.items.findIndex((el) => el.key == key);

    // let items = this.state.items;
    // items[index].month = month;
    // items[index].day = day;

    month = parseInt(month);
    day = parseInt(day);
    let totalDays = 0;
    if (month > 12) {
      totalDays = 365 + (month - 12) * 30 + day;
    } else {
      totalDays = month * 30 + day;
    }

    this.setState({
      month,
      day,
      guide: totalDays,
    });
  };

  onDragDate = (day) => {
    let guide = day;

    day = parseInt(day);
    let month = 0;
    if (day > 365) {
      day -= 365;
      month = 12 + day / 30;
      day %= 30;
    } else {
      month = day / 30;
      day %= 30;
    }

    month = parseInt(month);

    this.setState({
      month,
      day,
      guide,
    });
  };

  render() {
    return (
      <div className="main">
        <div className="leftContent">
          <div className="date-panel">
            <div>
              <h5 style={{ padding: 10 }}>How old is the child?</h5>
            </div>
            <div>
              <DaySelect
                month={this.state.month}
                day={this.state.day}
                onUpdateDate={this.onUpdateDate}
              />
            </div>
          </div>
        </div>

        <div className="rightContent">
          <div className="chart-container">
            <div className="chart">
              <LineChart
                data={this.state.items}
                guide={this.state.guide}
                onDragDate={this.onDragDate}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
