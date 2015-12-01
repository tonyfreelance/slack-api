var _ = require('underscore');

//Load the request module
var request = require('request');
//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/test';

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        //HURRAY!! We are connected. :)
        console.log('Connection established to', url);

        // Get the documents collection
        var collection = db.collection('test');


        //        //Create some users
        //        var text1 = {
        //            text: "Nguyen Hoang Ngoc"
        //        };
        //        var text2 = {
        //            text: "Hoang Hue Nhi"
        //        };
        //        var text3 = {
        //            text: "Nguyen Thi Bi"
        //        };
        //        var text4 = {
        //            text: "Dinh Van Linh"
        //        };
        //
        //        // Insert some users
        //        collection.insert([text1, text2, text3, text4], function (err, result) {
        //            if (err) {
        //                console.log(err);
        //            } else {
        //                console.log('Inserted %d documents into the "test" collection. The documents inserted with "_id" are:', result.length, result);
        //            }
        //        });

        var x = collection.find({
            text: 'Hoang Hue Nhi'
        }).toArray(function (err, result) {
            if (err) {
                console.log(err);
            } else if (result.length) {

                var fetchedResult = [];

                result.forEach(function (obj) {
                    body = _.pick(obj, 'text');
                    fetchedResult.push(body);
                });

                fetchedResult.forEach(function (obj) {
                    // Lets configure and request
                    request({
                        url: 'https://hooks.slack.com/services/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', //URL to hit
                        qs: {
                            from: 'TonyFreelance',
                            time: +new Date()
                        }, //Query string data
                        method: 'POST',
                        //Lets post the following key/values as form
                        json: obj
                    }, function (error, response, body) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log(response.statusCode, body);
                        }
                    });
                });


            } else {
                console.log('No document(s) found with defined "find" criteria!');
            }

            //Close connection
            console.log('Database closed');
            db.close();
        });
    }
});