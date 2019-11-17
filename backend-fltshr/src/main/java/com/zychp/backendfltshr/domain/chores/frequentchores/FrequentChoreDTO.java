package com.zychp.backendfltshr.domain.chores.frequentchores;

import lombok.Data;

@Data
public class FrequentChoreDTO {
    private Long id;
    private String name;
    private String description;
    private Boolean active;
    private Long durationDays;
    private Long frequencyDays;

    public static FrequentChoreDTO valueOf(FrequentChore entity) {
        FrequentChoreDTO dto = new FrequentChoreDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setDescription(entity.getDescription());
        dto.setActive(entity.getActive());
        dto.setDurationDays(entity.getDurationDays());
        dto.setFrequencyDays(entity.getFrequencyDays());
        return dto;
    }
}