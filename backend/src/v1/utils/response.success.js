import { ReasonPhrases, StatusCodes } from "http-status-codes"

export class SuccessResponse {
    constructor({
        message,
        statusCode = StatusCodes.OK,
        reasonStatusCode = ReasonPhrases.OK,
        data,
        pagination,
    }) {
        this.message = message ? message : reasonStatusCode;
        this.status = statusCode;
        this.data = data;
        this.pagination = pagination;
    }

    send(res, headers = {}) {
        return res.status(this.status).json(this)
    }
}

export class CreatedSuccessResponse extends SuccessResponse {
    constructor({
        message,
        statusCode = StatusCodes.CREATED,
        reasonStatusCode = ReasonPhrases.CREATED,
        data
    }) {
        super({ message, statusCode, reasonStatusCode, data })
    }
}
