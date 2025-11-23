// src/data/nosotros.js
const nosotros = {
    /* --> Seccion Presentacion*/
    presentacion: [
        { key: "vision", titulo: "Nuestra Visión", texto: "Ser la tienda de mascotas líder en Chile, ofreciendo productos de la más alta calidad y un servicio inigualable." },
        { key: "mision", titulo: "Nuestra Misión", texto: "Garantizar la felicidad y el bienestar de las mascotas y sus dueños a través de una experiencia de compra fácil y confiable." }
    ],

    /* --> Seccion Valores*/
    valores: [
        { icono: "fa-heart", titulo: "Amor por los Animales", descripcion: "Cada decisión que tomamos está guiada por el bienestar de las mascotas." },
        { icono: "fa-certificate", titulo: "Calidad Garantizada", descripcion: "Solo ofrecemos productos que cumplen con los más altos estándares." },
        { icono: "fa-handshake", titulo: "Servicio Excepcional", descripcion: "Atención personalizada y asesoría experta para cada cliente." },
        { icono: "fa-users", titulo: "Comunidad", descripcion: "Construimos relaciones duraderas con nuestros clientes y sus mascotas." }
    ],

    /* --> Seccion Equipo*/
    equipo: [
        { nombre: "María Gonzales", imagenUrl: "/img/equipo/maria.webp", cargo: "Gerente General" },
        { nombre: "Carlos Pinto", imagenUrl: "/img/equipo/carlos.webp", cargo: "Jefe de Logística" },
        { nombre: "Joaquín Iturriaga", imagenUrl: "/img/equipo/joaquin.webp", cargo: "Especialista en Nutrición" }
    ],

    /* --> Seccion Contacto*/
    contacto: {
        informacion: "Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos pronto. Nuestro equipo de soporte está disponible 24/7.",
        detalles: [
            {
                icono: "fa-envelope",
                titulo: "Información de Contacto",
                descripcion: "Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos pronto. Nuestro equipo de soporte está disponible 24/7."
            },
            {
                icono: "fa-phone",
                titulo: "Detalles de Contacto",
                descripcion: "Email: contacto@tienda.cl\nTeléfono: +56 9 1234 5678\nHorario: Lunes a Viernes 9:00 - 18:00"
            },
            {
                icono: "fa-map-marker",
                titulo: "Ubicación",
                descripcion: "Av. Principal 1234, Santiago, Chile. Estamos ubicados en el corazón de la ciudad."
            },
            {
                icono: "fa-clock",
                titulo: "Tiempo de Respuesta",
                descripcion: "Respondemos todos los mensajes en un plazo máximo de 24 horas hábiles. Tu consulta es importante para nosotros."
            }
        ],
        email: "contacto@tienda.cl",
        telefono: "+56 9 1234 5678",
        horario: "Lunes a Viernes 9:00 - 18:00",
        ubicacion: "Av. Principal 1234, Santiago, Chile"
    },

    /* --> Seccion Login*/
    login: {
        cardInfo: {
            icono: "fa-user",
            titulo: "Iniciar Sesión",
            descripcion: "Accede a tu cuenta de Morenoshop"
        }
    },

    /* --> Seccion Categorias*/
    categorias : [
        {
            nombre: "Perros",
            extra: "Alimentos, juguetes y accesorios",
            image: "/img/CategoriaPerros.webp"
        },
        {
            nombre: "Gatos",
            extra: "Arena, alimentos, rascadores",
            image: "/img/CategoriaGatos.webp"
        },
        {
            nombre: "Accesorios",
            extra: "Collares, camas y peines",
            image: "/img/CategoriaAccesorios.webp"
        }
    ],

    /* --> Seccion CardCrearCuenta*/
    crearCuenta : {
        titulo: "¿Listo para cuidar mejor a tu mascota?",
        descripcion: "Regístrate hoy y obtén acceso a ofertas exclusivas, consejos de expertos y un servicio personalizado para ti y tu compañero peludo."
    },

    /* --> Seccion CardPresentacion*/
    bienvenidos: {
        titulo: "Bienvenido Todo lo que tu mascota necesita en un solo lugar",
        descripcion: "Descubre nuestra amplia selección de productos premium para el cuidado, alimentación y diversión de tus compañeros peludos.",
        image: "/img/CardPresentacion.webp"
    }
};

export default nosotros;