const API_URL = "https://back-m41x.onrender.com/api";

// --- LOGIN ---
export async function login(credentials) {
    const res = await fetch(`${API_URL}/usuarios/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
    });

    const responseText = await res.text();
    let data;
    try {
        data = JSON.parse(responseText);
    } catch (error) {
        data = { message: responseText }; 
    }

    if (!res.ok) {
        throw new Error(data.message || "Error al conectar con el servidor");
    }

    return data;
}

// --- REGISTRO ---
export async function register(userData) {
    const res = await fetch(`${API_URL}/usuarios`, { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });

    const responseText = await res.text();
    let data;
    try {
        data = JSON.parse(responseText);
    } catch (error) {
        data = { message: responseText };
    }

    if (!res.ok) {
        throw new Error(data.message || "Error al registrar usuario");
    }

    return data;
}

// --- OBTENER USUARIOS (Admin) ---
export async function getUsuarios() {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : {};
    const token = user.token || user.accessToken || user.usuario?.token; 

    const res = await fetch(`${API_URL}/usuarios`, {
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
        }
    });

    if (!res.ok) throw new Error("Error al cargar usuarios");
    return res.json();
}

// --- ELIMINAR USUARIO (Admin) ---
export async function deleteUsuario(id) {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : {};
    const token = user.token || user.accessToken || user.usuario?.token;

    const res = await fetch(`${API_URL}/usuarios/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
    });

    if (!res.ok) throw new Error("Error al eliminar usuario");
    return res.json();
}