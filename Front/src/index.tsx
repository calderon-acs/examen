import { StyledEngineProvider, ThemeProvider } from "@mui/material";
import ReactDOM from "react-dom/client";
import "./styles/index.sass";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Main } from "./routes/Main";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StyledEngineProvider injectFirst>
      <Main />
   
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  </StyledEngineProvider>
);
