function getData(from, until) {
  var dataURL = "http://131.175.143.71/istsos/test?" +
                "service=SOS&version=1.0.0&" +
                "request=GetObservation&" + 
                "offering=offering1&" +
                "procedure=MI_Lambrate_Temperatura&" + 
                //"procedure=MI_Lambrate_Precipitazione&" +
                "eventTime=" + from + "/" + until + "&" +
                "observedProperty=temperature&" + 
                //"observedProperty=rainfall&" + 
                //"aggregateInterval=PT24H&" + 
                //"aggregateFunction=SUM&" +
                "qualityIndex=True&" +
                "qualityFilter=>110&" +
                "responseFormat=application/json";
 
  var measurements = [];

  $.getJSON(dataURL, function(data) {
    // var data contains values, fields and elementCount
    var data = jQuery.extend({}, data["ObservationCollection"].member[0].result.DataArray);
    var values = data["values"].slice();
    var measurements = [];
      
    for (var i = 0; i < values.length; i++) {
      var measurement = {
        "date": values[i][0],
        "measurement": values[i][1]
      }
      measurements.push(measurement);
    }
    loadSpec(measurements);
  });
}
