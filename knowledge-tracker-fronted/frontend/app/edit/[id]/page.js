"use client";
import { useEffect, useState } from "react";
import { getNotes, updateNote } from "../../../lib/api";
import { useRouter, useParams } from "next/navigation";

export default function EditNote() {
  const [note, setNote] = useState(null);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    getNotes().then(data => {
      const found = data.find(n => n.id === parseInt(params.id));
      setNote(found);
    });
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateNote(note.id, note);
    router.push("/");
  };

  if (!note) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Edit Note</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="border p-2"
          value={note.title}
          onChange={e => setNote({ ...note, title: e.target.value })}
        />
        <textarea
          className="border p-2"
          value={note.description}
          onChange={e => setNote({ ...note, description: e.target.value })}
        />
        <select
          className="border p-2"
          value={note.category}
          onChange={e => setNote({ ...note, category: e.target.value })}
        >
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="DevOps">DevOps</option>
        </select>
        <select
          className="border p-2"
          value={note.status}
          onChange={e => setNote({ ...note, status: e.target.value })}
        >
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button className="bg-green-500 text-white p-2 rounded">Update</button>
      </form>
    </div>
  );
}