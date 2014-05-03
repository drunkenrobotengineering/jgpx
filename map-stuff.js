function getPointsToDisplay() {
    if (gpxs.trk.length > 0) {
        return getPointsFromTrack(gpxs.trk[0]);
    }
    else if (gpxs.wpt.length > 0) {
        return gpxs.wpt;
    }
    else return [];
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
    if (points.length > 0) {
        var center = new google.maps.LatLng(points[0].lat, points[0].lon);
    }
    else {
        var center = new google.maps.LatLng(39.246712, -106.291143);
    }
    map.setCenter(center);
    loadSlider();
    showPoints();
}

function getPointsFromTrack(track) {
    var points = [];
    for (i = 0; i < track.trkseg.length; i=i+1) {
        for (j = 0; j < track.trkseg[i].trkpt.length; j=j+1) {
            points.push(track.trkseg[i].trkpt[j]);
        }
    }
    return points;
}

function showPoints() {
    for (i=0;i<points.length;i++)
        {
            points[i].marker.setVisible(true);
        }
}

function loadSlider() {
    $(function() {
            $( "#slider" ).slider({ min: 0, max: points.length - 1 });
        });
    $( "#slider" ).on("slide",function( event, ui ) {
            var point = points[ui.value];
            var point_text = "(" + point.lat + ", " + point.lon + "), " + point.time;
            document.getElementById('header').innerHTML = 'Current point: ' + point_text;

            for (i=0;i<points.length;i++)
                {
                    if (i != ui.value) {
                        points[i].marker.setVisible(false);
                    }
                    else {
                        points[i].marker.setVisible(true);
                    }
                }
        });
}

function initialize() {
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions); // the map
    gpxs = new gpx(); // the current gpx object
    points = []; // the current points
    loadPoints();

    var myLatlng = new google.maps.LatLng(1,1);
    var mapOptions = {
        zoom: 5,
        center: myLatlng
    }

    map.setZoom(15);

    document.getElementById("loadPoints").onclick = loadPoints;
    document.getElementById("showPoints").onclick = showPoints;
}

google.maps.event.addDomListener(window, 'load', initialize);
