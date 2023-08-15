package com.lovetocode.springbootlibrary.dao;

import com.lovetocode.springbootlibrary.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    Page<Review> findByBookId(@RequestParam(name="book_id") Long bookId, Pageable pageable);

    Review findByUserEmailAndBookId(@RequestParam(name="user_email") String userEmail,
                                    @RequestParam(name="book_id") Long bookId);

    @Query(value="DELETE FROM review WHERE book_id=:book_id", nativeQuery=true)
    void deleteAllByBookId(@Param(value="book_id") Long bookId);
}
