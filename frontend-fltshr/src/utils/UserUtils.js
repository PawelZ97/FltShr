import jwt_decode from 'jwt-decode';

export const getLoggedUser=()=>{
    let token = localStorage.getItem("authToken");
    return jwt_decode(token).sub;
};