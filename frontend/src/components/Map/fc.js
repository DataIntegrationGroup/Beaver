export function make_feature_collection(locations) {
    return {
        type: "FeatureCollection",
        features: locations.map((location) => {
            return {
                geometry: location["location"],
                properties: {
                    name: location["name"],
                    Things: location["Things"],
                },
            };
        }),
    };
}

export function make_usgs_feature_collection(data) {
    console.log("usgs locations", data);
    const locations = data.value.timeSeries.map((location) => {
        return {
            name: location.sourceInfo.siteName,
            location: {
                type: "Point",
                coordinates: [
                    location.sourceInfo.geoLocation.geogLocation.longitude,
                    location.sourceInfo.geoLocation.geogLocation.latitude,
                ],
            },
            Things: [{ Datastreams: [{ name: "Groundwater Level" }] }],
        };
    });
    return make_feature_collection(locations);
}