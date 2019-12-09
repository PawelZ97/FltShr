import jwt_decode from 'jwt-decode';

export const getLoggedUser = () => {
    let token = localStorage.getItem("authToken");
    let decoded = jwt_decode(token);
    return {
        username: decoded.sub,
        roles: decoded.roles
    }
};

export const isUserLogged = () => {
    let token = localStorage.getItem("authToken");
    return token !== null;
};