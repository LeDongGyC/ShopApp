package com.shopapp.shopappbe.services.impls;

import com.shopapp.shopappbe.models.Role;
import com.shopapp.shopappbe.repositories.RoleRepository;
import com.shopapp.shopappbe.services.IRoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoleService implements IRoleService {
    private final RoleRepository roleRepository;

    @Override
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }
}

