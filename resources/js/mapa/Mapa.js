import React, { useEffect } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import icon  from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

//TODO cambiar el idioma para presentar los detalles del lugar en español
//TODO aumentar el tamaño de los iconos de los sitios cercanos a la posicion actual

//configuracio del icono marker
let iconUbicacion = new L.icon({
    iconUrl: icon,
    IconShadow: iconShadow,
    iconSize: [25, 35],
    iconAnchor: [22, 94],
    shadowAnchor: [22, 94],
    popupAnchor: [-3, -76]

})

//posicion inicial
const positionIni = [4.6036656, -74.0864888]

//posicion el mapa en la ubicacion seleccionada
function ResetCenterView(props){
    const {position} = props
    const map = useMap()

    useEffect(() => {
        if(position){
            map.setView(
                L.latLng(position?.lat, position?.lon),
                map.getZoom(),
                {
                    animate: true
                }
            )
        }
    
    }, [position])
    

    
    return null
}

//configuracion del mapa y input recibido desde el componente search
export const Mapa = (props) => {
    const {position} = props
    console.log(position)
    const location = [position?.lat, position?.lon]
    
    return (
        <div>
            <MapContainer center={positionIni} zoom={16} style={{width: "100%", height: 1000}}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://api.maptiler.com/maps/openstreetmap/{z}/{x}/{y}.jpg?key=3aF45Byd6oHYLXKsE59z"
                />
                {position && (
                    <Marker position={location} icon={iconUbicacion}>
                    <Popup>
                        <strong>Lugar: </strong> {position.name} <br /> 
                        <strong>Ciudad: </strong>  {position.address.city} <br /> 
                        <strong>Pais: </strong>  {position.address.country} <br /> 
                        <strong>Tipo: </strong>  {position.addresstype}
                    </Popup>
                    </Marker>
                )}
                <ResetCenterView position = {position}/>
            </MapContainer>
        </div>
    )
}
