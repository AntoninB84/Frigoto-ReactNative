import React from 'react'

export function DetectionResults(){

    var RNFS = require('react-native-fs');

    var filePath = null;
    var fileContent = null;

    const test = () => {
        //RNFS.ExternalDirectoryPath...
        RNFS.readDir("/storage/emulated/0/Android/data/com.frigoto/files/Documents")
        .then((result) => {
            result.forEach((it)=>{
                filePath = it.path
                RNFS.readFile(filePath)
                .then((content)=>{
                    fileContent = JSON.parse(content)
                    RNFS.unlink(filePath)
                })
            })
        })
    }

    return fileContent
}