require("dotenv").config();
const express = require("express");
const app = express();
const controllerUser = require("./controller/user");
const controllerSepatu = require("./controller/sepatu");
const controllerMerk = require("./controller/merk");
const tokenMiddleware = require("./middleware/token");

app.use(express.json());

app.post("/login", controllerUser.getUser);
app.post("/register", controllerUser.addUser);
app.post("/sepatu", tokenMiddleware, controllerSepatu.create);
app.get("/sepatu", tokenMiddleware, controllerSepatu.read);
app.patch("/sepatu/:id", tokenMiddleware, controllerSepatu.update);
app.delete("/sepatu/:id", tokenMiddleware, controllerSepatu.hapus);
app.get("/merk", tokenMiddleware, controllerMerk.read);
app.post("/merk", tokenMiddleware, controllerMerk.create);

app.listen(process.env.PORT, () => {
  console.log(`Server berjalan di port ${process.env.PORT}`);
});
