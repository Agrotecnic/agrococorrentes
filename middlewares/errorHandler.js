// middlewares/errorHandler.js

/**
 * Middleware de erro centralizado para o Express.
 * Captura erros que ocorrem no pipeline de requisições e envia uma
 * resposta de erro padronizada em formato JSON.
 */
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Loga o stack do erro para depuração

    // Define um status code padrão para o erro, caso não seja especificado
    const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

    res.status(statusCode).json({
        error: {
            message: err.message || 'Ocorreu um erro interno no servidor.',
            // Opcional: incluir o stack do erro em ambiente de desenvolvimento
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        }
    });
};

module.exports = errorHandler;
