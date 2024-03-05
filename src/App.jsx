import { useState, useEffect, useMemo,useCallback } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Mainhome from "./components/Mainhome";
import WorkflowEditor from './components/Workfloweditor';
import Home from "./pages/Home";


function App() {
 
  return (
    <div className="maindiv" style={{backgroundColor:"rgba(0, 0, 50, 1)"}} >
       {/* <header>
        <button>Save Workflow</button>
      </header> */}
      <Home/>
      <Mainhome/>
     
      {/* <WorkflowEditor /> */}
    </div>
  );
}

export default App;


