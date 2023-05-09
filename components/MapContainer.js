import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import TableData from "../components/TableData";
import { useSelector } from 'react-redux';
// import mapIcon from "../../public/img/man.png"

const MapContainer = ({markersData}) => {

  const mapRef = useRef(null);
  const polyLineRef = useRef(null);
  const [map, setMap] = useState(null);
  const [data, setData] = useState(null);
  const user = useSelector((state) => state.users) 

  const updatedArray = markersData && markersData.map(obj => {
    let lat = parseFloat(obj.lat)
    let lng  = parseFloat(obj.lon)
    let bigImg = obj.bigImg
    let createdAt = obj.createdAt
    let mobileNo = obj.mobileNo
    let readingDate = obj.readingDate
    let readingType = obj.readingType
    let smallImg = obj.smallImg
    let timestamp = obj.timestamp
    let uidNo = obj.uidNo
    let finalValue  = obj.finalValue
    let valueType = obj.valueType
    let bCode =  obj.bCode
    return { lat, lng, bigImg,createdAt,
      mobileNo,
      readingDate,
      readingType,
      smallImg,
      timestamp,
      uidNo,
      finalValue,
      valueType,
      bCode  }; 
  });

  const mapStyles = [   
     {featureType: 'water',      elementType: 'geometry',      stylers: [        {          color: '#a0c7e5',        },      ],
},
{
  featureType: 'landscape',
  elementType: 'geometry',
  stylers: [
    {
      color: '#696666',
    },
  ],
},
{
  featureType: 'road.highway',
  elementType: 'geometry',
  stylers: [
    {
      color: '#83a5b0',
    },
  ],
},
{
  featureType: 'road.arterial',
  elementType: 'geometry',
  stylers: [
    {
      color: '#bdcdd3',
    },
  ],
},
{
  featureType: 'road.local',
  elementType: 'geometry',
  stylers: [
    {
      color: '#ffffff',
    },
  ],
},
{
  featureType: 'poi.park',
  elementType: 'geometry',
  stylers: [
    {
      color: '#e3eed3',
    },
  ],
},
{
  featureType: 'administrative',
  elementType: 'labels.text.stroke',
  stylers: [
    {
      color: '#ffffff',
    },
    {
      weight: 6,
    },
  ],
},
{
  featureType: 'administrative',
  elementType: 'labels.text.fill',
  stylers: [
    {
      color: '#444444',
    },
  ],
},
{
  featureType: 'road',
  elementType: 'labels.icon',
  stylers: [
    {
      visibility: 'off',
    },
  ],
},
{
  featureType: 'poi',
  elementType: 'labels.icon',
  stylers: [
    {
      visibility: 'off',
    },
  ],
},
{
  featureType: 'poi',
  elementType: 'labels.text.fill',
  stylers: [
    {
      color: '#7b7b7b',
    },
  ],
},
{
  featureType: 'poi',
  elementType: 'labels.text.stroke',
  stylers: [
    {
      color: '#ffffff',
    },
    {
      weight: 2,
    },
  ],
},
  ];


  const MIN_DISTANCE = 0.0001; // set minimum distance here

  function groupObjectsByRadius(objects) {
    const radius = 10; // 10 meters
    const groups = [];
  
    // Loop through the objects
    for (let i = 0; i < objects.length; i++) {
      const object = objects[i];
      let foundGroup = false;
  
      // Check if the object is already in a group
      for (let j = 0; j < groups.length; j++) {
        const group = groups[j];
        const distance = getDistance(object.lat, object.lng, group.lat, group.lng);
  
        // If the object is within the radius of the group, add it to the group
        if (distance <= radius) {
          group.objects.push(object);
          foundGroup = true;
          break;
        }
      }
  
      // If the object is not in a group, create a new group for it
      if (!foundGroup) {
        groups.push({
          lat: object.lat,
          lng: object.lng,
          objects: [object],
        });
      }
    }
  
    return groups;
  }
  
  // Helper function to calculate the distance between two points
  function getDistance(lat1, lng1, lat2, lng2) {
    const R = 6371e3; // metres
    const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lng2 - lng1) * Math.PI) / 180;
  
    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    return R * c;
  };

  const markers = groupObjectsByRadius(updatedArray);


  function distance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLng = deg2rad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }
  
  const locations = markers;

  let pathDistanceData = [];
  
  for (let i = 0; i < locations.length; i++) {
    for (let j = i+1; j < locations.length; j++) {
      const dist = distance(locations[i].lat, locations[i].lng, locations[j].lat, locations[j].lng);
      pathDistanceData.push({locationFrom:i+1,locationTo:j+1,distance:dist.toFixed(2)})
      // console.log(`Distance between locations ${i+1} and ${j+1}: ${dist.toFixed(2)} km`);
    }
  }

  useEffect(() => {
    const loader = new Loader({
      apiKey: 'AIzaSyCj1ijNXYsFnMOdaC8zfb1IGxpTescjhe8',
      version: 'weekly',
      libraries: ["geometry"],
    });


    loader.load().then(() => {
      if (!mapRef.current) {
        console.error("Map element not found");
        return;
      }
      const google = window.google;
      const mapInstance = new google.maps.Map(mapRef.current, {
        center: updatedArray && updatedArray[0],
        zoom: 14,
        styles: mapStyles,
      });

      setMap(mapInstance);

      const polyline = new google.maps.Polyline({
        path: updatedArray,
        strokeColor: '#17bf3b',
        strokeOpacity: 2.0,
        strokeWeight: 10,
      });

      polyline.setMap(mapInstance);
      polyLineRef.current = polyline;

      markers.map((marker,index) => {
        const mapMarker = new google.maps.Marker({
          position: marker,
          map: mapInstance,
          // icon: {
          //   url: '/img/man.png',
          //   scaledSize: new google.maps.Size(50, 50),
          //   anchor: new google.maps.Point(25, 25),
          // },
          label: {
              text: `${index + 1}`,
              color: '#fff',
              fontSize: '16px',
              // fontWeight: 'bold',
            },
          })

          polyline.getPath().push(new google.maps.LatLng(marker.lat, marker.lng));
          mapMarker.addListener('click', () => {
            setData(marker?.objects)
          });
        });

      polyline.setPath(
        markers.map((marker) => new google.maps.LatLng(marker.lat, marker.lng))
      );


    });
  }, []);


  return <>
    <div style={{ height: '500px', width: '100%' }} ref={mapRef} />
      <div className="row justify-content-center">
        <div className="col-lg-6">
            <ul class="list-group shadow-sm my-2">
                      <li class="list-group-item d-flex justify-content-around active">
                        <p>Location From</p>
                        <p>Location To </p>
                        <p>Distance KM</p>
                      </li>
              {
                pathDistanceData?.map((item) => (
                  <>
                      <li class="list-group-item d-flex justify-content-around">
                        <p>{item.locationFrom}</p>
                        <p>{item.locationTo} </p>
                        <p>{item.distance} KM</p>
                      </li>
                  </>
                ))
              }
            </ul>
        </div>
      </div>
    {
      !data
      ?
        <h4 className="text-center mt-3">Please select a marker to get Meter Reader data</h4>
      :
      <TableData 
        data={data} 
        filters={{}}
        orgData={true}
        paginate={false}
        arrayData={[
          {name:'createdAt',label:'Date', date: true},
          {name:'mobileNo',label:'Meter Reader Mobile Number'},
          // {name:'serialNo',label:'Serial No'},
          {name:'uidNo',label:'Consumer ID'},
          {name:'smallImg',label:'Image',image:true},
          {name:'finalValue',label:'Value'},
          {name:'valueType',label:'Value Type'},
          {name:'scanRemark',label:'Remark'},
          {name:'readingType',label:'Type', manualText:true},
        ]}
      />
    }
    
  </>;
};

export default MapContainer;
