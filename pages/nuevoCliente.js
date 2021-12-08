import React, { useContext, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import {useFormik} from 'formik'
import * as Yup from 'yup';
import { ExclamationCircleIcon } from '@heroicons/react/solid'
import { useMutation } from '@apollo/client';
import { NUEVO_CLIENTE } from '../config/mutations';
import { AlertaContext } from '../context/alertas/AlertaState';
import Loading from '../components/Loading';
import SuccessModal from '../components/SuccessModal';
import { OBTENER_CLIENTES_USUARIO } from '../config/querys';
import { decodeToken } from '../helper/decodeToken';
import router from 'next/router';
// expresion reggular
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const nuevoCliente = () => {
    const [loading, setloading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [nuevoCliente] = useMutation(NUEVO_CLIENTE, {
        update(cache, {data: {nuevoCliente}}) {
            // obtener objeto cache que se desea modificar
            const {obtenerClientesUsuario} = cache.readQuery({
                query: OBTENER_CLIENTES_USUARIO,
                variables: {
                    id: decodeToken().id
                }
            });
            // console.log(obtenerClientesUsuario);
            // reescribir el cache
            cache.writeQuery({
                query: OBTENER_CLIENTES_USUARIO,
                variables:  {
                    id: decodeToken().id
                },
                data: {
                    obtenerClientesUsuario: [...obtenerClientesUsuario, nuevoCliente],
                }
            })
        }
    });
    const {mensajeError, mostrarMensajeError, ocultarMensajeError} = useContext(AlertaContext);
    useEffect(() => {
        return () => {
            ocultarMensajeError();
        }
    }, [])

    const formik = useFormik({
        initialValues: {
            nombre: '',
            apellido: '',
            email: '',
            empresa: '',
            telefono: ''
        },
        validationSchema: Yup.object({
            nombre: Yup.string()
                    .trim()
                    .required('El Nombre es obligatorio')
                    .test('len', 'Su nombre puede ser más descriptivo 😅', val => val?.length >= 2),
            apellido: Yup.string()
                    .trim()
                    .required('Los apellidos son obligatorios')
                    .test('len', 'El nombre de usuario debe de tener por lo menos 3 caracteres 😅', val => val?.length >= 3),
            email: Yup.string()
                    .trim()
                    .email()
                    .required('El Email es obligatorio'),
            empresa: Yup.string()
                    .trim()
                    .required('El nombre de la empresa es obligatorio')
                    .test('len', 'El nombre debe ser mas descriptivo 😅', val => val?.length >= 4),
            telefono: Yup.string()
                    .required('El numero teléfonico es obligatorio')
                    .matches(phoneRegExp, 'numero teléfonico no valido')
                    .min(9, "El numero teléfonico debe contener 9 caracteres")
                    .max(9, "El numero teléfonico debe contener 9 caracteres"),
        }),
        onSubmit: async values => {
            setloading(true);
            try {
                const {data} = await nuevoCliente({
                    variables: {
                        input: values,
                    }
                });
                // console.log(data);
                // if (data) {
                formik.resetForm();
                setMensaje('El cliente fue registrado satisfactoriamente');
                setSuccess(true);
                // } 
            } catch (e) {
                console.log(e);
                mensajeError(e.message);
                mostrarMensajeError();
            }
            setloading(false);
        }
    });
    
    return (
        <Layout>
            {loading&&<Loading />}
            {success&&<SuccessModal mensaje={mensaje} setSuccess={setSuccess} />}
            <form className="space-y-8 divide-y divide-gray-200" onSubmit={formik.handleSubmit}>
                <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                    <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                        <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Registro Cliente</h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">Use a permanent address where you can receive mail.</p>
                        </div>

                        <div className="space-y-6 sm:space-y-5">
                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Nombre
                                </label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2 relative">
                                    <input
                                        type="text"
                                        name="nombre"
                                        id="nombre"
                                        autoComplete="given-name"
                                        className="max-w-lg block w-full shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:max-w-xs sm:text-base border-gray-300 rounded-md"
                                        value={formik.values.nombre}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.nombre&&formik.errors.nombre&&<div 
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none top-0"
                                    >
                                        <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                                    </div>}
                                </div>
                                {formik.touched.nombre&&formik.errors.nombre&&<p className="mt-2 text-sm text-red-600" id="nombre">
                                    {formik.errors.nombre}
                                </p>}
                            </div>

                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                <label htmlFor="apellido" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Apellidos
                                </label>
                                <div className="relative mt-1 sm:mt-0 sm:col-span-2">
                                    <input
                                        type="text"
                                        name="apellido"
                                        id="apellido"
                                        autoComplete="family-name"
                                        className="max-w-lg block w-full shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:max-w-xs sm:text-base border-gray-300 rounded-md"
                                        value={formik.values.apellido}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.apellido&&formik.errors.apellido&&<div 
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none top-0"
                                        >
                                        <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                                    </div>}
                                </div>
                                {formik.touched.apellido&&formik.errors.apellido&&<p className="mt-2 text-sm text-red-600" id="apellido">
                                    {formik.errors.apellido}
                                </p>}
                            </div>

                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Email
                                </label>
                                <div className="relative mt-1 sm:mt-0 sm:col-span-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        className="block max-w-lg w-full shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-base border-gray-300 rounded-md"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.email&&formik.errors.email&&<div 
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none top-0"
                                            >
                                        <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                                    </div>}
                                </div>
                                {formik.touched.email&&formik.errors.email&&<p className="mt-2 text-sm text-red-600" id="email-error">
                                    {formik.errors.email}
                                </p>}
                            </div>

                            {/* <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Empresa
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <select
                                id="country"
                                name="country"
                                autoComplete="country"
                                className="max-w-lg block focus:ring-yellow-500 focus:border-yellow-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                >
                                <option>United States</option>
                                <option>Canada</option>
                                <option>Mexico</option>
                                </select>
                            </div>
                            </div> */}

                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                <label htmlFor="empresa" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Empresa
                                </label>
                                <div className="relative mt-1 sm:mt-0 sm:col-span-2">
                                    <input
                                        type="text"
                                        name="empresa"
                                        id="empresa"
                                        autoComplete="organization"
                                        className="block max-w-lg w-full shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-base border-gray-300 rounded-md"
                                        value={formik.values.empresa}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.empresa&&formik.errors.empresa&&<div 
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none top-0"
                                            >
                                        <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                                    </div>}
                                </div>
                                {formik.touched.empresa&&formik.errors.empresa&&<p className="mt-2 text-sm text-red-600" id="empresa">
                                    {formik.errors.empresa}
                                </p>}
                            </div>

                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Teléfono
                            </label>
                            <div className="relative mt-1 sm:mt-0 sm:col-span-2">
                                <input
                                    type="text"
                                    name="telefono"
                                    id="telefono"
                                    autoComplete='tel'
                                    className="max-w-lg block w-full shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:max-w-xs sm:text-base border-gray-300 rounded-md"
                                    value={formik.values.telefono}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                 {formik.touched.telefono&&formik.errors.telefono&&<div 
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none top-0"
                                        >
                                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                                </div>}
                            </div>
                            {formik.touched.telefono&&formik.errors.telefono&&<p className="mt-2 text-sm text-red-600" id="telefono">
                                {formik.errors.telefono}
                            </p>}
                        </div>

                        {/* <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                            State / Province
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <input
                            type="text"
                            name="state"
                            id="state"
                            className="max-w-lg block w-full shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                        </div> */}

                        {/* <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label htmlFor="zip" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                            ZIP / Postal
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <input
                            type="text"
                            name="zip"
                            id="zip"
                            autoComplete="postal-code"
                            className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                        </div> */}
                    </div>
                    </div>
                    {/* Notificaciones */}
                    {/* <div className="divide-y divide-gray-200 pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Notifications</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        We'll always let you know about important changes, but you pick what else you want to hear about.
                        </p>
                    </div>
                    <div className="space-y-6 sm:space-y-5 divide-y divide-gray-200">
                        <div className="pt-6 sm:pt-5">
                        <div role="group" aria-labelledby="label-email">
                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
                            <div>
                                <div className="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700" id="label-email">
                                By Email
                                </div>
                            </div>
                            <div className="mt-4 sm:mt-0 sm:col-span-2">
                                <div className="max-w-lg space-y-4">
                                <div className="relative flex items-start">
                                    <div className="flex items-center h-5">
                                    <input
                                        id="comments"
                                        name="comments"
                                        type="checkbox"
                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                    />
                                    </div>
                                    <div className="ml-3 text-sm">
                                    <label htmlFor="comments" className="font-medium text-gray-700">
                                        Comments
                                    </label>
                                    <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="relative flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                        id="candidates"
                                        name="candidates"
                                        type="checkbox"
                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="candidates" className="font-medium text-gray-700">
                                        Candidates
                                        </label>
                                        <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                                    </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="relative flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                        id="offers"
                                        name="offers"
                                        type="checkbox"
                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="offers" className="font-medium text-gray-700">
                                        Offers
                                        </label>
                                        <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="pt-6 sm:pt-5">
                        <div role="group" aria-labelledby="label-notifications">
                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
                            <div>
                                <div
                                className="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700"
                                id="label-notifications"
                                >
                                Push Notifications
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <div className="max-w-lg">
                                <p className="text-sm text-gray-500">These are delivered via SMS to your mobile phone.</p>
                                <div className="mt-4 space-y-4">
                                    <div className="flex items-center">
                                    <input
                                        id="push-everything"
                                        name="push-notifications"
                                        type="radio"
                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                    />
                                    <label htmlFor="push-everything" className="ml-3 block text-sm font-medium text-gray-700">
                                        Everything
                                    </label>
                                    </div>
                                    <div className="flex items-center">
                                    <input
                                        id="push-email"
                                        name="push-notifications"
                                        type="radio"
                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                    />
                                    <label htmlFor="push-email" className="ml-3 block text-sm font-medium text-gray-700">
                                        Same as email
                                    </label>
                                    </div>
                                    <div className="flex items-center">
                                    <input
                                        id="push-nothing"
                                        name="push-notifications"
                                        type="radio"
                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                    />
                                    <label htmlFor="push-nothing" className="ml-3 block text-sm font-medium text-gray-700">
                                        No push notifications
                                    </label>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div> */}
                    {/* end notificaciones */}
                </div>

                <div className="pt-5">
                    <div className="flex justify-end">
                    <button
                        type="button"
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                        onClick={_ => router.back()}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none"
                        onClick={_ => {
                            ocultarMensajeError();
                        }}
                    >
                        Registrar cliente
                    </button>
                    </div>
                </div>
            </form>
        </Layout>
    )
}

export default nuevoCliente
