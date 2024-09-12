import { Route, Routes } from "react-router-dom";
import Maintenance from "./Maintenance/Maintenance";
import Main from "./Maintenance/Main";
import { SheetDataProvider } from "./Context/DataContext";
import './globalFix';

function App() {
  return (
    <SheetDataProvider>
      <Routes>
        <Route path="/temp" element={<Maintenance />}/>
        <Route path="" element={<Main />}/>
      </Routes>
    </SheetDataProvider>
  );
}

export default App;
