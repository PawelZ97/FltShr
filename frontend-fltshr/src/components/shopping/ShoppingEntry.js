import React from 'react';
import {Typography} from "@material-ui/core";

function ShoppingEntry(props) {
    return (
        <div>
            <Typography variant={"h5"}>
                {props.shoppingListItem.shoppingItem.name}
            </Typography>
            <Typography>
                Opis: {props.shoppingListItem.shoppingItem.description}
            </Typography>
            <Typography>
                Kupiony: {props.shoppingListItem.isBought ? ("Tak") : ("Nie")}
            </Typography>
            {props.shoppingListItem.isBought && (
                <div>
                    <Typography>
                        Data kupna: {props.shoppingListItem.boughtDate.slice(0, 19).replace("T", " ")}
                    </Typography>
                    <Typography>
                        Kupiony przez: {props.shoppingListItem.user.username}
                    </Typography>
                </div>
            )}
        </div>
    );
}

export default ShoppingEntry;