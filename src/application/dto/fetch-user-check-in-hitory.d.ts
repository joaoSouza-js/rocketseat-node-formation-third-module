import type { CheckIn } from "@/repositories/checks-in-repositories"
import type { ListsParams } from "./lists-params"

export interface FetchUserCheckInHistoryCommand extends ListsParams {
    userId: string
}

export interface FetchUserCheckInHistoryResponse {
    checkIns: CheckIn[]
}