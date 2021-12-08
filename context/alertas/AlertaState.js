import React, { createContext, useMemo, useReducer } from 'react'
import { 
    MENSAJE_ERROR, 
    MOSTRAR_ERROR, 
    OCULTAR_ERROR 
} from '../../types';
import AlertaReducer from './AlertaReducer';

export const AlertaContext = createContext();

const AlertaState = ({children}) => {
    const initialState = {
        error: false,
        mensaje: '',
    }

    const [state, dispatch] = useReducer(AlertaReducer, initialState);

    const mensajeError = (mensaje) => {
        const indice = mensaje.indexOf(":");
        const nuevoMensaje = mensaje.substring(indice);
        dispatch({
            type: MENSAJE_ERROR,
            payload: nuevoMensaje || mensaje
        })
    }

    const mostrarMensajeError = _ => {
        dispatch({
            type: MOSTRAR_ERROR,
        })
    }

    const ocultarMensajeError = _ => {
        dispatch({
            type: OCULTAR_ERROR,
        })
    }

    return (
        <AlertaContext.Provider
            value={useMemo(() => ({
                error: state.error,
                mensaje: state.mensaje,
                mensajeError,
                mostrarMensajeError,
                ocultarMensajeError,
            }), [state, dispatch])}
        >
            {children}
        </AlertaContext.Provider>
    )
}

export default AlertaState
