import asyncHandler from "express-async-handler";
import { removeUnicode } from "../utils/commonUtils.js";
import { getAllUsesService } from "../services/user.service.js";
import { SuccessResponse } from "../utils/response.success.js";
import { MESSAGES } from "../constants/constants.js";

export const getAllUsersCtrl = asyncHandler(async (req, res) => {
    const { name, limit, page } = req.query

    const filters = { deleteFlag: false }

    if (name) {
        filters.name = { $regex: removeUnicode(name), $options: "i" }
    }

    const { users, paging } = await getAllUsesService({ filters, limit, page })

    new SuccessResponse({
        message: MESSAGES.DATA_CREATE_SUCCESS,
        pagination: paging,
        data: users,
    }).send(res)
})