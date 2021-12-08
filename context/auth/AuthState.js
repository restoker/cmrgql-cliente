import React, { createContext, useMemo, useReducer } from 'react'
import { decodeToken } from '../../helper/decodeToken';
import { OBTENER_DATOS_USUARIO } from '../../types';

export const AuthContext = createContext();

const AuthState = ({children}) => {
    
    const initialState = {
        usuario: null,
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    // login del usuario
    const loginUser = token => {
        if(token){
            const datos = decodeToken(token);
            // console.log(datos);
            dispatch({
                type: OBTENER_DATOS_USUARIO,
                payload: datos
            })
        }
        dispatch({
            type: LOGIN_USER,
            payload: token
        })
    }

    return (
        <AuthContext.Provider 
            values={useMemo(() => ({
                usuario: state.usuario,
                loginUser
            }), [state, dispatch])}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthState;
