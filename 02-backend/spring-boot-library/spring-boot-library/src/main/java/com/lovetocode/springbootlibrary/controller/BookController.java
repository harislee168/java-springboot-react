package com.lovetocode.springbootlibrary.controller;

import ch.qos.logback.core.net.SyslogOutputStream;
import com.lovetocode.springbootlibrary.constant.ConstantVariable;
import com.lovetocode.springbootlibrary.entity.Book;
import com.lovetocode.springbootlibrary.responsemodel.ShelfCurrentLoansResponse;
import com.lovetocode.springbootlibrary.service.BookService;
import com.lovetocode.springbootlibrary.utils.JWTExtraction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(ConstantVariable.BASE_URL)
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

    @GetMapping("/secure/currentloans")
    public List<ShelfCurrentLoansResponse> currentLoans(@RequestHeader(value="Authorization") String token) throws Exception {
        String userEmail = JWTExtraction.payLoadJWTExtraction(token, "sub");
        return bookService.currentLoans(userEmail);
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
