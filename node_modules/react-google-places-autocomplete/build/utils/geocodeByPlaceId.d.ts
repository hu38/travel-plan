/// <reference types="googlemaps" />
declare const geocodeByPlaceId: (placeId: string) => Promise<google.maps.GeocoderResult[]>;
export default geocodeByPlaceId;
