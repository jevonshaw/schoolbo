import Chart from "react-apexcharts";
import React from "react";
import { Button } from "@material-ui/core";

class CourseList extends React.Component {
    constructor(props) {
        super(props);

        // t is a dummy variable used to modify arrays without directly
        // modifying state
        this.t = [];

        this.state = {
            rawData: [],
            courses: [],
            isLoaded: false
        };
    }

    componentDidMount() {
        fetch('/api/v1/courses/368722/students', {
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
                })
                result.forEach((student) => {
                    this.t.push({ nombre: student.name, studID: student.id });
                });
                this.setState({
                    courses: this.t
                });
                this.t = [];
            });
    }

    render() {
        if (this.state.courses.length > 0) {
            return (
                <div id='courses'>
                    <ul>
                        {this.state.courses.map((student, index) => {
                            return (<li key={index}>{student.nombre + ': ' + student.studID}</li>)
                        })}
                    </ul>
                </div >
            )
        } else {
            return (<div>Loading.........</div>)
        }
    }
}

export default CourseList;