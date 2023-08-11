package com.lovetocode.springbootlibrary.service;

import com.lovetocode.springbootlibrary.dao.BookRepository;
import com.lovetocode.springbootlibrary.dao.ReviewRepository;
import com.lovetocode.springbootlibrary.entity.Review;
import com.lovetocode.springbootlibrary.requestmodel.ReviewRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ReviewService {

    private ReviewRepository reviewRepository;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public void postReview(String userEmail, ReviewRequest reviewRequest) throws Exception {
        if (hasReview(userEmail, reviewRequest.getBookId())) {
            throw new Exception("Review already created!");
        }
        Review newReview = new Review();
        newReview.setUserEmail(userEmail);
        newReview.setBookId(reviewRequest.getBookId());
        newReview.setRating(reviewRequest.getRating());
        if (reviewRequest.getReviewDescription().isPresent()) {
            newReview.setReviewDescription(reviewRequest.getReviewDescription()
                    .map(Object::toString).orElse(null));
        }
        reviewRepository.save(newReview);
    }

    public boolean hasReview(String userEmail, Long bookId) {
        return reviewRepository.findByUserEmailAndBookId(userEmail, bookId) != null;
    }
}
