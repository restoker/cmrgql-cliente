import { 
    ACTUALIZAR_TOTAL,
    CANTIDAD_PRODUCTOS,
    CREAR_PEDIDO,
    SELECCIONAR_CLIENTE, 
    SELECCIONAR_PRODUCTO, 
} from "../../types";

const PedidoReducer = (state, action) => {
    switch (action.type) {
        case SELECCIONAR_CLIENTE:
            return {
                ...state,
                cliente: action.payload
            };

        case SELECCIONAR_PRODUCTO:
            return {
                ...state,
                productos: action.payload
            };

        case CANTIDAD_PRODUCTOS:
            return {
                ...state,
                productos: state.productos.map(producto => producto.id === action.payload.id ? action.payload : producto)
            };

        case ACTUALIZAR_TOTAL:
            return {
                ...state,
                total: state.productos.reduce((a, b) => {
                    return a + b.cantidad*b.precio;
                }, 0)
            };
            
        case CREAR_PEDIDO:
            return {
                ...state,
                cliente: null,
                productos: null,
                total: 0,
            };
    
        default:
            return state;
    }
}
export default PedidoReducer;