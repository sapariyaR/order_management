package com.codepuran.utils;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;
import org.springframework.stereotype.Service;
import com.codepuran.exception.SeedException;
import com.google.common.base.Strings;
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
  
  public String getMessageJson(String message) {
    JsonObject jsonObject = new JsonObject();
    jsonObject.addProperty("message", message);
    return gson.toJson(jsonObject);
  }
  
  public Calendar getTimeZoneCalendar(String timeZone) {
    TimeZone tz = TimeZone.getTimeZone(timeZone);
    Calendar calendar = Calendar.getInstance();
    calendar.setTimeZone(tz);
    return calendar;
  }
  
  public SimpleDateFormat getDateFormater(String format) {
    SimpleDateFormat dateFormat = new SimpleDateFormat();
    dateFormat.applyPattern(format);
    return dateFormat;
  }
  
  public String getDateStringFromLong(Long date, String formater, String timeZone) {
    SimpleDateFormat format = getDateFormater((!Strings.isNullOrEmpty(formater)) ? formater : "dd-MMM-yyyy");
    Calendar cal = Calendar.getInstance();
    if (!Strings.isNullOrEmpty(timeZone)) {
      cal.setTimeZone(TimeZone.getTimeZone(timeZone));
      format.setTimeZone(TimeZone.getTimeZone(timeZone));
    }
    cal.setTimeInMillis(date);
    return format.format(cal.getTime());
  }
  
  public Long startDateStringToUTCLong(String dateString,String timeZone){
    try{
      Calendar calendar = Calendar.getInstance();
      calendar.setTimeZone(TimeZone.getTimeZone(timeZone));
      String[] token = dateString.split("/");
      calendar.set(Calendar.DAY_OF_MONTH, Integer.parseInt(token[0]));
      calendar.set(Calendar.MONTH, Integer.parseInt(token[1]) - 1);
      calendar.set(Calendar.YEAR, Integer.parseInt(token[2]));
      calendar.set(Calendar.HOUR_OF_DAY, 00);
      calendar.set(Calendar.MINUTE, 00);
      calendar.set(Calendar.SECOND, 00);
      calendar.set(Calendar.MILLISECOND,00);
      return  calendar.getTimeInMillis();
    } catch (Exception e){
      throw new SeedException("Invalid date string");
    }
  }
  
  public List<String> getListFromCommaSeparated(String commaSeparatedString){
    return new ArrayList<>(Arrays.asList(commaSeparatedString.split(" , ")));
  }
  
  
}
