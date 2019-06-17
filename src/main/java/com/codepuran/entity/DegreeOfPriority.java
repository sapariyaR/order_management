package com.codepuran.entity;

public enum DegreeOfPriority {

    HIGH(0),
    MEDIUM(1),
    LOW(2);
    
    private Integer value;

    private DegreeOfPriority(int value) {
        this.value = value;
    }

    public Integer getDegreeOfPriority() {
        return this.value;
    }
}
