import styled, { ThemeProvider } from "styled-components";
import { useEffect, useContext, useState, useRef } from "react";

//all positon value and height has been calibrated for proper animation
//don't change them

const Container = styled.div`
  border-radius: 5px;
  background: var(--translucent);
  min-height: 57px;
  position: relative;
`;

const Name = styled.div`
  top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: top 0.25s ease-in-out;
  position: absolute;
  left: 15px;
  text-transform: capitalize;
  font-weight: 600;
  font-family: "Inter";
  color: var(--color);
  opacity: 0.5;
  font-size: 14px;
  pointer-events: none;
  ${({ mode }) => {
    if (mode == "DETAILED") {
      return `
      top: 9px;
      `;
    }
    return "";
  }}
`;

const InputBox = styled.input`
  top: 0;
  height: 100%;
  position: absolute;
  width: 90%;
  background-color: transparent;
  outline: none;
  border: none;
  font-size: ${({ fontSize }) => fontSize + "px"};
  color: var(--color);
  ${({ mode }) => {
    if (mode == "DETAILED") {
      return `
      left: 15px;
      top: 27px;
      `;
    }
    return "";
  }}
`;

const TextArea = styled.textarea`
  position: absolute;
  height: 100%;
  top: 0;
  display: flex;
  font-weight: 600;
  font-family: "Inter";
  justify-content: center;
  padding-top: 18px;
  align-items: center;
  left: 15px;
  width: 90%;
  outline: none;
  background-color: transparent;
  border: none;
  font-size: ${({ fontSize }) => fontSize + "px"};
  color: var(--color);
  resize: none;
  max-height: 200px;
  overflow-y: hidden;
  ${({ mode, fontSize, lines }) => {
    if (mode == "DETAILED") {
      return `
      position: relative;
      height:auto;
      display: unset;
      margin-top:30px;
      padding-top: 0;
      height: ${
        lines == 1 || lines == 0 ? fontSize + 2 + "px" : lines * fontSize + "px"
      };
      overflow-y: ${lines == 1 || lines == 0 ? "hidden" : "auto"};
      `;
    }
    return "";
  }}
`;

export default function Input({ value, onChange, placeholder, type }) {
  if (!type) type = "LONG_TEXT";
  let fontSize = 15;
  if (typeof value !== "string") value = "";
  const [val, setVal] = useState(value);
  const [inputBoxWidth, setInputBoxWidth] = useState(18);

  const ref = useRef(null);
  // console.log("width", inputBoxWidth);
  useEffect(() => {
    setInputBoxWidth(ref.current ? ref.current.offsetWidth : 18);
  }, [ref.current]);

  useEffect(() => {
    if (value !== val) setVal(value);
  }, [value]);

  return (
    <Container data-type={type} data-val={value}>
      <Name mode={getMode()}>{placeholder}</Name>
      {type == "LONG_TEXT" ? (
        <TextArea
          ref={ref}
          data-lines={getLineCount()}
          mode={getMode()}
          fontSize={fontSize}
          onChange={callWhenChangesStop}
          lines={getLineCount()}
          value={val}
        />
      ) : (
        <InputBox
          ref={ref}
          mode={getMode()}
          type={type == "NUMBER" ? "number" : "text"}
          fontSize={fontSize}
          onChange={callWhenChangesStop}
          value={val}
        />
      )}
    </Container>
  );

  function callWhenChangesStop(e) {
    setVal(e.target.value);
    let varName = "changeTimeout" + placeholder.replace(/\s/, "");
    if (window[varName]) window.clearTimeout(window[varName]);
    window[varName] = window.setTimeout(() => {
      onChange(e);
    }, 1000);
  }

  function getMode() {
    if (val) return "DETAILED";
    return "MINIMAL";
  }

  function getLineCount() {
    if (!val) return null;
    let valSplit = val.split("\n");
    let count = valSplit.length;

    let wordsPerLine = inputBoxWidth / (fontSize * 0.7);

    for (let line of valSplit) {
      if (line.length >= wordsPerLine) {
        let lineBreaks = line.length / wordsPerLine;
        count += lineBreaks;
      }
    }
    // console.log(count);
    return Math.round(count);
  }
}
