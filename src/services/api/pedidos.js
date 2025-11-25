// src/services/api/pedidos.js

const API_URL = "/api"; // Proxy

const getToken = () => {
    const storedUser = localStorage.getItem("user"); // Llave correcta
    if (!storedUser) return null;
    try {
        const user = JSON.parse(storedUser);
        // Buscamos el token donde sea
        return user.token || user.accessToken || user.usuario?.token || null;
    } catch (e) {
        return null;
    }
};

// --- CREAR PEDIDO ---
export async function createPedido(pedidoData) {
    const token = getToken();
    
    const headers = {
        "Content-Type": "application/json"
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_URL}/pedidos`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(pedidoData),
        credentials: 'include' // Importante para cookies
    });

    const responseText = await res.text();
    let jsonData;
    try {
        jsonData = JSON.parse(responseText);
    } catch (e) {
        jsonData = { message: responseText };
    }

    if (!res.ok) {
        throw new Error(jsonData.message || "Error al crear el pedido");
    }

    return jsonData;
}

// --- OBTENER TODOS (Admin) ---
export async function getPedidos() {
    const token = getToken();
    const headers = { "Content-Type": "application/json" };
    
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(`${API_URL}/pedidos`, {
        headers: headers,
        credentials: 'include'
    });

    if (!res.ok) throw new Error("Error al cargar pedidos");
    return res.json();
}

// --- OBTENER POR USUARIO ---
export async function getPedidosPorUsuario(idUsuario) {
    const token = getToken();
    const headers = { "Content-Type": "application/json" };
    
    if (token) headers["Authorization"] = `Bearer ${token}`;

    // Si no pasamos ID, intentamos deducirlo del token/session en el backend
    // Ojo: Ajusta la URL si tu backend requiere el ID explícito en la ruta
    const url = idUsuario 
        ? `${API_URL}/pedidos/usuario/${idUsuario}` 
        : `${API_URL}/pedidos/mis-pedidos`; // Ruta alternativa común

    const res = await fetch(url, {
        headers: headers,
        credentials: 'include'
    });

    if (!res.ok) throw new Error("Error al cargar tus pedidos");
    return res.json();
}