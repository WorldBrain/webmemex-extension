import { createReducer } from 'redux-act'

import * as acts from './actions'

export interface State {
    /** Holds the tab ID which the popup is currently shown in. */
    tabId: number
    /** Holds the URL of the page which the popup is currently shown in. */
    url: string
    /** Holds the pdfFingerprint of the page if the page is a pdf else null */
    pdfFingerprint: string
    /** Holds the current state of the search input. */
    searchValue: string
}

export const defState: State = {
    tabId: null,
    url: '',
    searchValue: '',
    pdfFingerprint: '',
}

const reducer = createReducer<State>({}, defState)

reducer.on(acts.setTabId, (state, payload) => ({
    ...state,
    tabId: payload,
}))

reducer.on(acts.setUrl, (state, payload) => ({
    ...state,
    url: payload,
}))

reducer.on(acts.setFingerprint, (state, payload) => ({
    ...state,
    pdfFingerprint: payload,
}))

reducer.on(acts.setSearchVal, (state, payload) => ({
    ...state,
    searchValue: payload,
}))

export default reducer
