package com.frigoto.objectdetection

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.os.Environment
import android.provider.MediaStore
import android.util.Log
import android.util.SparseIntArray
import android.view.Surface
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.FileProvider
import com.fasterxml.jackson.databind.ObjectMapper
import com.frigoto.BuildConfig
import com.frigoto.R
import com.google.mlkit.common.model.LocalModel
import com.google.mlkit.vision.common.InputImage
import com.google.mlkit.vision.objects.ObjectDetection
import com.google.mlkit.vision.objects.custom.CustomObjectDetectorOptions
import java.io.File
import java.io.IOException
import java.text.SimpleDateFormat
import java.util.*
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper

class ObjectDetection : AppCompatActivity(){

    private val ORIENTATIONS = SparseIntArray()
    val REQUEST_IMAGE_CAPTURE = 1
    lateinit var currentPhotoPath: String
    lateinit var currentJSONPath: String
    private var photoURL: Uri? = null
    private var JSONFileURL: Uri? = null
    var photoFile: File? = null
    var JSONFile: File? = null

    init {
        ORIENTATIONS.append(Surface.ROTATION_0, 0)
        ORIENTATIONS.append(Surface.ROTATION_90, 90)
        ORIENTATIONS.append(Surface.ROTATION_180, 180)
        ORIENTATIONS.append(Surface.ROTATION_270, 270)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        dispatchTakePictureIntent()

        setContentView(R.layout.object_detection_activity)

    }

    @Throws(IOException::class)
    private fun createImageFile(): File {
        // Create an image file name
        val timeStamp: String = SimpleDateFormat("yyyyMMdd_HHmmss").format(Date())
        val storageDir: File = getExternalFilesDir(Environment.DIRECTORY_PICTURES)!!
        return File.createTempFile(
            "JPEG_${timeStamp}_",
            ".jpg",
            storageDir /* directory */
        ).apply {
            // Save a file: path for use with ACTION_VIEW intents
            currentPhotoPath = absolutePath
            Log.i("Test", currentPhotoPath)
            createObjectUri()
        }
    }

    @Throws(IOException::class)
    private fun createObjectFile(): File {
        val storageDir: File = getExternalFilesDir(Environment.DIRECTORY_DOCUMENTS)!!
        return File.createTempFile(
            "JSON_RESULT",
            ".json",
            storageDir /* directory */
        ).apply {
            // Save a file: path for use with ACTION_VIEW intents
            currentJSONPath = absolutePath
        }
    }

    private fun createObjectUri(){
        JSONFile = try {
            createObjectFile()
        } catch (ex: IOException) {
            // Error occurred while creating the File
            println("Erreur pendant la création du fichier")
            null
        }
        JSONFile?.also {
            val jsonURI: Uri = FileProvider.getUriForFile(
                applicationContext,
                BuildConfig.APPLICATION_ID + ".fileprovider",
                it
            )
            JSONFileURL = jsonURI
        }
    }

    private fun dispatchTakePictureIntent() {
        Intent(MediaStore.ACTION_IMAGE_CAPTURE).also { takePictureIntent ->
            // Ensure that there's a camera activity to handle the intent
            takePictureIntent.resolveActivity(packageManager)?.also {
                // Create the File where the photo should go
                photoFile = try {
                    createImageFile()
                } catch (ex: IOException) {
                    // Error occurred while creating the File
                    println("Erreur pendant la création du fichier")
                    null
                }
                // Continue only if the File was successfully created
                photoFile?.also {
                    val photoURI: Uri = FileProvider.getUriForFile(
                        this,
                        BuildConfig.APPLICATION_ID + ".fileprovider",
                        it
                    )
                    Log.i("ObjectDectectionTest", photoURI.toString())
                    photoURL = photoURI
                    takePictureIntent.putExtra(android.provider.MediaStore.EXTRA_OUTPUT, photoURI)
                    takePictureIntent.addFlags(Intent.FLAG_GRANT_WRITE_URI_PERMISSION)
                    startActivityForResult(takePictureIntent, REQUEST_IMAGE_CAPTURE)
                }
            }
        }
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == REQUEST_IMAGE_CAPTURE) {
            if (resultCode == RESULT_OK) {
                Log.i("ObjectDectectionTest", "ResultCodeOk")
                ProcessObjects()
            } else { // Result was a failure
                Toast.makeText(this, "Picture wasn't taken!", Toast.LENGTH_SHORT).show()
                photoFile?.delete()
                JSONFile?.delete()
                finish()
            }
        }
    }

    private fun ProcessObjects(){
        val photoPath: Uri = photoURL ?:return
        Log.i("ObjectDetection", photoPath.toString())

        val image: InputImage
        try {
            image = InputImage.fromFilePath(this, photoPath)
            val localModel = LocalModel.Builder()
                .setAssetFilePath("model.tflite")
                .build()
            Log.i("ObjectDetectTest", "Model loaded ?")

            val customObjectDetectorOptions =
                CustomObjectDetectorOptions.Builder(localModel)
                    .setDetectorMode(CustomObjectDetectorOptions.SINGLE_IMAGE_MODE)
                    .enableMultipleObjects()
                    .enableClassification()
                    .setClassificationConfidenceThreshold(0.5f)
                    .setMaxPerObjectLabelCount(3)
                    .build()

            val objectDetector =
                ObjectDetection.getClient(customObjectDetectorOptions)

            objectDetector
                .process(image)
                .addOnFailureListener {
                    Log.i("ObjectDetectTest", "failure")
                    Log.i("ObjectDetectTest", it.toString())
                }
                .addOnSuccessListener{
                    Log.i("ObjectDetectTest", "success")
                    var objectList : MutableList<String> = mutableListOf()
                    for (detectedObject in it) {
                        Log.i("ObjectDetectionTest", "DetectedObject")
                        val boundingBox = detectedObject.boundingBox
                        val trackingId = detectedObject.trackingId
                        for (label in detectedObject.labels) {
                            Log.i("ObjectDetectionTest", " ${label.index} ${label.text} ${label.confidence}")
                            objectList.add(label.text)
                        }
                    }

                    var objectArray = mutableListOf<Object>()
                    if(objectList.size > 0){
                        for(item in objectList.distinct()){
                            objectArray.add(Object(item, Collections.frequency(objectList, item)))
                        }
                    }
                    Log.i("Test", objectArray.toString())

                    val mapper = jacksonObjectMapper()
                    val objectsJson = mapper.writeValueAsString(objectArray)
                    mapper.writeValue(JSONFile, objectsJson)

                    photoFile?.delete()

                    finish()

                }
        } catch (e: IOException) {
            e.printStackTrace()
        }
    }
}