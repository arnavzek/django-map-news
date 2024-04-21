import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LeaderBoard from "./components/Leaderboard";
import Home from "./components/Home";
import Play from "./components/Play";
import MapPage from "./components/MapPage";
import DynamicForm from "./DynamicForm";
import { useEffect, useState } from "react";
import Context from "./Context";
import { ThemeProvider, createTheme } from "@mui/material/styles/index.js";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#e8eaf6",
    },
    secondary: {
      main: "#8bc34a",
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <MapPage />,
  },
]);

export function Main() {
  const [formData, setFormData] = useState(false);

  useEffect(() => {
    setColors();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Context.Provider
        value={{
          setForm: setForm,
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <RouterProvider router={router} />;
          <DynamicForm setForm={setForm} data={formData} />
        </LocalizationProvider>
      </Context.Provider>
    </ThemeProvider>
  );

  function setColors() {
    let newVal = "DARK";
    let colors = {
      bgColor: "#ffffff",
      bgColorDark: "#e9e9e9",
      bgColor2: "#ffffff",
      color: "#111111",
      translucentLight: "rgba(0,0,0,0.1)",
      translucent: "rgba(0,0,0,0.3)",
      accentColor: "#4caf50",
      translucentMedium: "rgba(0,0,0,0.1)",
      translucentHard: "rgba(0,0,0,0.2)",
    };

    if (newVal) {
      if (newVal === "DARK")
        colors = {
          bgColor: "#111111",
          bgColorDark: "#000000",
          bgColorLight: "#222222",
          bgColor2: "#000000",
          color: "#ffffff",
          accentColor: "#4caf50",
          translucentLight: "#222",
          translucent: "rgb(212 226 227 / 10%)",
          translucentMedium: "rgba(255,255,255,0.1)",
          translucentHard: "rgba(255,255,255,0.2)",
        };
    }

    document.documentElement.style.setProperty(
      "--translucentMedium",
      colors.translucentMedium
    );

    document.documentElement.style.setProperty(
      "--accentColor",
      colors.accentColor
    );

    document.documentElement.style.setProperty(
      "--bgColorDark",
      colors.bgColorDark
    );

    document.documentElement.style.setProperty(
      "--translucentLight",
      colors.translucentLight
    );

    document.documentElement.style.setProperty("--bgColor", colors.bgColor);
    document.documentElement.style.setProperty(
      "--bgColorLight",
      colors.bgColorLight
    );
    document.documentElement.style.setProperty("--bgColor2", colors.bgColor2);
    document.documentElement.style.setProperty("--color", colors.color);
    document.documentElement.style.setProperty(
      "--translucent",
      colors.translucent
    );
    document.documentElement.style.setProperty(
      "--translucentHard",
      colors.translucentHard
    );
  }

  function setForm(data) {
    if (data) {
      setFormData({ data });
    } else {
      setFormData(null);
    }
  }

  function getUrlQuery(field) {
    if (typeof window == "undefined") return null;
    const queryString = window.location.search;
    const urlParamsForm = new URLSearchParams(queryString);
    return urlParamsForm.get(field);
  }

  function removeLastSlash(urlString) {
    if (urlString[urlString.length - 1] == "/") {
      return urlString.slice(0, urlString.length - 1);
    } else {
      return urlString;
    }
  }

  function getUrlQueryObject() {
    let data = {};
    let raw = window.location.search.replace(/\?/gi, "").replace(/\//gi, "");
    if (!raw) return data;
    raw = raw.split("&");
    for (let itm of raw) {
      if (!itm) continue;
      itm = itm.split("=");
      if (itm.length == 2) {
        if (itm[1].trim()) {
          data[itm[0]] = itm[1];
        }
      }
    }
    return data;
  }
}
