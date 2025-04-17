import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";

export default function PendaftaranEdit() {
  const [formData, setFormData] = useState({
    nama_lengkap: "",
    jenis_kelamin: "Laki-laki",
    tanggal_lahir: "",
    alamat: "",
    nama_institusi: "",
    lomba_id: "",
    bukti_pembayaran: null,
    bukti_pembayaran_url: "", // URL gambar lama
  });

  const [lombas, setLombas] = useState([]);
  const [errors, setErrors] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch list lomba
  const fetchLombas = async () => {
    try {
      const response = await api.get("/lombas");
      setLombas(response.data.data);
    } catch (error) {
      console.error("Error fetching lombas:", error.message);
    }
  };

  // Fetch pendaftaran data
  const fetchPendaftaran = async () => {
    try {
      const response = await api.get(`/pendaftarans/${id}`);
      const data = response.data.data;
      setFormData({
        nama_lengkap: data.nama_lengkap,
        jenis_kelamin: data.jenis_kelamin,
        tanggal_lahir: data.tanggal_lahir,
        alamat: data.alamat,
        nama_institusi: data.nama_institusi,
        lomba_id: data.lomba_id,
        bukti_pembayaran: null, // Reset file input
        bukti_pembayaran_url: data.bukti_pembayaran, // URL gambar lama
      });
    } catch (error) {
      console.error("Error fetching pendaftaran:", error.message);
    }
  };

  useEffect(() => {
    fetchLombas();
    fetchPendaftaran();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "bukti_pembayaran") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const updatePendaftaran = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) {
      if (key !== "bukti_pembayaran_url") {
        // Jangan tambahkan URL gambar lama ke FormData
        if (key === "bukti_pembayaran" && !formData[key]) continue; // Skip jika tidak ada file baru
        data.append(key, formData[key]);
      }
    }

    try {
      await api.post(`/pendaftarans/${id}?_method=PUT`, data);
      alert("Data berhasil diperbarui.");
      navigate("/pendaftaran");
    } catch (error) {
      console.error(
        "Error updating data:",
        error.response?.data || error.message
      );
      setErrors(error.response?.data?.errors || []);
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={updatePendaftaran}>
        <div className="mb-3">
          <label>Nama Lengkap</label>
          <input
            type="text"
            name="nama_lengkap"
            className="form-control"
            value={formData.nama_lengkap}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Jenis Kelamin</label>
          <select
            name="jenis_kelamin"
            className="form-control"
            value={formData.jenis_kelamin}
            onChange={handleChange}
          >
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
        </div>
        <div className="mb-3">
          <label>Tanggal Lahir</label>
          <input
            type="date"
            name="tanggal_lahir"
            className="form-control"
            value={formData.tanggal_lahir}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Alamat</label>
          <input
            type="text"
            name="alamat"
            className="form-control"
            value={formData.alamat}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Institusi</label>
          <input
            type="text"
            name="nama_institusi"
            className="form-control"
            value={formData.nama_institusi}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Lomba</label>
          <select
            name="lomba_id"
            className="form-control"
            value={formData.lomba_id}
            onChange={handleChange}
          >
            <option value="">Pilih Lomba</option>
            {lombas.map((lomba) => (
              <option key={lomba.id} value={lomba.id}>
                {lomba.nama_lomba}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label>Bukti Pembayaran</label>
          {formData.bukti_pembayaran_url ? (
            <div>
              <img
                src={`${import.meta.env.VITE_API_URL}/${
                  formData.bukti_pembayaran_url
                }`}
                alt="Bukti Pembayaran"
                className="img-thumbnail mb-2"
                style={{ maxWidth: "300px", height: "auto" }}
              />
            </div>
          ) : (
            <p className="text-muted">
              Tidak ada bukti pembayaran yang diunggah.
            </p>
          )}
          <input
            type="file"
            name="bukti_pembayaran"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-success">
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}
