function loadGpx() {
    var wpt1 = new wpt(42.438878, -71.119277);
    var wpt2 = new wpt(42.439227, -71.119689);
    var wpt3 = new wpt(42.438917, -71.116146);
    var wpt4 = new wpt(42.443904, -71.122044);
    var wpt5 = new wpt(42.447298, -71.121447);
    wpt1.name="wpt1";
    wpt2.name="wpt2";
    wpt3.name="wpt3";
    wpt4.name="wpt4";
    wpt5.name="wpt5";

    var trkseg1 = new trkseg();
    trkseg1.trkpt.push(wpt1);
    trkseg1.trkpt.push(wpt2);
    trkseg1.trkpt.push(wpt3);
    trkseg1.trkpt.push(wpt4);
    trkseg1.trkpt.push(wpt5);

    var trk1 = new trk();
    trk1.trkseg.push(trkseg1);

    var gpx1 = new gpx();
    gpx1.trk.push(trk1);

    return gpx1;
}

function initialize() {
    var gpx = loadGpx();
    var pts = gpx.trk[0].trkseg[0].trkpt;
    
    var myLatlng = new google.maps.LatLng(42.438878,-71.119277);
    var mapOptions = {
        zoom: 10,
        center: myLatlng
    }

    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    map.setZoom(15);

    for (i=0;i<pts.length;i++)
        {
            pts[i].marker = new google.maps.Marker({
                    position: new google.maps.LatLng(pts[i].lat,pts[i].lon),
                    map: map,
                    title: pts[i].name
                });
//             var infowindow1 = new google.maps.InfoWindow({
//                     content: "<a href=\"/events/1/\">Started writing Happenings</a><br><a href=\"/events/profile/1\">stevenorum</a><br>Feb. 15, 2014, 8:54 p.m.<br>I started work on Happenings while eating lunch at Panera."
//                 });
//             google.maps.event.addListener(marker1, 'click', function() {
//                     infowindow1.open(map,marker1);
//                 });

        }
    
    $(function() {
            $( "#slider" ).slider({ min: 0, max: pts.length - 1 });
        });
    $( "#slider" ).on("slidechange",function( event, ui ) {
            
            for (i=0;i<pts.length;i++)
                {
                    if (i != ui.value) {
                        pts[i].marker.setVisible(false);
                    }
                    else {
                        pts[i].marker.setVisible(true);
                    }
                }
        });

}




google.maps.event.addDomListener(window, 'load', initialize);