
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

export interface GymRepository {
    create(gym: RegisterGym): Promise<Gym>
    findById(id: string): Promise<Gym | null>
}