import { Routes, Route } from "react-router-dom";
import Home from "../views/home.jsx";
import Schedule from "../views/schedule/Schedule.jsx";
import Lomba from "../views/Lomba/Lomba.jsx";
import About from "../views/About/about.jsx";

// Import views untuk Pendaftaran
import PendaftaranIndex from "../views/pendaftarans/index.jsx";
import PendaftaranCreate from "../views/pendaftarans/create.jsx";
import PendaftaranEdit from "../views/pendaftarans/edit.jsx";

function RoutesIndex() {
  return (
    <Routes>
      {/* Route untuk Home */}
      <Route path="/" element={<Home />} />

      {/* Route untuk Schedule */}
      <Route path="/schedule" element={<Schedule />} />

      {/* Route untuk Lomba */}
      <Route path="/lomba" element={<Lomba />} />

      {/* Route untuk About */}
      <Route path="/about" element={<About />} />

      {/* Route untuk Pendaftaran */}
      <Route path="/pendaftaran" element={<PendaftaranIndex />} />
      <Route path="/pendaftaran/create" element={<PendaftaranCreate />} />
      <Route path="/pendaftaran/edit/:id" element={<PendaftaranEdit />} />
    </Routes>
  );
}

export default RoutesIndex;
