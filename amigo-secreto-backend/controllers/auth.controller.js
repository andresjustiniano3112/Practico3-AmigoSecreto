const db = require('../models');
const sha1 = require('sha1');
const { generateAuthToken } = require('../utilities/text.utilities');

exports.register = async (req,res) => {
  try {
    const { email, password, nombreCompleto } = req.body;
    const exists = await db.usuario.findOne({ where: { email }});
    if (exists) return res.status(400).json({ error: 'Email ya registrado' });

    const nuevo = await db.usuario.create({
      email, password: sha1(password), nombreCompleto
    });

    res.status(201).json({ id: nuevo.id, email: nuevo.email, nombreCompleto: nuevo.nombreCompleto });
  } catch (e) {
    console.error(e); res.status(500).json({ error: 'Error' });
  }
};

exports.login = async (req,res) => {
  try {
    const { email, password } = req.body;
    const user = await db.usuario.findOne({ where: { email }});
    if (!user || user.password !== sha1(password)) {
      return res.status(401).json({ error: 'Email o contraseña incorrectos' });
    }
    const token = generateAuthToken(user.email);
    await db.authToken.create({ idUsuario: user.id, token });
    res.json({ token, email: user.email, nombreCompleto: user.nombreCompleto });
  } catch (e) {
    console.error(e); res.status(500).json({ error: 'Error' });
  }
};
