package com.Knowledge.demo.service;

import com.Knowledge.demo.entity.Note;
import com.Knowledge.demo.repository.NoteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NoteService {

    private final NoteRepository noteRepository;

    public NoteService(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    // Create Note
    public Note createNote(Note note) {
        return noteRepository.save(note);
    }

    // Get All Notes
    public List<Note> getAllNotes() {
        return noteRepository.findAll();
    }

    // Get Note by ID
    public Optional<Note> getNoteById(Long id) {
        return noteRepository.findById(id);
    }

    // Update Note
    public Note updateNote(Long id, Note updatedNote) {
        Optional<Note> existing = noteRepository.findById(id);

        if (existing.isPresent()) {
            Note note = existing.get();
            note.setTitle(updatedNote.getTitle());
            note.setDescription(updatedNote.getDescription());
            note.setCategory(updatedNote.getCategory());
            note.setStatus(updatedNote.getStatus());

            return noteRepository.save(note);
        }




        return null;
    }

    // filter by category
    public List<Note> getNotesByCategory(String category) {
        return noteRepository.findByCategory(category);
    }

    // filter by status
    public List<Note> getNotesByStatus(String status) {
        return noteRepository.findByStatus(status);
    }

    // Delete Note
    public void deleteNote(Long id) {
        noteRepository.deleteById(id);
    }
}