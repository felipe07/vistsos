var dataURL = "http://131.175.143.71/istsos/test?" +
              "service=SOS&version=1.0.0&request=GetObservation&offering=offering1" +
              "&procedure=MI_Lambrate_Precipitazione&eventTime=2015-01-01T00:00:00+0200/2015-06-30T00:00:00+0200&" +
              "observedProperty=rainfall&aggregateInterval=PT24H&aggregateFunction=SUM&" +
              //"observedProperty=rainfall&" +
              "responseFormat=application/json";
 
$.getJSON(dataURL, function(data) {
  // var data contains values, fields and elementCount
  var data = jQuery.extend({}, data["ObservationCollection"].member[0].result.DataArray);
  var values = data["values"].slice();
  var measurements = [];
      
  for (var i = 0; i < values.length; i++) {
    var measurement = {
      "date": moment.utc(values[i][0]).format("L"),
      "rainfall": values[i][1]
    }
    measurements.push(measurement);
  }
  
  // Write JSON data to file

});
