const bcrypt = require('bcrypt');
var DAO = require('../../DAO/DAO');
var { queryInsertSingle, queryUpdate } = require('../../util/queryGen');

async function createCliente(req, res) {
  const props = req.body;

  try {
    let query = /*SQL*/ `
      INSERT INTO dim_cliente ${queryInsertSingle({
        ...props,
      })} `;
    const response = await DAO.insert(query);

    return response.status === 200
      ? res.json({
          message: `Cliente ${props.NM_CLIENTE} criado com sucesso!`,
        })
      : res.status(500).json({ message: 'Erro ao criar cliente.' });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return res.status(500).json({ error: 'Erro ao criar cliente.' });
  }
}

async function selectCliente(req, res) {
  try {
    const query = /*SQL*/ `SELECT * FROM dim_cliente`;
    const { body, status } = await DAO.select(query);
    return status === 200
      ? res.status(200).json(body)
      : res.status(512).json({ message: 'Erro ao buscar clientes.' });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return res.status(500).json({ error: 'Erro ao criar cliente.' });
  }
}

async function editCliente(req, res) {
  const {
    SK_CLIENTE,
    NM_CLIENTE,
    CPF_CLIENTE,
    EMAIL_CLIENTE,
    TEL_CLIENTE,
    END_CLIENTE,
    BAIRRO_CLIENTE,
    NUM_RESIDENCIA,
  } = req.body;

  try {
    let query = /*SQL*/ `
      UPDATE dim_cliente SET ${queryUpdate({
        NM_CLIENTE,
        CPF_CLIENTE,
        EMAIL_CLIENTE,
        TEL_CLIENTE,
        END_CLIENTE,
        BAIRRO_CLIENTE,
        NUM_RESIDENCIA,
      })} WHERE SK_CLIENTE = ${SK_CLIENTE}`;

    const response = await DAO.update(query);

    return response.status === 200
      ? res.json({
          message: `Cliente ${NM_CLIENTE} editado com sucesso!`,
        })
      : res.status(500).json({ message: 'Erro ao editar cliente.' });
  } catch (error) {
    console.error('Erro ao editar cliente:', error);
    return res.status(500).json({ error: 'Erro ao editar cliente.' });
  }
}

module.exports = {
  createCliente,
  selectCliente,
  editCliente,
};
