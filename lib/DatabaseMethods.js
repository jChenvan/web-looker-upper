const fs = require("fs");

module.exports = {
    addRows: (...rows)=>{
        const db = JSON.parse(fs.readFileSync('./data/db.json'));
        rows.forEach(row=>db.push(row));
        fs.writeFileSync('./data/db.json', JSON.stringify(db,null,2));
    }
}