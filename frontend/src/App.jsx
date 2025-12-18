import { useEffect, useState } from "react";
import EquipmentForm from "./components/EquipmentForm";
import EquipmentTable from "./components/EquipmentTable";
import { getEquipment } from "./api";
import "./App.css";

export default function App() {
  const [equipment, setEquipment] = useState([]);
  const [selected, setSelected] = useState(null);
  const [dark, setDark] = useState(false);

  const loadData = async () => {
    const data = await getEquipment();
    setEquipment(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className={`page ${dark ? "dark" : ""}`}>
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2>⚙ Equipment</h2>
        <p>Admin Dashboard</p>
      </aside>

      {/* MAIN */}
      <main className="main">
        {/* HEADER */}
        <header className="header">
          <div className="header-text">
            <h1>Equipment Tracker</h1>
            <span>Manage assets & maintenance</span>
          </div>

          <button
            type="button"
            className="dark-btn"
            onClick={() => setDark(prev => !prev)}
          >
            {dark ? "☀️ Light" : "🌙 Dark"}
          </button>
        </header>

        {/* STATS */}
        <div className="stats">
          <div className="card blue">
            <h3>{equipment.length}</h3>
            <p>Total Equipment</p>
          </div>

          <div className="card green">
            <h3>{equipment.filter(e => e.status === "Active").length}</h3>
            <p>Active</p>
          </div>

          <div className="card red">
            <h3>{equipment.filter(e => e.status === "Inactive").length}</h3>
            <p>Inactive</p>
          </div>

          <div className="card yellow">
            <h3>
              {equipment.filter(e => e.status === "Under Maintenance").length}
            </h3>
            <p>Maintenance</p>
          </div>
        </div>

        {/* CONTENT */}
        <div className="content">
          <EquipmentForm
            selected={selected}
            refresh={loadData}
            clear={() => setSelected(null)}
          />

          <EquipmentTable
            equipment={equipment}
            onEdit={setSelected}
            refresh={loadData}
          />

        </div>
       
        <footer style={{ textAlign: "center", opacity: 0.6, marginTop: "30px" }}>
                            © 2025 Equipment Tracker · Built with React
        </footer>
      </main>
    </div>

    
  );
}