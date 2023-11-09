import NumberTextField from "@components/NumberTextField";
import { arrayToObject, objectToArray } from "@helper/objects/setter";
import { Button, Grid, IconButton, TextField } from "@mui/material";
import { DynamicField, InsurancePolicy } from "@typedefs/policy";
import React, { FC, useEffect, useState, useMemo } from "react";
import CloseIcon from "@mui/icons-material/Close";

interface IDynamicForm {
  data: Partial<InsurancePolicy>;
  setData: (formData: Partial<InsurancePolicy>) => void;
  totalPrem: any;
  setTotalPrem: any;
}

export const DynamicForm: FC<IDynamicForm> = ({ data, setData, totalPrem, setTotalPrem }) => {
  const [entries, setEntries] = useState<any>([]);

  const removeFieldEntry = (index: number) => {
    const updatedFields = [...entries];
    updatedFields.splice(index, 1);
    setEntries(updatedFields);
  };

  useEffect(() => {
    const { type } = data;
    if (data[type?.toLowerCase() as keyof InsurancePolicy]) {
      setEntries(data[type?.toLowerCase() as keyof InsurancePolicy]);
    }
  }, []);

  useMemo(() => {
    const { type } = data;
    setData({ ...data, [type?.toLowerCase() as keyof InsurancePolicy]: entries });
  }, [entries]);

  const handleAddField = () => {
    setEntries([...entries, { particularHeaderName: "", particular: "", premium: "" }]);
  };

  const handleChange = (index: number, field: string, value: string | number) => {
    const updatedFields = [...entries];
    updatedFields[index][field] = value;
    setEntries(updatedFields);
  };

  return (
    <React.Fragment>
      <Grid>
        <Grid container spacing={2}>
          {entries.map((e: DynamicField, index: number) => {
            return (
              <Grid container item xs={12} spacing={2} alignItems="center" key={index}>
                <Grid item xs={6}>
                  <TextField fullWidth label="Header/Particulars" placeholder="Partiuclar Name" name="particularHeaderName" value={e.particularHeaderName} onChange={(e) => handleChange(index, e.target.name, e.target.value)} />
                </Grid>
                <Grid item xs={6}>
                  <Grid container xs={12} spacing={2} alignItems="center">
                    <Grid item xs={6}>
                      <NumberTextField label="Sum Insured" type="number" index={index} placeholder="Sum Insured" name="particular" value={e.particular} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={5}>
                      <NumberTextField label="Premium" type="number" index={index} placeholder="Premium" name="premium" value={e.premium} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={1}>
                      <IconButton onClick={() => removeFieldEntry(index)}>
                        <CloseIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
          <Grid item xs={12} textAlign="right">
            <Button variant="contained" onClick={handleAddField} size="medium">
              Add more field
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
