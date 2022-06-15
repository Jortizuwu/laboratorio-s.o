// @ts-nocheck
import { Request, Response } from "express";
import { Process_has_Catalogue, Catalogue, Process } from "../models";

export const getCatalogs = async (req: Request, res: Response) => {
  try {
    const Catalogs = await Catalogue.findAll({ include: { model: Process } });

    res.json({
      Catalogs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "opps!!",
    });
  }
};

export const getCatalogue = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const catalogue = await Catalogue.findByPk(id, {
      include: { model: Process },
    });
    if (!catalogue) {
      return res.status(404).json({
        msg: `The catalogue with id ${id} not found`,
      });
    }

    res.json({
      catalogue,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "opps!!",
    });
  }
};

export const createCatalogue = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const catalogue = new Catalogue(body);
    const data = await catalogue.save();
    res.json({
      data: data.dataValues,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "opps!!",
    });
  }
};

export const createCatalogueHasProcess = async (
  req: Request,
  res: Response
) => {
  try {
    const { idCatalogue, processIdArr } = req.body;
    const catalogue = await Catalogue.findByPk(idCatalogue);

    if (!catalogue) {
      return res.status(400).json({
        msg: `El id ${idCatalogue} not exist in catalog`,
      });
    }

    await Promise.all(
      processIdArr.map(async (val) => {
        const process = await Process.findByPk(val);
        if (!process) {
          return res.status(400).json({
            msg: `El id ${val} not exist in process`,
          });
        }
        const rocess_has_Catalogue = Process_has_Catalogue.build({
          CatalogueIdCatalogue: idCatalogue,
          ProcessIdProcess: val,
        });
        await rocess_has_Catalogue.save();
      })
    );

    return res.status(201).json({
      status: "ok",
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCatalogue = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const catalogue = await Catalogue.findByPk(id);
    if (!catalogue) {
      return res.status(400).json({
        msg: `The catalogue with email ${body.email} arealy exists`,
      });
    }
    await catalogue.update(body);
    res.json({
      catalogue,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "opps!!",
    });
  }
};

export const deleteCatalogue = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const catalogue = await Catalogue.findByPk(id);
    if (!catalogue) {
      return res.status(400).json({
        msg: `The catalogue with id ${id} not found`,
      });
    }
    await catalogue.update({ state: false });
    res.json({
      catalogue,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "opps!!",
    });
  }
};
