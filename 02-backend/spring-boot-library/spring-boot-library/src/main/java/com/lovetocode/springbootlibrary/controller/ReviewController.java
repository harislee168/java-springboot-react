package com.lovetocode.springbootlibrary.controller;

import com.lovetocode.springbootlibrary.requestmodel.ReviewRequest;
import com.lovetocode.springbootlibrary.service.ReviewService;
import com.lovetocode.springbootlibrary.utils.JWTExtraction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/secure/hasReview")
    public boolean hasReview(@RequestHeader(value="Authorization") String token,
                             @RequestParam(name="book_id") Long bookId) throws Exception {
        String userEmail = JWTExtraction.payLoadJWTExtraction(token, "sub");
        if (userEmail == null) {
            throw new Exception("user email is null");
        }
        return reviewService.hasReview(userEmail, bookId);
    }

    @PostMapping("/secure/postreview")
    public void postReview(@RequestHeader(value="Authorization") String token,
                           @RequestBody ReviewRequest reviewRequest) throws Exception {
        String userEmail = JWTExtraction.payLoadJWTExtraction(token, "sub");
        if (userEmail == null) {
            throw new Exception("user email is null");
        }
        reviewService.postReview(userEmail, reviewRequest);
    }
}
