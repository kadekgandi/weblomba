import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Lomba.css";

const Lomba = () => {
  const [lombas, setLombas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLombas = async () => {
      try {
        const response = await fetch("http://localhost:8000/lombas");
        if (!response.ok) {
          throw new Error("Gagal mengambil data dari API");
        }

        const result = await response.json();

        if (result.success) {
          setLombas(result.data);
        } else {
          throw new Error(result.message || "Gagal mengambil data lomba");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLombas();
  }, []);

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        Memuat data...
      </div>
    );
  }

  if (error) {
    return <div className="error">Terjadi kesalahan: {error}</div>;
  }

  return (
    <div className="lomba-container hunter-theme">
      <h1 className="hunter-title">PEMBURU LOMBA</h1>
      <p className="hunter-subtitle">Tantangan untuk para pemburu kompetisi!</p>
      <div className="lomba-grid">
        {lombas.map((lomba) => (
          <div key={lomba.id} className="lomba-card hunter-card">
            <div className="lomba-image-container">
              <img
                src={lomba.poster_lomba}
                alt={`Poster ${lomba.nama_lomba}`}
                className="lomba-image"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/300x150?text=No+Image+Available";
                }}
              />
            </div>
            <div className="lomba-details">
              <h2 className="lomba-title">{lomba.nama_lomba}</h2>
              <p className="lomba-info">
                <strong>Institusi:</strong>{" "}
                {lomba.institusi || "Tidak Tersedia"}
              </p>
              <p className="lomba-info">
                <strong>Lokasi:</strong> {lomba.lokasi || "Tidak Tersedia"} (
                {lomba.metode || "Tidak Tersedia"})
              </p>
              <p className="lomba-info">
                <strong>Pendaftaran:</strong> {lomba.tanggal_mulai_pendaftaran}{" "}
                - {lomba.tanggal_selesai_pendaftaran}
              </p>
              <p className="lomba-info hadiah">
                <strong>Total Hadiah:</strong> Rp{" "}
                {parseInt(lomba.total_hadiah || "0").toLocaleString()}
              </p>
            </div>
            <div className="lomba-actions">
              <button
                className="btn btn-primary"
                onClick={() =>
                  navigate(`/pendaftaran/create?lomba_id=${lomba.id}`)
                }
              >
                Daftar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lomba;
