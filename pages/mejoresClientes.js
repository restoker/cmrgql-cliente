import React from 'react'
import { useQuery } from '@apollo/client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ErrorPage from '../components/ErrorPage';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import { OBTENER_MEJORES_CLIENTES } from '../config/querys';

const mejoresClientes = () => {
    const {loading, error, data} = useQuery(OBTENER_MEJORES_CLIENTES);

    if(loading) return <Loading />;
    if(error) return <ErrorPage />;
    // console.log(data);
    const {mejoresClientes} = data;
    console.log(mejoresClientes);
    let newData = [];
    // for (const cliente of mejoresClientes) {
    //     if (newData.length > 0) {
    //         const nuevaData = newData.filter(newDataCliente => {
    //             if (newDataCliente.id === cliente.cliente[0].id) {
                    
    //             }
    //         });
    //     } else {
    //         newData = [...newData, {id: cliente.cliente[0].id, name: cliente.cliente[0].nombre, total: cliente.total}];
    //     }
    // }
    for (const cliente of mejoresClientes) {
        newData = [...newData, {name: cliente.cliente[0].nombre, total: cliente.total}]
      }

    return (
        <Layout>
            <div className='h-screen'>
                <div className="max-w-7xl mx-auto mb-3">
                    <div className='flex flex-col sm:flex-row justify-between'>
                        <h1 className="text-2xl font-semibold text-gray-900 mb-1 sm:mb-0">Mejores vendedores</h1>
                    </div>
                </div>
                <div className='w-full h-2/3 md:w-2/3 mt-16 mx-auto'>
                    <ResponsiveContainer width="100%">
                        <BarChart
                        data={newData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis dataKey="total" />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey='total' fill="#3182ce" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </Layout>
    )
}

export default mejoresClientes
