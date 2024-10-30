let users = []; // Array en memoria para almacenar usuarios
let executionCount = 0;

exports.crearUsuario = (req, res) => {
    const { nombre, correo } = req.body;

    if (!nombre || !correo) {
        return res.status(400).json({ error: 'El nombre y correo son obligatorios.' });
    }
    if (users.some(user => user.correo === correo)) {
        return res.status(400).json({ error: 'El correo ya está en uso.' });
    }

    const newUser = { id: users.length + 1, nombre, correo };
    users.push(newUser);
    res.status(201).json(newUser);
};

exports.obtenerUsuarios = (req, res) => {
    res.json(users);
};

exports.obtenerUsuarioPorId = (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado.' });
    res.json(user);
};

exports.actualizarUsuario = (req, res) => {
    const { nombre, correo } = req.body;
    const user = users.find(u => u.id === parseInt(req.params.id));

    if (!user) return res.status(404).json({ error: 'Usuario no encontrado.' });
    if (!nombre || !correo) {
        return res.status(400).json({ error: 'El nombre y correo son obligatorios.' });
    }
    if (users.some(u => u.correo === correo && u.id !== user.id)) {
        return res.status(400).json({ error: 'El correo ya está en uso.' });
    }

    user.nombre = nombre;
    user.correo = correo;
    res.json(user);
};

exports.eliminarUsuario = (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) return res.status(404).json({ error: 'Usuario no encontrado.' });

    users.splice(userIndex, 1);
    res.status(204).send();
};

exports.contadorEjecuciones = (req, res) => {
    executionCount += 1;
    res.json({ message: `Función ejecutada ${executionCount} veces` });
};
