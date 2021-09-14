import React from "react";
import { withRouter } from "react-router-dom";
import { CardContent, InputLabel } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { Select } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { MyCard } from "./MyStyles/MyStyles";
import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin() {

        // the code below is for oauth when you get to it
        // window.location.replace('http://localhost:3000/login/oauth2/auth?client_id=10000000000034&response_type=code&state=YYY&redirect_uri=http://localhost:8000/dashboard');
        window.location.replace('http://localhost:8000/dashboard');
    }

    render() {
        return (
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}
            >
                    <MyCard variant='outlined'>
                        <Grid
                            container
                            spacing={2}
                            direction="column"
                            align="center"
                            justifyContent="center"
                            style={{ minHeight: '60vh' }}
                        >
                            <Grid item lg={12}>
                            <CardContent>
                                <FormControl style={{ minWidth: 260 }}>
                                    <InputLabel>
                                        Select your district
                                    </InputLabel>
                                    <Select defaultValue='FWISD'>
                                        <MenuItem value='FWISD'> Fort Worth ISD</MenuItem>
                                        <MenuItem value='IISD'> Irving ISD</MenuItem>
                                        <MenuItem value='AISD'> Arlington ISD</MenuItem>
                                    </Select>
                                </FormControl>
                                <p style={{ color: 'black' }}>
                                    then
                                </p>
                                <Button variant='contained' onClick={this.handleLogin}
                                style={{ background: 'white' }} >
                                    Sign in with Canvas
                                </Button>
                            </CardContent>
                            </Grid>
                        </Grid>
                    </MyCard>
                </Grid>
        );
    }
}

export default withRouter(Login);

// for teacher use the token 6936~pi2S8AWfRd0NRyB4Raj3NnYIPULzKrdrbj9VpWlm4bT6ZTTVg6D1PwkZT6ivoN3G

// for von2552 use token 6936~EOVDV1T6YyPvgEN7hFerliGf28jhJcTRFkg6F5VIyFiEfq6denyaibDd3HxuaXVl
