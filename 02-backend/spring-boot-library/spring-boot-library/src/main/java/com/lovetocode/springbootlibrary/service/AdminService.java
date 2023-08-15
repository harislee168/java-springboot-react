package com.lovetocode.springbootlibrary.service;

import com.lovetocode.springbootlibrary.dao.BookRepository;
import com.lovetocode.springbootlibrary.dao.CheckoutRepository;
import com.lovetocode.springbootlibrary.dao.ReviewRepository;
import com.lovetocode.springbootlibrary.entity.Book;
import com.lovetocode.springbootlibrary.entity.Checkout;
import com.lovetocode.springbootlibrary.requestmodel.AddBookRequest;
import jakarta.persistence.Column;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class AdminService {

    private BookRepository bookRepository;
    private CheckoutRepository checkoutRepository;
    private ReviewRepository reviewRepository;

    @Autowired
    public AdminService(BookRepository bookRepository,
                        CheckoutRepository checkoutRepository,
                        ReviewRepository reviewRepository) {
        this.bookRepository = bookRepository;
        this.checkoutRepository = checkoutRepository;
        this.reviewRepository = reviewRepository;
    }

    public void increaseBookQuantity(Long bookId) throws Exception {
        Optional<Book> book = bookRepository.findById(bookId);
        if (book.isEmpty()) {
            throw new Exception("Book does not exist");
        }
        book.get().setCopiesAvailable(book.get().getCopiesAvailable() + 1);
        book.get().setCopies(book.get().getCopies() + 1);
        bookRepository.save(book.get());
    }

    public void decreaseBookQuantity(Long bookId) throws Exception {
        Optional<Book> book = bookRepository.findById(bookId);
        if (book.isEmpty()) {
            throw new Exception("Book does not exist");
        }
        if (book.get().getCopies() <= 0 || book.get().getCopiesAvailable() <= 0) {
            throw new Exception("Currently there are 0 copy available for this book");
        }
        book.get().setCopiesAvailable(book.get().getCopiesAvailable() - 1);
        book.get().setCopies(book.get().getCopies() - 1);
        bookRepository.save(book.get());
    }

    public void postBook(AddBookRequest addBookRequest) {
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

    public boolean deleteBook(Long bookId) throws Exception {
        Optional<Book> book = bookRepository.findById(bookId);
        if (book.isEmpty()) {
            throw new Exception("Book does not exist");
        }

        //First check if the book is still on loan? cannot delete book that is currently on loan
        List <Checkout> checkOutList = checkoutRepository.findByBookId(bookId);
        if (checkOutList != null) {
            if (checkOutList.isEmpty()) {
                //can delete book
                reviewRepository.deleteAllByBookId(bookId);
                bookRepository.delete(book.get());
                return true;
            } else {
                return false;
            }
        } else {
            throw new Exception("Something wrong with checkout");
        }
    }
}
