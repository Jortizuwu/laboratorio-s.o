import Catalogue from "./catalogue";
import Process from "./Process";
import Process_has_Catalogue from "./Process_has_Catalogue";

Process.belongsToMany(Catalogue, { through: Process_has_Catalogue });
Catalogue.belongsToMany(Process, { through: Process_has_Catalogue });

export { Catalogue, Process, Process_has_Catalogue };
