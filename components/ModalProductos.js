import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
// import { CheckIcon } from '@heroicons/react/outline'

const orders = [
    {
      number: 'WU88191111',
      date: 'January 22, 2021',
      datetime: '2021-01-22',
      invoiceHref: '#',
      total: '$238.00',
      products: [
        {
          id: 1,
          name: 'Machined Pen and Pencil Set',
          href: '#',
          price: '$70.00',
          status: 'Delivered Jan 25, 2021',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/order-history-page-02-product-01.jpg',
          imageAlt: 'Detail of mechanical pencil tip with machined black steel shaft and chrome lead tip.',
        },
        // More products...
      ],
    },
    // More orders...
  ]

const ModalProductos = ({open, setOpen, pedido}) => {
    // const [open, setOpen] = useState(true);
    // console.log(pedido);
    const tranformaDate = fecha => {
        const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  
        const date = fecha ? new Date(Number(fecha)) : new Date();
        const dateString = `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
        return dateString;
    }
    return (
        <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" static className="fixed z-10 inset-0 overflow-y-auto" open={open} onClose={setOpen}>
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <Dialog.Overlay className="backdrop-filter backdrop-blur-lg fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                &#8203;
            </span>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6">

                    
                <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:pb-24 lg:px-8">
                    <div className="max-w-xl">
                    <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">Orden</h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Check the status of recent orders, manage returns, and download invoices.
                    </p>
                    </div>

                    <div className="mt-16">
                    <h2 className="sr-only">Recent orders</h2>

                    <div className="space-y-20">
                        <div>
                            <div className="bg-gray-50 rounded-lg py-6 px-4 sm:px-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 lg:space-x-8">
                            <dl className="divide-y divide-gray-200 space-y-6 text-sm text-gray-600 flex-auto sm:divide-y-0 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-x-6 lg:w-1/2 lg:flex-none lg:gap-x-8">
                                <div className="flex justify-between sm:block">
                                <dt className="font-medium text-gray-900">Fecha Pedido</dt>
                                <dd className="sm:mt-1">
                                    <time dateTime="2021-10-05">{tranformaDate(pedido.creado)}</time>
                                </dd>
                                </div>
                                <div className="flex justify-between pt-6 sm:block sm:pt-0">
                                <dt className="font-medium text-gray-900">Order number</dt>
                                <dd className="sm:mt-1">WU{pedido.id}</dd>
                                </div>
                            </dl>
                            <div className="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
                                <dt>Precio Total</dt>
                                <dd className="sm:mt-1">{pedido.total.toFixed(2)}</dd>
                            </div>
                           
                            </div>

                            <table className="mt-4 w-full text-gray-500 sm:mt-6 overflow-y-auto">
                                <caption className="sr-only">Products</caption>
                                <thead className="sr-only text-sm text-gray-500 text-left sm:not-sr-only">
                                    <tr>
                                        <th scope="col" className="sm:w-2/5 lg:w-1/3 pr-8 py-3 font-normal">
                                            Producto
                                        </th>
                                        <th scope="col" className="hidden w-1/5 pr-8 py-3 font-normal sm:table-cell">
                                            Precio
                                        </th>
                                        <th scope="col" className="hidden pr-8 py-3 font-normal sm:table-cell">
                                            Cantidad
                                        </th>
                                        <th scope="col" className="w-0 py-3 font-normal text-right">
                                            Descripción
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="border-b border-gray-200 divide-y divide-gray-200 text-sm sm:border-t overflow-y-scroll">
                                    {pedido.pedido.map((producto) => (
                                    <tr key={producto.id}>
                                        <td className="py-6 pr-8">
                                            <div className="flex items-center">
                                                {/* <img
                                                src={producto.imageSrc}
                                                alt={producto.imageAlt}
                                                className="w-16 h-16 object-center object-cover rounded mr-6"
                                                /> */}
                                                <div>
                                                    <div className="font-medium text-gray-900">{producto.nombre}</div>
                                                    <div className="mt-1 sm:hidden">{producto.precio}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="hidden py-6 pr-8 sm:table-cell"> 
                                            {producto.precio.toFixed(2)}
                                        </td>
                                        <td className="hidden py-6 pr-8 sm:table-cell">
                                            {producto.cantidad}
                                        </td>
                                        <td className="py-6 font-medium text-right whitespace-nowrap">
                                            <a href='#!' className="text-indigo-600">
                                                Ver<span className="hidden lg:inline"> Descripción</span>
                                                <span className="sr-only">, {producto.nombre}</span>
                                            </a>
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="mt-5 sm:mt-6">
                    <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none"
                    onClick={() => setOpen(false)}
                    >
                        Cerrar Producto
                    </button>
                </div>

                </div>
            </Transition.Child>
            </div>
        </Dialog>
    </Transition.Root>
    )
}

export default ModalProductos
