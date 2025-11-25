const API_URL = "/api";


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

export async function getProductos() {
    // credentials: 'include' es vital si tu backend usa Cookies
    const res = await fetch(`${API_URL}/productos`, {
        credentials: 'include' 
    });

    if (!res.ok) throw new Error("Error al cargar productos");
    return res.json();
}

export async function createProducto(data) {
    const token = getToken();

    const headers = {
        "Content-Type": "application/json"
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    } else {
        console.warn("⚠️ No se detectó token manual. Enviando petición con Cookies...");
    }

    const res = await fetch(`${API_URL}/productos`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
        credentials: 'include'
    });

    // Manejo robusto de respuesta
    const responseText = await res.text();
    let jsonData;
    try {
        jsonData = JSON.parse(responseText);
    } catch (e) {
        jsonData = { message: responseText };
    }

    if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
            throw new Error("Tu sesión ha expirado o no tienes permisos. Por favor, loguéate de nuevo.");
        }
        throw new Error(jsonData.message || "Error al crear producto");
    }

    return jsonData;
}

export async function deleteProducto(id) {
    const token = getToken();
    const headers = {};

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_URL}/productos/${id}`, {
        method: "DELETE",
        headers: headers,
        credentials: 'include'
    });

    if (!res.ok) throw new Error("Error al eliminar");
    return true;
}