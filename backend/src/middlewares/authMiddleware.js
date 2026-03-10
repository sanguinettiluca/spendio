const jwt = require('jsonwebtoken');

//req.body  el JSON que mandó en el body
//req.headers   los headers (Authorization, Content-Type, etc)
//req.params    parámetros de la URL (/users/:id → req.params.id)
//req.query query strings (/users?page=2 → req.query.page)

//res.json({ message: 'ok' })     responde con JSON
//res.status(404).json({...})     responde con status code

//El next() es nuevo — 
//es lo que le dice a Express que continúe al siguiente middleware o al controlador.
//Todo middleware recibe (req, res, next).
function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No autorizado' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}

module.exports = {authMiddleware};