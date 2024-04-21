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
import MessageAdder from "./MessageAdder";
import ShowMessages from "./ShowMessages";
import Base from "./Base";
import netLine from "../controllers/netLine";
import styled from "styled-components";
import { FaRegMap } from "react-icons/fa";
import MapAdder from "./MapAdder";

const Title = styled.div`
  background-color: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(200px);
  padding: 10px 20px;
  font-size: 30px;
  font-weight: 900;
  border-radius: 5px;
  position: fixed;
  z-index: 50000;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;

const TitleIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MessageAdderContainer = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  display: flex;
  z-index: 50000;
  gap: 20px;
  align-items: flex-end;
  flex-direction: column;
`;
const eventTypes = [
  { value: "News", label: "News" },
  { value: "Event", label: "Event" },
  { value: "Accident", label: "Accident" },
  { value: "Damage", label: "Damage" },
  { value: "Item Lost", label: "Item Lost" },
  { value: "Item Found", label: "Item Found" },
];

function MapPage() {
  const position = [31.255046724039705, 75.70020759443199];
  const [messages, setMessages] = useState([]);

  if (!window.adderData) window.adderData = {};
  window.messages = messages;

  useEffect(() => {
    netLine.get("messages").then((newData) => {
      let parsed = newData.map((item) => {
        return { ...item, location: JSON.parse(item.location) };
      });

      console.log(parsed);
      setMessages(parsed);
    });
  }, []);

  return (
    <Base>
      <MapContainer
        center={position}
        zoom={80}

        // whenReady={setMapState}
        // scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapAdder setMessages={setMessages} />
        <MessageAdderContainer>
          {eventTypes.map((item) => (
            <MessageAdder
              key={item.value}
              messages={messages}
              setMessages={setMessages}
              label={item.label}
              eventType={item.value}
            />
          ))}
        </MessageAdderContainer>

        <ShowMessages messages={messages} />
        <Title>
          <TitleIcon>
            <FaRegMap />
          </TitleIcon>
          <TitleText>Map News</TitleText>
        </Title>
      </MapContainer>
    </Base>
  );
}

export default MapPage;
