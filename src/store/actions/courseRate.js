import ajax from "../../api"

const set_course_rate = (rate) => {
  return {
    type: "courseRate.rate.set",
    rate: rate
  }
}

const clear_course_rate = () => {
  return {
    type: "courseRate.rate.clear"
  }
}

const course_rate_thumbUp = (rateType, rateId) => {
  return {
    type: "courseRate.rate.thumbUp",
    rateType: rateType,
    rateId: rateId
  }
}

const course_rate_thumbDown = (rateType, rateId) => {
  return {
    type: "courseRate.rate.thumbDown",
    rateType: rateType,
    rateId: rateId
  }
}

const set_course_detail = (detail) => {
  return {
    type: "courseDetail.detail.set",
    detail: detail
  }
}

const set_loading = () => {
  return {
    type: "courseRate.loading"
  }
}

const set_done = () => {
  return {
    type: "courseRate.done"
  }
}

export const getRate = (courseId) => {
  return function (dispatch, getState) {
    const userId = getState().auth?.profile?.id
    dispatch(clear_course_rate());
    dispatch(set_loading());
    return ajax("/api/v2/courserate/rate", "get", { params: { course_id: courseId, user_id: userId } }).then(res => {
      dispatch(set_course_rate(res.data));
      dispatch(set_done());
      return res.data;
    })
  }
}

export const createFeedback = (courseId, feedback) => {
  return function (dispatch, getState) {
    const userId = getState().auth?.profile?.id
    dispatch(clear_course_rate());
    dispatch(set_loading());
    return ajax("/api/v2/courserate/feedback/create", "post", { data: { course_id: courseId, user_id: userId, feedback: feedback } }).then(res => {
      return ajax("/api/v2/courserate/rate", "get", { params: { course_id: courseId, user_id: userId } });
    }).then(res => {
      dispatch(set_course_rate(res.data));
      dispatch(set_done());
      return res.data;
    })
  }
}

export const createRate = (courseId, rate, sweet, boringness, harvest) => {
  return function (dispatch, getState) {
    const userId = getState().auth?.profile?.id
    return ajax("/api/v2/courserate/rate/create", "post", { data: { course_id: courseId, user_id: userId, rate: rate, sweet: sweet, loading: boringness, gain: harvest } }).then(res => {
      return ajax("/api/v2/courserate/detail", "get", { params: { course_id: courseId } })
    }).then(res => {
      dispatch(set_course_detail(res.data.data.default_course));
    })
  }
}

export const thumbUp = (courseId, feedbackType, rateId) => {
  return function (dispatch, getState) {
    const userId = getState().auth?.profile?.id
    return ajax("/api/v2/courserate/thumbsup/update", "post", { data: { user: userId, feedback_type: feedbackType, rate_id: rateId } }).then(res => {
      if (feedbackType == "CUSTOM") {
        if (res.data.data.action == "GIVE_THUMBS_UP") {
          dispatch(course_rate_thumbUp("feedback", rateId))
        } else if (res.data.data.action == "CANCEL_THUMBS_UP") {
          dispatch(course_rate_thumbDown("feedback", rateId))
        }
      } else if (feedbackType == "OFFICIAL") {
        if (res.data.data.action == "GIVE_THUMBS_UP") {
          dispatch(course_rate_thumbUp("official_feedback", rateId))
        } else if (res.data.data.action == "CANCEL_THUMBS_UP") {
          dispatch(course_rate_thumbDown("official_feedback", rateId))
        }
      }
    })
  }
}