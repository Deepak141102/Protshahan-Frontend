import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyComponent from "./components/HeartShapes";
import GraphFirst from "./components/GraphFirst";  // Modify or add components based on sections
import GraphSec from "./components/GraphSec";
import GraphThird from "./components/GraphThird";
import GraphFourth from "./components/GraphFourth";
import Art from "./components/Art";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MyComponent />} /> {/* Home Page */}
        <Route path="/health" element={<GraphFirst />} />   {/* Set corresponding component */}
        <Route path="/education" element={<GraphSec />} />
        <Route path="/art" element={<Art />} />
        <Route path="/rights" element={<GraphThird />} />
        <Route path="/technology" element={<GraphFourth />} />
      </Routes>
    </Router>
  );
}

export default App;
