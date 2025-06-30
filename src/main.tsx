import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
// import AppRouter from "./routes/AppRouter";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <AppRouter /> */}
      <App />
    </Provider>
  </React.StrictMode>
);
