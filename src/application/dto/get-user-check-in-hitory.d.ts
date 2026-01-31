import { CheckIn } from "@/repositories/checks-in-repositories"
import { ListsParams } from "./lists-params"

export interface GetUserCheckInHistoryCommand extends ListsParams {
    userId: string
}

export interface GetUserCheckInHistoryResponse {
    checkIns: CheckIn[]
}