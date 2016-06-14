var path = "localhost/istsos/test?" +
           "service=SOS&version=1.0.0&" +
           "request=GetObservation&" + 
           "offering=offering1&" +
           "procedure=MI_Lambrate_Temperatura&" +
           "eventTime=2015-01-01T00:00:00+0200/2015-06-30T23:00:00+0200&" +
           "observedProperty=temperature&" +
           "responseFormat=application/json";

var request = require("request"), 
    login = "admin",
    password = "polis0s2016",
    url = "http://" + login + ":" + password + "@" + path;

request({ url: url },
  function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var jsonResponse = JSON.parse(body);
      var data = jsonResponse["ObservationCollection"].member[0].result.DataArray;
      var values = data["values"].slice();
      var measurements = [];
      
      for (var i = 0; i < values.length; i++) {
        var measurement = {
          "date": values[i][0],
          "temperature": values[i][1]
        }
        measurements.push(measurement);
      }

      require("fs").writeFile("data/temp6months.json", 
        JSON.stringify(measurements),
        "utf8",
        function(err) {
          if (err) {
            console.error("Something bad happened");
          }
        }
      );
    } else if (error){
      console.log(error);
    } else {
      console.log("Unknown error");
    }
  }
);
