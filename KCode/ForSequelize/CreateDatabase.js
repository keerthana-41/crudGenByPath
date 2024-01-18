import { Sequelize, DataTypes } from "sequelize";

import columnsJson from './modals/columns.json' assert {type: 'json'};

import dotenv from 'dotenv';
dotenv.config();

let commonDbName = `KData/JSON/316/data.db`

let StartFunc = async () => {
    let LocalPassword = process.env.KS_SQLITE_PASSWORD;

    const sequelize = new Sequelize("database", "", LocalPassword, {
        dialect: 'sqlite',
        dialectModulePath: '@journeyapps/sqlcipher',
        storage: `${commonDbName}` // You can specify the path for your SQLite database file
    });

    columnsJson.forEach(element => {
        Object.entries(element.tableColumns).forEach(
            ([key, value]) => {
                if (value.type==="STRING") {
                    value.type = DataTypes.STRING;
                };
            
                if (value.type==="NUMBER") {
                    value.type = DataTypes.NUMBER;
                };
            }
        );
      
        sequelize.define(element.tableName, element.tableColumns, { freezeTableName: true });
    });

    sequelize.sync({ force: true });
};

StartFunc().then();

// export { StartFunc };