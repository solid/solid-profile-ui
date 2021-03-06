import solid from 'solid-client'

import { SOLID_PROFILE_LOAD } from './action-types'
import { authenticate } from './auth/actions'
import { getModel as getBasicInfoModel } from './basic-info/actions'
import { getModel as getPictureModel } from './picture/actions'

export function getModels () {
  return dispatch => {
    return dispatch(authenticate())
      .then(action => solid.getProfile(action.webId))
      .then(solidProfile => {
        dispatch(loadSolidProfile(solidProfile))
        dispatch(getBasicInfoModel(solidProfile))
        dispatch(getPictureModel(solidProfile))
        return solidProfile
      })
  }
}

export function loadSolidProfile (solidProfile) {
  return {
    type: SOLID_PROFILE_LOAD,
    solidProfile
  }
}
