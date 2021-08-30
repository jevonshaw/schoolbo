import Chart from "react-apexcharts";
import React from "react";
import { Button } from "@material-ui/core";

class QuizQuestions extends React.Component {
    constructor(props) {
        super(props);

        // t is a dummy variable used to modify arrays without directly
        // modifying state
        this.t = [];

        this.state = {
            rawData: [],
            quizQuestions: [],
            isLoaded: false
        };
    }

    componentDidMount() {
        fetch('/api/v1/courses/368722/quizzes/708992/questions', {
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
                result.forEach((question) => {
                    this.t.push({ repCategory: question.question_name, id: question.id });
                });
                this.setState({
                    quizQuestions: this.t
                });
                this.t = [];
            });
    }

    render() {
        if (this.state.quizQuestions.length > 0) {
            return (
                <div id='quiz'>
                    <ul>
                        {this.state.quizQuestions.map((question, index) => {
                            return (<li key={index}>{question.id}: {question.repCategory}</li>)
                        })}
                    </ul>
                </div >
            )
        } else {
            return (<div>Loading.........</div>)
        }
    }
}

export default QuizQuestions;