package com.frigoto.objectdetection

import android.content.Intent
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class DetectionManager(reactContext: ReactApplicationContext) :  ReactContextBaseJavaModule(reactContext){

    override fun getName(): String {
        return "DetectionManager"
    }

    @ReactMethod
    fun initiateDetection(){
        val intent = Intent(reactApplicationContext, ObjectDetection::class.java)
        intent.addFlags(Intent.FLAG_GRANT_WRITE_URI_PERMISSION)
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        reactApplicationContext.startActivity(intent)
    }

}