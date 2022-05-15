const bus_state = {
  Geolocation: ["25.04235", "121.5650027"],
  nearestStop: {},
  allStops: [],
  loading: true
}

const Geolocation = (state = ["25.04235", "121.5650027"], action) => {
  switch (action.type) {
    case "bus.Geolocation.set":
      return [action.latitude, action.longitude];
    case "bus.Geolocation.reset":
      return ["25.04235", "121.5650027"];
    default:
      return state;
  }
}

const nearestStop = (state = {}, action) => {
  switch (action.type) {
    case "bus.nearestStop.set":
      return Object.assign({}, action.nearestStop);
    case "bus.nearestStop.reset":
      return Object.assign({}, {});
    default:
      return state;
  }
}

const loading = (state = false, action) => {
  switch (action.type) {
    case "bus.loading":
      return true;
    case "bus.done":
      return false;
    default:
      return state;
  }
}

const bus = (state = bus_state, action) => {
  switch (action.type) {
    case "bus.Geolocation.set":
    case "bus.Geolocation.reset":
      return Object.assign({}, state, {
        Geolocation: Geolocation(state.Geolocation, action)
      });
    case "bus.nearestStop.set":
    case "bus.nearestStop.reset":
      return Object.assign({}, state, {
        nearestStop: nearestStop(state.nearestStop, action)
      });
    case "bus.loading":
    case "bus.done":
      return Object.assign({}, state, {
        loading: loading(state.loading, action)
      });
    default:
      return state;
  }
}

export default bus;