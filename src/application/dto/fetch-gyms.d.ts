import { Gym } from "@/repositories/gym-repository";
import type { ListsParams } from "./lists-params";

export interface FetchGymsCommand extends ListsParams {
    query: string,
    userid: string
}

export interface FetchGymsResponse {
    gyms: Gym[]
}