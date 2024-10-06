import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import MyComponent from "./components/HeartShapes";
import GraphFirst from "./components/GraphFirst";
import GraphSec from "./components/GraphSec";
import GraphThird from "./components/GraphThird";
import GraphFourth from "./components/GraphFourth";
import Art from "./components/Art";
import NotFound from "./components/NotFound"; // Add a NotFound component

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
        <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
      </Routes>
    </Router>
  );
}

export default App;
console.log('App is rendering...');
