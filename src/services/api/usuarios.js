const API_URL = "https://back-m41x.onrender.com/api/usuarios";

export async function login(email, password) {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        console.log("Response status:", response.status); // Para debug
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Credenciales incorrectas");
        }

        const usuario = await response.json();
        console.log("Usuario recibido:", usuario); // Para debug
        return usuario;

    } catch (error) {
        console.error("Error en login:", error);
        throw error;
    }
}