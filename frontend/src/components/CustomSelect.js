import Select from "react-select";

export default function CustomSelect({ value, onChange, options }) {
  let theValue = value ? getValue(options, value) : options[0];

  return (
    <Select
      components={{
        IndicatorSeparator: () => null,
      }}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          fontSize: "15px",
          minHeight: "40px",
          paddingLeft: "5px",
          background: "var(--translucent)",
          opacity: 0.7,
          border: "none",
        }),
        dropdownIndicator: (base) => ({
          ...base,
          marginLeft: "-11px",
        }),
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 15,
        paddingLeft: "25px",
        colors: {
          ...theme.colors,
          primary25: "var(--translucent)",
          neutral0: "var(--bgColor)",
          neutral5: "var(--bgColor)",
          neutral10: "var(--bgColor)",
          neutral20: "var(--translucentHard)",
          neutral30: "var(--color)",
          neutral40: "var(--color)",
          neutral50: "var(--color)",
          neutral60: "var(--color)",
          neutral70: "var(--color)",
          neutral80: "var(--color)",
          neutral90: "var(--color)",
        },
      })}
      value={theValue}
      onChange={(data) => {
        onChange(data.value);
      }}
      options={options}
    />
  );
}

function getValue(array, val) {
  for (let item of array) {
    if (item.value == val) return item;
  }

  return null;
}
