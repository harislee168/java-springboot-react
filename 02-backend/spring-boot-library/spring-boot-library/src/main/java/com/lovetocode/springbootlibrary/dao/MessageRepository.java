package com.lovetocode.springbootlibrary.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import com.lovetocode.springbootlibrary.entity.Message;
import org.springframework.web.bind.annotation.RequestParam;

public interface MessageRepository extends JpaRepository<Message, Long> {

    Page<Message> findByUserEmail(@RequestParam(name="user_email") String userEmail, Pageable pageable);
    Page<Message> findByClosed(@RequestParam(name="closed") boolean closed, Pageable pageable);
}
