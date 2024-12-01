const bcrypt = require('bcrypt');
var DAO = require('../../DAO/DAO');
var { queryInsertSingle, queryUpdate } = require('../../util/queryGen');

async function createpecas(req, res) {
  const props = req.body;

  try {
    let query = /*SQL*/ `
      INSERT INTO dim_pecas ${queryInsertSingle({
        ...props,
      })} `;
    const response = await DAO.insert(query);

    return response.status === 200
      ? res.json({
          message: `Peça ${props.NM_PECAS} criado com sucesso!`,
        })
      : res.status(500).json({ message: 'Erro ao criar peça.' });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return res.status(500).json({ error: 'Erro ao criar peça.' });
  }
}

async function selectpecas(req, res) {
  try {
    const query = /*SQL*/ `SELECT * FROM dim_pecas`;
    const { body, status } = await DAO.select(query);
    return status === 200
      ? res.status(200).json(body)
      : res.status(512).json({ message: 'Erro ao buscar peças.' });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return res.status(500).json({ error: 'Erro ao criar peças.' });
  }
}

async function editpecas(req, res) {
  const props = req.body;

  try {
    let query = /*SQL*/ `
      UPDATE dim_pecas SET ${queryUpdate({
        ...props,
        SK_PECAS: null,
      })} WHERE SK_PECAS = ${props.SK_PECAS}`;

    const response = await DAO.update(query);

    return response.status === 200
      ? res.json({
          message: `Peças editado com sucesso!`,
        })
      : res.status(500).json({ message: 'Erro ao editar peças.' });
  } catch (error) {
    console.error('Erro ao editar peças:', error);
    return res.status(500).json({ error: 'Erro ao editar peças.' });
  }
}

module.exports = {
  createpecas,
  selectpecas,
  editpecas,
};
