import models from '../models/index.js'
import bcrypt from "bcryptjs";
import { JWT_SECRET } from "../config/env.js";
import jwt from 'jsonwebtoken'
import Rol from '../models/Rol.js';
import { NotFoundError } from "../errors/NotFoundError.js";
import { UnauthorizedError } from "../errors/UnauthorizedError.js";


export async function findByEmail(email) {
    return models.Usuario.findOne({ where: { email } });
}

export async function verifyPassword(password, password_hash) {
    return bcrypt.compare(password, password_hash);
}

export async function getUsuarioConRol(usuario_id) {
    return models.Usuario.findOne({ where: { usuario_id },
        include: [{ 
            model: Rol, as: "rol"
        }]
     });
}


class AuthService {

    async AuthUsuario({email, password}){
        const usuario = await findByEmail(email);
        if (!usuario) throw new NotFoundError('No existe un usuario con ese correo');
        const usuarioConRol = await getUsuarioConRol(usuario.usuario_id);
        const verified = await verifyPassword(password, usuario.password_hash);
        if (!verified) throw new UnauthorizedError('Contraseña incorrecta');
        const token = jwt.sign({
            usuario_id: usuario.usuario_id,
            email: usuario.email,
            rol: usuarioConRol.rol.nombre
            }, JWT_SECRET, {
            expiresIn: '1h',
        });
        const { password_hash: _, ...response } = usuario.toJSON();

        return { token, user: response };
    }

}

export default new AuthService();