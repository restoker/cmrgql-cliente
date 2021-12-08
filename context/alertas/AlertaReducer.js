import { 
    MENSAJE_ERROR, 
    MOSTRAR_ERROR, 
    OCULTAR_ERROR
} from "../../types";


const AlertaReducer = (state, action) => {
    switch (action.type) {
        case MENSAJE_ERROR:
            return {
                ...state,
                mensaje: action.payload
            }

        case MOSTRAR_ERROR:
            return {
                ...state,
                error: true
            }

        case OCULTAR_ERROR:
            return {
                ...state,
                error: false
            }
    
        default:
            return state;
    }
}

export default AlertaReducer