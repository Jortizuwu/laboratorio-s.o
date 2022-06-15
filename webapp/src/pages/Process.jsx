// import { useDispatch, useSelector } from "react-redux";
import { useGetProcesses } from "../shared/hooks/react-query/process";

const Home = () => {
  const { isLoading, processes } = useGetProcesses();
  // const { modalIsOpen } = useSelector((state) => state.ui);
  // const dispatch = useDispatch();

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="w-screen h-screen">
      <div className="py-10 px-2 sm:py-10 sm:px-6 lg:px-8 bg-gray-100">
        <h2 className="text-2xl font-bold mb-10">Processes</h2>
        <div className="flex flex-col w-full overflow-y-scroll scroollbar">
          <div className="overflow-x-auto">
            <div className="align-middle inline-block min-w-full">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="shadow min-w-full divide-y divide-gray-200 bg-white">
                  <thead className="bg-light-secondary dark:bg-dark-secondary">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-light-text-primary dark:text-dark-text-primary uppercase tracking-wider"
                      >
                        Catalogue id
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-light-text-primary dark:text-dark-text-primary uppercase tracking-wider"
                      >
                        Catalogue name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-light-text-primary dark:text-dark-text-primary uppercase tracking-wider"
                      >
                        PID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-light-text-primary dark:text-dark-text-primary uppercase tracking-wider"
                      >
                        User
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-light-text-primary dark:text-dark-text-primary uppercase tracking-wider"
                      >
                        Nane
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-light-text-primary dark:text-dark-text-primary uppercase tracking-wider"
                      >
                        Start time
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-light-text-primary dark:text-dark-text-primary uppercase tracking-wider"
                      >
                        Duration
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-light-text-primary dark:text-dark-text-primary uppercase tracking-wider"
                      >
                        Memory
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-light-text-primary dark:text-dark-text-primary uppercase tracking-wider"
                      >
                        CPU
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-light-text-primary dark:text-dark-text-primary uppercase tracking-wider"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="w-full bg-light-secondary dark:bg-dark-secondary divide-y divide-gray-200">
                    {processes?.map((process) => (
                      <tr key={process.idProcess}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {process?.Catalogues[0]?.idCatalogue}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {process.Catalogues[0]?.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {process.PID}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {process.user}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {process.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {process.timeStart}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {process.time}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {process.mem}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {process.cpu}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {process.status}
                          </span>
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
    </div>
  );
};

export default Home;
