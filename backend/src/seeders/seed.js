import 'dotenv/config';
import bcrypt from "bcryptjs";
import sequelize from "../config/sequelize.js";

import Rol from "../models/Rol.js";
import Usuario from "../models/Usuario.js";
import Maestro from "../models/Maestro.js";
import Grupo from "../models/Grupo.js";
import Alumno from "../models/Alumno.js";
import Materia from "../models/Materia.js";
import Semestre from "../models/Semestre.js";
import Inscripcion from "../models/Inscripcion.js";
import Calificacion from "../models/Calificacion.js";

async function seed() {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado a la BD");
    await sequelize.sync({ force: true });

    // 1️⃣ ROLES
    const roles = await Rol.bulkCreate([
      { nombre: "ADMIN" },
      { nombre: "MAESTRO" }
    ]);

    // 2️⃣ USUARIOS (ADMIN + 2 MAESTROS)
    const passwordHash = await bcrypt.hash("123", 10);

    const usuarios = await Usuario.bulkCreate([
      { nombre: "Administrador", email: "admin@escuela.com", password_hash: passwordHash, rol_id: roles[0].rol_id },
      { nombre: "Juan Maestro", email: "maestro1@escuela.com", password_hash: passwordHash, rol_id: roles[1].rol_id },
      { nombre: "Ana Maestra", email: "maestro2@escuela.com", password_hash: passwordHash, rol_id: roles[1].rol_id }
    ]);

    // 3️⃣ MAESTROS
    const maestros = await Maestro.bulkCreate([
      { usuario_id: usuarios[1].usuario_id, matricula: "MTR-0001" },
      { usuario_id: usuarios[2].usuario_id, matricula: "MTR-0002" }
    ]);

    // 4️⃣ SEMESTRE
    const semestre = await Semestre.create({
      nombre: "1er Semestre",
      fecha_inicio: "2025-01-01",
      fecha_fin: "2025-06-30"
    });

    // 5️⃣ GRUPOS
    const grupos = await Grupo.bulkCreate([
      { nombre: "1A", maestro_id: maestros[0].maestro_id },
      { nombre: "1B", maestro_id: maestros[1].maestro_id }
    ]);

    // 6️⃣ ALUMNOS (6 EN CADA GRUPO)
    const alumnos = await Alumno.bulkCreate([
      // --- GRUPO 1A ---
      { nombre: "Pedro López", matricula: "ALU-001", fecha_nacimiento: "2008-05-12", grupo_id: grupos[0].grupo_id },
      { nombre: "María Hernández", matricula: "ALU-002", fecha_nacimiento: "2009-02-20", grupo_id: grupos[0].grupo_id },
      { nombre: "Luis Ramírez", matricula: "ALU-003", fecha_nacimiento: "2008-07-10", grupo_id: grupos[0].grupo_id },
      { nombre: "Karla Gómez", matricula: "ALU-004", fecha_nacimiento: "2009-03-05", grupo_id: grupos[0].grupo_id },
      { nombre: "Miguel Torres", matricula: "ALU-005", fecha_nacimiento: "2008-11-21", grupo_id: grupos[0].grupo_id },
      { nombre: "Fernanda Ruiz", matricula: "ALU-006", fecha_nacimiento: "2009-01-15", grupo_id: grupos[0].grupo_id },
      { nombre: "Jorge Paniagua", matricula: "ALU-013", fecha_nacimiento: "2003-12-12", grupo_id: grupos[0].grupo_id },
      { nombre: "Felipe Cervantes", matricula: "ALU-014", fecha_nacimiento: "2009-01-15", grupo_id: grupos[0].grupo_id },

      // --- GRUPO 1B ---
      { nombre: "Andrés Pérez", matricula: "ALU-007", fecha_nacimiento: "2008-06-01", grupo_id: grupos[1].grupo_id },
      { nombre: "Paola Díaz", matricula: "ALU-008", fecha_nacimiento: "2009-04-18", grupo_id: grupos[1].grupo_id },
      { nombre: "Jorge Mora", matricula: "ALU-009", fecha_nacimiento: "2008-09-30", grupo_id: grupos[1].grupo_id },
      { nombre: "Valeria Soto", matricula: "ALU-010", fecha_nacimiento: "2009-07-22", grupo_id: grupos[1].grupo_id },
      { nombre: "Carlos Nieto", matricula: "ALU-011", fecha_nacimiento: "2008-12-14", grupo_id: grupos[1].grupo_id },
      { nombre: "Daniela Ríos", matricula: "ALU-012", fecha_nacimiento: "2009-02-03", grupo_id: grupos[1].grupo_id },
      { nombre: "brandon Gallardo", matricula: "ALU-015", fecha_nacimiento: "2008-11-21", grupo_id: grupos[1].grupo_id },
      { nombre: "Carlo Guerrero", matricula: "ALU-016", fecha_nacimiento: "2009-01-15", grupo_id: grupos[1].grupo_id },
    ]);

    // 7️⃣ MATERIAS
    const materias = await Materia.bulkCreate([
      { codigo: "MAT101", nombre: "Matemáticas", descripcion: "Álgebra básica" },
      { codigo: "PROG201", nombre: "Programación", descripcion: "Introducción a JS" }
    ]);

    // 8️⃣ INSCRIPCIONES (TODOS LOS ALUMNOS A MATEMÁTICAS)
    const inscripciones = await Inscripcion.bulkCreate(
      alumnos.map(al => ({
        alumno_id: al.alumno_id,
        materia_id: materias[0].materia_id,
        semestre_id: semestre.semestre_id
      }))
    );

    // 9️⃣ CALIFICACIONES
    await Calificacion.bulkCreate(
      inscripciones.map(ins => ({
        inscripcion_id: ins.inscripcion_id,
        nota: Math.floor(Math.random() * 21) + 80,
        fecha_registro: new Date()
      }))
    );

    console.log("🔥 SEEDER CON 2 GRUPOS Y 12 ALUMNOS CREADO CORRECTAMENTE");
    process.exit();

  } catch (error) {
    console.error("❌ Error en el seeder:", error);
    process.exit(1);
  }
}

seed();
