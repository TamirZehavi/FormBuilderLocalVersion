//Importing Modules
const express = require("express");
const cors = require("cors");
const {request, response} = require("express");
const path = require("path");

const DB = require("./connection");
const app = express();
app.use(express.json());
app.use(cors()); //allow cors for all requests

app.use(express.static(path.join(__dirname, "client", "build")));

//Listen to the port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

//various requests:

//load form templates
app.get("/load_forms_list", (request, response) => {
  const query = "SELECT * FROM form_templates";
  DB.query(query, (error, results) => {
    if (error) return response.status(404).send(error);
    else {
      return response.json(results);
    }
  });
});

//insert to form templates
app.post("/add_form_template", (request, response) => {
  const {formName, numberOfSubmissions} = request.body;
  const values = [[formName, numberOfSubmissions]];

  const query =
    "INSERT INTO form_templates (id, name, submissions) VALUES (NULL,?)";
  DB.query(query, values, (error, results) => {
    if (error) return response.status(404).send(error);
    else {
      return response.json(results);
    }
  });
});

//insert to form fields
app.post("/add_form_fields", (request, response) => {
  console.log(request.body);
  const values = SetFieldValues(request);
  const query =
    "INSERT INTO form_fields (field_id, form_id, field_type, field_label, input_name) VALUES ?";
  DB.query(query, [values], (error, results) => {
    if (error) return response.status(404).send(error);
    else {
      response.json(results);
    }
  });
});

function SetFieldValues(request) {
  const formID = request.body.formID;
  const values = [];
  for (let field in request.body.fields) {
    const {inputType, label, inputName} = request.body.fields[field];
    values.push([null, formID, inputType, label, inputName]);
  }
  return values;
}

//Load fields from form fields
app.get("/load_form_fields/:formID", (request, response) => {
  const query = `SELECT form_fields.form_id, form_fields.field_id, form_fields.field_type, form_fields.field_label, form_fields.input_name
  FROM form_templates
  INNER JOIN form_fields WHERE form_templates.id = '${request.params.formID}' AND form_fields.form_id = form_templates.id;`;
  DB.query(query, (error, results) => {
    if (error) return response.status(404).send(error);
    else {
      response.json(results);
    }
  });
});

//create new user_id
app.post("/add_user", (request, response) => {
  const query = "INSERT INTO user_id (user_id) VALUES (NULL)";
  DB.query(query, (error, results) => {
    if (error) return response.status(404).send(error);
    else {
      return response.json(results);
    }
  });
});

//Insert form values into form submissions
app.post("/add_form_submission", (request, response) => {
  console.log(request.body);
  const values = SetSubmissionValues(request);

  const query = `INSERT INTO form_submissions (id, user_id, field_id, form_id, value) VALUES ?`;
  DB.query(query, [values], (error, results) => {
    if (error) return response.status(404).send(error);
    else {
      return response.json(results);
    }
  });
});

function SetSubmissionValues(request) {
  const userID = request.body.userID;
  const values = [];
  for (let field in request.body.fields) {
    const {field_id: fieldID, form_id: formID, value} = request.body.fields[
      field
    ];
    values.push([null, userID, fieldID, formID, value]);
  }
  return values;
}

//Load submissions
app.get("/load_form_submissions/:form_id", (request, response) => {
  const query = `SELECT form_submissions.form_id, form_submissions.user_id, form_submissions.field_id, form_submissions.value
  FROM form_templates
  INNER JOIN form_submissions WHERE form_templates.id = '${request.params.form_id}' AND form_templates.id = form_submissions.form_id;`;
  DB.query(query, (error, results) => {
    if (error) return response.status(404).send(error);
    else {
      return response.json(results);
    }
  });
});

//get unique IDs of form
app.get("/load_unique_users_ids_of_form/:form_id", (request, response) => {
  const query = `SELECT DISTINCT form_submissions.user_id
  FROM form_templates
  INNER JOIN form_submissions WHERE form_templates.id = '${request.params.form_id}' AND form_templates.id = form_submissions.form_id;`;
  DB.query(query, (error, results) => {
    if (error) return response.status(404).send(error);
    else {
      return response.json(results);
    }
  });
});

//update form submission
app.put("/increment_submission/:form_id", (request, response) => {
  const query = `UPDATE form_templates
  SET submissions = submissions + 1 WHERE id = ${request.params.form_id};`;
  DB.query(query, (error, results) => {
    if (error) return response.status(404).send(error);
    else {
      return response.json(results);
    }
  });
});
