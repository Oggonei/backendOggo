import { Model, DataTypes, Sequelize } from "sequelize";
import generateToken from "../../libs/generateToken.js";

const USER_TABLE = 'users'

const userSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    lastname: {
        allowNull: false,
        type: DataTypes.STRING
    },
    email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING
    },
    telephoneNumber: {
        field: 'telephone_number',
        allowNull: false,
        type: DataTypes.STRING
    },
    token: {
        type: DataTypes.STRING,
        defaultValue: generateToken()
    },
    autenticated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
    },
    modifiedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'modified_at',
        defaultValue: Sequelize.NOW
    },
}

class User extends Model {
    static associate() {

    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'user',
            timestamps: false
        }
    }
}

export {
    USER_TABLE,
    userSchema,
    User
}