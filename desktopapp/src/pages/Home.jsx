import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetProcessys } from "../shared/hooks/react-query/prosessys";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Container, Box } from "@mui/material";

import Create from "./create";
import { boxStyle, styleDataGrid } from "./create/components/utils/style";
import { addProcess } from "../redux/features/process";

const columns = [
  { field: "pid", headerName: "PID", width: 100, type: "number" },
  { field: "user", headerName: "User", width: 100 },
  {
    field: "name",
    headerName: "Name",
    width: 300,
  },
  { field: "start", headerName: "Start time", type: "number" },
  { field: "time", headerName: "Duration", width: 100, type: "number" },
  { field: "mem", headerName: "Memory", type: "number" },
  { field: "cpu", headerName: "CPU", type: "number" },
  { field: "stat", headerName: "Status", width: 100 },
];

const Home = () => {
  // const [numProcess, setNumProcess] = useState(0);
  const { isLoading, processys } = useGetProcessys();
  const { modalIsOpen } = useSelector((state) => state.ui);

  const dispatch = useDispatch();

  const rows = useMemo(
    () =>
      processys?.slice(1, processys.length).map((process, idx) => ({
        id: process.PID + idx,
        pid: process?.PID,
        user: process?.USER,
        name: process?.COMMAND,
        start: process?.START,
        time: process?.TIME,
        stat: process?.STAT,
        cpu: process?.CPU,
        mem: process?.MEM,
      })),
    [processys]
  );

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="w-screen h-screen">
      <Container>
        {/* <Box component="div">
          <label className="font-bold">
            Ingrese el numero de procesos que desea mostrar
          </label>
          <div className="w-1/4 my-4">
            <input
              onChange={(e) => {
                setNumProcess(e.target.value);
              }}
              type="number"
              maxLength={processys.length}
              className="input w-1/4 "
            />
          </div>
        </Box> */}
        <Box component="div" width="100%" sx={boxStyle}>
          <DataGrid
            columns={columns}
            rows={rows}
            checkboxSelection
            components={{
              Toolbar: GridToolbar,
              LoadingOverlay: <h1>loading...</h1>,
            }}
            onSelectionModelChange={(ids) => {
              const selectedIDs = new Set(ids);
              const selectedRowData = rows.filter((row) =>
                selectedIDs.has(row.id.toString())
              );
              dispatch(addProcess(selectedRowData));
            }}
            sx={{
              ...styleDataGrid,
            }}
            loading={isLoading}
          />
        </Box>
      </Container>
      {modalIsOpen && <Create />}
    </div>
  );
};

export default Home;
