import {gql} from '@apollo/client';

export const NUEVO_USUARIO = gql`
    mutation nuevoUsuario($input: UsuarioInput) {
        nuevoUsuario(input: $input) {
            id
            nombre
            apellido
            email
        }
    }
`;

export const AUTENTICAR_USUARIO = gql`
    mutation autenticarUsuario($input: AutenticarInput) {
        autenticarUsuario(input: $input) {
            token
        }
    }
`;

export const NUEVO_CLIENTE = gql`
    mutation nuevoCliente($input: ClienteInput) {
        nuevoCliente(input: $input) {
            id
            nombre
            apellido
            empresa
            email
            telefono
            vendedor
        }
    }
`;

export const ELIMINAR_CLIENTE = gql`
    mutation eliminarCliente($id: ID!) {
        eliminarCliente(id: $id) 
    }
`;

export const ACTUALIZAR_CLIENTE = gql`
    mutation actualizarCliente($id: ID!, $input: ClientUpdateInput) {
        actualizarCliente(id: $id, input: $input) {
            id
            nombre
            apellido
            empresa
            email
            telefono
            vendedor
        }
    }
`;

export const ELIMINAR_PRODUCTO = gql`
    mutation eliminarProducto($id: ID!) {
        eliminarProducto(id: $id) 
    }
`;

export const CREAR_PRODUCTO = gql`
    mutation nuevoProducto($input: ProductoInput) {
        nuevoProducto(input: $input) {
            id
            nombre
            existencia
            precio
            creado
        }
    }
`;

export const ACTUALIZAR_PRODUCTO = gql`
    mutation actualizarProducto($id: ID!, $input: UpdateProductoInput) {
        actualizarProducto(id: $id, input: $input) {
            id
            nombre
            existencia
            precio
            creado
        }
    }
`;

export const NUEVO_PEDIDO = gql`
    mutation nuevoPedido($input: PedidoInput) {
        nuevoPedido(input: $input) {
            id
            cliente {
                id
                nombre
                apellido
                empresa
                email
                telefono
                vendedor
            }
            vendedor
            pedido {
                id,
                cantidad
            },
            total
            estado
        }
    }
`;

export const ACTUALIZAR_PEDIDO = gql`
    mutation actualizarPedido($id: ID!, $clienteId: ID!, $input: PedidoActualizarInput) {
            actualizarPedido(id: $id, clienteId: $clienteId , input: $input) {
            id
            estado
            pedido {
                id
                cantidad
            }
            total
            vendedor
        }
    }
`;

export const ELIMINAR_PEDIDO = gql`
    mutation eliminarPedido($id: ID!){
        eliminarPedido(id: $id)
    }
`;


