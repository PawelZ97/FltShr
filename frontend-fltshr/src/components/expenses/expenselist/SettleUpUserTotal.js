import React from "react";
import {Typography} from "@material-ui/core";

function SettleUpUserTotal(props) {
    return (
        <div>
            <Typography variant={"h5"}>
                {props.userTotal.user.username}
            </Typography>
            <Typography>
                Zapłacił: {props.userTotal.paid}
            </Typography>
            <Typography>
                Wykorzystał: {props.userTotal.used}
            </Typography>
            <Typography>
                Podsuma: {props.userTotal.total}
            </Typography>
        </div>
    );
}

export default SettleUpUserTotal