import React from "react";
import { InputLabel, MenuItem, Select } from "@material-ui/core";
import { FormControl, Grid, Button } from "@material-ui/core";

class PickData extends React.Component {
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
            quizzes: [],
        };
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
        console.log(this.state.rawData);
        return (
            <div>
                <Grid
                    container
                    spacing={2}
                    direction="column"
                    align="center"
                    justifyContent="center"
                    style={{ minHeight: '60vh' }}
                >
                    <Grid item >
                        <p> {"Show me a..."} </p>

                        <FormControl style={{ minWidth: 260 }}>
                            <InputLabel>
                                Select breakdown
                            </InputLabel>
                            <Select defaultValue="">
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
                    <Grid item >
                        <p> {"For..."} </p>

                        <FormControl style={{ minWidth: 260 }}>
                            <InputLabel>
                                Select an assignment
                            </InputLabel>
                            <Select defaultValue="">
                                {this.state.rawData.map((assignment) => {
                                    return (<MenuItem key={assignment.id} value={assignment.id}>
                                        {assignment.title}
                                    </MenuItem>)
                                })}
                            </Select>
                        </FormControl>
                        <Grid item>
                            <br/>
                            <Button variant="contained">Add</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default PickData;