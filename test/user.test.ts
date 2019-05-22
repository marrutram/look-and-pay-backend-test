
describe('Test for face Id', () => {
  fit('Should return ok', async () => {
    let userData = {
      email: "martinezrut6192222@gmail.com",
      password: "12345678",
      name: "rut",
      lastname: "martinez",
      urlImagen: "1558550683639-caro-pago.jpg"
    }
    const data = {  
        "FaceRecords":[  
          {  
              "Face":{  
                "FaceId":"95c4d095-8f50-428e-b412-c639adf7dbcb",
                "BoundingBox":{  
                    "Width":0.6795538067817688,
                    "Height":0.5679137706756592,
                    "Left":0.18765287101268768,
                    "Top":0.22701628506183624
                },
                "ImageId":"30a7b7ab-75e4-3d4d-97fb-14c2c1f0feab",
                "ExternalImageId":"8f905c0a9397c81249bd6079e96f64f7",
                "Confidence":99.99989318847656
              },
              "FaceDetail":{  
                "BoundingBox":{  
                    "Width":0.6795538067817688,
                    "Height":0.5679137706756592,
                    "Left":0.18765287101268768,
                    "Top":0.22701628506183624
                },
                "Landmarks":[  
                    {  
                      "Type":"eyeLeft",
                      "X":0.3532015085220337,
                      "Y":0.4629475474357605
                    },
                    {  
                      "Type":"eyeRight",
                      "X":0.6715697646141052,
                      "Y":0.4407205879688263
                    },
                    {  
                      "Type":"mouthLeft",
                      "X":0.42239177227020264,
                      "Y":0.64812833070755
                    },
                    {  
                      "Type":"mouthRight",
                      "X":0.6858532428741455,
                      "Y":0.6296690106391907
                    },
                    {  
                      "Type":"nose",
                      "X":0.538906991481781,
                      "Y":0.5454845428466797
                    }
                ],
                "Pose":{  
                    "Roll":-7.193718433380127,
                    "Yaw":2.42738938331604,
                    "Pitch":1.7189223766326904
                },
                "Quality":{  
                    "Brightness":81.85221862792969,
                    "Sharpness":78.64350128173828
                },
                "Confidence":99.99989318847656
              }
          }
        ],
        "FaceModelVersion":"4.0",
        "UnindexedFaces":[  
    
        ],
        "imageName":"carolynbravocarolynBravoGmailCom.png",
        "ExternalImageId":"8f905c0a9397c81249bd6079e96f64f7"
    }
    userData["faceIds"] = await data.FaceRecords.map((elem: object) => elem["Face"]["FaceId"]);
    console.log(userData)
  });
})


