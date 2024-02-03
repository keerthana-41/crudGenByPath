import { DataTypes } from "sequelize";
import Configjson from '../../../../bin/Config.json' assert { type: 'json' };
import tableNameJson from '../../tableName.json' assert { type: 'json' };

// import { StartFunc as StartFuncInitializeSequelize } from "../../../kSequelize/initializeSequelize.js";
import { StartFunc as StartFuncInitializeSequelize } from "../../../../bin/kSequelize/initializeSequelize.js";

let StartFunc = async () => {
    let LocalTableName = tableNameJson.tableName;
    let LocaltableAndColumns = Configjson.sequelizeConfig.tableAndColumns;

    const sequelize = await StartFuncInitializeSequelize();

    if ("KTF" in sequelize) {
        if (sequelize.KTF === false) {
            return await sequelize;
        };
    };

    let LocalColumnsNeeded = LocaltableAndColumns.find(element => element.tableName === LocalTableName);

    Object.entries(LocalColumnsNeeded.tableColumns).forEach(
        ([key, value]) => {
            if (value.type === "STRING") {
                value.type = DataTypes.STRING;
            };

            if (value.type === "NUMBER") {
                value.type = DataTypes.NUMBER;
            };
        }
    );

    return await sequelize.define(LocalTableName, LocalColumnsNeeded.tableColumns, { freezeTableName: true });
};

export { StartFunc };