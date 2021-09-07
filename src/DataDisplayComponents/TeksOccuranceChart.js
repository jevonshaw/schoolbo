import Chart from "react-apexcharts";
import React from "react";
import { Grid } from "@material-ui/core";

class IncidenceChart extends React.Component {
    constructor(props) {
        super(props);

        this.t = "";
        this.studentList = [];
        this.gradeList = [];

        this.state = {
            rawData: [],
            uncategorized: 0,

            historicSeries: [{
                name: "Historic",
                type: 'bar',
                data: [70, 80, 35, 40, 92, 83]
            }, {
                name: "Current Pacing",
                type: "bar",
                data: [75, 79, 40, 40, 80, 80]
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
                    text: "TEKS Incidence Chart",
                    align: 'center'
                },
                grid: {
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },
                xaxis: {
                    categories: ["A.2", "A.3", "A.4", "A.5", "A.6", "A.7"]
                }
            },
        };
    }

    // componentDidMount() {
    //     // first have to get the assignment id from the quiz data
    //     fetch('/api/v1/courses/368722/quizzes/' + this.props.quizNumber, {
    //         method: 'get',
    //         headers: new Headers({
    //             'Authorization': 'Bearer 6936~pi2S8AWfRd0NRyB4Raj3NnYIPULzKrdrbj9VpWlm4bT6ZTTVg6D1PwkZT6ivoN3G',
    //             'Content-Type': 'application/json'
    //         })
    //     })
    //         .then((res) => res.json())
    //         .then((result) => {
    //             this.setState({
    //                 isLoaded: true,
    //             });
    //             return result;
    //         },
    //             (error) => {
    //                 this.setState({
    //                     isLoaded: true,
    //                     error
    //                 });
    //             }
    //         )
    //         .then((result) => {
    //             this.setState({
    //                 rawData: result,
    //                 assignID: result.assignment_id
    //             });
    //         })
    //         // below we use the assignment id to get the metadata about the assignment
    //         .then(() => {
    //             fetch('/api/v1/courses/368722/assignments/'
    //                 + this.state.assignID + '/submissions?include[]=submission_history', {
    //                 method: 'get',
    //                 headers: new Headers({
    //                     'Authorization': 'Bearer 6936~pi2S8AWfRd0NRyB4Raj3NnYIPULzKrdrbj9VpWlm4bT6ZTTVg6D1PwkZT6ivoN3G',
    //                     'Content-Type': 'application/json'
    //                 })
    //             })
    //                 .then((res) => res.json())
    //                 .then((res) => {
    //                     this.setState({
    //                         dataYouWant: Object.values(res)
    //                     });
    //                     // below we will get the identifiers of the students for 
    //                     // each score
    //                     this.state.dataYouWant.forEach((student) => {
    //                         if (student.submission_history[0].attempt !== null) {
    //                             this.studentList.push(student.user_id);
    //                             this.gradeList.push(student.score);
    //                         } else {
    //                             this.setState({
    //                                 uncategorized: this.state.uncategorized + 1
    //                             });
    //                         }
    //                     });
    //                     this.setState({
    //                         scatterSeries: [{
    //                             name: "Students",
    //                             type: 'scatter',
    //                             data: this.gradeList
    //                         }],
    //                         options: {
    //                             xaxis: {
    //                                 categories: this.studentList
    //                             },
    //                             title: {
    //                                 text: this.state.rawData.title,
    //                                 align: 'center'
    //                             },
    //                         }
    //                     });
    //                 });
    //         });
    // }


    render() {
        return (
            <div>
                <Chart options={this.state.options}
                    series={this.state.historicSeries} type='bar' height='350' width='100%' />
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
        );
    }
}

export default IncidenceChart;