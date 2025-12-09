import  Sequelize  from "../config/sequelize.js";
import { DataTypes } from "sequelize";


const Rol = Sequelize.define( "Rol",
    {
        rol_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull:false
        }
    },
    {
        tableName: "roles",
        timestamps: false
    }
)

export default Rol;