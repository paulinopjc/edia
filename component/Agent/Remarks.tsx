import { Button, Grid, IconButton, TextField } from "@mui/material";
import { InsurancePolicy } from "@typedefs/policy";
import React, { FC, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

interface IRemarks {
  data: Partial<InsurancePolicy>;
  setData: React.Dispatch<React.SetStateAction<Partial<InsurancePolicy>>>;
}

const Remarks: FC<IRemarks> = ({ data, setData }) => {
  const [remarks, setRemarks] = useState<any>(data.remarks ?? [{ note: "" }]);

  const removeFieldEntry = (index: number) => {
    const updatedFields = [...remarks];
    updatedFields.splice(index, 1);
    setRemarks(updatedFields);
  };

  const handleChange = (index: number, value: string) => {
    const updatedFields = [...remarks];
    updatedFields[index]["note"] = value;
    setData({ ...data, remarks: updatedFields });
  };

  const handleAddField = () => {
    setRemarks([...remarks, { note: "" }]);
  };

  return (
    <React.Fragment>
      <Grid>
        <Grid container spacing={2}>
          {remarks?.map((e: Partial<InsurancePolicy>, index: number) => {
            return (
              <>
                <Grid item xs={11}>
                  <TextField fullWidth label="Remarks" id={`remarks-${index}`} value={remarks ? remarks[index]["note"] : ""} name="remarks" onChange={(e) => handleChange(index, e.target.value)} />
                </Grid>
                <Grid item xs={1}>
                  <IconButton onClick={() => removeFieldEntry(index)}>
                    <CloseIcon />
                  </IconButton>
                </Grid>
              </>
            );
          })}
          <Grid item xs={12} textAlign="right">
            <Button variant="contained" onClick={handleAddField} size="small">
              {remarks.length <= 0 ? "Add Remarks" : "Add more Remarks"}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Remarks;
