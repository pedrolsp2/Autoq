var DAO = require('../DAO/DAO');

module.exports = {
  async existenceEmail(req, res, next) {
    const { EMAIL_USUARIO } = req.body;
    try {
      const query = `SELECT SK_USUARIO FROM dim_usuario WHERE EMAIL_USUARIO = '${EMAIL_USUARIO}' AND D_E_L_E_T IS NULL`;
      const { body, status } = await DAO.select(query);
      if (status !== 200) {
        return res.status(500).json({ message: 'Erro ao verificar e-mail.' });
      }
      if (body.length > 0) {
        return res.status(400).json({ message: 'E-mail ja existente.' });
      } else {
        return next();
      }
    } catch (error) {}
  },
};
