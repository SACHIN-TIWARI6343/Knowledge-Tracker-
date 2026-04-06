package com.Knowledge.backend.repository;

import com.Knowledge.backend.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;
public interface NoteRepository extends JpaRepository<Note, Long> {

    List<Note> findByCategory(String category);

    List<Note> findByStatus(String status);

}

/*
spring automatically provides these methods

save()
findAll()
findById()
deleteById()
count()
 */