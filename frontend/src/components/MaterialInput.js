import { TextField } from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import dayjs from "dayjs";

export default function MaterialInput({
  value,
  onChange,
  label,
  disableUnderline,
  fontSize,
  multiline,
  maxRows,
  onEnter,
  fontWeight,
  rows,
  type,
  autoFocus = false,
  onlyYear,
  variant = "filled",
  placeholder,
}) {
  if (!fontSize) fontSize = "var(--fontSize1)";

  if (type == "date")
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={label}
          views={onlyYear ? ["year"] : null}
          onChange={(newDate) => {
            let theVal = newDate["$d"];

            console.log(newDate["$d"].toString());
            if (theVal.toString() === "Invalid Date") return true;
            // if (theVal === "Invalid time") return true;

            // console.log(newDate["$d"]);
            // console.log(newDate["$d"].toString());
            // console.log(newDate);
            console.log(newDate["$d"].toISOString());
            onChange({ target: { value: newDate["$d"].toISOString() } });
          }}
          value={value ? dayjs(value) : null}
          // slotProps={{ textField: { variant: "filled" } }} // Don't enable this, label will look weird
          sx={{
            borderRadius: "var(--borderRadius1);",
            // overflow: "hidden",

            input: { color: "#ffffff", padding: "19px 17px !important" },
            root: { color: "#ffffff" },
          }}
          // sx={{ ,}}
          //
          InputProps={{
            disableUnderline: disableUnderline ? true : false,
            style: {
              overflow: "hidden",
              borderRadius: "var(--borderRadius1);",
              color: "#ffffff",
            },
          }}
        />
      </LocalizationProvider>
    );

  return (
    <TextField
      autoFocus={autoFocus}
      type={type}
      InputLabelProps={{ style: { fontSize: fontSize, opacity: "0.8" } }}
      InputProps={{
        disableUnderline: disableUnderline ? true : false,

        style: {
          fontSize: fontSize,
          fontWeight: fontWeight,
          borderRadius: "var(--borderRadius1)",
          color: "#ffffff",
          backgroundColor: "transparent",
          border: "1px solid var(--translucentHard)",
          overflow: "hidden",
        },
      }}
      sx={{ input: { color: "#ffffff" } }}
      fullWidth
      multiline={multiline}
      maxRows={maxRows}
      placeholder={placeholder}
      onKeyDown={(ev) => {
        console.log(`Pressed keyCode ${ev.key}`);
        if (ev.key === "Enter") {
          if (onEnter) {
            onEnter(ev);
          }
          // Do code here
          ev.preventDefault();
        }
      }}
      rows={rows}
      value={value}
      onChange={onChange}
      label={label}
      variant={variant}
    />
  );
}
