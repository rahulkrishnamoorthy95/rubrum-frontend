import {
    FETCH_INWARD_LIST_REQUEST,
    FETCH_INWARD_LIST_SUCCESS,
    FETCH_INWARD_LIST_ERROR,

    SET_INWARD_DETAILS,
    SUBMIT_INWARD_ENTRY,
    SUBMIT_INWARD_SUCCESS,
    SUBMIT_INWARD_ERROR,
    CHECK_COIL_EXISTS,
    CHECK_COIL_EXISTS_SUCCESS,
    CHECK_COIL_EXISTS_ERROR,
    FETCH_INWARD_LIST_BY_PARTY_REQUEST,
    FETCH_INWARD_LIST_BY_PARTY_SUCCESS,
    FETCH_INWARD_LIST_BY_PARTY_ERROR,
    FETCH_INWARD_PLAN_DETAILS_REQUESTED,
    FETCH_INWARD_PLAN_DETAILS_SUCCESS,
    FETCH_INWARD_PLAN_DETAILS_ERROR,
    SET_PROCESS_DETAILS,
    RESET_INWARD_FORM,
    RESET_DELETE_INWARD,
    REQUEST_SAVE_SLITTING_DETAILS,
    SAVE_SLITTING_DETAILS_SUCCESS,
    SAVE_SLITTING_DETAILS_ERROR,
    REQUEST_SAVE_CUTTING_DETAILS,
    SAVE_CUTTING_DETAILS_SUCCESS,
    SAVE_CUTTING_DETAILS_ERROR,
    REQUEST_UPDATE_INSTRUCTION_DETAILS,
    REQUEST_UPDATE_INSTRUCTION_DETAILS_SUCCESS,
    REQUEST_UPDATE_INSTRUCTION_DETAILS_ERROR,
    RESET_INSTRUCTION_FORM, FETCH_MATERIAL_GRADE_LIST_REQUEST, FETCH_MATERIAL_GRADE_LIST_SUCCESS,

    SET_INWARD_SELECTED_FOR_DELIVERY,
    POST_DELIVERY_CONFIRM_REQUESTED,
    POST_DELIVERY_CONFIRM_SUCCESS,
    POST_DELIVERY_CONFIRM_ERROR,

    FETCH_INWARD_LIST_BY_INSTRUCTION_REQUEST,
    FETCH_INWARD_LIST_BY_INSTRUCTION_REQUEST_SUCCESS,
    FETCH_INWARD_LIST_BY_INSTRUCTION_REQUEST_ERROR,

	FETCH_INWARD_INSTRUCTION_DETAILS_REQUESTED,
    FETCH_INWARD_INSTRUCTION_DETAILS_SUCCESS,
    FETCH_INWARD_INSTRUCTION_DETAILS_ERROR,
    FETCH_INWARD_INSTRUCTION_WIP_DETAILS_REQUESTED,
    FETCH_INWARD_INSTRUCTION_WIP_DETAILS_SUCCESS,
    FETCH_INWARD_INSTRUCTION_WIP_DETAILS_ERROR,
    SAVE_UNPROCESSED_FOR_DELIVERY,
    SAVE_UNPROCESSED_FOR_DELIVERY_ERROR,
    SAVE_UNPROCESSED_FOR_DELIVERY_SUCCESS,
    FETCH_DELIVERY_LIST_REQUEST_BY_ID,
    FETCH_DELIVERY_LIST_SUCCESS_BY_ID,
    FETCH_INWARD_LIST_BY_ID_SUCCESS,
    FETCH_INWARD_LIST_BY_ID_ERROR,
    FETCH_INWARD_LIST_BY_ID,
    DELETE_INWARD_LIST_BY_ID,
    DELETE_INWARD_LIST_BY_ID_SUCCESS,
    DELETE_INWARD_LIST_BY_ID_ERROR,
    UPDATE_INWARD_LIST,
    UPDATE_INWARD_LIST_SUCCESS,
    UPDATE_INWARD_LIST_ERROR

} from "../../constants/ActionTypes";

