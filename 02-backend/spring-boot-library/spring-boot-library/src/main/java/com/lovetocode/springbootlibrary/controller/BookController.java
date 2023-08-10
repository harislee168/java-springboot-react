package com.lovetocode.springbootlibrary.controller;

import ch.qos.logback.core.net.SyslogOutputStream;
import com.lovetocode.springbootlibrary.entity.Book;
import com.lovetocode.springbootlibrary.service.BookService;
import com.lovetocode.springbootlibrary.utils.JWTExtraction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping(value="/api/books")
public class BookController {

    private BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/secure/currentloans/count")
    public int currentLoansCount(@RequestHeader(value="Authorization") String token) {
        String userEmail = JWTExtraction.payLoadJWTExtraction(token, "sub");
        return bookService.currentLoansCount(userEmail);
    }

    @GetMapping("/secure/ischeckedout/byuser")
    public Boolean checkoutBookByUser(@RequestHeader(value="Authorization") String token,
                                      @RequestParam(name="book_id") Long bookId) {
        String userEmail = JWTExtraction.payLoadJWTExtraction(token, "sub");
        return bookService.checkoutBookByUser(userEmail, bookId);
    }

    @PutMapping("/secure/checkout")
    public Book checkoutBook(@RequestHeader(value="Authorization") String token,
                             @RequestParam(name="book_id") Long bookId) throws Exception {
        String userEmail = JWTExtraction.payLoadJWTExtraction(token, "sub");
        return bookService.checkoutBook(userEmail, bookId);
    }
}
