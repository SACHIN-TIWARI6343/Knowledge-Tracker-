"use client";
import { useEffect, useState } from "react";
import { getNotes, createNote, updateNote, deleteNote } from "../lib/api";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);

  // Create form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newCategory, setNewCategory] = useState("Frontend");
  const [newStatus, setNewStatus] = useState("Not Started");

  // Search + Filter states
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    getNotes().then(setNotes).catch(err => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    await deleteNote(id);
    setNotes(notes.filter(n => n.id !== id));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const newNote = await createNote({
      title,
      description,
      category: newCategory,
      status: newStatus,
    });
    setNotes([...notes, newNote]);
    setTitle("");
    setDescription("");
    setNewCategory("Frontend");
    setNewStatus("Not Started");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateNote(editingNote.id, editingNote);
    setNotes(notes.map(n => (n.id === editingNote.id ? editingNote : n)));
    setEditingNote(null);
  };

  // Apply filters
  const filteredNotes = notes.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) &&
    (filterCategory ? n.category === filterCategory : true) &&
    (filterStatus ? n.status === filterStatus : true)
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Knowledge Tracker</h1>

      {/* Create Form */}
      <form onSubmit={handleCreate} className="flex flex-col gap-2 mb-6 border p-4 rounded">
        <h2 className="text-lg font-semibold">Create New Note</h2>
        <input className="border p-2" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <textarea className="border p-2" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <select className="border p-2" value={newCategory} onChange={e => setNewCategory(e.target.value)}>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="DevOps">DevOps</option>
        </select>
        <select className="border p-2" value={newStatus} onChange={e => setNewStatus(e.target.value)}>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button className="bg-blue-500 text-white p-2 rounded">Add Note</button>
      </form>

      {/* Search + Filters */}
      <div className="flex gap-3 mb-6">
        <input
          className="border p-2 rounded"
          placeholder="Search by title..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="border p-2 rounded"
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="DevOps">DevOps</option>
        </select>
        <select
          className="border p-2 rounded"
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Notes Table */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Title</th>
            <th className="p-2">Category</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredNotes.map(n => (
            <tr key={n.id} className="border-t">
              <td className="p-2">{n.title}</td>
              <td className="p-2">{n.category}</td>
              <td className="p-2">{n.status}</td>
              <td className="p-2">
                <button className="text-blue-500 mr-2" onClick={() => setEditingNote(n)}>Edit</button>
                <button className="text-red-500" onClick={() => handleDelete(n.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Form */}
      {editingNote && (
        <form onSubmit={handleUpdate} className="flex flex-col gap-2 mt-6 border p-4 rounded">
          <h2 className="text-lg font-semibold">Edit Note</h2>
          <input className="border p-2" value={editingNote.title} onChange={e => setEditingNote({ ...editingNote, title: e.target.value })} />
          <textarea className="border p-2" value={editingNote.description} onChange={e => setEditingNote({ ...editingNote, description: e.target.value })} />
          <select className="border p-2" value={editingNote.category} onChange={e => setEditingNote({ ...editingNote, category: e.target.value })}>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="DevOps">DevOps</option>
          </select>
          <select className="border p-2" value={editingNote.status} onChange={e => setEditingNote({ ...editingNote, status: e.target.value })}>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button className="bg-green-500 text-white p-2 rounded">Update Note</button>
        </form>
      )}
    </div>
  );
}