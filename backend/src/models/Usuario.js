import 'dotenv/config';
import Sequelize from "../config/sequelize.js";
import { DataTypes } from "sequelize";


const Usuario = Sequelize.define("Usuario",
    {
        usuario_id: {
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true
        },

        nombre: { 
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password_hash: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rol_id: {
            type: DataTypes.INTEGER, 
            allowNull: false,
            references: {
                model: "roles", key: "rol_id"
            }
        }
    },
    {
        tableName: "usuarios",
        timestamps: true
    }
);

export default Usuario;