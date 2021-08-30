import Charty from '../DataDisplayComponents/ColumnChart';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { URLSearchParams } from 'url';
import Charty2 from '../DataDisplayComponents/ProgressionChart';
import { Grid } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import APIChart from '../DataDisplayComponents/ProgressionChartAPIData';
import CourseList from '../DataDisplayComponents/CourseList';
import Navbar from '../Navbar/Navbar';
import QuizQuestions from '../DataDisplayComponents/QuizQuestions';
import QuizSubmiss from '../DataDisplayComponents/QuizSubmissions';
import PickData from '../DataDisplayComponents/PickData';

class DashboardPage extends React.Component {

    render() {
            return (
                <div>
                    <Navbar/>
                    <Grid container spacing={1}
                        direction="row"
                        justifyContent="center"
                        alignItems="center">
                        <Grid item md={6} lg={6}>
                            <Paper>
                                <Charty />
                            </Paper>
                        </Grid>
                        {/*<Grid item md={6} lg={6}>
                            <Paper>
                                <CourseList />
                            </Paper>
            </Grid>
                        <Grid item md={6} lg={6}>
                            <Paper>
                                <QuizQuestions />
                            </Paper>
            </Grid>*/}
                        <Grid item md={6} lg={6}>
                            <Paper>
                                <Charty2 />
                            </Paper>
                        </Grid>
                        <Grid item md={6} lg={6}>
                            <Paper>
                                <QuizSubmiss />
                            </Paper>
                        </Grid>
                        <Grid item md={6} lg={6}>
                            <Paper>
                                <PickData />
                            </Paper>
                        </Grid>
                        {/*<Grid item md={6} lg={6}>
                            <Paper justifyContent='center'>
                                {data.map((course, index) => <div key={index}>{course.name + ', ' + course.id}</div>)}
                            </Paper>
            </Grid>*/}
                    </Grid>
                </div>
            )
        //}
    }
}

export default DashboardPage;