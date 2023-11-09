import { handleChange } from "@helper/objects/setter";
import { Divider, Grid, TextField, Typography } from "@mui/material";
import { InsurancePolicy, PolicyTypes } from "@typedefs/policy";
import { FC, useEffect } from "react";
import { NumericFormat } from "react-number-format";
interface IComputation {
  data: Partial<InsurancePolicy>;
  setData: (data: InsurancePolicy) => void;
  totalPrem: any;
  setTotalPrem: any;
  amtDue: any;
  setAmtDue: any;
}
const formatNumber = (value: any) => {
  if (value != null) {
    value = parseFloat(value?.replace(/[, ]/g, ""));
    if (!isNaN(value) && value !== "") {
      const formattedValue = Number(value).toLocaleString("en-US").toString();
      return formattedValue;
    }
  }
};

function parseStringNumber(input: any): number {
  if (input === "" || input === null) {
    return 0;
  }

  // Remove commas and parse to float
  const sanitizedInput = String(input).replace(/,/g, "");
  const parsedFloat = parseFloat(sanitizedInput);

  // Check if parsing was successful
  if (isNaN(parsedFloat)) {
    return 0;
  }

  return parsedFloat;
}
// ld?: string;
//   ldP?: string;
//   lu?: string;
//   luP?: string;
const Computation: FC<IComputation> = ({ data, setData, totalPrem, setTotalPrem, amtDue, setAmtDue }) => {
  useEffect(() => {
    if (data.type === PolicyTypes.MOTOR) {
      const { odP, theftP, vbiP, vpdP, autoPaP, aogP, other, ldP, luP } = data?.motor! ?? {};
      let { premium } = other! ?? 0;
      let sum: number = parseStringNumber(odP) + parseStringNumber(vbiP) + parseStringNumber(vpdP) + parseStringNumber(theftP) + parseStringNumber(autoPaP) + parseStringNumber(aogP) + parseStringNumber(premium) + parseStringNumber(ldP) + parseStringNumber(luP);
      let amtdue: number = (sum ?? 0) + parseStringNumber(data?.docStamp) + parseStringNumber(data?.vat) + parseStringNumber(data?.others) + parseStringNumber(data?.govtTax);
      setAmtDue(amtdue);
      setTotalPrem(sum);
      premium = String(sum);
    } else {
      const dataOthers: any = data[data?.type?.toLowerCase() as keyof InsurancePolicy];
      let sum: number = 0;
      let amtdue: number = 0;
      for (const key in dataOthers) {
        if (dataOthers.hasOwnProperty(key) && typeof dataOthers[key] === "object" && "premium" in dataOthers[key]) {
          const value = parseFloat(dataOthers[key]["premium"]?.replace(/[, ]/g, ""));
          if (!isNaN(value)) {
            sum += value;
          }
        } else {
          const value = parseFloat(dataOthers[key]);
          if (!isNaN(value)) {
            amtdue += value;
          }
        }
      }
      setAmtDue(sum + parseStringNumber(data?.docStamp) + parseStringNumber(data?.vat) + parseStringNumber(data?.others) + parseStringNumber(data?.govtTax));
      setTotalPrem(sum);
    }
  }, [data]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <NumericFormat
            fullWidth
            label="Total Premium"
            value={totalPrem}
            decimalScale={2}
            customInput={TextField}
            thousandSeparator=","
            // prefix="₱"
            inputProps={{
              style: { textAlign: "right" },
              step: "any",
            }}
            disabled
          />
          {/* <TextField label="Total Premium" name="prem" disabled fullWidth value={totalPrem} /> */}
        </Grid>
        <Grid item xs={12}>
          <NumericFormat customInput={TextField} thousandSeparator="," label="Doc. Stamp" name="docStamp" fullWidth value={data?.docStamp} onChange={(e) => handleChange(e, data, setData)} />
        </Grid>
        <Grid item xs={12}>
          <NumericFormat customInput={TextField} thousandSeparator="," label="VAT" type="text" name="vat" fullWidth value={data?.vat} onChange={(e) => handleChange(e, data, setData)} />
        </Grid>
        <Grid item xs={12}>
          <NumericFormat customInput={TextField} thousandSeparator="," label="Local Gov't Tax" name="govtTax" fullWidth value={data?.govtTax} onChange={(e) => handleChange(e, data, setData)} />
        </Grid>
        <Grid item xs={12}>
          <NumericFormat customInput={TextField} thousandSeparator="," label="Others" name="others" fullWidth value={data?.others} onChange={(e) => handleChange(e, data, setData)} />
        </Grid>
        <Grid item xs={12}>
          <NumericFormat
            fullWidth
            label="Amount Due"
            value={amtDue}
            customInput={TextField}
            decimalScale={2}
            thousandSeparator=","
            // prefix="₱"
            inputProps={{
              style: { textAlign: "right" },
              step: "any",
            }}
            disabled
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Computation;
