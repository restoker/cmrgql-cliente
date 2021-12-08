import React, { useContext, useState } from 'react'
import Layout from '../components/Layout'
import Link from 'next/link';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid'
import {useFormik} from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { NUEVO_USUARIO } from '../config/mutations';
import { AlertaContext } from '../context/alertas/AlertaState';
import SuccessModal from '../components/SuccessModal';
import Loading from '../components/Loading';
import {useRouter} from 'next/router';

const Registro = () => {
    const [visible, setVisible] = useState(true);
    const router = useRouter();
    const [nuevoUsuario] = useMutation(NUEVO_USUARIO);
    const {mensajeError, mostrarMensajeError, ocultarMensajeError} = useContext(AlertaContext);
    const [success, setSuccess] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            nombre: '',
            apellidos: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            nombre: Yup.string()
                    .trim()
                    .required('El Nombre es obligatorio 😡')
                    .test('len', 'Su nombre puede ser más descriptivo 😅', val => val?.length >= 2)
                    .matches(/^[a-zA-Z0-9-]*$/, "Su nombre no puede tener espacios en blanco"),
            apellidos: Yup.string()
                    .trim()
                    .required('El Usuario es obligatorio 😡')
                    .test('len', 'El nombre de usuario debe de tener por lo menos 3 caracteres 😅', val => val?.length >= 3),
            email: Yup.string()
                    .trim()
                    .required('El Email es obligatorio 😡'),
            password: Yup.string()
                    .trim()
                    .required('El Password es obligatorio 😡')
                    .test('len', 'Su Password puede ser más seguro 😅', val => val?.length >= 4),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            const {nombre, apellidos, email, password} = values;
            // const dataWillSend = {nombre, usuario, email, password};
            try {
                const {data} = await nuevoUsuario({
                    variables: {
                        input: {
                            nombre,
                            apellido: apellidos,
                            email,
                            password
                        }
                    }
                });
                // console.log(data);
                // mostrar mensaje de success
                formik.resetForm();
                setMensaje('Su cuenta se registro exitosamente');
                setSuccess(true);
                // redirigir usuario a iniciar sesion
            } catch (e) {
                // console.log(e);
                // console.log(e.message);
                mensajeError(e.message);
                mostrarMensajeError();
            }
            setLoading(false);
        }
    });

    const handleRouter = _ => {
        router.push('/login')
    }

    return (
        <>
            <Layout>
                {success&&<SuccessModal mensaje={mensaje} setSuccess={setSuccess} funcion={handleRouter}/>}
                {loading&&<Loading />}
                <div className="py-12 px-4 sm:px-6 lg:px-8 bg-transparent max-w-md w-full rounded-xl backdrop-filter backdrop-blur-lg border-gray-300 border-default border-opacity-50 shadow-2xl">
                    <div className="sm:mx-auto sm:w-full sm:max-w-lg">
                        <img
                        className="mx-auto h-12 w-auto"
                        src="./img/logo.png"
                        alt="Workflow"
                        />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Registro</h2>
                        <p className="mt-2 text-center text-sm text-gray-800">
                        O{' '}
                        <Link
                            href='/login'
                        >
                            <a className="font-medium text-gray-800 hover:text-gray-900">
                                si ya tienes cuenta <strong className='text-yellow-500 ml-1'>!Ingresa Aquí¡</strong> 
                            </a>
                        </Link>
                        </p>
                    </div>

                    <div className="mt-4">
                        <form 
                            className="space-y-4" 
                            action="#" 
                            method="POST"
                            onSubmit={formik.handleSubmit}
                        >
                            <div>
                                <label htmlFor="nombre" className="block text-sm font-bold text-gray-800">
                                    Nombre
                                </label>
                                <div className="mt-1">
                                    <input
                                    id="nombre"
                                    name="nombre"
                                    type="text"
                                    autoComplete="nombre"
                                    required
                                    className="font-bold appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-transparent"
                                    value={formik.values.nombre}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    />
                                </div>
                                {formik.touched.nombre&&formik.errors.nombre&&<p className='pt-1 text-yellow-300 pb-0 mb-0'>
                            ⚠️ {formik.errors.nombre}
                                </p>}
                            </div>

                            <div>
                                <label htmlFor="apellidos" className="block text-sm font-bold text-gray-800">
                                    Apellidos
                                </label>
                                <div className="mt-1">
                                    <input
                                    id="apellidos"
                                    name="apellidos"
                                    type="text"
                                    autoComplete="apellidos"
                                    required
                                    className="font-bold appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-transparent"
                                    value={formik.values.apellidos}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    />
                                </div>
                                {formik.touched.apellidos&&formik.errors.apellidos&&<p className='pt-1 text-yellow-300'>
                            ⚠️ {formik.errors.apellidos}
                                </p>}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm text-gray-800 font-bold">
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="font-bold appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-transparent"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.email&&formik.errors.email&&<p className='pt-1 text-yellow-300'>
                                    ⚠️ {formik.errors.email}
                                    </p>}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-bold text-gray-800">
                                    Password
                                </label>
                                <div className="mt-1 w-full relative">
                                    <input
                                    id="password"
                                    name="password"
                                    type={visible?"password":"text"}
                                    autoComplete="current-password"
                                    required
                                    className="font-bold appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-transparent"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    />
                                    {visible
                                    ?
                                        <EyeIcon 
                                            className="z-10 h-5 w-5 text-gray-900 group-hover:text-indigo-400 absolute right-5 top-2 cursor-pointer" 
                                            aria-hidden="true"
                                            onClick={_ => setVisible(false)} 
                                        />
                                    :
                                        <EyeOffIcon 
                                            className="h-5 w-5 text-gray-900 group-hover:text-indigo-400 absolute right-5 top-2 cursor-pointer" 
                                            aria-hidden="true" 
                                            onClick={_ => setVisible(true)} 
                                        />
                                    }
                                </div>
                                {formik.touched.password&&formik.errors.password&&<p className='pt-1 text-yellow-300'>
                                ⚠️ {formik.errors.password}
                                </p>}
                            </div>

                            {/* <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-gray-600  border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 font-bold">
                                    Recordarme
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-extrabold text-gray-800 hover:text-gray-900">
                                    ¿Olvidaste tu password?
                                </a>
                            </div>
                            </div> */}

                            <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                onClick={ _ => {
                                    ocultarMensajeError();
                                }}
                            >
                                Registro
                            </button>
                            </div>
                        </form>

                        <div className="mt-6">
                            <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white rounded-md text-gray-900">O continua con</span>
                            </div>
                            </div>

                            <div className="mt-6 grid grid-cols-3 gap-3">
                            <div>
                                <a
                                href="#!"
                                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-blue-600 hover:bg-blue-600 hover:border-blue-600 hover:text-white"
                                >
                                    <span className="sr-only">Sign in with Facebook</span>
                                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                        fillRule="evenodd"
                                        d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                                        clipRule="evenodd"
                                        />
                                    </svg>
                                </a>
                            </div>

                            <div>
                                <a
                                href="#"
                                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-cyan-400 hover:bg-cyan-400 hover:text-white hover:border-cyan-400"
                                >
                                    <span className="sr-only">Sign in with Twitter</span>
                                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                                    </svg>
                                </a>
                            </div>

                            <div>
                                <a
                                href="#"
                                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-black hover:bg-black hover:border-black hover:text-white"
                                >
                                    <span className="sr-only">Sign in with GitHub</span>
                                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                        fillRule="evenodd"
                                        d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                                        clipRule="evenodd"
                                        />
                                    </svg>
                                </a>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Registro
