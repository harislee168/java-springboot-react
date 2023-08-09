package com.lovetocode.springbootlibrary.dao;

import com.lovetocode.springbootlibrary.entity.Checkout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;
import java.util.List;

public interface CheckoutRepository extends JpaRepository<Checkout, Long> {

    Checkout findByUserEmailAndBookId(@RequestParam(name="user_email") String userEmail, @RequestParam(name="book_id") Long bookId);

    List <Checkout> findBooksByUserEmail(@RequestParam(name="user_email") String userEmail);
}
