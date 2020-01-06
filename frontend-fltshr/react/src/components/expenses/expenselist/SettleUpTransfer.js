import React from "react";
import {Typography} from "@material-ui/core";

function SettleUpTransfer(props) {
    return (
        <div>
            <Typography variant={"h5"}>
                Nadawca: {props.settleTransfer.sender.username}
            </Typography>
            <Typography>
                Kwota: {props.settleTransfer.transferValue}
            </Typography>
            <Typography>
                Odbiorca: {props.settleTransfer.reciepent.username}
            </Typography>
        </div>
    );
}

export default SettleUpTransfer