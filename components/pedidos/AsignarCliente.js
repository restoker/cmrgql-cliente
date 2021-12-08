import { useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react'
import Select from 'react-select';
import { OBTENER_CLIENTES_USUARIO } from '../../config/querys';
import { PedidoContext } from '../../context/pedido/PedidoState';
import { decodeToken } from '../../helper/decodeToken';
import ErrorPage from '../ErrorPage';
import Loading from '../Loading';

const AsignarCliente = () => {
    const {seleccionarCliente} = useContext(PedidoContext);
    
    // useEffect(() => {
    //     console.log('hola');
    // }, [])

    const {data, loading, error} = useQuery(OBTENER_CLIENTES_USUARIO, {
        variables: {
            id: decodeToken().id
        }
    });

    if(loading) return <Loading />;
    if(error) return <ErrorPage />;
    
        // const clientesUsuario = data.obtenerClientesUsuario
    const {obtenerClientesUsuario} = data;

    const seleccionarCLiente = cliente => {
        // console.log(cliente);
        seleccionarCliente(cliente);
    }

    return (
        <div className="sm:col-span-4 sm:col-start-2">
            <label htmlFor="cliente" className="block text-sm font-medium text-gray-700">
                1. Asignar Cliente al Pedido
            </label>
            <div className="mt-1">
                <Select
                    id='cliente'
                    options={obtenerClientesUsuario}
                    onChange={cliente => seleccionarCLiente(cliente)}
                    getOptionValue={opciones => opciones.id}
                    getOptionLabel={opciones => opciones.nombre}
                    placeholder='Busque o seleccione un cliente'
                    className="w-full sm:text-sm rounded-md"
                    noOptionsMessage={() => 'No hay resultados'}
                />
            </div>
        </div>
    )
}

export default AsignarCliente
