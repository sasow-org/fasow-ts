import "./App.css";
import { Box } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import TemplateLayout from "./components/TemplateLayout";
import ExperimentProvider from "./context/ExperimentConfigProvider";

function App() {
  return (
    <ExperimentProvider>
      <div className="App">
        <BrowserRouter>
          <NavBar />
          <Box
            mt={2}
            maxHeight={1000}
            height={1000}
            style={{ backgroundColor: "darkgray" }}
          >
            <TemplateLayout />
          </Box>
        </BrowserRouter>
      </div>
    </ExperimentProvider>
  );
}

export default App;
