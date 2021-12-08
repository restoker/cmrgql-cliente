import { OBTENER_DATOS_USUARIO } from "../../types";

const AuthReducer = (state, action) => {
    switch (action.type) {
        case OBTENER_DATOS_USUARIO:
            return {
                ...state,
                usuario: action.payload
            };
    
        default:
            return state;
    }
}

export default AuthReducer;