import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// import redux
import { Provider } from "react-redux";
import createStore from "./reducks/Store/store";

//import react-router
import { ConnectedRouter } from "connected-react-router";
import * as History from "history";

//materialUi theme
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "./assets/theme";

const history = History.createBrowserHistory();
export const store = createStore(history);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
