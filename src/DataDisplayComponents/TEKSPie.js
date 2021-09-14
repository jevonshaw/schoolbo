import Chart from "react-apexcharts";
import React from "react";
import { Grid, Typography } from "@material-ui/core";

class TEKSPie extends React.Component {
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
            mastered: 0,
            unmastered: 0,
            uncategorized: 0,

            series: [],
            options: {
                chart: {
                    height: 150,
                    type: 'pie',
                },
                dataLabels: {
                    enabled: true
                },
                title: {
                    text: "TEKS Breakdown",
                    align: 'center'
                },
                labels: ['Mastered', 'Unmastered']
            }
        };
    }

    componentDidMount() {
        // first have to get the assignment id from the quiz data
        fetch('/api/v1/courses/368722/quizzes/' + this.props.quizNumber, {
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer 6936~pi2S8AWfRd0NRyB4Raj3NnYIPULzKrdrbj9VpWlm4bT6ZTTVg6D1PwkZT6ivoN3G',
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
                fetch('/api/v1/courses/368722/assignments/'
                    + this.state.assignID + '/submissions?include[]=submission_history', {
                    method: 'get',
                    headers: new Headers({
                        'Authorization': 'Bearer 6936~pi2S8AWfRd0NRyB4Raj3NnYIPULzKrdrbj9VpWlm4bT6ZTTVg6D1PwkZT6ivoN3G',
                        'Content-Type': 'application/json'
                    })
                })
                    .then((res) => res.json())
                    .then((res) => {
                        this.setState({
                            dataYouWant: Object.values(res)
                        });
                        // below we will get the number of students who 
                        // got each question correct
                        this.state.dataYouWant.forEach((student) => {
                            if (student.submission_history[0].attempt !== null) {
                                student.submission_history[0].submission_data
                                    .forEach((question) => {
                                        if (question.correct === true) {
                                            this.setState({
                                                mastered: this.state.mastered + 1
                                            });
                                            // youll need to fix this so that 
                                            // a student who hasnt submitted the 
                                            // assignment is excluded from the 
                                            // mastery data
                                        } else if (question.correct === false) {
                                            this.setState({
                                                unmastered: this.state.unmastered + 1
                                            });
                                        }
                                    });
                            } else {
                                this.setState({
                                    uncategorized: this.state.uncategorized + 1
                                });
                            }
                        });
                        this.setState({
                            series: [this.state.mastered, this.state.unmastered],
                        });
                    });
            });
    }

    render() {
        if (this.state.mastered !== 0) {
            return (
                <div>
                    <Chart options={this.state.options} series={this.state.series}
                        type='pie' width='100%' height='350' />
                    <Grid
                        container
                        spacing={2}
                        direction="column"
                        align="center"
                        justifyContent="center"
                    >
                        <Grid item >
                            <p>{this.state.uncategorized} student(s) were indeterminable</p>
                        </Grid>
                    </Grid>
                </div>
            )
        } else {
            return (<div>Loading.........</div>)
        }
    }
}

export default TEKSPie;