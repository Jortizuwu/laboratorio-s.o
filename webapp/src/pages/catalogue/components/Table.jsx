import React from "react";

const arrNames = [
  "PID",
  "User",
  "Nane",
  "Start time",
  "Duration",
  "Memory",
  "CPU",
  "Priority",
  "quantum",
  "status",
];

const TH = ({ name }) => {
  return (
    <th
      scope="col"
      className="px-6 py-3 text-left text-xs font-medium text-light-text-primary dark:text-dark-text-primary uppercase tracking-wider"
    >
      {name}
    </th>
  );
};

const Table = ({ catalogue }) => {
  return (
    <table className="shadow min-w-full divide-y divide-gray-200 bg-white">
      <thead className="bg-light-secondary dark:bg-dark-secondary">
        <tr>
          {arrNames.map((val, idx) => (
            <TH name={val} key={val + idx} />
          ))}
        </tr>
      </thead>
      <tbody className="w-full bg-light-secondary dark:bg-dark-secondary divide-y divide-gray-200">
        {catalogue?.Processes.map((process) => (
          <tr key={process.idProcess}>
            <td className="px-6 py-4 whitespace-nowrap">{process.PID}</td>
            <td className="px-6 py-4 whitespace-nowrap">{process.user}</td>
            <td className="px-6 py-4 whitespace-nowrap">{process.name}</td>
            <td className="px-6 py-4 whitespace-nowrap">{process.timeStart}</td>
            <td className="px-6 py-4 whitespace-nowrap">{process.time}</td>
            <td className="px-6 py-4 whitespace-nowrap">{process.mem}</td>
            <td className="px-6 py-4 whitespace-nowrap">{process.cpu}</td>
            <td className="px-6 py-4 whitespace-nowrap">{process.priority}</td>
            <td className="px-6 py-4 whitespace-nowrap">{process.quantum}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                {process.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
