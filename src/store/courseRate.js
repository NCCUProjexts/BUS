const courseRate_state = {
  rate: {},
  loading: false
}

const rate = (state = {}, action) => {
  switch (action.type) {
    case "courseRate.rate.set":
      return Object.assign({}, action.rate);
    case "courseRate.rate.clear":
      return Object.assign({}, {});
    case "courseRate.rate.thumbUp":
      return Object.assign({}, {
        ...state,
        [action.rateType]: state[action.rateType].map(rate => {
          if (rate.course_feedback_id == action.rateId) {
            return {
              ...rate,
              num_of_thumbsup: rate.num_of_thumbsup + 1,
              is_rated: true
            }
          }
          return rate;
        })
      });
    case "courseRate.rate.thumbDown":
      return Object.assign({}, {
        ...state,
        [action.rateType]: state[action.rateType].map(rate => {
          if (rate.course_feedback_id == action.rateId) {
            return {
              ...rate,
              num_of_thumbsup: rate.num_of_thumbsup - 1,
              is_rated: false
            }
          }
          return rate;
        })
      });
    default:
      return state;
  }
}

const loading = (state = false, action) => {
  switch (action.type) {
    case "courseRate.loading":
      return true;
    case "courseRate.done":
      return false;
    default:
      return state;
  }
}

const courseRate = (state = courseRate_state, action) => {
  switch (action.type) {
    case "courseRate.rate.set":
    case "courseRate.rate.clear":
    case "courseRate.rate.thumbUp":
    case "courseRate.rate.thumbDown":
      return Object.assign({}, state, {
        rate: rate(state.rate, action)
      });
    case "courseRate.loading":
    case "courseRate.done":
      return Object.assign({}, state, {
        loading: loading(state.loading, action)
      });
    default:
      return state;
  }
}

export default courseRate;