import React from "react";
import "./App.css";
import {Switch, Route} from "react-router-dom";
import FormList from "./Forms List Page/components/FormsList";
import FormBuilder from "./Form Builder Page/components/FormBuilder";
import FormSubmitPage from "./Form Submit Page/components/FormSubmit";
import SubmissionsTable from "./Forms Submissions Page/components/SubmissionsTable";
// import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/form_submit/:form_id">
          <FormSubmitPage />
        </Route>
        <Route path="/form_submissions/:form_id">
          <SubmissionsTable />
        </Route>
        <Route path="/form_builder">
          <FormBuilder />
        </Route>
        <Route path="/">
          <FormList />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
