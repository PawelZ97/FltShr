package com.zychp.backendfltshr.dtos.chore;

import com.zychp.backendfltshr.model.chore.FrequentChore;
import lombok.Data;

@Data
public class FrequentChoreDTO {
    private Long id;
    private String name;
    private String description;
    private Long durationDays;
    private Long frequencyDays;
    private Boolean archived;

    public static FrequentChoreDTO valueOf(FrequentChore entity) {
        FrequentChoreDTO dto = new FrequentChoreDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setDescription(entity.getDescription());
        dto.setDurationDays(entity.getDurationDays());
        dto.setFrequencyDays(entity.getFrequencyDays());
        dto.setArchived(entity.getArchived());
        return dto;
    }
}