import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Schedule.css"; // Untuk custom styling
import { useNavigate } from "react-router-dom";
import api from "../../api";

const Schedule = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [highlightedEvents, setHighlightedEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLombas = async () => {
      try {
        const response = await api.get("/lombas");
        setEvents(response.data.data); // Simpan data lomba sebagai event
      } catch (error) {
        console.error("Error fetching lomba data:", error.message);
      }
    };
    fetchLombas();
  }, []);

  const onDateChange = (selectedDate) => {
    setDate(selectedDate);

    // Filter lomba berdasarkan tanggal yang dipilih
    const highlighted = events.filter((event) => {
      const eventDate = new Date(event.tanggal_mulai_pendaftaran);
      return eventDate.toDateString() === selectedDate.toDateString();
    });
    setHighlightedEvents(highlighted);
  };

  const handleRegister = (lombaId) => {
    navigate(`/pendaftaran/create?lomba_id=${lombaId}`);
  };

  // Fungsi untuk memformat nama hari dan bulan ke Bahasa Indonesia
  const formatTanggal = (tanggal) => {
    const hari = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];
    const bulan = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    const hariNama = hari[tanggal.getDay()];
    const tanggalHari = tanggal.getDate();
    const bulanNama = bulan[tanggal.getMonth()];
    const tahun = tanggal.getFullYear();

    return `${hariNama}, ${tanggalHari} ${bulanNama} ${tahun}`;
  };

  return (
    <div className="schedule-container">
      <div className="calendar-section">
        <h1 className="schedule-title">Jadwal Lomba</h1>
        <Calendar
          onChange={onDateChange}
          value={date}
          tileClassName={({ date }) => {
            // Highlight tanggal lomba
            const isEventDate = events.some((event) => {
              const eventDate = new Date(event.tanggal_mulai_pendaftaran);
              return eventDate.toDateString() === date.toDateString();
            });
            return isEventDate ? "highlight-date" : null;
          }}
          locale="id-ID" // Mengatur kalender ke format Indonesia
        />
      </div>

      <div className="event-details">
        <h2 className="event-title">Highlight Lomba ({formatTanggal(date)})</h2>
        {highlightedEvents.length > 0 ? (
          highlightedEvents.map((event) => (
            <div key={event.id} className="event-card">
              <h3>{event.nama_lomba}</h3>
              <p>
                <strong>Institusi:</strong> {event.institusi}
              </p>
              <p>
                <strong>Lokasi:</strong> {event.lokasi} ({event.metode})
              </p>
              <p>
                <strong>Pendaftaran:</strong> {event.tanggal_mulai_pendaftaran}{" "}
                - {event.tanggal_selesai_pendaftaran}
              </p>
              <button
                className="btn btn-primary"
                onClick={() => handleRegister(event.id)}
              >
                Daftar
              </button>
            </div>
          ))
        ) : (
          <p>Tidak ada lomba pada tanggal ini.</p>
        )}
      </div>
    </div>
  );
};

export default Schedule;
