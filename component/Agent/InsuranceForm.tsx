import { Box, Button, Divider, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import React, { FC, useEffect, useState } from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { InsurancePolicy, PolicyTypes } from "@typedefs/policy";
import { AddPolicy, UpdatePolicy } from "@helper/client/policy";
import { useSession } from "next-auth/react";
import SnackBarComponent from "@components/Snackbar";
import GiaForm from "./GiaForm";
import FormRenderer from "./FormRenderer";
import Remarks from "./Remarks";
import { useRouter } from "next/router";
import Computation from "./Computation";
import { NumericFormat } from "react-number-format";
import { handleChange } from "@helper/objects/setter";
interface IInsuranceForm {
  open: boolean;
  data?: InsurancePolicy;
  onClose?: () => void;
}

const InsuranceForm: FC<IInsuranceForm> = ({ open, data, onClose }) => {
  const router = useRouter();
  const [entries, setEntries] = useState<Partial<InsurancePolicy>>(
    data ?? {
      type: PolicyTypes.MOTOR, // default
    }
  );
  const { data: session } = useSession({ required: true });
  const [loading, setLoading] = useState<any>(false);

  const [totalPrem, setTotalPrem] = useState<any>();
  const [amtDue, setAmtDue] = useState<any>();

  const [snackbar, setSnackbar] = useState<any>({
    isOpen: false,
    isError: false,
    message: null,
  });
  const handleKeyDown = (event: any) => {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  };

  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    if (data?._id) {
      const { _id } = data;
      await UpdatePolicy({ ...entries, _id }, session?.user.accessToken!, setSnackbar);
      setLoading(false);
      onClose && onClose();
      open = false;
      return router.push("/insurance/list");
    } else {
      await AddPolicy({ ...entries }, session?.user.accessToken!, setSnackbar);
      setLoading(false);
      onClose && onClose();
      open = false;
      return router.push("/insurance/list");
    }
  };

  useEffect(() => {
    console.log("entries", entries);
  }, [entries]);

  return (
    <>
      <SnackBarComponent setSnackbar={setSnackbar} snackbar={snackbar} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 5,
        }}
      >
        <LocalizationProvider dateAdapter={AdapterMoment}>
          {data?._id ? null : (
            <Typography component="h1" variant="h4" align="center" sx={{ mb: 5 }}>
              Add Form
            </Typography>
          )}
          <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography id="premium" key={`prem`} component="h3" variant="h6" sx={{ fontStyle: "bold" }}>
                  Policy Type *
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Policy Type"
                  value={entries?.type}
                  name="type"
                  // onChange={(e) => setEntries({ ...entries, type: e.target.value as PolicyTypes })}
                  onChange={(e) => {
                    const newType = e.target.value as PolicyTypes;
                    const updatedEntries = { ...entries };
                    if (entries.hasOwnProperty(entries.type!?.toLowerCase())) {
                      delete updatedEntries[entries.type!.toLowerCase() as keyof InsurancePolicy];
                    }
                    updatedEntries.type = newType;
                    setEntries(updatedEntries);
                  }}
                >
                  <MenuItem value="">Select Policy Type</MenuItem>
                  {Object.values(PolicyTypes).map((policyType) => (
                    <MenuItem key={policyType} value={policyType}>
                      {policyType}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Typography id="premium" key={`prem`} component="h3" variant="h6" sx={{ fontStyle: "bold" }}>
                  GIA Details *
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <GiaForm data={entries} setData={setEntries} />
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              {entries.type !== PolicyTypes.MOTOR ? (
                <Grid item xs={12}>
                  <Typography id="premium" key={`prem`} component="h3" variant="h6" sx={{ fontStyle: "bold" }}>
                    Details *
                  </Typography>
                </Grid>
              ) : null}
              <Grid item xs={12}>
                <FormRenderer data={entries} setData={setEntries} type={entries?.type as PolicyTypes} totalPrem={totalPrem} setTotalPrem={setTotalPrem} />
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Typography id="premium" key={`prem`} component="h3" variant="h6" sx={{ fontStyle: "bold" }}>
                  Computations *
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Computation data={entries} setData={setEntries} totalPrem={totalPrem} setTotalPrem={setTotalPrem} amtDue={amtDue} setAmtDue={setAmtDue} />
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Typography id="premium" key={`prem`} component="h3" variant="h6" sx={{ fontStyle: "bold" }}>
                  Deductibles *
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <NumericFormat customInput={TextField} thousandSeparator="," label="Deductibles" name="deductibles" fullWidth={true} value={data?.deductibles} onChange={(e) => handleChange(e, data, setEntries)} />
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Typography id="premium" key={`prem`} component="h3" variant="h6" sx={{ fontStyle: "bold" }}>
                  Remarks *
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Remarks data={entries} setData={setEntries} />
              </Grid>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
                {data?._id ? "Update" : "Submit"}
              </Button>
            </Grid>
          </form>
        </LocalizationProvider>
      </Box>
    </>
  );
};

export default InsuranceForm;
