package com.lovetocode.springbootlibrary.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.lovetocode.springbootlibrary.entity.Message;

public interface MessageRepository extends JpaRepository<Message, Long> {
}
