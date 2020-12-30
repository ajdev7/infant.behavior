import React, { Component } from "react";
import "./App.css";
import BarChart from "./BarChart";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [
        {
          key: "1",
          name: "Listening by keeping quiet, responds to pain, and touch.",
          value: "1",
          date: new Date(),
        },
        {
          key: "2",
          name:
            "Communicates, seeks attention by crying or rapidly turning head sideways, and moving arms, legs and body.",
          value: "2",
          date: new Date(),
        },
        {
          key: "3",
          name: "Notices mother’s or caregiver’s presence, or absence.",
          value: "3",
          date: new Date(),
        },
        {
          key: "4",
          name:
            "Begins studying faces, gazing at mother’s or caregiver’s face with interest. Can tell when mother or caregiver is around.",
          value: "4",
          date: new Date(),
        },
        {
          key: "5",
          name: "Smiles to parents or smiles back.",
          value: "5",
          date: new Date(),
        },
        {
          key: "6",
          name:
            "Reaches for familiar people or objects. Waits eagerly to be fed.",
          value: "6",
          date: new Date(),
        },
        {
          key: "7",
          name: "Babbles, laughs, orient to voice, ad enjoy looking.",
          value: "7",
          date: new Date(),
        },
        {
          key: "8",
          name: "Develops a fear of strangers.",
          value: "8",
          date: new Date(),
        },
        {
          key: "9",
          name: "Indicates objects of interest by pointing fingers.",
          value: "9",
          date: new Date(),
        },
        {
          key: "10",
          name: "Waves bye-bye, plays pat-a-cake, peke-a-boo.",
          value: "10",
          date: new Date(),
        },
        {
          key: "11",
          name: "Develops Joint attention, actively explores environment.",
          value: "11",
          date: new Date(),
        },
        {
          key: "12",
          name: "Says Dada, Mama, knows his name, and comes when called.",
          value: "12",
          date: new Date(),
        },
        {
          key: "13",
          name:
            "Checks with caregiver before doing certain activities (Social referencing), learns rules and cooperates with parents.",
          value: "13",
          date: new Date(),
        },
        {
          key: "14",
          name:
            "Points to indicate needs, has a budding vocabulary of at least 3-6 news words other than mama and Dada.",
          value: "14",
          date: new Date(),
        },
      ],
    };
  }

  render() {
    let entry = this.state.items;

    return (
      <div className="main">
        <div className="leftContent">
          {/* Datatable */}
          {/* datatable to show data */}
          <div className="datatable">
            <table className="data-table">
              <tbody>
                <tr>
                  <th>Behaviour</th>
                  <th style={{ width: 30 }}>Date</th>
                </tr>
                {entry.map((item) => {
                  return (
                    <tr key={item.key}>
                      <td>{item.name}</td>
                      <td>
                        <DatePicker
                          selected={item.date}
                          onChange={(date) => {
                            let index = this.state.items.findIndex(
                              (el) => el.key == item.key
                            );
                            item.date = date;

                            let items = this.state.items;
                            items[index] = item;

                            this.setState(items);
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rightContent">
          <div className="chart-container">
            <div className="chart">
              <BarChart data={this.state.items} id={this.state.items.length} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
