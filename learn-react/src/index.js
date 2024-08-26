import ReactDom from "react-dom";
import swDev from "./serviceWorkers";
import App from "./App";
import "./Index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDom.render(
  <>
    <App /> <ToastContainer />
  </>,
  document.getElementById("root")
);

swDev();
