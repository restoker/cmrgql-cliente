import React, { createContext, useMemo, useReducer } from 'react';
import { 
    ACTUALIZAR_TOTAL,
    CANTIDAD_PRODUCTOS,
    CREAR_PEDIDO,
    SELECCIONAR_CLIENTE, 
    SELECCIONAR_PRODUCTO 
} from '../../types';
import PedidoReducer from './PedidoReducer';

export const PedidoContext = createContext();

const PedidoState = ({children}) => {
    const initialState = {
        cliente: null,
        productos: null,
        total: 0,
    }

    const [state, dispatch] = useReducer(PedidoReducer, initialState);
    
    // funciones que modifican el state
    const seleccionarCliente = (cliente) => {
        dispatch({
            type: SELECCIONAR_CLIENTE,
            payload: cliente
        })
    }

    const seleccionarProductos = (productos) => {
        // console.log(productos);
        let nuevoState;
        if (state.productos?.length > 0) {
            //tomar del segundo arreglo, una copia para asignarlo al primero
            nuevoState = productos.map(producto => {
                const nuevoObjeto = state.productos.find(productoState => productoState.id === producto.id);
                return {...producto, ...nuevoObjeto};
            });
        } else {
            nuevoState = productos
        }
        dispatch({
            type: SELECCIONAR_PRODUCTO,
            payload: nuevoState
        })
    }
    // modifica las cantidades de los productos
    const cantidadProductos = (producto) => {
        dispatch({
            type: CANTIDAD_PRODUCTOS,
            payload: producto
        })
    }

    const actualizarTotal = _ => {
        // console.log('me llame :D');
        dispatch({
            type: ACTUALIZAR_TOTAL,
        })
    }

    const resetPedidoState = _ => {
        dispatch({
            type: CREAR_PEDIDO,
        })
    }

    return (
        <PedidoContext.Provider 
            value={useMemo(() => ({
                cliente: state.cliente,
                productos: state.productos,
                total: state.total,
                seleccionarCliente,
                seleccionarProductos,
                cantidadProductos,
                actualizarTotal,
                resetPedidoState
            }), [state, dispatch])}
        >
            {children}
        </PedidoContext.Provider>
    )
}

export default PedidoState
