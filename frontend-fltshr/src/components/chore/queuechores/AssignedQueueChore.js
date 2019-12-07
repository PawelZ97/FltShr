import React from "react";
import {Typography} from "@material-ui/core";

function AssignedQueueChore(props) {
    return (
        <div>
            <Typography variant={"h5"}>
                {props.assignedQueueChore.queueChore.name}
            </Typography>
            <Typography>
                Opis: {props.assignedQueueChore.queueChore.description}
            </Typography>
            <Typography>
                Data przypisania: {props.assignedQueueChore
                .assignDate.slice(0, 19).replace("T", " ")}
            </Typography>
            <Typography>
                Wykonany: {props.assignedQueueChore.done ? ("Tak") : ("Nie")}
            </Typography>
            {props.showHistory ? (
                <div>
                    {props.assignedQueueChore.doneDate && (
                        <Typography>
                            Data wykonania: {props.assignedQueueChore
                            .doneDate.slice(0, 19).replace("T", " ")}
                        </Typography>
                    )}
                    <Typography>
                        Przyisana osoba: {props.assignedQueueChore.assignedUser.username}
                    </Typography>
                </div>
            ) : null}
        </div>
    );
}

export default AssignedQueueChore