import { CheckIn } from "@/repositories/checks-in-repositories"
import { ListsParams } from "./lists-params"

export interface FetchUserCheckInHistoryCommand extends ListsParams {
    userId: string
}

export interface FetchUserCheckInHistoryResponse {
    checkIns: CheckIn[]
}