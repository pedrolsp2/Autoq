const bcrypt = require('bcrypt');
var DAO = require('../../DAO/DAO');
var { queryInsertSingle, queryUpdate } = require('../../util/queryGen');

async function createUser(req, res) {
  const { NM_USUARIO, EMAIL_USUARIO, DS_USUARIO, SENHA_USUARIO, POLITICA } =
    req.body;

  try {
    const hashedPassword = await bcrypt.hash(SENHA_USUARIO, 10);
    let query = /*SQL*/ `
      INSERT INTO dim_usuario ${queryInsertSingle({
        NM_USUARIO,
        EMAIL_USUARIO,
        DS_USUARIO,
        SENHA_USUARIO: hashedPassword,
        POLITICA,
      })} `;
    const response = await DAO.insert(query);

    return response.status === 200
      ? res.json({
          message: `Usuario ${NM_USUARIO} criado com sucesso!`,
        })
      : res.status(500).json({ message: 'Erro ao criar usuario.' });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return res.status(500).json({ error: 'Erro ao criar usuário.' });
  }
}
async function editUser(req, res) {
  const { NM_USUARIO, EMAIL_USUARIO, DS_USUARIO, SK_USUARIO, POLITICA } =
    req.body;

  try {
    let query = /*SQL*/ `
      UPDATE dim_usuario SET ${queryUpdate({
        NM_USUARIO,
        EMAIL_USUARIO,
        DS_USUARIO,
        POLITICA,
      })} WHERE SK_USUARIO = ${SK_USUARIO}`;
    const response = await DAO.update(query);

    return response.status === 200
      ? res.json({
          message: `Usuario ${NM_USUARIO} editado com sucesso!`,
        })
      : res.status(500).json({ message: 'Erro ao editar usuario.' });
  } catch (error) {
    console.error('Erro ao editar usuário:', error);
    return res.status(500).json({ error: 'Erro ao editar usuário.' });
  }
}
const listUser = async (req, res) => {
  try {
    let query = /*SQL*/ `
    SELECT 
      dm.*,
      dp.ds_politica,
      dp.id_politica
     FROM dim_usuario dm
     LEFT JOIN dim_politica dp on dm.POLITICA = dp.id_politica`;
    const { body, status } = await DAO.select(query);

    if (status !== 200) {
      return res.status(status).json({ message: 'Erro ao buscar usuarios' });
    } else {
      return res.status(200).json(body);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    let query = /*SQL*/ `UPDATE dim_usuario SET D_E_L_E_T = '*' WHERE SK_USUARIO = ${req.body.SK_USUARIO}`;
    const { status } = await DAO.update(query);
    return status === 200
      ? res.status(200).json({ message: 'Apagado com sucesso!' })
      : res.status(500).json({ message: 'Erro ao apagar.' });
  } catch (error) {
    console.error(error);
    return res.status(512).json({
      status: 512,
      message: error.message,
    });
  }
};

module.exports = {
  createUser,
  listUser,
  deleteUser,
  editUser,
};
