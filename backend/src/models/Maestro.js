import sequelize from '../config/sequelize.js'
import { DataTypes } from 'sequelize'

const Maestro = sequelize.define("Maestro",
    {
        maestro_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique:true,
            references: {
                model: "usuarios", key: "usuario_id"
            }
            
        },
        matricula: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },
    {
        tableName: "maestros",
        timestamps: false
    }

);

export default Maestro;