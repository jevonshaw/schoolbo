import Charty from '../DataDisplayComponents/ColumnChart';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { URLSearchParams } from 'url';
import Charty2 from '../DataDisplayComponents/ProgressionChart';
import {
    Grid, Paper, Button, FormControl,
    InputLabel, AppBar, Select, MenuItem
} from '@material-ui/core';
import APIChart from '../DataDisplayComponents/ProgressionChartAPIData';
import CourseList from '../DataDisplayComponents/CourseList';
import Navbar from '../Navbar/Navbar';
import QuizQuestions from '../DataDisplayComponents/QuizQuestions';
import TEKSPie from '../DataDisplayComponents/TEKSPie';
import IncidenceChart from '../DataDisplayComponents/TeksOccuranceChart';

class DashboardPage extends React.Component {
    constructor(props) {
        super(props);

        this.handleAssignmentChange = this.handleAssignmentChange.bind(this);
        this.handleBreakdownChange = this.handleBreakdownChange.bind(this);
        this.addBreakdown = this.addBreakdown.bind(this);

        // t is a dummy variable used to modify arrays without directly
        // modifying state
        this.t = [];
        this.breakdown = "";
        this.assignment = "";

        this.state = {
            rawData: [],
            dataYouWant: [],
            isLoaded: false,
            assignID: 0,
            quizzes: [],
            breakdownPapers: [],
        };
    }

    handleAssignmentChange(event) {
        this.assignment = event.target.value;
    }

    handleBreakdownChange(event) {
        this.breakdown = event.target.value;
        console.log(this.breakdown);
    }

    addBreakdown() {
        if (this.breakdown === "" || this.assignment === "") {
            console.log("please select a breakdown or assignment");
            return;
        }
        switch (this.breakdown) {
            case "TMC":
                this.t.push(<TEKSPie quizNumber={this.assignment} />);
                break;
            case "ARS":
                this.t.push(<Charty quizNumber={this.assignment} />);
                break;
            default:
                console.log("something is wrong");
        }
        this.setState({
            breakdownPapers: this.t
        });
        console.log(this.breakdown, this.assignment);
    }

    componentDidMount() {
        // first have to get the assignment id from the quiz data for each assignment
        fetch('/api/v1/courses/368722/quizzes/', {
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
                    rawData: Object.values(result),
                });
            });
    }

    render() {
        return (
            <div>
                <AppBar position='static' style={{ background: '#b592fc' }}>
                    <Grid
                        container
                        spacing={2}
                        direction="row"
                        align="center"
                        justifyContent="left"
                    >
                        <Grid item lg={4} md={4}>
                            <FormControl style={{ minWidth: 260, maxWidth: 300 }}>
                                <InputLabel>Select Breakdown</InputLabel>
                                <Select defaultValue="" onChange={this.handleBreakdownChange}>
                                    <MenuItem value="TMC">
                                        TEKS Mastery Chart
                                    </MenuItem>
                                    <MenuItem value="APC">
                                        Assignment Progression Chart
                                    </MenuItem>
                                    <MenuItem value="ARS">
                                        Assignment Results Scatterplot
                                    </MenuItem>
                                    <MenuItem value="QFL">
                                        Quick Fact List
                                    </MenuItem>
                                    <MenuItem value="QSL">
                                        Quick Stat List
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item lg={4} md={4}>
                            <FormControl style={{ minWidth: 260, maxWidth: 300 }}>
                                <InputLabel>Select an assignment</InputLabel>
                                <Select defaultValue="" onChange={this.handleAssignmentChange}>
                                    {this.state.rawData.map((assignment) => {
                                        return (
                                            <MenuItem key={assignment.id} value={assignment.id}>
                                                {assignment.title}
                                            </MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item lg={4} md={4}>
                            <br />
                            <Button
                                variant="contained"
                                style={{ minWidth: 260, maxWidth: 300 }}
                                onClick={this.addBreakdown}>
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                    <br />
                </AppBar>

                <Grid container spacing={1}
                    direction="row"
                    justifyContent="center"
                    alignItems="center">
                    {/* <Grid item md={6} lg={6}>
                        <Paper>
                            <Charty />
                            <Button
                                variant="outlined"
                                style={{ color: "red" }}>
                                Remove
                            </Button>
                        </Paper>
                    </Grid> */}
                    <Grid item md={6} lg={6}>
                        <Paper>
                            <IncidenceChart />
                            <Button
                                variant="outlined"
                                style={{ color: 'red' }}>
                                Remove
                            </Button>
                        </Paper>
                    </Grid>
                    <Grid item md={6} lg={6}>
                        <Paper>
                            <p>
                                {"You're a great teacher, and the work you do matters"}
                            </p>
                            <Button
                                variant="outlined"
                                style={{ color: 'red' }}>
                                Remove
                            </Button>
                        </Paper>
                    </Grid>
                    {/*<Grid item md={6} lg={6}>
                        <Paper>
                            <QuizSubmiss />
                            <Button
                                variant="outlined"
                                style={{ color: "red" }}>
                                Remove
                            </Button>
                        </Paper>
                    </Grid> */}
                    {this.state.breakdownPapers.map((bd) => {
                        return (
                            <Grid item md={6} lg={6}>
                                <Paper>
                                    {bd}
                                    <Button
                                        variant="outlined"
                                        style={{ color: "red" }}>
                                        Remove
                                    </Button>
                                </Paper>
                            </Grid>)
                    })}
                </Grid>
            </div>
        )
    }
}

export default DashboardPage;