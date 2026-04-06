"use client";
import { useState } from "react";
import { createNote } from "../../lib/api";
import { useRouter } from "next/navigation";

export default function CreateNote() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Frontend");
  const [status, setStatus] = useState("Not Started");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createNote({ title, description, category, status });
    router.push("/"); // Dashboard पर वापस
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Create Note</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="border p-2"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          className="border p-2"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <select className="border p-2" value={category} onChange={e => setCategory(e.target.value)}>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="DevOps">DevOps</option>
        </select>
        <select className="border p-2" value={status} onChange={e => setStatus(e.target.value)}>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button className="bg-blue-500 text-white p-2 rounded">Save</button>
      </form>
    </div>
  );
}