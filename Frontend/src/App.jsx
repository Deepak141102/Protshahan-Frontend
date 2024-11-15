import { HashRouter as Router, Routes, Route } from "react-router-dom";
import HeartModel from "./components/HeartShapes.jsx";
import Health from "./components/pages/Health/Health.jsx";
import Education from "./components/pages/Education/EducationPage";
import Art from "./components/pages/Art/ArtPage";
import Rights from "./components/pages/Rights/RightsPage.jsx";
import Tech from "./components/pages/Technology/TechnologyPage";
import NotFound from "./components/NotFound.jsx";
import SalaryChart from "./components/pages/Technology/Income.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HeartModel />} />
        <Route path="/health" element={<Health />} />
        <Route path="/education" element={<Education />} />
        <Route path="/art" element={<Art />} />
        <Route path="/rights" element={<Rights />} />
        <Route path="/technology" element={<Tech />} />
        <Route path="/sell" element={<SalaryChart />} />
        <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
      </Routes>
    </Router>
  );
}

export default App;
console.log("App is rendering...");
