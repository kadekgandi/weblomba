import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../api";

export default function PendaftaranCreate() {
  const [formData, setFormData] = useState({
    nama_lengkap: "",
    jenis_kelamin: "Laki-laki",
    tanggal_lahir: "",
    alamat: "",
    nama_institusi: "",
    lomba_id: "",
    bukti_pembayaran: null,
  });

  const [lombas, setLombas] = useState([]);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchLombas = async () => {
      await api.get("/lombas").then((response) => {
        setLombas(response.data.data);
      });
    };

    fetchLombas();

    // Set lomba_id jika ada di URL
    const lombaIdFromUrl = searchParams.get("lomba_id");
    if (lombaIdFromUrl) {
      setFormData((prev) => ({ ...prev, lomba_id: lombaIdFromUrl }));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "bukti_pembayaran" ? files[0] : value,
    }));
  };

  const storePendaftaran = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    try {
      await api.post("/pendaftarans", data);
      navigate("/pendaftaran");
    } catch (error) {
      setErrors(error.response.data.errors);
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={storePendaftaran}>
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
          <input
            type="file"
            name="bukti_pembayaran"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Simpan
        </button>
      </form>
    </div>
  );
}
