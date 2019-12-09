package com.zychp.backendfltshr.constant;

public class TimeZoneOffset {
    private final static long OFFSET_MILIS = 3_600_000;

    public static long getTimeZoneWithOffset() {
        return System.currentTimeMillis() + OFFSET_MILIS;
    }
}