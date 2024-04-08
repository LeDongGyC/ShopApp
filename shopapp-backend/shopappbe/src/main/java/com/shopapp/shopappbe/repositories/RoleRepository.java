package com.shopapp.shopappbe.repositories;

import com.shopapp.shopappbe.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
}
