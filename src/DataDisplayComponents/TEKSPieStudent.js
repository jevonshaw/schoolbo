import Chart from "react-apexcharts";
import React from "react";
import { Typography, Grid } from "@material-ui/core";


class TEKSPieStud extends React.Component {
    constructor(props) {
        super(props);

        // t is a dummy variable used to modify arrays without directly
        // modifying state
        this.t = [];

        this.state = {
            rawData: [],
            dataYouWant: [],
            isLoaded: false,
            assignID: 0,
            scores: [],

            series: [3, 1],
            series2: [2, 3],
            series3: [4, 7],
            options: {
                chart: {
                    height: 150,
                    type: 'pie',
                },
                dataLabels: {
                    enabled: true
                },
                // The headline/title should make a statement, not just tell what
                // the user is looking at
                title: {
                    text: "Surface Area Looks Great!",
                    align: "center",
                    offsetX: -45
                },
                colors: ["#64ed5f", "#d12e2e"],
                labels: ['Mastered', 'Unmastered']
            }
        };
    }

    componentDidMount() {
        // first have to get the assignment id from the quiz data
        fetch('/api/v1/courses/368722/quizzes/' + this.props.quizNumber, {
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer 6936~EOVDV1T6YyPvgEN7hFerliGf28jhJcTRFkg6F5VIyFiEfq6denyaibDd3HxuaXVl',
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
                    rawData: result,
                    assignID: result.assignment_id
                });
            })
            // below we use the assignment id to get the metadata about the assignment
            .then(() => {
                fetch("/api/v1/courses/368722/students/submissions", {
                    method: 'get',
                    headers: new Headers({
                        'Authorization': 'Bearer 6936~EOVDV1T6YyPvgEN7hFerliGf28jhJcTRFkg6F5VIyFiEfq6denyaibDd3HxuaXVl',
                        'Content-Type': 'application/json'
                    })
                })
                    .then((res) => res.json())
                    .then((res) => {
                        this.setState({
                            dataYouWant: Object.values(res)
                        });
                        this.state.dataYouWant.forEach((assignment) => {
                            this.t.push(assignment.score);
                        });
                        this.setState({
                            scores: this.t
                        });
                        this.t = [];
                    });

            });
            fetch("/api/v1/users/self/enrollments", {
                method: 'get',
                headers: new Headers({
                    'Authorization': 'Bearer 6936~EOVDV1T6YyPvgEN7hFerliGf28jhJcTRFkg6F5VIyFiEfq6denyaibDd3HxuaXVl',
                    'Content-Type': 'application/json'
                })
            })
                .then((res) => res.json())
                .then((result) => {
                    console.log(result[0].role);

                });
    }

    render() {
        if (this.state.isLoaded !== false) {
            return (
                <div>
                    <Typography variant="h4">
                        Assignment 3 Breakdown
                    </Typography>
                    <br/>
                    <Grid container spacing={1}
                        direction="row"
                        justifyContent="center"
                        alignItems="center">
                        <Grid item lg={6}>
                            <Chart options={this.state.options} series={this.state.series}
                                type='pie' width='100%' height='350' />
                        </Grid>
                        <Grid item lg={6}>
                            <Chart options={this.state.options} series={this.state.series2}
                                type='pie' width='100%' height='350' />
                        </Grid>
                    </Grid>
                </div>
            )
        } else {
            return (<div>Loading.........</div>)
        }
    }
}

export default TEKSPieStud;