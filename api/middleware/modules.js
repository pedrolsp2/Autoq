var jwt_decode = require('jsonwebtoken');
var fetch = require('node-fetch');
var DAO = require('../DAO/DAO');

async function checkPermission(req, res, next) {
  const token = req.headers['x-token'];
  const rota = req.url;
  const metodo = req.method;
  const decoded = jwt_decode.verify(token, process.env.SECRET);

  try {
    let queryCheckPermission = /*SQL*/ `
    SELECT * from FAT_ATRIBUICAO AS FT
    LEFT JOIN DIM_POLITICA AS POL ON FT.SK_POLITICA = POL.SK_POLITICA
    LEFT JOIN DIM_ROTA AS ROT ON POL.SK_ROTA = ROT.SK_ROTA
    LEFT JOIN DIM_METODO AS MET ON POL.SK_METODO = MET.SK_METODO 
    LEFT JOIN DIM_FUNCIONALIDADE AS FUN ON POL.SK_FUNCIONALIDADE = FUN.SK_FUNCIONALIDADE
    LEFT JOIN DIM_PRIVILEGIO AS PRI ON POL.SK_PRIVILEGIO = PRI.SK_PRIVILEGIO      
    WHERE SK_USUARIO = ${decoded.SK_USUARIO} AND DS_ROTA = '${rota}' AND DS_METODO = '${metodo}'`;

    const responseCheckPermission = await DAO.select(queryCheckPermission);
    console.log(metodo);

    if (
      responseCheckPermission.status === 200 &&
      responseCheckPermission.body.length !== 0
    ) {
      req.atributos = responseCheckPermission.body;
      next();
    } else {
      res.status(401).json({
        status: 401,
        body: 'sem permissao de acesso',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
}

function validate(req, res, next) {
  const token = req.headers['x-token'];
  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  try {
    const decoded = jwt_decode.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Token inválido' });
  }
}

function getUser(req, res, next) {
  let decoded = jwt_decode(req.headers['x-token']);
  req.body.cod_usuario = decoded.usuario.cod_usuario;
  next();
}

module.exports = {
  checkPermission,
  validate,
  getUser,
};
