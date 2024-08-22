import ReactDom from "react-dom";
import swDev from "./serviceWorkers";
import App from "./App";
import "./Index.css";

ReactDom.render(<App />, document.getElementById("root"));

swDev();
