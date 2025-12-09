import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";


const Alumno = sequelize.define("Alumno",
    {
        alumno_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        matricula: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        fecha_nacimiento: {
            type: DataTypes.DATEONLY,
            allowNull:false
        },
        grupo_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "grupos", key: "grupo_id"
            }
        }
    },
    {
        tableName: "alumnos",
        timestamps: true
    }
);

export default Alumno;