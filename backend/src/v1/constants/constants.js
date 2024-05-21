export const PAGING = {
    LIMIT: 10,
    PAGE: 1
}

export const MESSAGES = {

    // Fail
    USER_EXISTS: "User already exists",
    USER_NOT_FOUND: "User does not exist",
    DATA_EXISTS: "Data already exists",
    INCORRECT_PHONE_FORMAT: "Phone number must be at least 10 characters and start with 0",
    DATA_NOT_FOUND: "Data not found",
    CANNOT_CREATE_DATA: "Can not create new data",
    CANNOT_UPDATE_DATA: "Can not update data",
    CANNOT_DELETE_DATA: "Can not delete data",
    PASSWORD_NOT_MATCH: "Your password does not match",
    CAN_NOT_GENERATE_TOKEN: "Can not generate a new token, please try again",
    LOGIN_FAILED: "Phone is not found and/or password is incorrect",
    INVALID_PERMISSION: "Not have access. Please contact Admin",
    NO_PERMISSION: "No permissions to perform",
    UNAUTHORIZED: "Token is expired or invalid",
    NOT_FOUND_CLIENT_ID: "No client id found in request headers",
    CAN_NOT_STATUS_PROCESSING: "The current order status invalid to change to processing",
    CAN_NOT_STATUS_SHIPPING: "The current order status invalid to change to shipping",
    CAN_NOT_STATUS_SHIPPED: "The current order status invalid to change to shipped",
    CAN_NOT_STATUS_PAID: "The current order status invalid to change to paid",
    CAN_NOT_STATUS_CANCLED: "The current order status invalid to change to cancle",
    CAN_NOT_STATUS_SAME: "The new status must be diffrence current status",

    // Success
    LOGIN_SUCCESS: "Login successfully",
    REGISTER_SUCCESS: "Register successfully",
    CHANGE_PASSWORD_SUCCESS: "Change password successfully",
    CHANGE_USERNAME_SUCCESS: "Change username successfully",
    DATA_CREATE_SUCCESS: "Data created successfully",
    GET_DATA_SUCCESS: "Get data successfully",
    UPDATE_DATA_SUCCESS: "Update data successfully",
    DELETE_DATA_SUCCESS: "Delete data successfully",
}