import React, {useEffect, useState} from "react";
import axios from "axios";
import {API_ADDRESS} from "../utils/constants";
import {Typography} from "@material-ui/core";

function TestApiCall() {
    const [apiResponse, setApiResponse] = useState();

    useEffect(() => {
        console.log("API_CALL_START");
        axios
            .get(API_ADDRESS + "/test/all")
            .then(function(response) {
                setApiResponse(response.data);
                console.log("API_RESPONSE_OK: " + response.data);
            })
            .catch(function(error) {
                if (error.response) {
                    console.log("STATUS NOT OK");
                } else if (error.request) {
                    console.log("NOT CONNECTED TO API");
                } else {
                    console.log("Something went wrong");
                }
            });
    }, []);

    return (
        <Typography>
            {apiResponse}
        </Typography>
    );
}

export default TestApiCall