// Simulación de datos (MOCK)
let categoriasMock = [
    { id: 1, nombre: 'Perros', descripcion: 'Todo para perros', activa: true },
    { id: 2, nombre: 'Gatos', descripcion: 'Todo para gatos', activa: true },
    { id: 3, nombre: 'Accesorios', descripcion: 'Correas y juguetes', activa: true },
    { id: 4, nombre: 'Alimentos', descripcion: 'Comida premium', activa: true }
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getCategorias = async () => {
    await delay(500);
    return [...categoriasMock];
};

export const getCategoriasActivas = async () => {
    await delay(500);
    return categoriasMock.filter(c => c.activa);
};

export const createCategoria = async (data) => {
    await delay(500);
    const newCat = { ...data, id: Date.now(), activa: true };
    categoriasMock.push(newCat);
    return newCat;
};

export const updateCategoria = async (id, data) => {
    await delay(500);
    const index = categoriasMock.findIndex(c => c.id === id);
    if (index !== -1) {
        categoriasMock[index] = { ...categoriasMock[index], ...data };
        return categoriasMock[index];
    }
    throw new Error("Categoría no encontrada");
};

export const deleteCategoria = async (id) => {
    await delay(500);
    categoriasMock = categoriasMock.filter(c => c.id !== id);
    return true;
};