export interface GetUserCheckInAmountCommand {
    userId: string
}

export interface GetUserCheckInAmountResponse {
    checkIns: number
}