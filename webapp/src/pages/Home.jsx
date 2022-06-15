import { useGetCatalogues } from "../shared/hooks/react-query/catalogue";
import { Link } from "react-router-dom";

const Home = () => {
  const { isLoading, catalogues } = useGetCatalogues();

  if (isLoading) return <h1>Loading...</h1>;

  if (catalogues.length === 0) {
    return (
      <div className="w-screen h-screen ">
        <h2 className="text-2xl font-bold">Catalogues</h2>
        <div className=" bg-gray-100 flex items-center justify-center">
          <h2>empty catalog</h2>
        </div>
      </div>
    );
  }
  return (
    <div className="w-screen h-screen">
      <h2 className="text-2xl font-bold">Catalogues</h2>
      <div className="max-w-2xl mx-auto py-10 px-2 sm:py-10 sm:px-6 lg:max-w-7xl lg:px-8 bg-gray-100">
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {catalogues.map((catalogue) => (
            <Link
              to={`/${catalogue.idCatalogue}`}
              key={catalogue.idCatalogue}
              className="group w-full p-2"
            >
              <div className="flex justify-center">
                <div className="block rounded-lg shadow-lg bg-white max-w-sm text-center">
                  <div className="py-3 px-6 border-b border-gray-300">
                    {catalogue.name}
                  </div>
                  <div className="p-6">
                    {catalogue.Processes.map((process) => (
                      <div key={process.idProcess}>
                        <h3>
                          {process?.user} | {process?.name}
                        </h3>
                      </div>
                    ))}
                    {catalogue.Processes.length === 0 && (
                      <div>catalogo vacio</div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
