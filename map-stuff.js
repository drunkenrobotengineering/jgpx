function getPointsToDisplay() {
    if (gpxs.trk.length > 0) {
        var points_to_return = [];
        for (i = 0; i < gpxs.trk.length; i++) {
            points_to_return.push(getPointsFromTrack(gpxs.trk[i]));
        }
        return points_to_return;
    }
    else if (gpxs.wpt.length > 0) {
        return [gpxs.wpt];
    }
    else return [[]];
}

function addMarkers() {
    var color = "2F76EE";
    for (i = 0; i < points.length; i++){
        for (j = 0; j < points[i].length; j++){
            points[i][j].marker = getMarker(points[i][j].lat,points[i][j].lon,color);
        }
    }
}

function getMarker(lat, lon, color) {
    var pinColor = "2F76EE"; // a random blue color that i picked
    var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + color,
                                               new google.maps.Size(21, 34),
                                               new google.maps.Point(0,0),
                                               new google.maps.Point(10, 34));
    var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
                                                new google.maps.Size(40, 37),
                                                new google.maps.Point(0, 0),
                                                new google.maps.Point(12, 35));
    var marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat,lon),
            map: map,
            icon: pinImage,
            shadow: pinShadow
        });
    return marker;
}

function loadPoints() {
    // hide all old points - I need to figure out how to fully delete them easily
    for (i=0;i<gpxs.wpt.length;i++)
        {
            gpxs.wpt[i].marker.setVisible(false);
        }
    var gpx_text = document.getElementById('gpx_input').value;
    var gpx_xml_doc = $.parseXML(gpx_text);

    gpxs = loadGpx(gpx_xml_doc);
    points = getPointsToDisplay();
    for (i = 0; i < points.length; i++) {
        if (points[i].length > 0) {
            if (points[i][0].time != null) {
                if (startTime == null) {
                    startTime = points[i][0].time;
                } else if (startTime > points[i][0].time) {
                    startTime = points[i][0].time;
                }
            }
            var last = points[i].length-1;
            if (points[i][last].time != null) {
                if (endTime == null) {
                    endTime = points[i][last].time;
                } else if (endTime < points[i][last].time) {
                    endTime = points[i][last].time;
                }
            }
        }
    }
    if (startTime != null && endTime != null) {
        var time_text = startTime + " - " + endTime;
        document.getElementById('time_range').innerHTML = 'Time range: ' + time_text;
    }
    addMarkers();
    if (points[0].length > 0) {
        var center = new google.maps.LatLng(points[0][0].lat, points[0][0].lon);
    }
    else {
        var center = new google.maps.LatLng(39.246712, -106.291143);
    }
    map.setCenter(center);
    loadSlider();
    showPoints();
}

function getPointsFromTrack(track) {
    var point_list = [];
    for (i = 0; i < track.trkseg.length; i=i+1) {
        for (j = 0; j < track.trkseg[i].trkpt.length; j=j+1) {
            point_list.push(track.trkseg[i].trkpt[j]);
        }
    }
    return point_list;
}

function showPoints() {
    for (i=0;i<points[0].length;i++)
        {
            points[0][i].marker.setVisible(true);
        }
}

function loadSlider() {
    $(function() {
            $( "#slider" ).slider({ min: 0, max: points[0].length - 1 });
        });
    $( "#slider" ).on("slide",function( event, ui ) {
            var point = points[0][ui.value];
            var point_text = "(" + point.lat + ", " + point.lon + "), " + point.time;
            document.getElementById('header').innerHTML = 'Current point: ' + point_text;

            for (i=0;i<points[0].length;i++)
                {
                    if (i != ui.value) {
                        points[0][i].marker.setVisible(false);
                    }
                    else {
                        points[0][i].marker.setVisible(true);
                    }
                }
        });
}

function initialize() {
    map = new google.maps.Map(document.getElementById('map-canvas')); // the map
    gpxs = new gpx(); // the current gpx object
    points = [[]]; // the current points
    startTime = null;
    endTime = null;
    loadPoints();

    map.setZoom(14);

    document.getElementById("loadPoints").onclick = loadPoints;
    document.getElementById("showPoints").onclick = showPoints;
}

google.maps.event.addDomListener(window, 'load', initialize);
