import { ListsParams } from "@/application/dto/lists-params";
import { Coordinate } from "@/application/port/distance-calculator";

export interface Gym {
    id: string;
    title: string;
    description: string | null;
    phone: string | null;
    latitude: number;
    longitude: number;
}
export interface RegisterGym {
    id: string;
    title: string;
    description: string | null;
    phone: string | null;
    latitude: number;
    longitude: number;
}

export interface FindManyGym extends ListsParams {
    query: string
}

export interface FindManyNearbyGym extends ListsParams {
    coordinate: Coordinate
}

export interface GymRepository {
    searchMany(props: FindManyGym): Promise<Gym[]>
    create(gym: RegisterGym): Promise<Gym>
    findManyNearby(props: FindManyNearbyGym): Promise<Gym[]>
    findById(id: string): Promise<Gym | null>
}