const Joi = require('joi');

// Schema de validação para a criação e atualização de produtos.
// Baseado no arquivo db/schema.sql
const produtoSchema = Joi.object({
    segmento: Joi.string().max(100).required(),
    bu: Joi.string().max(50).required(),
    produto: Joi.string().max(100).required(),
    marca: Joi.string().max(100).required(),
    preco_litro: Joi.number().precision(2).positive().required(),
    dose_ha: Joi.number().precision(2).positive().required(),
    custo_ha: Joi.number().precision(2).positive().required(),
    classif_dose: Joi.string().max(50).allow(null, ''),
    classif_preco: Joi.string().max(50).allow(null, ''),
    reconhec_mercado: Joi.string().max(50).allow(null, ''),
    reconhec_consultor: Joi.string().max(100).allow(null, ''),
    composicao: Joi.string().max(100).allow(null, ''),
    estagio_uso: Joi.string().max(50).allow(null, ''),
    classificacao_final: Joi.string().max(50).allow(null, ''),
    qualidade_tecnica: Joi.string().max(50).allow(null, ''),
    resultados_campo: Joi.string().allow(null, ''),
    foco_empresa: Joi.boolean(),
    mencoes: Joi.number().integer().min(0)
});

module.exports = {
    produtoSchema
};
