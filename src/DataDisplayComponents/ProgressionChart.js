import Chart from "react-apexcharts";
import React from "react";

class Charty2 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            barSeries: [{
                name: "Angie",
                data: [60, 70, 72, 68]
            },
            {
                name: 'William',
                data: [90, 88, 83, 91]
            }
        ],
            options: {
                chart: {
                    height: 350,
                    type: 'bar',
                    zoom: {
                        enabled: false
                    }
                },
                dataLabels: {
                    enabled: true
                },
                title: {
                    text: 'Major Tests',
                    align: 'center'
                },
                grid: {
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },
                xaxis: {
                    categories: ['Test 1', 'Benchmark 1', 'Test 2', 'Benchmark 2']
                }
            },
        };
    }

    render() {
        return (
            <div id="chart">
                <Chart options={this.state.options}
                    series={this.state.barSeries} type='line' width='100%'/>
            </div>
        );
    }
}

export default Charty2;