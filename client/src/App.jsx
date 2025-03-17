import { BrowserRouter, Routes, Route } from "react-router-dom";
import List from "./pages/List";

function App() {
  return (
    <div className="h-screen py-24 bg-slate-400">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<List />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
