import Chart from "react-apexcharts";
import React from "react";

class APIChart extends React.Component {
    constructor(props) {
        super(props);

        // t is a dummy variable used to modify arrays without directly
        // modifying state
        this.t = [];

        this.state = {
            completeData: [],
            isLoaded: false,
            grades: [],

            barSeries: [{
                name: "Jevon",
                data: [], // [60, 70, 72, 68]
            }],
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
                    text: 'Jevon - Assignments',
                    align: 'center'
                },
                grid: {
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },
                // xaxis: {
                //     categories: ['Test 1', 'Benchmark 1', 'Test 2', 'Benchmark 2']
                // }
            },
            noData: {
                text: 'Loading...'
            }
        };
    }

    componentDidMount() {
        fetch('/api/v1/courses/368722/students/submissions', {
            // fetch('/api/v1/courses/15042/assignments?include[]=submission', {
            // fetch('/api/v1/courses?enrollment_state=completed', {
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer 2868~FzczCOiV5rcpBZo2YSsLekcx5VEEP9a5WA240AzVWjcAHsrmD9whV5Y6FQRR3F7Y',
                'Content-Type': 'application/json'
            })
        })
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    isLoaded: true,
                });
                return result;
            },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
            .then((result) => {
                this.setState({
                    completeData: result,
                });
                result.forEach((assignment) => {
                    this.t.push(assignment.score);
                });
                this.setState({
                    barSeries: [{
                        name: "Jevon",
                        data: this.t,
                    }]
                });
                this.t = [];
            });
    }

    render() {
        return (
            <div id="chart">
                <Chart options={this.state.options}
                    series={this.state.barSeries} type='line' width='100%' />
            </div>
        );
    }
}

export default APIChart;

// this is for oath when you get to it
        // const queryString = window.location.search;
        // const urlParams = new global.URLSearchParams(queryString);
        // const urlCode = urlParams.get('code');
        // fetch('/login/oauth2/token', {
        //     method: 'post',
        //     body: JSON.stringify({
        //         grant_type: 'authorization_code',
        //         client_id: '10000000000034',
        //         client_secret: '38ZMMgsZV57r7nGnkrHFSAnMpzQUMF4cFlNPGcgZG7FLLg1kZ2mfYokKozjCblc1',
        //         redirect_uri: 'http://localhost:8000/dashboard',
        //         code: urlCode
        //     })
        // })
        //     .then((res) => res.json())
        //     .then((result) => {
        //         this.setState({
        //             isLoaded: true,
        //             token: result
        //         });
        //         return result;
        //     },
        //         (error) => {
        //             this.setState({
        //                 isLoaded: true,
        //                 error
        //             });
        //         }
        //     )
        //     .then(
        //         fetch('/api/v1/courses', {
        //             method: 'get'
        //         })
        //     )// .then((res) => res.json())
        //     .then((result) => {
        //         this.setState({
        //             data: result
        //         });
        //     });