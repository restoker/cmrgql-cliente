import React, { useState } from 'react'
import { PlusIcon, XCircleIcon, PencilAltIcon} from '@heroicons/react/outline';
import { useMutation, useQuery } from '@apollo/client'
import Layout from '../components/Layout'
import { OBTENER_PRODUCTOS } from '../config/querys'
import Loading from '../components/Loading'
import ErrorPage from '../components/ErrorPage'
import Link from 'next/link';
import ModalDelete from '../components/ModalDelete';
import { ELIMINAR_PRODUCTO } from '../config/mutations';


const productos = () => {
    const [modalDelete, setModalDelete] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [id, setId] = useState(null);
    const [loading, setLoading] = useState(false);
    const {data, loading: loadingObtenerProductos, error} = useQuery(OBTENER_PRODUCTOS);
    const [eliminarProducto] = useMutation(ELIMINAR_PRODUCTO, {
        update(cache) {
            const {obtenerProductos} = cache.readQuery({
                query: OBTENER_PRODUCTOS
            });
            const newData = obtenerProductos.filter(producto => producto.id !== id);
            cache.evict({ broadcast: false });
            cache.writeQuery({
                query: OBTENER_PRODUCTOS,
                data: {
                    obtenerProductos: newData
                }
            })
        }
    });
    if(loadingObtenerProductos) return <Loading />;
    if(error) return <ErrorPage />;
    // console.log(data.obtenerProductos);
    const handleClick = _ => {
        setMensaje('¿Desea eliminar este elemento?');
        setModalDelete(true);
    }

    const deleteProduct = async _ => {
        setLoading(true);
        try {
            await eliminarProducto({
                variables: {
                    id
                }
            });
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    }

    return (
        <>
            <Layout>
                {loading&&<Loading />}
                {modalDelete&&<ModalDelete modalDelete={modalDelete} mensaje={mensaje} setModalDelete={setModalDelete} funcion={deleteProduct}/>}
                <div className="max-w-7xl mx-auto mb-3">
                    <div className='flex flex-col sm:flex-row justify-between'>
                    <h1 className="text-2xl font-semibold text-gray-900">Lista de Productos</h1>
                    <Link href='/nuevoProducto'>
                        <a
                        type="button"
                        className="inline-flex items-center px-4 py-1 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none content-center"
                        >
                        <PlusIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
                        <span className='text-center w-full'>Nuevo Producto</span>
                        </a>
                    </Link>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-400 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-400">
                            <thead className="bg-gray-800">
                                <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                >
                                    Nombre
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                >
                                    Precio
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                >
                                    Stock
                                </th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">delete</span>
                                </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.obtenerProductos.map((producto, personIdx) => (
                                <tr 
                                    key={producto.id} 
                                    className={personIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{producto.nombre}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">.S/ {producto.precio.toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-bold">{producto.existencia} uds.</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link href={{pathname:'/editarproducto/[id]', query:  {id: producto.id} }}>
                                            <a
                                                className="flex justify-center items-center text-white bg-indigo-600 hover:bg-indigo-900 w-full py-2 px-4 rounded-lg"
                                            >
                                                Editar
                                                <PencilAltIcon className="ml-1 h-5 w-5" aria-hidden="true" />
                                            </a>
                                        </Link>
                                    </td>
                                    <td className="px-3 py-2 whitespace-nowrap text-right text-sm font-medium">
                                    <button 
                                        className="flex justify-center items-center text-white w-full py-2 px-4 bg-red-600 hover:bg-red-700 rounded-lg"
                                        onClick={_=> {
                                            handleClick();
                                            setId(producto.id)
                                        }}
                                    >
                                        Eliminar
                                        <XCircleIcon className="ml-1 h-5 w-5" aria-hidden="true" />
                                    </button>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default productos
