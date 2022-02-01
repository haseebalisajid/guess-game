import React from "react";
import { Bar } from "react-chartjs-2";

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          labels: this.props.label,
          datasets: [
            {
              label: this.props.tag,
              backgroundColor: "rgba(75,192,192,1)",
              borderColor: "rgba(0,0,0,1)",
              borderWidth: 2,
              data: this.props.value,
            },
          ],
        };
    }
  render() {
    return (
        <Bar
          data={this.state}
          options={{
            title: {
              display: true,
              text: this.props.heading,
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "bottom",
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
  
                },
              ],
              xAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                  // Change here
                  barPercentage: 0.8,
                },
              ],
            },
          }}
        />
    );
  }
}
