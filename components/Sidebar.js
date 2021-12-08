import React, { useState, Fragment } from 'react'
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react'
import router, {useRouter} from 'next/router';
import {
  UserGroupIcon,
  ChartBarIcon,
  FolderIcon,
  MenuIcon,
  UsersIcon,
  XIcon,
  ClipboardListIcon,
  LockClosedIcon
} from '@heroicons/react/outline'
import { useQuery } from '@apollo/client';
import { OBTENER_USUARIO } from '../config/querys';
import Loading from './Loading';
import ErrorPage from './ErrorPage';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Sidebar = ({children}) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentpathname, setCurrentpathname] = useState('/');
    // router de next
    const {pathname} = useRouter();
    const {data, loading, error} = useQuery(OBTENER_USUARIO);
    
    const navigation = [
        { name: 'clientes', href: '/', icon: UsersIcon },
      //   { name: 'clientes', href: '/', icon: HomeIcon, current: true },
        { name: 'pedidos', href: '/pedidos', icon: FolderIcon },
      //   { name: 'pedidos', href: '/pedidos', icon: UsersIcon, current: false },
      //   { name: 'Projects', href: '#', icon: FolderIcon, current: false },
      //   { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
        { name: 'Productos', href: '/productos', icon: ClipboardListIcon},
        { name: 'Mejor Vendedores', href: '/mejoresVendedores', icon: ChartBarIcon },
        { name: 'Mejor clientes', href: 'mejoresClientes', icon: UserGroupIcon },
    ]

    if(loading) return <Loading />;
    if(error) return <ErrorPage />;
    if(!data) return router.push('/login');

    // console.log(data.obtenerUsuario);

    const cerrarSesion = _ => {
      localStorage.removeItem('token');
      router.push('/login')
    }

    return (
        <>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 flex z-40 md:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                  <div className="flex-shrink-0 flex items-center px-4">
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                      alt="Workflow"
                    />
                  </div>
                  <nav className="mt-5 px-2 space-y-1">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                      >
                        <a 
                          className={classNames(
                            item.href === pathname ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                          )}
                          onClick={_ => setCurrentpathname(item.href)}
                        >
                            <item.icon
                              className={classNames(
                                item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                                'mr-4 flex-shrink-0 h-6 w-6'
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                        </a>
                      </Link>
                    ))}
                  </nav>
                </div>
                <div className="flex-shrink-0 flex bg-gray-700 p-4">
                  <a href="#" className="flex-shrink-0 group block">
                    <div className="flex items-center">
                      <div>
                        <img
                          className="inline-block h-10 w-10 rounded-full"
                          src="https://media.istockphoto.com/photos/evening-green-fields-landscapr-picture-id1221620068?s=612x612"
                          alt="perfil"
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-base font-medium text-white">{}</p>
                        <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300">View profile</p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14">{/* Force sidebar to shrink to fit close icon */}</div>
          </Dialog>
        </Transition.Root>
  
        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex-1 flex flex-col min-h-0 bg-gray-800">
              <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <div className="flex items-center flex-shrink-0 px-4">
                  <img
                    className="h-8 w-auto pr-2"
                    src="/img/logo1.png"
                    alt="Workflow"
                  />
                  <p className='text-yellow-400 font-bold text-2xl font-oswal'>CRM Cliente</p>
                </div>
                <nav className="mt-5 flex-1 px-2 bg-gray-800 space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                    >
                      <a 
                        className={classNames(
                            item.href === pathname ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                        )}
                      >
                          <item.icon
                            className={classNames(
                              item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                              'mr-3 flex-shrink-0 h-6 w-6'
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                      </a>
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="flex-shrink-0 flex bg-gray-700 p-4">
                <a href="#" className="flex-shrink-0 w-full group block">
                  <div className="flex items-center">
                    <div>
                      <img
                        className="inline-block h-8 w-8 rounded-full bg-white"
                        src="https://web.fedepalma.org/conferenciainternacional/wp-content/uploads/2020/01/img-avatar.png"
                        alt="avatar"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-200">{data.obtenerUsuario.nombre}</p>
                      <p className="text-xs font-medium text-gray-400 group-hover:text-gray-300">{data.obtenerUsuario.email}</p>
                    </div>
                  </div>
                </a>
              </div>
              <>
                <button
                  type="button"
                  className="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none"
                  onClick={cerrarSesion}
                >
                  <LockClosedIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
                  Cerrar Sesión
                </button>
              </>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
            <div className="py-6">
              {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
              </div> */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {/* Replace with your content */}
                <div className="py-4">
                    {children}
                </div>
                {/* /End replace */}
              </div>
            </div>
          </main>
        </div>
      </>
    )
}

export default Sidebar
