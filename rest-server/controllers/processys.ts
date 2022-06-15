// @ts-nocheck
import { Request, Response } from "express";
import fs from "fs";
import lr from "readline";
import { exec } from "child_process";

const discart = [
  "USER",
  "PID",
  "%CPU",
  "%MEM",
  "VSZ",
  "RSS",
  "TTY",
  "STAT",
  "START",
  "TIME",
  "COMMAND",
];
export const getProcessys = async (req: Request, res: Response) => {
  try {
    fs.readFile("./assets/tasklist.json", (err, uwu) => {
      if (err) {
        return res.status(400).json({
          status: "bad request file not exits",
        });
      }
      const data = JSON.parse(uwu);
      return res.json({
        data,
        status: "ok",
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "opps!!",
    });
  }
};

export const createProcessys = async (req: Request, res: Response) => {
  try {
    exec("cd assets && ps aux cat > tasklist.txt ", (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return res.status(400).json({
          status: "bad request error",
        });
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return res.status(400).json({
          status: "bad request error",
        });
      }
      console.log(`file created ${stdout}`);

      const obj = {};
      const arr = [];
      const lineReader = lr.createInterface({
        input: fs.createReadStream("./assets/tasklist.txt"),
      });

      lineReader.on("line", function (line) {
        const [USER, PID, CPU, MEM, VSZ, RSS, TTY, STAT, START, TIME, COMMAND] =
          line.split(" ").filter((el) => el !== "" && !discart.includes(el));
        const newProcess = (obj[Object.keys(obj).length || 0] = {
          USER,
          PID,
          CPU,
          MEM,
          VSZ,
          RSS,
          TTY,
          STAT,
          START,
          TIME,
          COMMAND,
        });
        arr.push(newProcess);
      });

      lineReader.on("close", () => {
        fs.writeFile(
          "./assets/tasklist.json",
          JSON.stringify(arr),
          function (err) {
            if (err) {
              return console.log(err);
            }
            console.log("Convertido a JSON");
          }
        );
      });

      res.json({
        status: "ok",
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "opps!!",
    });
  }
};
