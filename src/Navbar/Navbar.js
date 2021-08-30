import React from "react";
import { AppBar, Button, Toolbar } from "@material-ui/core";

class Navbar extends React.Component {
    constructor(props) {
        super(props)

        this.t = [];
    }

    render() {
        return (
            <div>
            <AppBar position='static' style={{ background: '#b592fc' }}>
                <Toolbar>
                <ul id='nav'>
                    <Button>Classes</Button>
                    <Button>Assignments</Button>
                    <Button>Projections(Coming Soon!)</Button>
                </ul>
                </Toolbar>
            </AppBar>
            </div>
        )
    }
}

export default Navbar;