package com.codepuran.utils;

import java.util.Calendar;
import java.util.Collection;
import java.util.Map;
import java.util.TimeZone;
import org.springframework.stereotype.Service;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

@Service
public class UtilsService {
  
  private static Gson gson = new Gson();

  public boolean isNullOrEmpty(final Collection<?> c) {
    return c == null || c.isEmpty();
  }

  public boolean isNullOrEmpty(final Map<?, ?> m) {
    return m == null || m.isEmpty();
  }
  
  public Calendar getUTCCalendar() {
    return Calendar.getInstance(TimeZone.getTimeZone("UTC"));
  }
  
  public static String getMessageJson(String message) {
    JsonObject jsonObject = new JsonObject();
    jsonObject.addProperty("message", message);
    return gson.toJson(jsonObject);
  }
  
}
