package com.lovetocode.springbootlibrary.service;

import com.lovetocode.springbootlibrary.dao.BookRepository;
import com.lovetocode.springbootlibrary.entity.Book;
import com.lovetocode.springbootlibrary.requestmodel.AddBookRequest;
import jakarta.persistence.Column;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AdminService {

    private BookRepository bookRepository;

    @Autowired
    public AdminService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public void postBook(AddBookRequest addBookRequest) throws Exception {
        Book newBook = new Book();

        newBook.setTitle(addBookRequest.getTitle());
        newBook.setAuthor(addBookRequest.getAuthor());
        newBook.setDescription(addBookRequest.getDescription());
        newBook.setCopies(addBookRequest.getCopies());
        newBook.setCopiesAvailable(addBookRequest.getCopies());
        newBook.setCategory(addBookRequest.getCategory());
        newBook.setImg(addBookRequest.getImg());

        bookRepository.save(newBook);
    }
}
