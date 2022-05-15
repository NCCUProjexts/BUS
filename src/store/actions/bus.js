import ajax from "../../api";

const set_geolocation = (latitude, longitude) => {
  return {
    type: "bus.Geolocation.set",
    latitude: latitude,
    longitude: longitude
  }
}

const set_nearestStop = (nearestStop) => {
  return {
    type: "bus.nearestStop.set",
    nearestStop: nearestStop
  }
}

export const setLocation = (latitude, longitude) => {
  return function (dispatch) {
    dispatch(set_geolocation(latitude, longitude));
  }
}

export const getNearestStop = () => {
  return function (dispatch, getState) {
    dispatch({type: "bus.loading"});
    const state = getState();
    const longitude = state.bus.Geolocation[0];
    const latitude = state.bus.Geolocation[1];
    let stopInfo = {};
    ajax("https://ptx.transportdata.tw/MOTC/v2/Bus/Station/NearBy", "get", {
      params: {
        ["$top"]: 1,
        ["$spatialFilter"]: `nearby(${longitude}, ${latitude}, 1000)`,
        ["$format"]: "JSON"
      }
    }).then(res => {
      stopInfo = res.data[0]
      let promises = [];
      for (let i in res.data[0].Stops) {
        let stop = res.data[0].Stops[i];
        promises.push(
          ajax("https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/Taipei/" + stop.RouteName.Zh_tw, "get", {
            data: {
              ["$format"]: "JSON"
            }
          }).then(res => {
            const result = res.data.find(station => station.StopUID == stop.StopUID)
            stopInfo.Stops[i].EstimateTime = result.EstimateTime ? result.EstimateTime : -1
          })
        )
      }
      return Promise.all(promises);
    }).then(() => {
      dispatch(set_nearestStop(stopInfo));
      dispatch({type: "bus.done"});
    });
  }
}