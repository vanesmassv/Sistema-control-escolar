import AuthServices from "../services/auth.services.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        ok: false,
        message: "Email y password son obligatorios"
      });
    }

    const { token, user } = await AuthServices.AuthUsuario({ email, password });

    res.json({
      ok: true,
      data: {
        token,
        user: {
          id: String(user.usuario_id),
          email: user.email,
          nombre: user.nombre,
          rol: user.rol
        }
      }
    });

  } catch (error) {
    next(error);
  }
};

