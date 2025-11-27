const API_URL = "https://back-m41x.onrender.com/api";

// Helper para obtener token
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

// --- OBTENER PRODUCTOS ---
export async function getProductos() {
    const res = await fetch(`${API_URL}/productos`);
    if (!res.ok) throw new Error("Error al cargar productos");
    return res.json();
}

// --- CREAR PRODUCTO ---
export async function createProducto(data) {
    const token = getToken();
    const headers = { "Content-Type": "application/json" };

    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(`${API_URL}/productos`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    });

    const responseText = await res.text();
    let jsonData;
    try {
        jsonData = JSON.parse(responseText);
    } catch (e) {
        jsonData = { message: responseText };
    }

    if (!res.ok) {
        // Si falla por auth, avisamos
        if (res.status === 401 || res.status === 403) {
            throw new Error("Sesión expirada o sin permisos.");
        }
        throw new Error(jsonData.message || "Error al crear producto");
    }

    return jsonData;
}

// --- ELIMINAR PRODUCTO ---
export async function deleteProducto(id) {
    const token = getToken();
    const headers = {};
    
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(`${API_URL}/productos/${id}`, {
        method: "DELETE",
        headers: headers
    });

    if (!res.ok) throw new Error("Error al eliminar");
    return true;
}