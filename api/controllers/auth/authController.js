const bcrypt = require('bcrypt');
var jwt_decode = require('jsonwebtoken');
var jwt = require('jwt-decode');
var DAO = require('../../DAO/DAO');

const login = async (req, res) => {
  try {
    const { DS_USUARIO, SENHA_USUARIO } = req.body;

    let queryValidUser = /*SQL*/ `
      SELECT
        user.SK_USUARIO,
        user.NM_USUARIO,
        user.EMAIL_USUARIO,
        user.DS_USUARIO,
        user.SENHA_USUARIO,
        dp.ds_politica,
        dp.id_politica
      FROM dim_usuario user
      LEFT JOIN dim_politica dp on user.POLITICA = dp.id_politica
      WHERE user.DS_USUARIO = '${DS_USUARIO}'`;
    const responseValidUser = await DAO.select(queryValidUser);

    if (!responseValidUser.body[0]) {
      return res.status(401).json({ message: 'Usuário ou senha inválidos.' });
    } else {
      const user = responseValidUser.body[0];

      const isPasswordValid = await bcrypt.compare(
        SENHA_USUARIO,
        user.SENHA_USUARIO
      );

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Senha incorreta' });
      }

      const token = jwt_decode.sign(
        {
          SK_USUARIO: user.SK_USUARIO,
          NM_USUARIO: user.NM_USUARIO,
          EMAIL_USUARIO: user.EMAIL_USUARIO,
          DS_USUARIO: user.DS_USUARIO,
          POLITICA: user.ds_politica,
          SK_POLITICA: user.id_politica,
        },
        process.env.SECRET,
        {
          expiresIn: '3d',
        }
      );

      res.status(200).json({
        status: 200,
        message: 'Login bem-sucedido',
        usuario: {
          SK_USUARIO: user.SK_USUARIO,
          NM_USUARIO: user.NM_USUARIO,
          EMAIL_USUARIO: user.EMAIL_USUARIO,
          DS_USUARIO: user.DS_USUARIO,
          POLITICA: user.ds_politica,
          SK_POLITICA: user.id_politica,
        },
        token: token,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

const tokenValidate = async (req, res, next) => {
  const token = req.headers['x-token'];
  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  try {
    const decoded = jwt_decode.verify(token, process.env.SECRET);
    req.user = decoded;
    return res.status(201).json(decoded);
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Token inválido' });
  }
};

module.exports = {
  login,
  tokenValidate,
};
