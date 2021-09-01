import React from "react";
import {
    AppBar, Button, FormControl, InputLabel,
    Select, MenuItem, Grid
} from "@material-ui/core";

class Navbar extends React.Component {
    constructor(props) {
        super(props)

        this.t = [];
        this.state = {
            breakdowns: []
        };
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
                    // style={{ minHeight: '60vh' }}
                    >
                        <Grid item lg={4} md={4}>
                            <FormControl style={{ minWidth: 260, maxWidth: 300 }}>
                                <InputLabel>Select Breakdown</InputLabel>
                                <Select defaultValue="">
                                    <MenuItem value="TMC">
                                        TEKS Mastery Chart
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item lg={4} md={4}>
                            <FormControl style={{ minWidth: 260, maxWidth: 300 }}>
                                <InputLabel>Select an assignment</InputLabel>
                                <Select defaultValue="">
                                    <MenuItem value="hi">
                                        hello
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item lg={4} md={4}>
                            <br/>
                            <Button variant="contained">
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                    <br/>
                </AppBar>
            </div>
        )
    }
}

export default Navbar;

{/* <Toolbar>
<ul id='nav'>
    <Button>Classes</Button>
    <Button>Assignments</Button>
    <Button>Projections(Coming Soon!)</Button>
</ul>

</Toolbar> */}