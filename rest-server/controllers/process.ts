// @ts-nocheck
import { Request, Response } from "express";
import { Catalogue, Process } from "../models";
import fs from "fs";

export const getProcesses = async (req: Request, res: Response) => {
  try {
    const process = await Process.findAll({ include: { model: Catalogue } });
    res.json({
      process,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "opps!!",
    });
  }
};

export const getProcess = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const process = await Process.findByPk(id);
    if (!process) {
      return res.status(404).json({
        msg: `The Process with id ${id} not found`,
      });
    }

    res.json({
      process,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "opps!!",
    });
  }
};

export const createProcess = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const processes = [];
    await Promise.all(
      body.map(async (val) => {
        const process = new Process({
          name: val?.name,
          PID: val.pid,
          user: val.user,
          status: val.stat,
          time: val.time,
          timeStart: val.start,
          cpu: val?.cpu,
          mem: val?.mem,
          quantum: val?.name.length || 0,
          priority: val?.user === "root" ? 0 : 1,
        });
        fs.writeFile(
          `./assets/processFiles/${val.name}.txt`,
          val.name,
          function (err) {
            if (err) {
              return console.log(err);
            }
            console.log("file created");
          }
        );

        const data = await process.save();
        processes.push(data);
      })
    );

    const data = processes.map((value) => {
      return value.dataValues;
    });
    res.status(200).json({
      status: "ok",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "opps!!",
    });
  }
};

export const updateProcess = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const process = await Process.findByPk(id);
    if (!process) {
      return res.status(400).json({
        msg: `The Process with email ${body.email} arealy exists`,
      });
    }
    await process.update(body);
    res.json({
      process,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "opps!!",
    });
  }
};

export const deleteProcess = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const process = await Process.findByPk(id);
    if (!process) {
      return res.status(400).json({
        msg: `The Process with id ${id} not found`,
      });
    }
    await process.update({ state: false });
    res.json({
      process,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "opps!!",
    });
  }
};
