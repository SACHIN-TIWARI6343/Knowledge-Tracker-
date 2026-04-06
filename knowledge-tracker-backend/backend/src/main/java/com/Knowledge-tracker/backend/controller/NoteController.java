package com.Knowledge.backend.controller;

import com.Knowledge.backend.entity.Note;
import com.Knowledge.backend.service.NoteService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional; // use to avoid null pointer

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/notes") // base url
public class NoteController {

    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    // Create Note
    @PostMapping
    public Note createNote(@RequestBody Note note) {
        return noteService.createNote(note);
    }

    // Get All Notes
    @GetMapping
    public List<Note> getAllNotes() {
        return noteService.getAllNotes();
    }

    // Get Note by ID
    @GetMapping("/{id}")
    public Optional<Note> getNoteById(@PathVariable Long id) {
        return noteService.getNoteById(id);
    }

    // Update Note
    @PutMapping("/{id}")
    public Note updateNote(@PathVariable Long id, @RequestBody Note note) {
        return noteService.updateNote(id, note);
    }

    // Delete Note
    @DeleteMapping("/{id}")
    public void deleteNote(@PathVariable Long id) {
        noteService.deleteNote(id);
    }

    @GetMapping("/category/{category}")
    public List<Note> getNotesByCategory(@PathVariable String category) {
        return noteService.getNotesByCategory(category);
    }

    @GetMapping("/status/{status}")
    public List<Note> getNotesByStatus(@PathVariable String status) {
        return noteService.getNotesByStatus(status);
    }
}