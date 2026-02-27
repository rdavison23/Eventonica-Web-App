import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Events from './Events';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
      </Routes>
    </BrowserRouter>
  );
}
