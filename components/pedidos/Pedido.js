import React, { useContext, useEffect, useState } from 'react'
import { PedidoContext } from '../../context/pedido/PedidoState';

const cardColors = [
    "azure",
    "beige",
    "bisque",
    "blanchedalmond",
    "burlywood",
    "peru",
    "cornsilk",
    "gainsboro",
    "ghostwhite",
    "ivory",
    "khaki",
];

const Pedido = ({product}) => {
    const {cantidadProductos, actualizarTotal} = useContext(PedidoContext);
    const [cantidad, setCantidad] = useState(1);
    // const [error, setError] = useState(false);
    const handleChange = (e) => {
        setCantidad(e.target.value);
    }
    
    useEffect(() => {
        if (cantidad < 1) return; 
        // console.log('me llame effect');
        actualizarCantidad();
        actualizarTotal();
        // }
    }, [cantidad])

    const actualizarCantidad = _ => {
        const nuevoProducto = {...product, cantidad: Number(cantidad)}
        cantidadProductos(nuevoProducto);
    }

    const pickColor = () => {
        let rand = Math.floor(Math.random() * 10);
        return cardColors[rand];
    };


    return (
        <li 
            className="flex items-start py-3 space-x-2 p-2 rounded-lg"
            style={{ backgroundColor: pickColor() }}
        >
            <div className="flex-auto space-y-1">
                <h3>{product.nombre}</h3>
                {/* <p className="text-gray-500">X {product.color}</p> */}
                <p className="text-gray-600">p/u {product.precio}</p>
            </div>
            <input
                type="number"
                min={"1"}
                name="cantidad"
                // autoComplete="email"
                className={`block ${cantidad < 1 ? "border-red-600 border-2" : "border-gray-300"} rounded-md flex-none text-base font-medium`}
                onChange={e => handleChange(e)}
                value={cantidad}
            />
        </li>
    )
}

export default Pedido
