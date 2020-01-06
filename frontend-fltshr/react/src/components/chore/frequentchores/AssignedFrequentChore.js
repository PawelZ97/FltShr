import React from 'react';
import {Typography} from "@material-ui/core";

function AssignedFrequentChore(props) {
    return (
        <div>
            <Typography variant={"h5"}>
                {props.assignedFrequentChore.frequentChore.name}
            </Typography>
            <Typography>
                Opis: {props.assignedFrequentChore.frequentChore.description}
            </Typography>
            <Typography>
                Data przypisania: {props.assignedFrequentChore
                .assignDate.slice(0, 19).replace("T", " ")}
            </Typography>
            <Typography>
                Wykonany: {props.assignedFrequentChore.done ? ("Tak") : ("Nie")}
            </Typography>
            <Typography>
                Liczba dni na wykonanie: {props.assignedFrequentChore.frequentChore.durationDays}
            </Typography>
            {(props.viewMode === "USER" || props.viewMode === "ALL") ? (
                <div>
                    {props.assignedFrequentChore.doneDate && (
                        <Typography>
                            Data wykonania: {props.assignedFrequentChore
                            .doneDate.slice(0, 19).replace("T", " ")}
                        </Typography>
                    )}
                    <Typography>
                        Liczba dni ponownej aktywacji: {props.assignedFrequentChore.frequentChore.frequencyDays}
                    </Typography>
                </div>
            ) : null}
            {props.viewMode === "ALL" ? (
                <Typography>
                    Przypisana osoba: {props.assignedFrequentChore.assignedUser.username}
                </Typography>
            ) : null}
        </div>
    );
}

export default AssignedFrequentChore;