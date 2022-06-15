import { Sequelize } from "sequelize";

const db = new Sequelize("lab", "root", "", {
  host: "localhost",
  dialect: "mysql",
  //   logging: false,
});

export const dbConnection = async () => {
  try {
    await db.authenticate();
    db.sync();
    console.log("Connection has been established succesfully");
  } catch (error: any) {
    throw new Error(error);
  }
};

export default db;
