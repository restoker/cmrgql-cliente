import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import AsignarCliente from '../components/pedidos/AsignarCliente'
import AsignarProductos from '../components/pedidos/AsignarProductos'
import ResumenPedido from '../components/pedidos/ResumenPedido'
import SuccessModal from '../components/SuccessModal'
import { NUEVO_PEDIDO } from '../config/mutations'
import { AlertaContext } from '../context/alertas/AlertaState'
import { PedidoContext } from '../context/pedido/PedidoState'

const nuevoPedido = () => {
    const {cliente, productos, total, resetPedidoState} = useContext(PedidoContext);
    const {mensajeError, ocultarMensajeError, mostrarMensajeError} = useContext(AlertaContext);
    const [animacion, setAnimacion] = useState(false);
    const [deshabilitar, setDeshabilitar] = useState(true);
    const router = useRouter();
    const [success, setSuccess] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [nuevoPedido] = useMutation(NUEVO_PEDIDO);
    // console.log(pedidos);
    useEffect(() => {
        if (!productos || productos?.length === 0 || !cliente) {
            setDeshabilitar(true);
        } else {
            setDeshabilitar(false);
        }
        return () => {
            setAnimacion(false);
            ocultarMensajeError();
        }
    }, [productos, cliente])
    // console.log(deshabilitar);

    const handleAnimacion = _ => {
        setAnimacion(true);
    }

    // console.log(productos);
    const crearNuevoPedido = async () => {
        if (!productos || productos?.length === 0 || !cliente) {
            return;
        }
        ocultarMensajeError();
        const {id} = cliente;
        let pedido = [];
        for await(const producto of productos) {
            const nuevoProducto = {id: producto.id, cantidad: producto.cantidad, nombre: producto.nombre, precio: producto.precio};
            pedido = [...pedido, nuevoProducto]
        }
        // console.log(pedido);
        // console.log(cliente.id);
        try {
            const {data} = await nuevoPedido({
                variables: {
                   input: {
                        cliente: String(id),
                        pedido
                   }
                }
            })
            console.log(data);
            if(data) {
                resetForm();
                resetPedidoState();
                setMensaje('El pedido se registro correctamente');
                setSuccess(true);
            }
        } catch (e) {
            // console.log(e);
            // console.log(e.networkError?.result?.errors);
            // console.log(JSON.stringify(e, null, 2));
            mensajeError(e.message);
            mostrarMensajeError();
        }
    }

    const resetForm = () => { 
        document.getElementById("create-course-form").reset();
    }

    const redireccionar = _ => {
        router.push('/pedidos');
    }

    return (
        <Layout>
            {success&&<SuccessModal mensaje={mensaje} setSuccess={setSuccess} funcion={redireccionar}/>}
            <form 
                className="space-y-8 divide-y divide-gray-200"
                id="create-course-form"
            >
                <div className="space-y-8 divide-y divide-gray-200">

                    <div className="pt-8">
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Nuevo Pedido</h3>
                        <p className="mt-1 text-sm text-gray-500">Use a permanent address where you can receive mail.</p>
                    </div>
                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 self-center">
                        
                        <AsignarCliente />

                        <AsignarProductos/>

                        <ResumenPedido />

                        <div className="sm:col-span-2 sm:col-start-4 mt-6">
                            <div className="mt-1 flex rounded-md shadow-sm">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-900 sm:text-base font-bold">
                                Total: .S/ 
                                </span>
                                <input
                                disabled
                                type="text"
                                name="company-website"
                                id="company-website"
                                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md sm:text-lg font-bold border-gray-300"
                                value={String(total)}
                                // placeholder="www.example.com"
                                />
                            </div>
                        </div>

            
                    </div>
                    </div>

                </div>

                <div className="pt-5">
                    <div className="flex justify-end">
                    <button
                        type="button"
                        className={`bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none ${animacion&&'animate-jello-horizontal'}`}
                        onClick={handleAnimacion}
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        className={deshabilitar?"ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-400 focus:outline-none cursor-not-allowed " :"ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none"}
                        disabled={deshabilitar}
                        onClick={ _ => {
                            crearNuevoPedido();
                        }}
                    >
                        Crear Pedido
                    </button>
                    </div>
                </div>
            </form>
        </Layout>
    )
}

export default nuevoPedido
