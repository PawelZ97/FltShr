import React from 'react';
import {Typography} from "@material-ui/core";

function FrequentChore(props) {
    return (
        <div>
            <Typography variant={"h5"}>
                {props.frequentChore.name}
            </Typography>
            <Typography>
                Opis: {props.frequentChore.description}
            </Typography>
            <Typography>
                Liczba dni na wykonanie: {props.frequentChore.durationDays}
            </Typography>
            <Typography>
                Liczba dni ponownej aktywacji: {props.frequentChore.frequencyDays}
            </Typography>
            <Typography>
                Zarchiwizowana: {(props.frequentChore.archived) ? ("Tak") : ("Nie")}
            </Typography>
        </div>
    );
}

export default FrequentChore;