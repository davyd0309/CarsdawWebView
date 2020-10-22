import React, { Component } from "react";
import AddRepair from "./Components/AddRepair";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Table from "./Components/Table";

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={AddRepair} />
        <Route exact path="/view" component={Table} />
      </Router>
    );
  }
}

export default App;
