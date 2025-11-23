const API_URL = "https://back-m41x.onrender.com/api";

export async function createPedido(pedidoData) {
    try {
        const response = await fetch(`${API_URL}/pedidos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(pedidoData),
        });

        if (!response.ok) {
            throw new Error("Error al crear el pedido");
        }

        return await response.json();
    } catch (error) {
        console.error("Error creando pedido:", error);
        throw error;
    }
}

export async function getPedidosPorUsuario(usuarioId) {
    try {
        const response = await fetch(`${API_URL}/pedidos/usuario/${usuarioId}`);
        
        if (!response.ok) {
            throw new Error("Error al obtener pedidos");
        }

        return await response.json();
    } catch (error) {
        console.error("Error obteniendo pedidos:", error);
        throw error;
    }
}

export async function getPedidoById(id) {
    try {
        const response = await fetch(`${API_URL}/pedidos/${id}`);
        
        if (!response.ok) {
            throw new Error("Error al obtener pedido");
        }

        return await response.json();
    } catch (error) {
        console.error("Error obteniendo pedido:", error);
        throw error;
    }
}