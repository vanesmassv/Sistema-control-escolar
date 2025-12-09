import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const Materia = sequelize.define( "Materia",
    {
        materia_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull:false
        },
        codigo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    },
    {
        tableName: "materias",
        timestamps: true
    }
)

export default Materia;