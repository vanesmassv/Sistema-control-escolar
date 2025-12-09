import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const Inscripcion = sequelize.define("Inscripcion",
    {
        inscripcion_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        alumno_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "alumnos", key: "alumno_id"
            }
        },
        materia_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "materias", key: "materia_id"
            }
        },
        semestre_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "semestres", key:"semestre_id"
            }
        }
    },
    {
        tableName: "inscripciones",
        timestamps: false
    }
);

export default Inscripcion;