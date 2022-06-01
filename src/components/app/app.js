import FindHouses from '../find-hotel/find-houses';
import './app.css';
import { Routes, Route } from "react-router-dom";
import Hotel from '../hotel/hotel';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/houses/:houseId" element={<Hotel />}></Route>
          <Route path="/" element={<FindHouses />}></Route>
      </Routes>
    </div>
  );
}

export default App;