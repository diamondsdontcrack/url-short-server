import dotenv from "dotenv";

import express, { NextFunction, Request, Response } from "express";
import accessShortUrlHandler from "./handlers/access-short-url";
import createShortUrlHandler from "./handlers/create-short-urls";
import getShortUrlStatsHandler from "./handlers/get-short-url-statistics";
import DatabaseService from "./services/database";
// const express = require('express')
// const fs = require('fs')

dotenv.config();

const app = express();

// app.get('/', (req, res) => {
//   try {
//     const responseBody = { greetings: 'Hello, World!'}
//     res.set('Content-Type', 'application/json')
//     res.status(200) // indicates successful HTTP responds
//     res.send(responseBody)
//   } catch {
//     res.set('Content-Type', 'application/json')
//     res.status(500)
//     res.send({error: 'Server Error'})
//   }
//   })

// app.get('/about', (req, res) => {
//     fs.readFile('src/pages/about.html', null, (err, fileContent) => {
//       if (err) {
//         res.set('Content-Type', 'application/json')
//         res.status(500)
//         res.send({error: 'Server Error'})
//       } else {
//         res.set('Content-Type', 'text/html') // set the responds HTTP header, with (key <>, to the value of <>)
//         res.status(200)
//         res.send(fileContent)
//       }
//     })
//   })

DatabaseService.instance;

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "content-type");

  next();
});

app.post("/short-urls", createShortUrlHandler);
app.get("/:id", accessShortUrlHandler);
app.get("/:id/stats", getShortUrlStatsHandler);

app.listen(8000);

// * NOTES
// The get method not intent to read the body
// Request<
//    the parsing result of the path parameter and the type is always string,
//    Response Body,
//    Request Body,
//    the parsing result of the query parameter ("?") and it can be string or string array,
//    locales or languages>
// Response<
//    Response Body,
//    locales >
// never --> never caught any type
// any --> caught every type
