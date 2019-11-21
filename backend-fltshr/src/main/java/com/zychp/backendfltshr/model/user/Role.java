package com.zychp.backendfltshr.model.user;

public enum Role {
    ROLE_ADMIN("ROLE_ADMIN"),
    ROLE_MANAGER("ROLE_MANAGER"),
    ROLE_USER("ROLE_USER");

    private String roleName;

    Role(String roleName) {
        this.roleName = roleName;
    }

    public String getRoleName() {
        return roleName;
    }
}