import { ReasonPhrases, StatusCodes } from "http-status-codes"

class BaseErrorResponse extends Error {
    constructor({
        message,
        status,
    }) {
        super(message)
        this.status = status
    }
}

// CLIENT ERROR
export class ConflictErrorRequest extends BaseErrorResponse {
    constructor({
        message = ReasonPhrases.CONFLICT,
        status = StatusCodes.CONFLICT
    }) {
        super({ message, status })
    }
}

export class ForbiddenErrorRequest extends BaseErrorResponse {
    constructor({
        message = ReasonPhrases.FORBIDDEN,
        status = StatusCodes.FORBIDDEN
    }) {
        super({ message, status })
    }
}

export class UnauthorizedErrorRequest extends BaseErrorResponse {
    constructor({
        message = ReasonPhrases.UNAUTHORIZED,
        status = StatusCodes.UNAUTHORIZED
    }) {
        super({ message, status })
    }
}

export class NotFoundErrorRequest extends BaseErrorResponse {
    constructor({
        message = ReasonPhrases.NOT_FOUND,
        status = StatusCodes.NOT_FOUND
    }) {
        super({ message, status })
    }
}

// SERVER ERROR

export class NotImplementedErrorRequest extends BaseErrorResponse {
    constructor({
        message = ReasonPhrases.NOT_IMPLEMENTED,
        status = StatusCodes.NOT_IMPLEMENTED
    }) {
        super({ message, status })
    }
}