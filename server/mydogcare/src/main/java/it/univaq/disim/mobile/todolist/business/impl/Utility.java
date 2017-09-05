package it.univaq.disim.mobile.todolist.business.impl;

import java.security.SecureRandom;

public class Utility {

    protected static SecureRandom random = new SecureRandom();

    public static String generateToken() {
        long longToken = Math.abs(random.nextLong());
        String longTokenString = Long.toString(longToken, 200);
        // needed because on some computers a longer one gives problems
        longTokenString = longTokenString.substring(0, 10); 
        return longTokenString;
    }

}
