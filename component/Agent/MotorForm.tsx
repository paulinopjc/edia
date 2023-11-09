import { FC } from "react";
import { Divider, Grid, TextField, Typography } from "@mui/material";
import { InsurancePolicy } from "@typedefs/policy";
import { handleChange } from "@helper/objects/setter";
import { NumericFormat } from "react-number-format";

interface IMotorForm {
  data: Partial<InsurancePolicy>;
  setData: (data: InsurancePolicy) => void;
  totalPrem: any;
  setTotalPrem: any;
}
const formatNumber = (value: any) => {
  if (value != null) {
    value = parseFloat(value?.replace(/[, ]/g, ""));
    if (!isNaN(value) && value !== "") {
      const formattedValue = Number(value).toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 }).toString();
      return formattedValue;
    }
  }
  return "0";
};

const MotorForm: FC<IMotorForm> = ({ data, setData, totalPrem, setTotalPrem }) => {
  return (
    <Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography id="premium" key={`prem`} component="h3" variant="h6" sx={{ fontStyle: "bold" }}>
            Car Details *
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField label="Serial" name="serial" fullWidth value={data?.motor?.serial} disabled={data?._id ? true : false} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Motor" name="motor" fullWidth value={data?.motor?.motor} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Year/Model" name="modelMakeRisk" fullWidth value={data?.motor?.modelMakeRisk} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Plate" name="plate" fullWidth value={data?.motor?.plate} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={12}>
          <TextField label="MV File" name="mvFile" fullWidth value={data?.motor?.mvFile} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Typography id="premium" key={`prem`} component="h3" variant="h6" sx={{ fontStyle: "bold" }}>
            Premiums *
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <NumericFormat customInput={TextField} thousandSeparator="," label="OD Sum Insured" name="od" fullWidth value={data?.motor?.od} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <NumericFormat customInput={TextField} thousandSeparator="," label="OD Premium" name="odP" fullWidth value={data?.motor?.odP} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <NumericFormat customInput={TextField} thousandSeparator="," label="THEFT Sum Insured" name="theft" fullWidth value={data?.motor?.theft} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <NumericFormat customInput={TextField} thousandSeparator="," label="THEFT Premium" name="theftP" fullWidth value={data?.motor?.theftP} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <NumericFormat customInput={TextField} thousandSeparator="," label="V-BI Sum Insured" name="vbi" fullWidth value={data?.motor?.vbi} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <NumericFormat customInput={TextField} thousandSeparator="," label="V-BI Premium" name="vbiP" fullWidth value={data?.motor?.vbiP} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <NumericFormat customInput={TextField} thousandSeparator="," label="V-PD Sum Insured" name="vpd" fullWidth value={data?.motor?.vpd} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <NumericFormat customInput={TextField} thousandSeparator="," label="V-PD Premium" name="vpdP" fullWidth value={data?.motor?.vpdP} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <NumericFormat customInput={TextField} thousandSeparator="," label="Auto PA Sum Insured" name="autoPa" fullWidth value={data?.motor?.autoPa} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <NumericFormat customInput={TextField} thousandSeparator="," label="Auto PA Premium" name="autoPaP" fullWidth value={data?.motor?.autoPaP} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <NumericFormat customInput={TextField} thousandSeparator="," label="AOG Sum Insured" name="aog" fullWidth value={data?.motor?.aog} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <NumericFormat customInput={TextField} thousandSeparator="," label="AOG Premium" name="aogP" fullWidth value={data?.motor?.aogP} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <NumericFormat customInput={TextField} thousandSeparator="," label="Loss of Use Sum Insured" name="lu" fullWidth value={data?.motor?.lu} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <NumericFormat customInput={TextField} thousandSeparator="," label="Loss of Use Premium" name="luP" fullWidth value={data?.motor?.luP} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <NumericFormat customInput={TextField} thousandSeparator="," label="Loss & Damages Sum Insured" name="ld" fullWidth value={data?.motor?.ld} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={6}>
          <NumericFormat customInput={TextField} thousandSeparator="," label="Loss & Damages Premium" name="ldP" fullWidth value={data?.motor?.ldP} onChange={(e) => handleChange(e, data, setData, true)} />
        </Grid>
        <Grid item xs={12}>
          <NumericFormat
            fullWidth
            placeholder="Sum Insured"
            name="sumIssued"
            value={formatNumber(String(data?.motor?.other?.sumIssued))}
            customInput={TextField}
            thousandSeparator=","
            // prefix="₱"
            inputProps={{
              style: { textAlign: "right" },
              step: "any",
            }}
            onValueChange={(values, sourceInfo) => {
              console.log(values, sourceInfo);
              // handleChange(values.floatValue!);
              handleChange(sourceInfo.event, data, setData, true, true, values);
            }}
          />
        </Grid>
        {/* <Grid item xs={4}>
          <NumericFormat
            fullWidth
            placeholder="Premium"
            name="premium"
            value={Number(data?.motor?.other?.premium) ?? 0}
            customInput={TextField}
            thousandSeparator=","
            // prefix="₱"
            inputProps={{
              style: { textAlign: "right" },
              step: "any",
            }}
            onValueChange={(values, sourceInfo) => {
              console.log(values, sourceInfo);
              // handleChange(values.floatValue!);
              handleChange(sourceInfo.event, data, setData, true, true, values);
            }}
          />
        </Grid> */}
      </Grid>
    </Grid>
  );
};

export default MotorForm;
