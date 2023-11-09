import { TextField } from "@mui/material";
import { FC, useEffect, useMemo, useState } from "react";
import { NumericFormat } from "react-number-format";

interface INumberTextField {
  type: React.InputHTMLAttributes<unknown>["type"];
  name: string;
  value: any;
  onChange: any;
  index: any;
  label?: string;
  placeholder?: string;
}

const NumberTextField: FC<INumberTextField> = ({ type, label, name, value, onChange, index, placeholder }) => {
  const [inputValue, setInputValue] = useState(value ?? 0);

  useEffect(() => {
    console.log("inputValue: ", inputValue);
  }, [inputValue]);

  const handleChange = (e: any, values: number) => {
    const { value } = e.target;
    console.log("name target: ", name);
    if (!name) return;
    setInputValue(values);
    onChange(index, name, value);
  };

  return (
    <NumericFormat
      fullWidth
      label={label ?? ""}
      value={inputValue}
      customInput={TextField}
      thousandSeparator=","
      // prefix="₱"
      placeholder={placeholder ?? ""}
      inputProps={{
        style: { textAlign: "right" },
        step: "any",
      }}
      onValueChange={(values, sourceInfo) => {
        console.log(values, sourceInfo);
        handleChange(sourceInfo?.event, values.floatValue!);
      }}
    />
    // <TextField
    //   // type={type}
    //   label={label}
    //   name={name}
    //   defaultValue={inputValue}
    //   onChange={handleChange}
    //   fullWidth
    // inputProps={{
    //   style: { textAlign: "right" },
    //   step: "any",
    // }}
    //   onBlur={(e) => setInputValue(parseFloat(e.target.value).toFixed(1))}
    // />
  );
};

export default NumberTextField;
