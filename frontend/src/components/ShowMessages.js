import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  SVGOverlay,
} from "react-leaflet";
import "../App.css";
import "leaflet/dist/leaflet.css";
import dayjs from "dayjs";

const defaultCenter = [38.9072, -77.0369];
const defaultZoom = 8;
const disneyWorldLatLng = [28.3852, -81.5639];
const disneyLandLatLng = [33.8121, -117.919];

function ShowMessages({ messages }) {
  return messages.map((item) => <MessageBox {...item} />);
}

function MessageBox({
  location,
  message,
  name,
  when,
  startTime,
  endTime,
  eventType,
}) {
  let endLocation = [...location];
  endLocation[0] += 0.0005;
  endLocation[1] += 0.005;
  let bounds = [location, endLocation];

  let space = " ";
  return (
    <>
      <MessageBox2 message={message} location={location} />
      <SVGOverlay attributes={{ stroke: "#fff" }} bounds={bounds}>
        <rect
          // rx={"10px"}
          // ry={"10px"}
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="rgba(0,0,0,0.5)"
        />
        {/* <circle r="5" cx="10" cy="10" fill="red" /> */}
        <text x="20px" y="20px" stroke="white">
          Type : {eventType}
        </text>
        <text x="20px" y="40px" stroke="white">
          Name : {name}
        </text>
        <text x="20px" y="60px" stroke="white">
          {message}
        </text>

        {eventType == "Event" ? (
          <text x="20px" y="80px" stroke="white">
            {getDate(when)} : {getTime(startTime)} - {getTime(endTime)}
          </text>
        ) : null}
      </SVGOverlay>
    </>
  );
}

function getTime(value) {
  if (!value) return;
  return `${dayjs(value).get("hour")}:${dayjs(value).get("minute")}`;
}

function getDate(value) {
  if (!value) return;
  return `${dayjs(value).get("date")}:${dayjs(value).get("month")}:${dayjs(
    value
  ).get("year")}`;
}

function MessageBox2({ location, message }) {
  return (
    <Marker position={location}>
      <Popup>{message}</Popup>
    </Marker>
  );
}

export default ShowMessages;
