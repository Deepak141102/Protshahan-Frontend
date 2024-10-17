import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Health from "./components/pages/Health/Health.jsx";
import Education from "./components/pages/Education/EducationPage";
import Art from "./components/pages/Art/ArtPage";
import Tech from "./components/pages/Technology/TechnologyPage";
import NotFound from "./components/NotFound.jsx";
// import FuturisticPieChart from './components/Scholarship';
// import AgeDistributionPieChart from './components/Agepie';
// import PieChart from './components/Type of Scholarship';
// import FamilyBarChart from './components/RightsPage2';
// import FamilyPieChart from './components/Familypiechart';
// import Dounat from './components/Dounat';
// import CounterSection from './components/Tru';
// import ScholarshipBarChart from './components/Bar';
// import MigrationMap from './components/Map';
// import Combined from './components/pages/Rights/RightsPage';
// import Fine from './components/pages/Rights/DataChart1';
import Rights from "./components/pages/Rights/RightsPage.jsx";
import HeartModel from "./components/HeartShapes.jsx";

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
        {/* <Route path="/scholarship" element={<FuturisticPieChart />} /> */}
        {/* <Route path="/Age" element={<AgeDistributionPieChart />} /> */}
        {/* <Route path="/typeof" element={<PieChart />} /> */}
        {/* <Route path="/Family" element={<FamilyBarChart />} />
        <Route path="/Familypie" element={<FamilyPieChart />} />
        <Route path="/dont" element={<Dounat />} />
        <Route path="/reel" element={<CounterSection />} />
        <Route path="/bar" element={<ScholarshipBarChart />} />
        <Route path="/map" element={<MigrationMap />} />
        <Route path="/comb" element={<Combined />} />
        <Route path="/fine" element={<Fine />} /> */}
        <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
      </Routes>
    </Router>
  );
}

export default App;
console.log("App is rendering...");
