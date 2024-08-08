// const { render } = require("@testing-library/react");

// import ReactDOM from 'react-dom/client'

// const root = ReactDOM.createRoot(document.getElementById("root"))

// root.render(
//     <h1>Hello world</h1>,
// )

import ReactDom from 'react-dom'
import App from './App'
import './Index.css'  
ReactDom.render(
    <App />,
    document.getElementById("root")
)