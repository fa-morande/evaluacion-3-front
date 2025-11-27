const API_URL = "https://back-m41x.onrender.com/api";

const getToken = () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return null;
    try {
        const user = JSON.parse(storedUser);
        return user.token || user.accessToken || user.usuario?.token || null;
    } catch (e) {
        return null;
    }
};

// Helper ID usuario
const getUserId = () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return null;
    try {
        const data = JSON.parse(storedUser);
        return data.id || data.usuario?.id; 
    } catch (e) {
        return null;
    }
};

// --- CREAR PEDIDO ---
export async function createPedido(pedidoData) {
    const token = getToken();
    const headers = { "Content-Type": "application/json" };

    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(`${API_URL}/pedidos`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(pedidoData),
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Error al crear el pedido");
    }

    return res.json();
}

// --- OBTENER TODOS LOS PEDIDOS (Admin) ---
export async function getPedidos() {
    const token = getToken();
    const headers = { "Content-Type": "application/json" };
    
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(`${API_URL}/pedidos`, {
        headers: headers
    });

    if (!res.ok) throw new Error("Error al cargar pedidos");
    return res.json();
}

// --- OBTENER PEDIDOS POR USUARIO ---
export async function getPedidosPorUsuario(idUsuario) {
    const token = getToken();
    const headers = { "Content-Type": "application/json" };
    
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const id = idUsuario || getUserId();
    if (!id) throw new Error("Usuario no identificado");

    const res = await fetch(`${API_URL}/pedidos/usuario/${id}`, {
        headers: headers
    });

    if (!res.ok) throw new Error("Error al cargar tus pedidos");
    return res.json();
}