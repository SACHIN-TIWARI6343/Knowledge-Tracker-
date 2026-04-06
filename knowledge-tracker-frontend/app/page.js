"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const fetchNotes = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:8080/notes");
      if (!res.ok) throw new Error("Failed to fetch notes");
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const deleteNote = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/notes/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete note");
      //  Refresh after delete
      fetchNotes();
    } catch (err) {
      setError(err.message);
    }
  };

  //  Search + Filter Logic
  const filteredNotes = notes.filter((note) => {
    return (
      note.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "" || note.category === category) &&
      (status === "" || note.status === status)
    );
  });

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Knowledge Tracker Dashboard</h1>

      <button
        onClick={() => router.push("/create")}
        className="mt-5 px-4 py-2 bg-green-600 text-white rounded"
      >
        + Create Note
      </button>

      <div className="mt-5 flex gap-3">
        {/*  SEARCH */}
        <input
          type="text"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded"
        />

        {/* CATEGORY FILTER */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Categories</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="DevOps">DevOps</option>
        </select>

        {/* STATUS FILTER */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Status</option>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Error + Loading */}
      {error && <p className="text-red-600 mt-3">Error: {error}</p>}
      {loading && <p className="mt-3">Loading...</p>}

      {/* Notes List */}
      {filteredNotes.map((note) => (
        <div
          key={note.id}
          className="border p-4 mt-4 rounded shadow-sm"
        >
          <h3 className="font-semibold">Title: {note.title}</h3>
          <p>Description: {note.description}</p>
          <p>Category: {note.category}</p>
          <p>Status: {note.status}</p>

          <div className="mt-2 flex gap-2">
            {/* EDIT BUTTON */}
            <button
              onClick={() => router.push(`/edit/${note.id}`)}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Edit
            </button>

            {/*  DELETE BUTTON */}
            <button
              onClick={() => deleteNote(note.id)}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
} 