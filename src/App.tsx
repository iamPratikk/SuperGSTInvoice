import React from "react";
import MainPageView from "./components/container/homepage";
import "./App.css";
import "./index.scss";
import useWindowDimensions from "./components/controls/useWindowDimensions";
function App() {
  const { height, width } = useWindowDimensions();
  return (
    <React.Fragment>
      <MainPageView sreenHeight={height} screenWidth={width} />
    </React.Fragment>
  );
}

export default App;
