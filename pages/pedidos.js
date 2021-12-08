import React from 'react'
import Layout from '../components/Layout'
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/outline';
import { useQuery } from '@apollo/client';
import { OBTENER_PEDIDOS } from '../config/querys';
import Loading from '../components/Loading';
import ErrorPage from '../components/ErrorPage';

import Pedido from '../components/Pedido';

const products = [
    {
      id: 1,
      name: 'Nomad Tumbler',
      description:
        'This durable and portable insulated tumbler will keep your beverage at the perfect temperature during your next adventure.',
      href: '#',
      price: '35.00',
      status: 'Preparing to ship',
      step: 1,
      date: 'March 24, 2021',
      datetime: '2021-03-24',
      address: ['Floyd Miles', '7363 Cynthia Pass', 'Toronto, ON N3Y 4H8'],
      email: 'f•••@example.com',
      phone: '1•••••••••40',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/confirmation-page-03-product-01.jpg',
      imageAlt: 'Insulated bottle with white base and black snap lid.',
    },
    {
      id: 2,
      name: 'Minimalist Wristwatch',
      description: 'This contemporary wristwatch has a clean, minimalist look and high quality components.',
      href: '#',
      price: '149.00',
      status: 'Shipped',
      step: 0,
      date: 'March 23, 2021',
      datetime: '2021-03-23',
      address: ['Floyd Miles', '7363 Cynthia Pass', 'Toronto, ON N3Y 4H8'],
      email: 'f•••@example.com',
      phone: '1•••••••••40',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/confirmation-page-03-product-02.jpg',
      imageAlt:
        'Arm modeling wristwatch with black leather band, white watch face, thin watch hands, and fine time markings.',
    },
    // More products...
]

const pedidos = () => {
    const {data, loading, error, refetch} = useQuery(OBTENER_PEDIDOS);
    
    if(loading) return <Loading />;
    if(error) return <ErrorPage />;

    const {obtenerPedidosUsuario} = data;

    // console.log(obtenerPedidosUsuario);

    const tranformaDate = fecha => {
      const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

      const date = fecha ? new Date(fecha) : new Date();
      const dateString = `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
      return dateString;
    }

    return (
        <div>
            <Layout>
                
                <div className="max-w-7xl mx-auto mb-3">
                    <div className='flex flex-col sm:flex-row justify-between'>
                        <h1 className="text-2xl font-semibold text-gray-900 mb-1 sm:mb-0">Lista de Pedidos</h1>
                        <Link href='/nuevoPedido'>
                            <a
                            type="button"
                            className="inline-flex items-center px-4 py-1 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none content-center"
                            >
                            <PlusIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
                            <span className='text-center w-full'>Nuevo Pedido</span>
                            </a>
                        </Link>
                    </div>
                </div>
                
                <div className="bg-gray-50">
                    <div className="max-w-2xl mx-auto pt-1 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
                        <div className="px-4 space-y-2 sm:px-0 sm:flex sm:items-baseline sm:justify-between sm:space-y-0">
                        <div className="flex sm:items-baseline sm:space-x-4">
                            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">Pedidos</h1>
                            {/* <a href="#" className="hidden text-sm font-medium text-indigo-600 hover:text-indigo-500 sm:block">
                            View invoice<span aria-hidden="true"> &rarr;</span>
                            </a> */}
                        </div>
                        <p className="text-sm text-gray-600">
                            Hoy :{' '}
                            <time dateTime="2021-10-05" className="font-medium text-gray-900">
                                {tranformaDate(obtenerPedidosUsuario.creado)}
                            </time>
                        </p>
                        {/* <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 sm:hidden">
                            View invoice<span aria-hidden="true"> &rarr;</span>
                        </a> */}
                        </div>

                        {/* Products */}
                        <div className="mt-6">
                        <h2 className="sr-only">Products purchased</h2>

                        <div className="space-y-8">
                            {obtenerPedidosUsuario.map((pedido) => (
                              <Pedido key={pedido.id} pedido={pedido} refetch={refetch}/>
                            ))}
                        </div>
                        </div>

                    </div>
                </div>

            </Layout>
        </div>
    )
}

export default pedidos



