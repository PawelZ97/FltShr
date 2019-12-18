package com.zychp.backendfltshr.services;

class TimeZoneOffsetUtils {
    private final static long OFFSET_MILIS = 3_600_000;

    static long getTimeZoneWithOffset() {
        return System.currentTimeMillis() + OFFSET_MILIS;
    }
}
