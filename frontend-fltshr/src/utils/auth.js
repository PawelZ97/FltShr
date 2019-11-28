import axios from 'axios';
const AUTH_SERVER_ADDRESS = "http://localhost/api/v1.0";

const login = async (data) => {
    const LOGIN_ENDPOINT = `${AUTH_SERVER_ADDRESS}/auth/login`;

    try {

        let response = await axios.post(LOGIN_ENDPOINT, data, {
            headers: {
                'Content-Type': 'application/json',
            },
            params: {
                "password": "test",
                "userIndex": "289112"
            }
        });

        if(response.status === 200){
            console.log(response.headers);
            console.log("OK");
        }
    } catch(e){
        console.log(e);
    }
};

export {login};