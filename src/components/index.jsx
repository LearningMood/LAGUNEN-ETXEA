import { Route, Routes } from "react-router-dom";
// import Maintenance from "./Maintenance/Maintenance";
import Main from "./Main";
import { SheetDataProvider } from "./Context/DataContext";
import './globalFix';

function App() {
  return (
    <SheetDataProvider>
      <Main />
    </SheetDataProvider>
  );
}


export default App;
