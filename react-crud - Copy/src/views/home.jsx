// src\views\home.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <header className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Temukan Kompetisi Kampus Terbaik</h1>
          <p className="hero-description">
            Platform terlengkap untuk informasi lomba dan event mahasiswa di
            seluruh Indonesia
          </p>
          <div className="hero-buttons">
            <Link to="/register" className="btn btn-outline">
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </header>

      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <h3>100+</h3>
            <p>Kompetisi Aktif</p>
          </div>
          <div className="stat-item">
            <h3>50+</h3>
            <p>Universitas</p>
          </div>
          <div className="stat-item">
            <h3>10.000+</h3>
            <p>Mahasiswa Terdaftar</p>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2 className="section-title">Mengapa Memilih Kami?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-trophy"></i>
            </div>
            <h3>Kompetisi Berkualitas</h3>
            <p>
              Berbagai lomba tingkat nasional dari universitas ternama di
              Indonesia.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-user-graduate"></i>
            </div>
            <h3>Pengembangan Diri</h3>
            <p>
              Tingkatkan skill dan portfolio Anda melalui berbagai kompetisi.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-medal"></i>
            </div>
            <h3>Hadiah Menarik</h3>
            <p>Total hadiah puluhan juta rupiah menanti para pemenang.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-network-wired"></i>
            </div>
            <h3>Jaringan Luas</h3>
            <p>
              Bangun koneksi dengan mahasiswa dan profesional dari seluruh
              Indonesia.
            </p>
          </div>
        </div>
      </section>

      <section className="categories-section">
        <h2 className="section-title">Kategori Lomba</h2>
        <div className="categories-grid">
          <div className="category-card">
            <i className="fas fa-laptop-code"></i>
            <h4>Technology</h4>
          </div>
          <div className="category-card">
            <i className="fas fa-chart-line"></i>
            <h4>Business</h4>
          </div>
          <div className="category-card">
            <i className="fas fa-microscope"></i>
            <h4>Research</h4>
          </div>
          <div className="category-card">
            <i className="fas fa-palette"></i>
            <h4>Design</h4>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Siap Untuk Berkompetisi?</h2>
          <p>
            Daftarkan diri Anda sekarang dan mulai perjalanan menuju kesuksesan!
          </p>
          <Link to="/register" className="btn btn-primary">
            Mulai Sekarang
          </Link>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Tentang Kami</h4>
            <p>Platform kompetisi mahasiswa terbesar di Indonesia</p>
          </div>
          <div className="footer-section">
            <h4>Kontak</h4>
            <p>Email: info@lombakampus.id</p>
            <p>Phone: (021) 1234-5678</p>
          </div>
          <div className="footer-section">
            <h4>Ikuti Kami</h4>
            <div className="social-links">
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Lomba Kampus. Semua hak dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}
