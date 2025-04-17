import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa"; // Ikon dari react-icons
import api from "../../api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function PendaftaranIndex() {
  const [pendaftarans, setPendaftarans] = useState([]);
  const [statistik, setStatistik] = useState([]);
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchPendaftarans = async () => {
    try {
      setLoading(true);
      const response = await api.get("/pendaftarans");
      setPendaftarans(response.data.data);
    } catch (error) {
      console.error("Error fetching pendaftarans:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStatistik = async () => {
    try {
      const response = await api.get("/lombas/statistik");
      setStatistik(response.data.data);
      prepareChartData(response.data.data);
    } catch (error) {
      console.error("Error fetching statistik:", error);
    }
  };

  const generateRandomColors = (length) => {
    const colors = [];
    for (let i = 0; i < length; i++) {
      const randomColor = `rgba(${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, 0.7)`;
      colors.push(randomColor);
    }
    return colors;
  };

  const prepareChartData = (data) => {
    const labels = data.map((stat) => stat.nama_lomba);
    const counts = data.map((stat) => stat.total_pendaftar);
    const colors = generateRandomColors(data.length);

    setChartData({
      labels: labels,
      datasets: [
        {
          label: "Total Pendaftar",
          data: counts,
          backgroundColor: colors,
          borderColor: colors.map((color) => color.replace("0.7", "1")),
          borderWidth: 1,
        },
      ],
    });
  };

  const deletePendaftaran = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      try {
        await api.delete(`/pendaftarans/${id}`);
        alert("Data berhasil dihapus!");
        fetchPendaftarans();
      } catch (error) {
        console.error("Error deleting pendaftaran:", error);
        alert("Gagal menghapus data.");
      }
    }
  };

  useEffect(() => {
    fetchPendaftarans();
    fetchStatistik();
  }, []);

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-12 text-center mb-4">
          <Link
            to="/pendaftaran/create"
            className="btn btn-success btn-lg shadow-sm"
          >
            Tambah Pendaftaran
          </Link>
        </div>

        {/* Grafik Statistik */}
        <div className="col-md-12">
          <div className="card border-0 shadow-sm p-4">
            <h4 className="card-title text-center text-primary mb-4">
              Statistik Pendaftaran
            </h4>
            {statistik.length > 0 ? (
              <Bar
                data={chartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "top",
                      labels: {
                        font: {
                          size: 14,
                        },
                      },
                    },
                    title: {
                      display: true,
                      text: "Jumlah Pendaftar per Lomba",
                      font: {
                        size: 20,
                        weight: "bold",
                      },
                    },
                  },
                  scales: {
                    x: {
                      ticks: {
                        font: {
                          size: 12,
                        },
                      },
                    },
                    y: {
                      ticks: {
                        beginAtZero: true,
                        font: {
                          size: 12,
                        },
                      },
                    },
                  },
                }}
              />
            ) : (
              <p className="text-center text-danger">
                Data statistik tidak tersedia
              </p>
            )}
          </div>
        </div>

        {/* Tabel Pendaftaran */}
        <div className="col-md-12 mt-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <table className="table table-hover table-striped">
                <thead className="bg-primary text-white text-center">
                  <tr>
                    <th>#</th>
                    <th>Nama Lengkap</th>
                    <th>Jenis Kelamin</th>
                    <th>Institusi</th>
                    <th>Lomba</th>
                    <th>Bukti Pembayaran</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="7" className="text-center">
                        Loading...
                      </td>
                    </tr>
                  ) : pendaftarans.length > 0 ? (
                    pendaftarans.map((data, index) => (
                      <tr key={index}>
                        <td className="text-center">{index + 1}</td>
                        <td>{data.nama_lengkap}</td>
                        <td>{data.jenis_kelamin}</td>
                        <td>{data.nama_institusi}</td>
                        <td>{data.lomba?.nama_lomba || "Tidak Diketahui"}</td>
                        <td className="text-center">
                          <button
                            className="btn btn-sm btn-info"
                            onClick={() =>
                              window.open(
                                `http://localhost:8000/storage/${data.bukti_pembayaran}`,
                                "_blank"
                              )
                            }
                          >
                            <FaEye />
                          </button>
                        </td>
                        <td className="text-center">
                          <div className="d-flex justify-content-center gap-2">
                            <Link
                              to={`/pendaftaran/edit/${data.id}`}
                              className="btn btn-sm btn-primary"
                              title="Edit Data"
                            >
                              <FaEdit />
                            </Link>
                            <button
                              onClick={() => deletePendaftaran(data.id)}
                              className="btn btn-sm btn-danger"
                              title="Hapus Data"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">
                        Data tidak tersedia
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
