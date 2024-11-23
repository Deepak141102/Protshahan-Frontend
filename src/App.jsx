import { HashRouter as Router, Routes, Route } from "react-router-dom";
import HeartModel from "./components/HeartShapes.jsx";
import Health from "./components/pages/Health/Health.jsx";
import EducationPage from "./components/pages/Education/EducationPage.jsx";  {/* Ensure extension consistency */}
import Art from "./components/pages/Art/ArtPage.jsx";  {/* Ensure extension consistency */}
import Rights from "./components/pages/Rights/RightsPage.jsx";
import Tech from "./components/pages/Technology/TechnologyPage.jsx";  
import NotFound from "./components/NotFound.jsx";
import SalaryChart from "./components/pages/Technology/Income.jsx";  {/* Ensure extension consistency */}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HeartModel />} />
        <Route path="/health" element={<Health />} />
        <Route path="/education" element={<EducationPage />} />
        <Route path="/art" element={<Art />} />
        <Route path="/rights" element={<Rights />} />
        <Route path="/technology" element={<Tech />} />
        <Route path="/income" element={<SalaryChart />} /> {/* Renamed path for clarity */}
        <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
      </Routes>
    </Router>
  );
}

export default App;

console.log("App is rendering...");
