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

function MapAdder({ setMessages }) {
  useMapEvents({
    click: (e) => {
      if (window.findingLocation) {
        let forType = window.forType;
        let callBack = window.callback;

        console.log(window.findingLocation);
        let thisData = window.adderData[forType];
        let location = [e.latlng.lat, e.latlng.lng];

        console.log(window.adderData, forType, thisData);

        setMessages([
          ...window.messages,
          {
            location,
            message: thisData.message,
            name: thisData.name,
            eventType: thisData.eventType,
            startTime: thisData.startTime,
            endTime: thisData.endTime,
            when: thisData.when,
          },
        ]);

        callBack();

        window.findingLocation = false;

        let url = `message/?name=${thisData.name}&message=${
          thisData.message
        }&location=${JSON.stringify(location)}&eventType=${forType}`;

        if (thisData.startTime) {
          url += `&startTime=${thisData.startTime}`;
        }

        if (thisData.endTime) {
          url += `&endTime=${thisData.endTime}`;
        }

        if (thisData.when) {
          url += `&when=${thisData.when}`;
        }

        netLine.post(url);
      }
    },
    locationfound: (location) => {
      console.log("location found:", location);
    },
  });
}

export default MapAdder;
