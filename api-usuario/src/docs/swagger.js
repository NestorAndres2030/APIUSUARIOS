const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Gestión de Usuarios API',
            version: '1.0.0',
            description: 'API para gestionar usuarios con operaciones CRUD',
        },
    },
    apis: ['./routes/*.js'], // Ruta a los comentarios en los archivos de rutas
};

module.exports = swaggerJsDoc(swaggerOptions);
