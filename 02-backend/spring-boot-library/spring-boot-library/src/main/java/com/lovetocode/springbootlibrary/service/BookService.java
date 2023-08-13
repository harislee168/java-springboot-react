package com.lovetocode.springbootlibrary.service;

import com.lovetocode.springbootlibrary.dao.BookRepository;
import com.lovetocode.springbootlibrary.dao.CheckoutRepository;
import com.lovetocode.springbootlibrary.entity.Book;
import com.lovetocode.springbootlibrary.entity.Checkout;
import com.lovetocode.springbootlibrary.responsemodel.ShelfCurrentLoansResponse;
import org.hibernate.annotations.Check;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service
@Transactional
public class BookService {

    private BookRepository bookRepository;
    private CheckoutRepository checkoutRepository;

    public BookService(BookRepository bookRepository, CheckoutRepository checkoutRepository) {
        this.bookRepository = bookRepository;
        this.checkoutRepository = checkoutRepository;
    }

    public Book checkoutBook(String userEmail, Long bookId) throws Exception {
        Optional<Book> book = bookRepository.findById(bookId);
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);

        if (book.isEmpty() || validateCheckout != null || book.get().getCopiesAvailable() <= 0) {
            throw new Exception("Book doesn't exist or already checked out by user");
        }

        //reduce the book copies available by 1
        book.get().setCopiesAvailable(book.get().getCopiesAvailable() - 1);
        bookRepository.save(book.get());

        //create new checkout record and insert into database
        Checkout checkout = new Checkout(userEmail, LocalDate.now().toString(),
                LocalDate.now().plusDays(7).toString(),
                book.get().getId());
        checkoutRepository.save(checkout);

        return book.get();
    }

    //to check if the book has been checked out by user
    public Boolean checkoutBookByUser(String userEmail, Long bookId) {
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);
        return validateCheckout != null;
    }

    public int currentLoansCount(String userEmail) {
        return checkoutRepository.findBooksByUserEmail(userEmail).size();
    }

    public List<ShelfCurrentLoansResponse> currentLoans(String userEmail) throws Exception {
        List<ShelfCurrentLoansResponse> shelfCurrentLoansResponses = new ArrayList<ShelfCurrentLoansResponse>();
        List<Checkout> checkoutList = checkoutRepository.findBooksByUserEmail(userEmail);
        List <Long> bookIdList = new ArrayList<Long>();

        for (Checkout checkout: checkoutList) {
            bookIdList.add(checkout.getBookId());
        }
        List <Book> bookList = bookRepository.findBooksByBookIds(bookIdList);

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        for (Book book: bookList) {
            Optional <Checkout> checkoutOptional = checkoutList.stream().filter(checkout ->
                    checkout.getBookId().equals(book.getId())).findFirst();
            if (checkoutOptional.isPresent()) {
                Date returnDate = sdf.parse(checkoutOptional.get().getReturnDate());
                Date currentDate = sdf.parse(LocalDate.now().toString());
                TimeUnit timeUnit = TimeUnit.DAYS;
                long date_difference = timeUnit.convert((returnDate.getTime() - currentDate.getTime()),TimeUnit.MILLISECONDS);
                shelfCurrentLoansResponses.add(new ShelfCurrentLoansResponse(book, (int) date_difference));
            }
        }
        return shelfCurrentLoansResponses;
    }

    public void returnBook(String userEmail, Long bookId) throws Exception {
        Optional <Book> bookOptional = bookRepository.findById(bookId);
        Checkout hasCheckedOut = checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);
        if (bookOptional.isEmpty() || hasCheckedOut == null) {
            throw new Exception("Book does not exist or has never been checked out");
        }
        bookOptional.get().setCopiesAvailable(bookOptional.get().getCopiesAvailable()+1);
        bookRepository.save(bookOptional.get());
        checkoutRepository.deleteById(hasCheckedOut.getId());
    }
}
