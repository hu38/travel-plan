/// <reference types="googlemaps" />
declare const geocodeByAddress: (address: string) => Promise<google.maps.GeocoderResult[]>;
export default geocodeByAddress;
