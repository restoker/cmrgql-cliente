import { useMutation, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react';
import ErrorPage from '../components/ErrorPage';
import Layout from '../components/Layout'
import Loading from '../components/Loading';
import { OBTENER_CLIENTES_USUARIO } from '../config/querys'
import { decodeToken } from '../helper/decodeToken';
import router from 'next/router'
import { PlusIcon, XCircleIcon, PencilAltIcon} from '@heroicons/react/outline';
import Link from 'next/link';
import ModalDelete from '../components/ModalDelete';
import { ELIMINAR_CLIENTE } from '../config/mutations';
// import {Router} from 'next/router'
// ref:https://stackoverflow.com/questions/43862600/how-can-i-get-query-string-parameters-from-the-url-in-next-js

export default function Index() {
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useState(null);
  const [idCliente, setIdCliente] = useState(null);
  const [modalDelete, setModalDelete] = useState(false);
  const [mensaje, setMensaje] = useState('');


  useEffect(() => {
    const token = decodeToken();
    if(!token) {
      router.push('/login');
    } else {
      // verificar si el token a expirado
      if (Date.now() >= token?.exp * 1000) {
        localStorage.clear();
        router.push('/login');
      } else {
        setId(token.id);
        setAuth(token.id);
      }
    }
  }, [])

  // console.log(idClient);
  
  const {data, error, loading: loadingObtenerUsuario} = useQuery(OBTENER_CLIENTES_USUARIO, {
    skip: id === null,
    variables: {
      id
    }
  });
  
  const [eliminarCliente] = useMutation(ELIMINAR_CLIENTE, {
    update(cache) {
      const {obtenerClientesUsuario} = cache.readQuery({
        query: OBTENER_CLIENTES_USUARIO,
        variables: {
          id: decodeToken().id
        }
      });
      cache.evict({ broadcast: false });
      cache.writeQuery({
        query: OBTENER_CLIENTES_USUARIO,
        variables: {
          id: decodeToken().id
        },
        data: {
          obtenerClientesUsuario: obtenerClientesUsuario.filter(clienteActual => clienteActual.id !== idCliente)
        }
      })
    }
  });

  const handleDeleteUser = async () => {
    // console.log(`Cliente eliminado: ${idCliente}`);
    try {
      await eliminarCliente({
        variables: {
          id: idCliente
        }
      }); 
      
    } catch (e) {
      console.log(e.message);
    }
    setModalDelete();
  }

  if(!auth) return <Loading />;
  if(loadingObtenerUsuario) return <Loading />;
  if(error) return <ErrorPage />;

  if(!data) return router.push('/login');

  // const people = [
  //   { name: 'Jane Cooper', title: 'Regional Paradigm Technician', role: 'Admin', email: 'jane.cooper@example.com' },
  //   { name: 'Cody Fisher', title: 'Product Directives Officer', role: 'Owner', email: 'cody.fisher@example.com' },
  // ]
  const handleClick = _ => {
    setMensaje('¿Desea eliminar este elemento?');
    setModalDelete(true);
  }

  // const editarCliente = (id) => {
  //   router.push({
  //     pathname: '/editarcliente/[id]',
  //     query: {id}
  //   })
  // }


  return (
    <>
      <Layout>
        {loading&&<Loading />}
        {modalDelete&&<ModalDelete modalDelete={modalDelete} mensaje={mensaje} setModalDelete={setModalDelete} funcion={handleDeleteUser}/>}
        <div className="max-w-7xl mx-auto mb-3">
            <div className='flex flex-col sm:flex-row justify-between'>
              <h1 className="text-2xl font-semibold text-gray-900">Lista de Clientes</h1>
              <Link href='/nuevoCliente'>
                <a
                  type="button"
                  className="inline-flex items-center px-4 py-1 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none content-center"
                >
                  <PlusIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
                  <span className='text-center w-full'>Nuevo cliente</span>
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
                        Empresa
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                      >
                        teléfono
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
                    {data.obtenerClientesUsuario.map((person, personIdx) => (
                      <tr 
                        key={person.id} 
                        className={personIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{person.nombre} {person.apellido}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.empresa}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.telefono}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link href={{pathname:'/editarcliente/[id]', query: {id: person.id} }}>
                            <a
                              className="flex justify-center items-center text-white bg-indigo-600 hover:bg-indigo-900 w-full py-2 px-4 rounded-lg"
                              // onClick = {_ => editarCliente(person.id)}
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
                              setIdCliente(person.id);
                              handleClick();
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
