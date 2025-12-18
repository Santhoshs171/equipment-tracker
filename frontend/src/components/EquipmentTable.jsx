import { useState } from "react";
import { deleteEquipment } from "../api";

export default function EquipmentTable({ equipment, onEdit, refresh }) {
  const [search, setSearch] = useState("");

  const remove = async (id) => {
    await deleteEquipment(id);
    refresh();
  };

  // 🔍 Search by name
  const filteredEquipment = equipment.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  // ⏳ Overdue check (>30 days)
  const isOverdue = (date) => {
    if (!date) return false;
    const last = new Date(date);
    const today = new Date();
    const diff = (today - last) / (1000 * 60 * 60 * 24);
    return diff > 30;
  };

  return (
    <div className="table-card">
      <h3>Equipment List</h3>

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search equipment..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          marginBottom: "14px",
          padding: "10px",
          width: "100%",
          borderRadius: "8px",
          border: "1px solid #c7d2fe",
        }}
      />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Status</th>
            <th>Last Cleaned</th>
            <th>Actions</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {filteredEquipment.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                No equipment found
              </td>
            </tr>
          )}

          {filteredEquipment.map((e) => (
            <tr key={e.id}>
              <td>{e.name}</td>
              <td>{e.type}</td>

              <td>
                <span
                  className={`status ${e.status
                    .replace(" ", "")
                    .toLowerCase()}`}
                >
                  {e.status === "Active" && "🟢 "}
                  {e.status === "Inactive" && "🔴 "}
                  {e.status === "Under Maintenance" && "🟡 "}
                  {e.status}
                </span>
              </td>

              <td
                style={{
                  color: isOverdue(e.lastCleanedDate) ? "#dc2626" : "inherit",
                  fontWeight: isOverdue(e.lastCleanedDate) ? "600" : "normal",
                }}
              >
                {e.lastCleanedDate}
                {isOverdue(e.lastCleanedDate) && " ⚠️"}
              </td>

              {equipment.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                  🚫 No equipment found
                </td>
              </tr>
            )}

              <td>
                <button
                  onClick={() => onEdit(e)}
                  className="btn-edit"
                >
                  Edit
                </button>
                <button
                  onClick={() => remove(e.id)}
                  className="btn-delete"
                >
                  Delete
                </button>
              </td>

              <td className={
                new Date() - new Date(e.lastCleanedDate) > 30 * 86400000
                  ? "overdue"
                  : ""
              }>
            {e.lastCleanedDate}
          </td>

                  
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}