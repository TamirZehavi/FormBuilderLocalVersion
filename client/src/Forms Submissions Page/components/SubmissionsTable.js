import React, {useState, useEffect} from "react";
import HeadersContainer from "./HeadersContainer";
import axios from "axios";
import RowsContainer from "./RowsContainer";
import {IdElement, HeaderElements, SubmissionElement} from "./StateTemplates";
import {useParams} from "react-router-dom";

export default function SubmissionsTable() {
  axios.defaults.baseURL = "http://localhost:5000";
  const {form_id} = useParams();
  const [headers, setHeaders] = useState([HeaderElements]);
  const [IDs, setIDs] = useState([IdElement]);
  const [submissions, setSubmissions] = useState([SubmissionElement]);

  useEffect(() => {
    axios
      .get(`/load_form_fields/${form_id}`)
      .then((results) => {
        const headers = results.data;
        setHeaders(headers);
      })
      .then(
        axios
          .get(`/load_unique_users_ids_of_form/${form_id}`)
          .then((results) => {
            const IDs = results.data;
            setIDs(IDs);
          })
          .then(
            axios.get(`/load_form_submissions/${form_id}`).then((results) => {
              const submissions = results.data;
              setSubmissions(submissions);
            })
          )
      );
  }, [form_id]);

  return (
    <div className="table-container">
      <h1>Form Submissions Table For Form {form_id}</h1>
      <table className="table table-dark m-2">
        <tbody>
          <HeadersContainer headers={headers} />
          <RowsContainer IDs={IDs} submissions={submissions} />
        </tbody>
      </table>
    </div>
  );
}
