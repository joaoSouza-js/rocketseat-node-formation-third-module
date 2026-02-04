import { ListsParams } from "@/application/dto/lists-params";

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

export interface GymRepository {
    searchMany(props: FindManyGym): Promise<Gym[]>
    create(gym: RegisterGym): Promise<Gym>
    findById(id: string): Promise<Gym | null>
}