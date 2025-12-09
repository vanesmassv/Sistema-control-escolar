import sequelize from "../config/sequelize.js";
import { DataTypes } from "sequelize";


const Grupo = sequelize.define("Grupo",
    {
        grupo_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        maestro_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "maestros", key: "maestro_id"
            }
        }
    },
    {
        tableName: "grupos",
        timestamps: false
    }
);

export default Grupo;