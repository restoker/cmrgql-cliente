import React, { useState, Fragment, useEffect, useRef } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { MailIcon, PhoneIcon } from '@heroicons/react/outline';
import ModalProductos from './ModalProductos';
import { useMutation } from '@apollo/client';
import { ACTUALIZAR_PEDIDO, ELIMINAR_PEDIDO } from '../config/mutations';
import Loading from './Loading';
import ModalDelete from './ModalDelete';

const tipopedido = [
    { id: 1, name: 'Pendiente', online: false },
    { id: 2, name: 'Completado', online: true },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Pedido = ({pedido, refetch}) => {
    // console.log(pedido);
    const [modalDelete, setModalDelete] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [id, setId] = useState(null);
    const [selected, setSelected] = useState(tipopedido[0]);
    const [cargando, setCargando] = useState(false);
    const [eliminarPedido] = useMutation(ELIMINAR_PEDIDO);
    const [step, setStep] = useState(0);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (pedido.estado === "PENDIENTE") {
            setSelected(tipopedido[0]);
            setStep(0);
        } else {
            setSelected(tipopedido[1]);
            setStep(1);
        }
    }, [])
    // useEffect(() => {
    //     if (isMount) return;
    //     console.log('me ejecute');
    //     if (tipopedido[0].name === selected.name) {
    //           actualizarEstadoPedido('PENDIENTE');
    //           setStep(0);
    //     } else {
    //         actualizarEstadoPedido('COMPLETADO');
    //         setStep(1);
    //     }
    // }, [selected])

    const tranformaDate = fecha => {
        const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  
        const date = fecha ? new Date(fecha) : new Date();
        const dateString = `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
        return dateString;
    }

    const handleClick = _ => {
      setMensaje('¿Desea eliminar este pedido?');
      setModalDelete(true);
    }

    const handleDelete = async () => {
      // console.log('me elimine');
      // console.log(id);
      setCargando(true);
      try {
        const {data} = await eliminarPedido({
          variables: {
            id
          }
        })
        if (data) {
          refetch();
        }
      } catch (e) {
        console.log(e);
      }
      setCargando(false);
    }

    return (
        <>
            {open&&<ModalProductos open={open} setOpen={setOpen} pedido={pedido}/>}
            {cargando&&<Loading />}
            {modalDelete&&<ModalDelete modalDelete={modalDelete} mensaje={mensaje} setModalDelete={setModalDelete} funcion={handleDelete}/>}
            <div
                className={`bg-white border-t border-b ${selected.online ? "border-green-400" : "border-yellow-400"} shadow-sm sm:border sm:rounded-lg`}
            >
                <div className="py-6 px-4 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:p-8">
                <div className="sm:flex lg:col-span-7">
                    <div className="mt-6 sm:mt-0 sm:ml-6 space-y-3">
                        <h3 className="text-base font-medium text-gray-900">
                            Cliente: {pedido.cliente.nombre}
                        </h3>
                        <div className='flex items-center space-x-3'>
                            <MailIcon
                                className="h-6 w-6 text-gray-900 group-hover:text-indigo-400  cursor-pointer"
                                aria-hidden="true"
                            />
                            <p className="text-sm font-medium text-gray-900">
                                {pedido.cliente.email}
                            </p>
                        </div>
                        <div className='flex items-center space-x-3'>
                            <PhoneIcon
                                className="h-5 w-5 text-gray-900 group-hover:text-indigo-400 cursor-pointer"
                                aria-hidden="true"
                            />
                            <p className="text-sm text-gray-500">{pedido.cliente.telefono}</p>
                        </div>
                    </div>
                </div>
                <div className="mt-6 lg:mt-0 lg:col-span-5">
                    <dl className="grid grid-cols-2 gap-x-6 text-sm">
                        <div>
                            <dt className="font-medium text-gray-900">Lista de Productos</dt>
                            <dd className="mt-3 text-gray-500">
                            <button
                                type="button"
                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                onClick={_ => {
                                    setOpen(true);
                                }}
                            >
                                Ver Productos
                            </button>
                            </dd>
                        </div>
                        <div>
                            <dt className="font-medium text-gray-900">Actualizar estado</dt>
                            <SelectEstado selected={selected} setSelected={setSelected} pedido={pedido} setCargando={setCargando} />
                        </div>
                    </dl>
                </div>
                </div>
                <div className="border-t border-gray-200 py-6 px-4 sm:px-6 lg:p-8 flex w-full items-center">
                    <div className="mt-6 flex-1" aria-hidden="true">
                        <div className="bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-2 bg-indigo-600 rounded-full"
                            style={{ width: `calc((${step} * 2 + 1) / 8 * 100%)` }}
                        />
                        </div>
                        <div className="hidden sm:grid grid-cols-4 text-sm font-medium text-gray-600 mt-6">
                        <div className="text-indigo-600">Order placed</div>
                        <div className={classNames(step === 0 ? 'text-indigo-600' : '', 'text-center')}>
                            Processing
                        </div>
                        <div className={classNames(step === 1 ? 'text-indigo-600' : '', 'text-center')}>
                            Shipped
                        </div>
                        <div className={classNames(step === 2 ? 'text-indigo-600' : '', 'text-right')}>
                            Delivered
                        </div>
                        </div>
                    </div>
                    <div className="text-white">
                        <button 
                          type="button" 
                          className="font-medium bg-red-600 hover:bg-red-500 p-2 rounded-md w-full ml-4"
                          onClick={_ => {
                            setId(pedido.id);
                            handleClick();
                          }}
                        >
                            ☠️ Eliminar Pedido
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Pedido


const SelectEstado = ({selected, setSelected, pedido, setCargando}) => {
  const [actualizarPedido] = useMutation(ACTUALIZAR_PEDIDO);
  
  const handleChange = (value) => {
    // console.log(value);
    setCargando(true);
    actualizarEstadoPedido(value.name.toUpperCase());
  }

  const actualizarEstadoPedido = async (estado) => {
    // if (isMount) return;
    try {
      const {data} = await actualizarPedido({
        variables: {
          id: pedido.id,
          clienteId: pedido.cliente.id,
          input: {
            estado
          },
        }
      })

      if (data.actualizarPedido.estado === 'PENDIENTE') {
       setSelected(tipopedido[0]);
      } else if (data.actualizarPedido.estado === 'COMPLETADO') {
       setSelected(tipopedido[1]);
      }

    } catch (e) {
      console.log(e);
      setSelected(selected);
    }
    setCargando(false);
  }

  return (
        <Listbox 
            value={selected} 
            onChange={handleChange}
        >
        {({open}) => (
          <>
            {/* <Listbox.Label className="block text-sm font-medium text-gray-700">Assigned to</Listbox.Label> */}
            <div className="mt-1 relative">
              <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <div className="flex items-center">
                  <span
                    aria-label={selected.online ? 'Completado' : 'Pendiente'}
                    className={classNames(
                      selected.online ? 'bg-green-400' : 'bg-yellow-400',
                      'flex-shrink-0 inline-block h-2 w-2 rounded-full'
                    )}
                  />
                  <span className="ml-3 block truncate">{selected.name}</span>
                </div>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>
  
              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                  {tipopedido.map((person) => (
                    <Listbox.Option
                      key={person.id}
                      className={({ active }) =>
                        classNames(
                          active ? 'text-white bg-indigo-600' : 'text-gray-900',
                          'cursor-default select-none relative py-2 pl-3 pr-9'
                        )
                      }
                      value={person}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <span
                              className={classNames(
                                person.online ? 'bg-green-400' : 'bg-yellow-400',
                                'flex-shrink-0 inline-block h-2 w-2 rounded-full'
                              )}
                              aria-hidden="true"
                            />
                            <span
                              className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                            >
                              {person.name}
                              <span className="sr-only"> is {person.online ? 'online' : 'offline'}</span>
                            </span>
                          </div>
  
                          {selected ? (
                            <span
                              className={classNames(
                                active ? 'text-white' : 'text-indigo-600',
                                'absolute inset-y-0 right-0 flex items-center pr-4'
                              )}
                            >
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    )
}
