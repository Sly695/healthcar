import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Button, DatePicker } from "antd";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

import dashboard from './dashboard'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/dashboard" component={dashboard} />
      </Switch>
    </Router>
  );
}

export default App;
