import React from 'react'
import Layout from '../components/Layout'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useQuery } from '@apollo/client';
import { OBTENER_MEJORES_VENDEDORES } from '../config/querys';
import Loading from '../components/Loading';
import ErrorPage from '../components/ErrorPage';

const MejoresVendedores = () => {
    const {loading, error, data} = useQuery(OBTENER_MEJORES_VENDEDORES);
    if(loading) return <Loading />;
    if(error) return <ErrorPage />;
    const {mejoresVendedores} = data;
    // console.log(mejoresVendedores);
    let newData = [];
    for (const vendedor of mejoresVendedores) {
      newData = [...newData, {name: vendedor.vendedor[0].nombre, total: vendedor.total}]
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

export default MejoresVendedores
