import Chart from "react-apexcharts";
import React from "react";

class Charty extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            barSeries: [{
                name: "Students",
                type: 'scatter',
                data: [60, 20, 30, 30, 50]
            }],
            options: {
                chart: {
                    height: 350,
                    type: 'bar',
                    zoom: {
                        enabled: false
                    }
                },
                plotOptions: {
                    bar: {
                        // horizontal: false,
                        columnWidth: '25%',
                        endingShape: 'rounded'
                    }
                },
                dataLabels: {
                    enabled: false
                },
                title: {
                    text: 'Test 4 Results',
                    align: 'left'
                },
                grid: {
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },
                xaxis: {
                    categories: ['Jill', 'Angie', 'Mark', 'Joe', 'Katherine']
                }
            },
        };
    }

    render() {
        return (
            <div id="chart">
                <Chart options={this.state.options}
                    series={this.state.barSeries} type='scatter' height='350' width='100%' />
            </div>
        );
    }
}

export default Charty;