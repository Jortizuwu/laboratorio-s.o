import moment from "moment";
import { useMemo, useState } from "react";

const Simulator = ({ processys }) => {
  const [respList, setRespList] = useState([]);
  const [q, setQ] = useState(2);

  const process = useMemo(
    () =>
      processys.map((process, idx) => ({
        position: idx,
        id: process.idProcess,
        pid: process?.PID,
        user: process?.user,
        name: process?.name,
        start: process?.timeStart,
        time: moment.duration(process?.time, "minutes").asMilliseconds() || 0,
        stat: process?.status,
        cpu: Number(process?.cpu),
        mem: Number(process?.mem),
        q: Number(process?.quantum),
        cmx: 0,
        tr: 0,
        te: 0,
      })),
    [processys]
  );

  const handleStart = () => {
    let lista = process;
    let listResp = [];

    let ciclo = 1;
    let isComplete = false;
    let time = 0;

    while (!isComplete) {
      //primer recorrido
      for (let i = 0; i < lista.length; i++) {
        let ini = time;
        let val = lista[i];

        let m = {
          name: val.name,
          pid: val.pid,
          status: "listo",
          tr: val.tr,
          time: val.time,
        };
        let pos = 0;

        pos = lista[i].position;
        process[pos].time = parseInt(ini);

        if (val.cpu > val.q) {
          lista[i].cpu = parseInt(val.cpu - val.q);
          time += parseInt(val.q);
          m.cpu = ini + " -> " + time;
          m.ciclo = ciclo;
          m.status = "ejecucion";
        } else if (val.cpu === val.q) {
          //cuando es igual
          lista[i].cpu = parseInt(val.cpu - val.q);
          time += parseInt(val.q);
          m.cpu = ini + " -> " + time;
          m.ciclo = ciclo;
          m.status = "espera";
        } else {
          //cuando es menor
          time += parseInt(lista[i].cpu);
          lista[i].cpu = 0;
          m.cpu = ini + " -> " + time;
          m.ciclo = ciclo;
          m.status = "terminado";
        }
        process[pos].tr = parseInt(time);
        process[pos].cmx = ciclo;
        listResp.push(m);
      }

      //aca
      let lfilt = lista.filter((v) => {
        return v.cpu > 0;
      });

      if (lfilt.length > 0) {
        isComplete = false;
        lista = lfilt;
      } else {
        isComplete = true;
      }
      ciclo++;
    }
    setRespList(listResp);
    listResp = [];
  };

  console.log(process);

  const handleRest = () => {
    setRespList([]);
    window.location.reload(false);
  };

  return (
    <div className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto py-16 sm:py-24 lg:py-32 lg:max-w-none">
          <h2 className="text-2xl font-extrabold text-gray-900">Simulator</h2>
          <div className="mt-2">
            <button
              onClick={handleStart}
              className="hover:bg-green-500 cursor-pointer transition-all bg-green-400 p-1 md:p-2 font-bold text-white rounded-lg "
            >
              Start
            </button>
            <button
              onClick={handleRest}
              className="hover:bg-red-400 ml-4 cursor-pointer transition-all bg-red-300 p-1 md:p-2 font-bold text-white rounded-lg "
            >
              Rest
            </button>
            <div>
              {/* <div className="w-1/4 my-4">
                <h3>QUANTUM:</h3>
                <input
                  type="number"
                  className="input"
                  onChange={(e) => {
                    setQ(e.target.value);
                  }}
                />
              </div> */}
              <h3>Round Robin:</h3>

              <table className="shadow min-w-full divide-y divide-gray-200 bg-white">
                <thead className="bg-light-secondary dark:bg-dark-secondary">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-light-text-primary dark:text-dark-text-primary uppercase tracking-wider">
                      Ciclo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-light-text-primary dark:text-dark-text-primary uppercase tracking-wider">
                      Nombre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-light-text-primary dark:text-dark-text-primary uppercase tracking-wider">
                      PID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-light-text-primary dark:text-dark-text-primary uppercase tracking-wider">
                      Rafaga Und CPU
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-light-text-primary dark:text-dark-text-primary uppercase tracking-wider">
                      Response time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-light-text-primary dark:text-dark-text-primary uppercase tracking-wider">
                      timeout
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-light-text-primary dark:text-dark-text-primary uppercase tracking-wider">
                      status
                    </th>
                  </tr>
                </thead>
                <tbody className="w-full bg-light-secondary dark:bg-dark-secondary divide-y divide-gray-200">
                  {respList.map((va, idex) => (
                    <tr key={idex}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {va.ciclo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{va.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{va.pid}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{va.cpu}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{va.tr}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{va.time}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {va.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <h2 className="text-xl font-bold mb-2 mt-2">Final</h2>
              <table className="shadow min-w-full divide-y divide-gray-200 bg-white">
                <thead className="bg-light-secondary dark:bg-dark-secondary">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-light-text-primary dark:text-dark-text-primary uppercase tracking-wider">
                      Ciclo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-light-text-primary dark:text-dark-text-primary uppercase tracking-wider">
                      Nombre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-light-text-primary dark:text-dark-text-primary uppercase tracking-wider">
                      PID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-light-text-primary dark:text-dark-text-primary uppercase tracking-wider">
                      Rafaga Und CPU
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-light-text-primary dark:text-dark-text-primary uppercase tracking-wider">
                      Response time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-light-text-primary dark:text-dark-text-primary uppercase tracking-wider">
                      timeout
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-light-text-primary dark:text-dark-text-primary uppercase tracking-wider">
                      status
                    </th>
                  </tr>
                </thead>
                <tbody className="w-full bg-light-secondary dark:bg-dark-secondary divide-y divide-gray-200">
                  {respList
                    .filter((val) => val.status === "terminado")
                    .map((va, idex) => (
                      <tr key={idex}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {va.ciclo}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {va.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {va.pid}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {va.cpu}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{va.tr}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {va.time}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {va.status}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulator;
