const AWS = require('aws-sdk');
AWS.config.update({region:'us-east-1'});

/* IMPORTANT 
 >>>>>> you should only run once 
*/

var rekognition = new AWS.Rekognition();

/* This operation creates a Rekognition collection for storing image data. */
var params = {
    CollectionId: "lookandpay"
   };
   rekognition.createCollection(params, function(err, data) {
     if (err) console.log(err, err.stack); // an error occurred
     else     console.log(data);           // successful response
   });