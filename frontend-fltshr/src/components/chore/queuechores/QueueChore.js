import React from "react";
import {Typography} from "@material-ui/core";

function QueueChore(props) {
    return (
        <div>
            <Typography variant={"h5"}>
                {props.queueChore.name}
            </Typography>
            <Typography>
                Opis: {props.queueChore.description}
            </Typography>
            {/*<Typography>*/}
            {/*    Zarchiwizowana: {props.queueChore.archived}*/}
            {/*</Typography>*/}
        </div>
    );
}

export default QueueChore