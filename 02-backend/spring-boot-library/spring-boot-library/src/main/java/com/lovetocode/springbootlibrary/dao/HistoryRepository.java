package com.lovetocode.springbootlibrary.dao;

import com.lovetocode.springbootlibrary.entity.History;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

public interface HistoryRepository extends JpaRepository<History, Long> {

    Page<History> findHistoryByUserEmail(@RequestParam(name="user_email") String userEmail, Pageable pageable);
}
