import React from 'react';
import {Typography} from "@material-ui/core";

function ShoppingList(props) {
    return (
        <div>
            < Typography variant={"h5"}>
                {props.shoppingList.name}
            </Typography>
            < Typography>
                Opis: {props.shoppingList.description}
            </Typography>
        </div>
    );
}

export default ShoppingList;