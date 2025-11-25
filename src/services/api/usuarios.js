const API_URL = "/api"; 

// --- LOGIN ---
export async function login(credentials) {
    console.log(" Enviando credenciales:", credentials);

    const res = await fetch(`${API_URL}/usuarios/login`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(credentials),
    });

    const responseText = await res.text();
    let data;
    try {
        data = JSON.parse(responseText);
    } catch (error) {
        console.warn(" Backend devolvió texto plano:", responseText);
        data = { message: responseText }; 
    }

    if (!res.ok) {
        throw new Error(data.message || "Error de credenciales");
    }

    return data;
}

// --- REGISTRO (Con depuración mejorada) ---
export async function register(userData) {
    console.log(" Enviando registro al backend:", userData);

    const res = await fetch(`${API_URL}/usuarios`, { 
        method: "POST",
        headers: { 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(userData),
    });

    const responseText = await res.text();
    console.log(" RESPUESTA DEL BACKEND:", responseText);

    let data;
    try {
        data = JSON.parse(responseText);
    } catch (error) {
        data = { message: responseText };
    }

    if (!res.ok) {
        throw new Error(data.message || data.error || "Error al registrar usuario");
    }

    return data;
}

// --- GET USUARIOS (Admin) ---
export async function getUsuarios() {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : {};
    const token = user.token || user.accessToken || user.usuario?.token; 

    if (!token) console.warn(" Sin token para getUsuarios");

    const res = await fetch(`${API_URL}/usuarios`, {
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
        }
    });

    if (!res.ok) throw new Error("Error al cargar usuarios");
    return res.json();
}

// --- DELETE USUARIO (Admin) ---
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