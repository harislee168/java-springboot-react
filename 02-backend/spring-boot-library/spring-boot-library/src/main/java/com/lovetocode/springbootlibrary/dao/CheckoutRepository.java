package com.lovetocode.springbootlibrary.dao;

import com.lovetocode.springbootlibrary.entity.Checkout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;
import java.util.List;

public interface CheckoutRepository extends JpaRepository<Checkout, Long> {

    Checkout findByUserEmailAndBookId(@RequestParam(name="user_email") String userEmail, @RequestParam(name="book_id") Long bookId);

    List <Checkout> findByUserEmail(@RequestParam(name="user_email") String userEmail);

    @Query(value="Select * from checkout c where c.book_id=:book_id", nativeQuery=true)
    List <Checkout> findByBookId(@Param(value="book_id") Long bookId);
}
