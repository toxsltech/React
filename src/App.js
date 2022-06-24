/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import history from "./history";
import { store, persistor } from "./store";

import "./assets/css/plugins/bootstrap.min.css";
import "./assets/css/colors/blue.css";
import "../src/assets/scss/icons/themify-icons/themify-icons.css";
import "../src/assets/scss/icons/material-design-iconic-font/css/materialdesignicons.min.css";
import "./assets/css/fontawesome/css/all.css";
import Main from "./main";
import SellerPanel from "./components/sellerPanel";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter history={history}>
            <Switch>
              <Route path="/seller" component={SellerPanel} />
              <Route path="/" component={Main} />
            </Switch>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
