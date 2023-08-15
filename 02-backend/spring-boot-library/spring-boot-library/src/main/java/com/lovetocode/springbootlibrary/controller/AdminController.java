package com.lovetocode.springbootlibrary.controller;

import com.lovetocode.springbootlibrary.constant.ConstantVariable;
import com.lovetocode.springbootlibrary.requestmodel.AddBookRequest;
import com.lovetocode.springbootlibrary.service.AdminService;
import com.lovetocode.springbootlibrary.utils.JWTExtraction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(ConstantVariable.BASE_URL)
@RestController
@RequestMapping(value="/api/admin")
public class AdminController {
    private AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/secure/add/book")
    public void postBook(@RequestHeader(value="Authorization") String token,
                         @RequestBody AddBookRequest addBookRequest) throws Exception {
        String userType = JWTExtraction.payLoadJWTExtraction(token, "userType");
        if (userType == null || !userType.equalsIgnoreCase("admin")) {
            throw new Exception("Only admin is allowed to add new book");
        }
        adminService.postBook(addBookRequest);
    }
}
