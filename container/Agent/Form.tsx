import * as React from "react";
import InsuranceForm from "@components/Agent/InsuranceForm";
import { Paper } from "@mui/material";

const Form = () => {
  return (
    <Paper sx={{ maxWidth: 936, margin: "auto", overflow: "auto", marginTop: 5, marginBottom: 25, height: "80vh" }}>
      <InsuranceForm open={false} />
    </Paper>
  );
};

export default Form;
