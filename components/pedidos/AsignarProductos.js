import { useQuery } from '@apollo/client'
import React, { useContext } from 'react'
import Select from 'react-select'
import { OBTENER_PRODUCTOS } from '../../config/querys'
import { PedidoContext } from '../../context/pedido/PedidoState'
import ErrorPage from '../ErrorPage'
import Loading from '../Loading'

const AsignarProductos = () => {
    const {seleccionarProductos, actualizarTotal, productos: productosState} = useContext(PedidoContext);
    const {data, loading, error} = useQuery(OBTENER_PRODUCTOS);

    if(loading) return <Loading />;
    if(error) return <ErrorPage />;
    const {obtenerProductos} = data;
    // console.log(obtenerProductos);
    const seleccionarProducto = productos => {
        seleccionarProductos(productos);
        if(!productosState) return;
        actualizarTotal();
    }
    return (
        <div className="sm:col-span-4 sm:col-start-2">
        <label htmlFor="producto" className="block text-sm font-medium text-gray-700">
            2. Seleccionar los productos
        </label>
        <div className="mt-1">
            <Select
            id="producto"
            name="email"
            options={obtenerProductos}
            isMulti={true}
            onChange={producto => seleccionarProducto(producto)}
            getOptionValue={opciones => opciones.id}
            getOptionLabel={opciones => `${opciones.nombre} - ${opciones.existencia} Disponibles`}
            placeholder='Busque o seleccione un producto'
            noOptionsMessage={() => 'No hay resultados'}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
        </div>
    </div>
    )
}

export default AsignarProductos
