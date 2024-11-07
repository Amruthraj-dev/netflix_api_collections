const jsonServer = require("json-server");
const fs = require("fs");
const path = require("path");

const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 8080;

// Function to load and merge multiple JSON files
const loadDatabase = () => {
  const db = {};
  const folderPath = path.join(__dirname, "collections");

  fs.readdirSync(folderPath).forEach((file) => {
    const collectionName = path.parse(file).name;
    const filePath = path.join(folderPath, file);
    db[collectionName] = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  });

  return db;
};

const router = jsonServer.router(loadDatabase());

server.use(middlewares);
server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
