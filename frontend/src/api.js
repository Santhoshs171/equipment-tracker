const API = "http://localhost:5000/api/equipment";

export const getEquipment = async () =>
  (await fetch(API)).json();

export const addEquipment = async (data) =>
  fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const updateEquipment = async (id, data) =>
  fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const deleteEquipment = async (id) =>
  fetch(`${API}/${id}`, { method: "DELETE" });