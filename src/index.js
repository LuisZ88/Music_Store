import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContextProvider } from "./components/context/auth-context";
import {BrowserRouter} from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
<AuthContextProvider>
  <App />
  </AuthContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);


