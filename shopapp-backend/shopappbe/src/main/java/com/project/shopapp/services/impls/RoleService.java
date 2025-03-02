package com.project.shopapp.services.impls;

import com.project.shopapp.repositories.RoleRepository;
import com.project.shopapp.models.Role;
import com.project.shopapp.services.IRoleService;
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

