package com.lovetocode.springbootlibrary.dao;

import com.lovetocode.springbootlibrary.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    Payment findByUserEmail(@RequestParam(name="user_email") String userEmail);
}
