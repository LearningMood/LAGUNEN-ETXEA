import { Route, Routes } from "react-router-dom";
import Maintenance from "./Maintenance/Maintenance";
import Main from "./Maintenance/Main";
import { SheetDataProvider } from "./Context/DataContext";
import './globalfix';

function App() {
  return (
    <SheetDataProvider>
      <Routes>
        <Route path="/" element={<Maintenance />}/>
        <Route path="app/" element={<Main />}/>
      </Routes>
    </SheetDataProvider>
  );
}

export default App;
