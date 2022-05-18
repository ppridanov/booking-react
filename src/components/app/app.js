import FindHouses from '../find-hotel/find-houses';
import './app.css';
import { Routes, Route } from "react-router-dom";
import Hotel from '../hotel/hotel';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<FindHouses />} />
        <Route path="/houses/:houseId" element={<Hotel />} />
      </Routes>
    </div>
  );
}

export default App;