package com.lovetocode.springbootlibrary.dao;

import com.lovetocode.springbootlibrary.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {
}
