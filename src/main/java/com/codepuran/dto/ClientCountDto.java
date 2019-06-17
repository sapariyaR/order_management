package com.codepuran.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClientCountDto {
  private Integer totalClient = 0;
  private Integer highPriorityClien = 0;
  private Integer mediumPriorityClient = 0;
  private Integer lowPriorityClient = 0;
}
