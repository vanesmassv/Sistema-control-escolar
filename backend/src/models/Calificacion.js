import sequelize from "../config/sequelize.js";
import { DataTypes } from "sequelize";

 const Calificacion = sequelize.define("Calificacion",
    {
        calificacion_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        inscripcion_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "inscripciones", key: "inscripcion_id"
            }
        },
        fecha_registro: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        observaciones: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        nota: {
            type: DataTypes.DECIMAL(5,2),
            allowNull: true,
            
        }
    },
    {
        tableName: "calificaciones",
        timestamps: true,
        paranoid: true
        
    }
 );

 export default Calificacion;