const INIT_STATE = {
    inwardList: [],
    loading: false,
    success: false,
    error: false,
    inward: {},
    inwardEntry:{},
    inwardSubmitLoading: false,
    inwardSubmitSuccess: false,
    inwardSubmitError: false,
    planLoading: false,
    planSuccess: false,
    planError: false,
    plan: {},
    process: {},
    instructionSaveLoading: false,
    instructionSaveSuccess: false,
    instructionSaveError: false,
    materialGrades: {},
    inwardListForDelivery: undefined,
    vehicleNumber: '',
    deleteSuccess: false,
    deleteFail: false,
    inwardUpdateLoading: false,
    inwardUpdateSuccess: false,
    inwardUpdateError: false,

};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case FETCH_INWARD_LIST_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }
        case FETCH_INWARD_LIST_SUCCESS: {
            return {
                ...state,
                loading: false,
                inwardList: action.inwardList,
                success: true
            }
        }
        case CHECK_COIL_EXISTS: {
            return {
                ...state,
                loading: true,
            }
        }
        case CHECK_COIL_EXISTS_SUCCESS: {
            return {
                ...state,
                loading: false,
                success: true,
                duplicateCoil: action.status
            }
        }
        case CHECK_COIL_EXISTS_ERROR: {
            return {
                ...state,
                loading: false,
                error: true,
            }
        }
        case FETCH_INWARD_LIST_ERROR: {
            return {
                ...state,
                loading: false,
                inwardList: [],
                error: true
            }
        }
        case SET_INWARD_DETAILS: {
            return {
                ...state,
                inward: action.inward,
                inwardEntry: action.inward
            }
        }
        case SUBMIT_INWARD_ENTRY: {
            return {
                ...state,
                inwardSubmitLoading: true,
            }
        }
        case SUBMIT_INWARD_SUCCESS: {
            return {
                ...state,
                inwardSubmitLoading: false,
                inwardSubmitSuccess: true
            }
        }
        case SUBMIT_INWARD_ERROR: {
            return {
                ...state,
                inwardSubmitLoading: false,
                inwardSubmitError: true
            }
        }
        case FETCH_INWARD_LIST_BY_PARTY_REQUEST: {
            return {
                ...state,
                loading: true,
                error: false
            }
        }
        case FETCH_INWARD_LIST_BY_PARTY_SUCCESS: {
            return {
                ...state,
                loading: false,
                error: false,
                inwardList: action.payload,
            }
        }
        case FETCH_INWARD_LIST_BY_PARTY_ERROR: {
            return {
                ...state,
                loading: false,
                error: true,
                inwardList: [],
            }
        }
        case FETCH_INWARD_PLAN_DETAILS_REQUESTED: {
            return {
                ...state,
                planLoading: true
            }
        }
        case FETCH_INWARD_PLAN_DETAILS_SUCCESS: {
            return {
                ...state,
                planLoading: false,
                planSuccess: true,
                plan: action.payload
            }
        }
        case FETCH_INWARD_PLAN_DETAILS_ERROR: {
            return {
                ...state,
                planLoading: false,
                planSuccess: false,
                planError: action.error
            }
        }
        case FETCH_INWARD_INSTRUCTION_DETAILS_REQUESTED: {
            return {
                ...state,
                loading: true
            }
        }
        case FETCH_INWARD_INSTRUCTION_DETAILS_SUCCESS: {
            return {
                ...state,
                loading: false,
                plan: action.payload
            }
        }
        case FETCH_INWARD_INSTRUCTION_DETAILS_ERROR: {
            return {
                ...state,
                loading:false
            }
        }
        case SET_PROCESS_DETAILS: {
            return {
                ...state,
                process: action.processDetails
            }
        }
        case RESET_INWARD_FORM: {
            return {
                ...state,
                inwardSubmitLoading: false,
                inwardSubmitSuccess: false,
                inwardSubmitError: false,
                inward:{},
                inwardUpdateoading: false,
                inwardUpdateSuccess: false,
                inwardUpdateError: false,
            }
        }
        case RESET_INSTRUCTION_FORM:
            {return {
                ...state,
                process:{},
            }
        }
        case REQUEST_SAVE_CUTTING_DETAILS: {
            return {
                ...state,
                instructionSaveLoading: true,
                instructionSaveSuccess: false,
                instructionSaveError: false,
            }
        }
        case SAVE_CUTTING_DETAILS_SUCCESS: {
            return {
                ...state,
                instructionSaveLoading: false,
                instructionSaveSuccess: true,
                instructionSaveError: false,
            }
        }
        case SAVE_CUTTING_DETAILS_ERROR: {
            return {
                ...state,
                instructionSaveLoading: false,
                instructionSaveSuccess: false,
                instructionSaveError: true,
            }
        }
        case REQUEST_SAVE_SLITTING_DETAILS: {
            return {
                ...state,
                instructionSaveLoading: true,
                instructionSaveSuccess: false,
                instructionSaveError: false,
            }
        }
        case SAVE_SLITTING_DETAILS_SUCCESS: {
            return {
                ...state,
                instructionSaveLoading: false,
                instructionSaveSuccess: true,
                instructionSaveError: false,
            }
        }
        case SAVE_SLITTING_DETAILS_ERROR: {
            return {
                ...state,
                instructionSaveLoading: false,
                instructionSaveSuccess: false,
                instructionSaveError: true,
            }
        }
        case REQUEST_UPDATE_INSTRUCTION_DETAILS: {
            return {
                ...state,
                loading: true,
                error: false
            }
        }
        case REQUEST_UPDATE_INSTRUCTION_DETAILS_SUCCESS: {
            return {
                ...state,
                loading: true,
                error: false
            }
        }
        case REQUEST_UPDATE_INSTRUCTION_DETAILS_ERROR: {
            return {
                ...state,
                loading: true,
                error: false
            }
        }
        case FETCH_MATERIAL_GRADE_LIST_SUCCESS:{
            return {
                ...state,
                materialGrades: action.payload
            }
        }
        case FETCH_INWARD_LIST_BY_ID:{
            return {
                ...state,
                loading: true
            }
        }
        case FETCH_INWARD_LIST_BY_ID_SUCCESS:{
            return {
                ...state,
                loading:false,
                inward: action.payload
            }
        }
        case RESET_INSTRUCTION_FORM: {
            return {
                ...state,
                instructionSaveLoading: false,
                instructionSaveSuccess: false,
                instructionSaveError: false,
            }
        }
        
        case SET_INWARD_SELECTED_FOR_DELIVERY: {
            return {
                ...state,
                inwardListForDelivery:action.payload
            }
        }
        case POST_DELIVERY_CONFIRM_REQUESTED: {
            return {
                ...state,
                loading: true,
                error: false
            }
        }
        case POST_DELIVERY_CONFIRM_REQUESTED: {
            return{
                ...state,
                loading: false,
                error: false,
            }
        }
        case POST_DELIVERY_CONFIRM_REQUESTED: {
            return{
                ...state,
                loading: false,
                error: true
            }
        }
        case FETCH_INWARD_INSTRUCTION_WIP_DETAILS_REQUESTED: {
            return {
                ...state,
                loading: true
            }
        }
        case FETCH_INWARD_INSTRUCTION_WIP_DETAILS_SUCCESS: {
            return {
                ...state,
                loading: false,
                inwardList: action.inwardList
            }
        }
        case FETCH_DELIVERY_LIST_REQUEST_BY_ID: {
            return {
                ...state,
                loading: true
            }
        }
        case FETCH_DELIVERY_LIST_SUCCESS_BY_ID: {
            return {
                ...state,
                loading: false,
                deliveryList: action.deliveryList
            }
        }
        case SAVE_UNPROCESSED_FOR_DELIVERY: {
            return {
                ...state,
                loading: true
            }
        }
        case SAVE_UNPROCESSED_FOR_DELIVERY_SUCCESS: {
            return {
                ...state,
                loading: false
            }
        }
        case SAVE_UNPROCESSED_FOR_DELIVERY_ERROR: {
            return {
                ...state,
                loading: false
            }
        }
        case DELETE_INWARD_LIST_BY_ID:{
            return {
                ...state,
                loading: true,
                deleteSuccess:false,
                deleteFail: false
            }
        }
        case DELETE_INWARD_LIST_BY_ID_SUCCESS:{
            return {
                ...state,
                loading: false,
                deleteSuccess:true,
                deleteFail: false
            }
        }
        case DELETE_INWARD_LIST_BY_ID_ERROR:{
            return {
                ...state,
                loading: false,
                deleteSuccess:false,
                deleteFail: true
            }
        }
        case RESET_DELETE_INWARD: {
            return {
                ...state,
                deleteFail: false,
                deleteSuccess: false
            }
        }
        case UPDATE_INWARD_LIST: {
            return {
                ...state,
                inwardUpdateLoading: true,
            }
        }
        case UPDATE_INWARD_LIST_SUCCESS: {
            return {
                ...state,
                inwardUpdateLoading: false,
                inwardUpdateSuccess: true
            }
        }
        case UPDATE_INWARD_LIST_ERROR: {
            return {
                ...state,
                inwardUpdateLoading: false,
                inwardUpdateError: true
            }
        }

        default:
            return state;
    }
}
