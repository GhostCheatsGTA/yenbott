const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, 'database.json');

if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({}));
}

function readData() {
    try {
        return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    } catch {
        return {};
    }
}

function writeData(data) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

module.exports = {
    get: async (key) => {
        const data = readData();
        return data[key] !== undefined ? data[key] : null;
    },
    set: async (key, value) => {
        const data = readData();
        data[key] = value;
        writeData(data);
        return value;
    },
    delete: async (key) => {
        const data = readData();
        if (data[key] !== undefined) {
            delete data[key];
            writeData(data);
            return true;
        }
        return false;
    }
};
