import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import MyComponent from "./components/HeartShapes";
import GraphFirst from "./components/GraphFirst";
import GraphSec from "./components/GraphSec";
import GraphThird from "./components/RightsPage";
import GraphFourth from "./components/GraphFourth";
import Art from "./components/Art";
import NotFound from "./components/NotFound"; // Add a NotFound component
import FuturisticPieChart from './components/Scholarship';
import AgeDistributionPieChart from './components/Agepie';
import PieChart from './components/Type of Scholarship';
import FamilyBarChart from './components/RightsPage2';
import FamilyPieChart from './components/Familypiechart';
import Dounat from './components/Dounat';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MyComponent />} />
        <Route path="/health" element={<GraphFirst />} />
        <Route path="/education" element={<GraphSec />} />
        <Route path="/art" element={<Art />} />
        <Route path="/rights" element={<GraphThird />} />
        <Route path="/technology" element={<GraphFourth />} />
        <Route path="/scholarship" element={<FuturisticPieChart />} />
        <Route path="/Age" element={<AgeDistributionPieChart />} />
        <Route path="/typeof" element={<PieChart />} />
        <Route path="/Family" element={<FamilyBarChart />} />
        <Route path="/Familypie" element={<FamilyPieChart />} />
        <Route path="/dont" element={<Dounat />} />
        <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
      </Routes>
    </Router>
  );
}

export default App;
console.log('App is rendering...');
