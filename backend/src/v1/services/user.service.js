import asyncHandler from "express-async-handler";
import { MESSAGES, PAGING } from "../constants/constants.js";
import { FindUserById, GetAllUsers } from "../repositories/user.repo.js";
import { NotFoundErrorRequest } from "../utils/response.error.js";

export const getAllUsesService = asyncHandler(async ({ filters, limit = PAGING.LIMIT, page = PAGING.PAGE }) => {
    const { users, totalResults, totalDocuments } = await GetAllUsers({ filters, limit, page })

    const paging = {
        total: totalDocuments,
        totalResults,
        limit: Number(limit),
        currPage: Number(page),
        ...(page === 1 ? {} : { prevPage: page - 1 }),
        ...((page * limit) >= totalDocuments ? {} : { nextPage: page + 1 })
    }

    return {
        users,
        paging
    }

})

export const getUserByIdService = asyncHandler(async ({ id }) => {
    const foundUsers = await FindUserById({ id })

    if (!foundUsers) {
        throw new NotFoundErrorRequest({ message: MESSAGES.DATA_NOT_FOUND })
    }

    return foundUsers
})
