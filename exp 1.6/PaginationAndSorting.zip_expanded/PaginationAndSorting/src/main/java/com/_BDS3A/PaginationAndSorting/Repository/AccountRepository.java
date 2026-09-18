package com._BDS3A.PaginationAndSorting.Repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com._BDS3A.PaginationAndSorting.Model.Account;
 

public interface AccountRepository
        extends JpaRepository<Account, Long> {
}