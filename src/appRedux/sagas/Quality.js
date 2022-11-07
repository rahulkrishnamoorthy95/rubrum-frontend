import {all, put, fork, takeLatest} from "redux-saga/effects";
import { getUserToken } from './common';
import {SAVE_TEMPLATE_REQUEST} from "../../constants/ActionTypes";
import {saveTemplateError, saveTemplateSuccess} from "../actions/Quality";
import { userSignOutSuccess } from "../../appRedux/actions/Auth";
import { forEach } from "lodash";

const baseUrl = process.env.REACT_APP_BASE_URL;
const getHeaders = () => ({
    Authorization: getUserToken()
});

const getStageDetails = formFields => {
    const result = [];
    forEach(formFields, (value, key) => {
        const stage = {
            stageName: key,
            remarks: '',
            fieldDetails: value
        }
        result.push(stage);
    });
    return result;
}

function* saveTemplate(action) {
    try {
        const { formFields, templateId } = action.payload;
        const body = {
            templateId,
            stageDetails: getStageDetails(formFields)
        };
        const addPacking = yield fetch(`${baseUrl}api/quality/template/save`, {
                method: 'POST',
                headers: { "Content-Type": "application/json", ...getHeaders() },
                body: JSON.stringify(body)
            
        });
        if (addPacking.status == 200) {
            yield put(saveTemplateSuccess());
        } else if (addPacking.status === 401) {
            yield put(userSignOutSuccess());
        } else
            yield put(saveTemplateError('error'));
    } catch (error) {
        yield put(saveTemplateError(error));
    }
}


export function* watchFetchRequests() {
    yield takeLatest(SAVE_TEMPLATE_REQUEST, saveTemplate);
}

export default function* qualitySagas() {
    yield all([fork(watchFetchRequests)]);
}

