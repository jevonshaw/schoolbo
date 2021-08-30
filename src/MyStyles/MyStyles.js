import { Card } from "@material-ui/core";
import { styled } from "@material-ui/core";

export const MyCard = styled(Card)({
    background: '#b592fc',
    border: 2,
    borderRadius: 10,
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    minHeight: 500,
    minWidth: 600,
    padding: '0 30px',
});