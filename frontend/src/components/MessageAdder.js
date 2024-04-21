import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "../App.css";
import "leaflet/dist/leaflet.css";
import styled from "styled-components";
import netLine from "../controllers/netLine";
import { MdOutlineClose } from "react-icons/md";
import MaterialInput from "./MaterialInput";
import CustomSelect from "./CustomSelect";
import DropDownInput from "./DropDownInput";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const Container = styled.div`
  height: 80px;
  overflow: hidden;
  cursor: default;
  width: 20vw;
  z-index: 100000;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgba(2, 10, 36, 0.9) 0%,
    rgba(9, 9, 11, 0.9) 35%,
    rgba(0, 20, 20, 0.9) 100%
  );
  box-shadow: 1px 1px 50px 1px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(20px);
  padding: 10px 35px;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  display: flex;
  gap: 25px;
  border-radius: 5px;
  color: #fff;

  transition: 0.25s ease-in-out;

  ${({ opened }) => {
    if (opened) {
      return `
        width: 30vw;
        justify-content:flex-start;
        height:60vh;
        padding: 10px 35px;

      `;
    }
  }}
`;

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h1``;

const Input = styled.textarea`
  background-color: rgba(0, 0, 0, 0.1);
  resize: none;
  border-radius: 10px;
  border: none;
  padding: 10px;
  color: #fff;
  font-family: "Raleway";

  &::placeholder {
    color: #fff6;
  }
`;

const Button = styled.div`
  border: 1px solid var(--translucentHard);
  padding: 10px 20px;
  font-size: 15px;
  width: 100px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  align-items: center;
  border-radius: 10px;

  &:hover {
    background-color: var(--translucentHard);
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const CloseButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  cursor: pointer;
  background: #111111;
  background: linear-gradient(
    90deg,
    rgba(5, 20, 72, 1) 0%,
    rgba(18, 18, 18, 1) 35%,
    rgba(0, 40, 40, 1) 100%
  );
  backdrop-filter: blur(200px);
  top: -20px;
  right: -20px;
  height: 50px;
  width: 50px;
  font-size: 20px;
  border-radius: 100px;
  transition: 0.25s ease-in-out;

  &:hover {
    transform: scale(0.7);
  }
`;

function MessageAdder({ setMessages, eventType, label }) {
  const [name, setName] = useState();
  const [message, setMessage] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [when, setWhen] = useState();

  const [opened, setOpened] = useState(false);

  let newData = {
    message,
    name,
    startTime,
    endTime,
    when,
    eventType,
  };

  window.adderData[eventType] = newData;

  console.log(window.adderData, eventType, window.adderData[eventType]);

  if (!opened)
    return (
      <Container
        style={{ cursor: "pointer" }}
        onClick={() => {
          setOpened(true);
        }}
      >
        <Title>Post {label}</Title>
      </Container>
    );

  return (
    <Container opened={opened}>
      <Title>Post {label}</Title>

      <InputSection>
        {eventType == "Event" ? (
          <>
            <DatePicker
              label="Select Date"
              value={when ? dayjs(when) : null}
              onChange={(newDate) => {
                setWhen(newDate["$d"].toISOString());
              }}
            />

            <TimePicker
              label="Start Time"
              value={startTime ? dayjs(startTime) : null}
              onChange={(newDate) => {
                setStartTime(newDate["$d"].toISOString());
              }}
            />
            <TimePicker
              label="End Time"
              value={endTime ? dayjs(endTime) : null}
              onChange={(newDate) => {
                setEndTime(newDate["$d"].toISOString());
              }}
            />
          </>
        ) : null}

        <MaterialInput
          variant="filled"
          value={name}
          onChange={({ target }) => {
            setName(target.value);
          }}
          placeholder="Title"
        />
        <MaterialInput
          variant="filled"
          value={message}
          onChange={({ target }) => {
            setMessage(target.value);
          }}
          placeholder="Description"
        />

        <Buttons>
          <Button onClick={publish}>Publish</Button>
          <Button
            onClick={() => {
              setOpened(false);
            }}
          >
            Minimize
          </Button>
        </Buttons>
      </InputSection>
    </Container>
  );

  function publish() {
    if (!name) {
      return window.doAlert("Please add a title");
    }

    if (!message) {
      return window.doAlert("Please add a description");
    }

    window.findingLocation = true;
    window.forType = eventType;
    window.callback = () => {
      setName(null);
      setMessage(null);
      setStartTime(null);
      setEndTime(null);
      setWhen(null);
    };
    window.doAlert("Please select a location");
  }
}

export default MessageAdder;
