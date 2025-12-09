import sequelize from "../config/sequelize.js"
import { DataTypes } from "sequelize"

const Semestre = sequelize.define("Semestre",
    {
        semestre_id: {
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull:false
        },
        fecha_inicio: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        fecha_fin: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        }

    },
    {
        tableName: "semestres",
        timestamps: false,
        validate: {
            fechaLogica(){
                if(this.fecha_fin <= this.fecha_inicio){
                    throw new Error('La fecha de fin debe ser posterior a la fecha de inicio.');
                }
            }
        }
    }
);

export default Semestre;