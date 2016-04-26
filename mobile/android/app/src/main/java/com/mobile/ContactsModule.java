package com.nicerhugs.contactsAndroid;

import android.provider.ContactsContract;
import android.provider.ContactsContract.CommonDataKinds;
import android.content.ContentResolver;
import android.net.Uri;
import android.database.Cursor;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import java.util.List;
import java.util.Map;

public class ContactsModule extends ReactContextBaseJavaModule {

    public ContactsModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ContactsModule";
    }

    @ReactMethod
    public void search(String queryString, Callback cb) {
      Uri uri = Uri.withAppendedPath(ContactsContract.Contacts.CONTENT_FILTER_URI, queryString);
      ContentResolver cr = getReactApplicationContext().getContentResolver();
      String[] proj = {
        ContactsContract.Contacts._ID,
        ContactsContract.Contacts.PHOTO_THUMBNAIL_URI,
        ContactsContract.Contacts.DISPLAY_NAME_PRIMARY,
        ContactsContract.Contacts.HAS_PHONE_NUMBER,
      };
      Cursor cursor = cr.query(uri, proj, null, null, null);
      WritableArray contacts = Arguments.createArray();
      cursor.moveToFirst();
        while (cursor.isAfterLast() == false) {
          WritableMap contact = Arguments.createMap();
          String id = cursor.getString(0);
          contact.putInt("recordID", Integer.parseInt(id));
          String photoURI = cursor.getString(1);
          String photoHost = cursor.getString(1);
          contact.putString("thumbnailHost", photoHost);
          contact.putString("thumbnailPath", photoURI == null ? "" : photoURI);
          String name = cursor.getString(2);
          contact.putString("displayName", name == null ? "" : name);
          Integer hasPhNum = cursor.getInt(3);
          contact.putInt("hasPhoneNumber", hasPhNum);
          contacts.pushMap(contact);
       	  cursor.moveToNext();
        }
        cursor.close();
      cb.invoke(null, contacts);
    }

    @ReactMethod
    public void getPhoneNum(String recordID, Callback cb) {
      String num = null;
      ContentResolver cr = getReactApplicationContext().getContentResolver();
      Uri uri = ContactsContract.CommonDataKinds.Phone.CONTENT_URI;
      String[] proj = {ContactsContract.CommonDataKinds.Phone.NUMBER};
      Cursor cursor = cr.query(uri, proj,
                        ContactsContract.CommonDataKinds.Phone.CONTACT_ID + " = ? AND " +
                        ContactsContract.CommonDataKinds.Phone.TYPE + " = " +
                        ContactsContract.CommonDataKinds.Phone.TYPE_MOBILE,
                      new String[]{recordID},
                      null
      );
      if (cursor.moveToFirst()) {
          num = cursor.getString(cursor.getColumnIndex(ContactsContract.CommonDataKinds.Phone.NUMBER));
      }
      cursor.close();
      cb.invoke(null, num);
    }
}
