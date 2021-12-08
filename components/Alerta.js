import React, { Fragment, useContext, useState } from 'react'
import { Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/solid'
import { AlertaContext } from '../context/alertas/AlertaState';

const Alerta = () => {
    const [show, setShow] = useState(true);
    const {mensaje, ocultarMensajeError} = useContext(AlertaContext);
    return (
        <>
            <div
                aria-live="assertive"
                className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start z-50"
            >
                <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
                    <Transition
                        show={show}
                        as={Fragment}
                        enter="transform ease-out duration-300 transition"
                        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="backdrop-filter max-w-sm w-full bg-transparent shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden backdrop-blur-xl">
                        <div className="p-4">
                            <div className="flex items-center">
                            <div className="w-0 flex-1 flex justify-between">
                                <p className="w-0 flex-1 text-sm font-medium text-red-600">🤕 {mensaje}</p>
                                <button
                                type="button"
                                className="ml-3 flex-shrink-0 bg-transparent rounded-md text-sm font-medium text-red-600 hover:text-red-500"
                                >
                                    Cerrar
                                </button>
                            </div>
                            <div className="ml-4 flex-shrink-0 flex">
                                <button
                                className="bg-transparent rounded-md inline-flex text-red-600 hover:text-red-700 focus:outline-none cursor-pointer"
                                onClick={() => {
                                    setShow(false);
                                    ocultarMensajeError();
                                }}
                                >
                                    <span className="sr-only">Close</span>
                                    <XIcon className="h-5 w-5" aria-hidden="true" />
                                </button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </>
    )
}

export default Alerta
