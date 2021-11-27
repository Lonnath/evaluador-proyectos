import React from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import HeaderComponent from "./components/header/HeaderComponent";
import HeaderComponentEvaluator from "./components/header/HeaderComponentEvaluator";
import HeaderComponentAdmin from "./components/header/HeaderComponentAdmin";
import HeaderComponentUser from "./components/header/HeaderComponentUser";
import IndexContent from './components/indexContent/IndexContent';
import FooterComponent from './components/footercomponent/FooterComponent';
import EvaluatorIndex from "./components/evaluator/EvaluatorIndex";
import EvaluateProjects from "./components/evaluator/Evaluate";
import CreateProject from "./components/projectactions/CreateProject";
import UserIndex from "./components/user/UserIndex";
import AdminIndex from "./components/admin/AdminIndex";
import RegisterUser from "./components/register/RegisterUser";
import RecoveryAccount from "./components/recoveryaccount/RecoveryAccount";
import AssignProjects from "./components/admin/AssignProject";

function App() {
  document.title = 'Inicio'
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/Admin">
            <HeaderComponentAdmin />
            <AdminIndex />
          </Route>
          <Route path="/AssignProjects">
            <HeaderComponentAdmin />
            <AssignProjects />
          </Route>
          <Route path="/ModifyProjectsAdmin">
            <HeaderComponentAdmin />
            <CreateProject />
          </Route>
          <Route path="/Evaluator">
            <HeaderComponentEvaluator />
            <EvaluatorIndex />
          </Route>
          <Route path="/EvaluateProjects">
            <HeaderComponentEvaluator />
            <EvaluateProjects />
          </Route>
          <Route path="/CreateProjectEvaluator">
            <HeaderComponentEvaluator />
            <CreateProject />
          </Route>
          <Route path="/User">
            <HeaderComponentUser />
            <UserIndex />
          </Route>
          <Route path="/CreateProjectUser">
            <HeaderComponentUser />
            <CreateProject />
          </Route>
          <Route path="/RegisterUser">
            <HeaderComponent />
            <RegisterUser />
          </Route>
          <Route path="/RecoveryAccount">
            <HeaderComponent />
            <RecoveryAccount />
          </Route>
          <Route path="/">
            <HeaderComponent />
            <IndexContent />
          </Route>
      </Switch>
      </Router>
      <div className="mt-5 extra-size"></div>
      <FooterComponent />
    </div>
  );
}

export default App;
