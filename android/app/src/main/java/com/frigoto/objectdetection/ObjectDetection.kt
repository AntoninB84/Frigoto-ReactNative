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

class ObjectDetection : AppCompatActivity(){

    private val ORIENTATIONS = SparseIntArray()
    val REQUEST_IMAGE_CAPTURE = 1
    lateinit var currentPhotoPath: String
    private var photoURL: Uri? = null

    private var textView : TextView? = null

    init {
        ORIENTATIONS.append(Surface.ROTATION_0, 0)
        ORIENTATIONS.append(Surface.ROTATION_90, 90)
        ORIENTATIONS.append(Surface.ROTATION_180, 180)
        ORIENTATIONS.append(Surface.ROTATION_270, 270)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.object_detection_activity)

        textView = findViewById(R.id.textView)

        var button = findViewById<Button>(R.id.button)
        button.setOnClickListener {
            dispatchTakePictureIntent()
        }

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
        }
    }

    private fun dispatchTakePictureIntent() {
        Intent(MediaStore.ACTION_IMAGE_CAPTURE).also { takePictureIntent ->
            // Ensure that there's a camera activity to handle the intent
            takePictureIntent.resolveActivity(packageManager)?.also {
                // Create the File where the photo should go
                val photoFile: File? = try {
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
                test()
            } else { // Result was a failure
                Toast.makeText(this, "Picture wasn't taken!", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun test(){
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
                    var text = ""
                    if(objectList.size > 0){
                        objectList.forEach { item ->
                            text += "$item, "
                        }
                    }else{
                        text = "Aucun aliment n'a été detecté."
                    }
                    textView?.text = text

                }
        } catch (e: IOException) {
            e.printStackTrace()
        }
    }
}