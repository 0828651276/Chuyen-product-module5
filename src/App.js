
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./components/Product";
// import Addproduct from "./components/Addproduct";
import Edit from "./components/Edit";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Product />} />
          {/*<Route path="/add" element={<Addproduct />} />*/}
            <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </BrowserRouter>
  );
}
export default App;
