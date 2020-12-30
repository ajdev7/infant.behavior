import React, { Component } from "react";
import "./App.css";
import BarChart from "./BarChart";
export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [
        { name: "Food", value: "200", key: "1" },
        { name: "Cloth", value: "300", key: "2" },
        { name: "Supply", value: "100", key: "3" },
        { name: "Water", value: "250", key: "4" },
        { name: "Fuel", value: "150", key: "5" },
      ],
      charts: "bar",
      count: 0,
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
                  <th>Name</th>
                  <th>Value</th>
                  <th style={{ width: 80 }}>Option</th>
                </tr>
                {entry.map((item) => {
                  return (
                    <tr key={item.key}>
                      <td>{item.name}</td>
                      <td>{item.value}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => this.deleteItem(item.key)}
                        >
                          Delete
                        </button>
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
              <BarChart data={this.state.items} id={this.state.count} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
