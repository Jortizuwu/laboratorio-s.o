// import { useDispatch, useSelector } from "react-redux";
import { useGetCatalogue } from "../../../shared/hooks/react-query/catalogue";
import Simulator from "./Simulator";
import Table from "./Table";

const Home = () => {
  const { isLoading, catalogue } = useGetCatalogue();
  // const { modalIsOpen } = useSelector((state) => state.ui);
  // const dispatch = useDispatch();

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="w-screen h-screen">
      <h2 className="text-2xl font-bold">Catalogue {catalogue?.name}</h2>
      <div className="py-10 px-2 sm:py-10 sm:px-6 lg:px-8 bg-gray-100">
        <div className="flex flex-col w-full overflow-y-scroll scroollbar">
          <div className="overflow-x-auto">
            <div className="align-middle inline-block min-w-full">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <Table catalogue={catalogue} />
              </div>
              <Simulator processys={catalogue?.Processes} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
