import asyncHandler from "express-async-handler";
import { PAGING } from "../constants/constants.js";
import { GetAllUsers } from "../repositories/user.repo.js";

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