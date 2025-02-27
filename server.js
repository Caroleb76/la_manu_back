// const express = require("express");  ancienne syntaxe
import express, { Router } from "express";
import routes from "./src/controllers/routes.js";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
const router = Router();

// router.get("/", (req, res) => {
//   res.send("hello word");
// });
routes(router);
app.use("/api/v1", router);
// app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }));
app.listen(port, () => {
  console.log("listening on port " + port);
});
