import fs from "fs";
import path from "path";

let CommonFromFolderName = "FromTableColumns";

let StartFunc = () => {
  let CommonFiles = fs.readdirSync(CommonFromFolderName);
  let CommonRoutes = [];

  CommonFiles.forEach(function (file, index) {
    let LoopInsideObject = {};
    
    LoopInsideObject.tableName = path.parse(file).name;
    LoopInsideObject.FileName = path.parse(file).name;

    let LoopInsideFileData = fs.readFileSync(`${CommonFromFolderName}/${file}`);
    let LoopInsideJsonData = JSON.parse(LoopInsideFileData);

    LoopInsideObject.tableColumns = LoopInsideJsonData;
    LoopInsideObject.Columns = Object.keys(LoopInsideJsonData);
    CommonRoutes.push(LoopInsideObject);
  });
  return CommonRoutes;
};

export{ StartFunc };
