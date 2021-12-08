import jwtDecode from 'jwt-decode';

export const decodeToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
        return jwtDecode(token);
    } else {
        return null;
    }
}