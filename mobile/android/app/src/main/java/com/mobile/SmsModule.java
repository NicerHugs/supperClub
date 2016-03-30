package com.nicerhugs.smsAndroid;

import android.telephony.SmsManager;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import java.util.Map;

public class SmsModule extends ReactContextBaseJavaModule {

    public SmsModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "SmsModule";
    }

    @ReactMethod
    public void send(String phoneNo, String msg, Callback success, Callback err) {
        try {
            SmsManager m = SmsManager.getDefault();
            m.sendTextMessage(phoneNo, null, msg, null, null);

            success.invoke();
        } catch (Exception e) {
            err.invoke(e.getMessage());
        }
    }
}
