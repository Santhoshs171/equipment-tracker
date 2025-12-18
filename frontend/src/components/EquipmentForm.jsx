import { useEffect, useState } from "react";
import { addEquipment, updateEquipment } from "../api";

export default function EquipmentForm({ selected, refresh, clear }) {
  const [form, setForm] = useState({
    name: "",
    type: "Machine",
    status: "Active",
    lastCleanedDate: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (selected) {
      setForm(selected);
    }
  }, [selected]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      setError("Equipment name is required");
      return;
    }

    if (!form.lastCleanedDate) {
      setError("Last cleaned date is required");
      return;
    }

    if (selected) {
      await updateEquipment(form.id, form);
    } else {
      await addEquipment(form);
    }

    clear();
    refresh();

    setForm({
      name: "",
      type: "Machine",
      status: "Active",
      lastCleanedDate: "",
    });
  };

  return (
    <div className="card form-card">
      <h3>{selected ? "Edit Equipment" : "Add Equipment"}</h3>

      <form onSubmit={submit} className="form">
        {/* Equipment Name */}
        <input
          type="text"
          name="name"
          placeholder="Equipment Name (e.g. Mixer-01)"
          value={form.name}
          onChange={handleChange}
        />

        {/* Equipment Type */}
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
        >
          <option value="Machine">Machine</option>
          <option value="Vessel">Vessel</option>
          <option value="Tank">Tank</option>
          <option value="Mixer">Mixer</option>
        </select>

        {/* Status */}
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Under Maintenance">Under Maintenance</option>
        </select>

        {/* Date */}
        <input
          type="date"
          name="lastCleanedDate"
          value={form.lastCleanedDate}
          onChange={handleChange}
        />

        {/* Error */}
        {error && (
          <p style={{ color: "#dc2626", fontSize: "13px", marginTop: "-6px" }}>
            ⚠️ {error}
          </p>
        )}

        <button type="submit" className="btn-primary">
          {selected ? "Update Equipment" : "Save Equipment"}
        </button>
      </form>
    </div>
  );
}