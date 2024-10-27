import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import store from "./store/index.jsx";
import App from "./App.jsx";
import "./static/css/style.css";

createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <App />
    </Provider>
  </>
);
