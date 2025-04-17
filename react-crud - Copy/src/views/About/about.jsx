import React from "react";
import "./About.css";
import team1 from "../../assets/images/Team1.jpeg";
import team2 from "../../assets/images/Team2.jpg";
import team3 from "../../assets/images/Team3.jpg";

export default function About() {
  const teamMembers = [
    {
      id: 1,
      name: "Gandi Taruna",
      role: "Founder & CEO",
      image: team1,
    },
    {
      id: 2,
      name: "Jenie",
      role: "Co-Founder & CTO",
      image: team2,
    },
    {
      id: 3,
      name: "Louis Cahyadi",
      role: "Creative Director",
      image: team3,
    },
  ];

  return (
    <div className="about-container">
      <div className="about-header">
        <h1>Tentang Kami</h1>
        <p className="subtitle">
          Platform Informasi Lomba Mahasiswa Terlengkap
        </p>
      </div>

      <div className="about-content">
        <div className="about-section">
          <h2>Visi Kami</h2>
          <p>
            Menjadi platform terdepan dalam menyediakan informasi lomba dan
            kompetisi mahasiswa di Indonesia, mendukung pengembangan bakat dan
            potensi mahasiswa melalui kompetisi berkualitas.
          </p>
        </div>

        <div className="about-section">
          <h2>Misi Kami</h2>
          <ul>
            <li>Menyediakan informasi lomba yang akurat dan terpercaya</li>
            <li>
              Memfasilitasi mahasiswa dalam menemukan kompetisi yang sesuai
            </li>
            <li>Mendukung pengembangan soft skill dan hard skill mahasiswa</li>
            <li>Membangun jejaring antara mahasiswa dan universitas</li>
          </ul>
        </div>

        <div className="about-section">
          <h2>Tim Kami</h2>
          <div className="team-grid">
            {teamMembers.map((member) => (
              <div key={member.id} className="team-member">
                <img src={member.image} alt={member.name} />
                <h3>{member.name}</h3>
                <p className="role">{member.role}</p>
                <p className="description">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="about-section">
          <h2>Hubungi Kami</h2>
          <div className="contact-info">
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <p>Email: gochampid@gmail.com</p>
            </div>
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <p>Telepon: +62 123 4567 890</p>
            </div>
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <p>Alamat: Bali, Indonesia</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
