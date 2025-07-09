export interface CityCoordinates {
    name: string;
    displayName: string;
    latitude: number;
    longitude: number;
}

export const CITIES: Record<string, CityCoordinates> = {
    guayaquil: {
        name: 'guayaquil',
        displayName: 'Guayaquil',
        latitude: -2.1709,
        longitude: -79.9224
    },
    quito: {
        name: 'quito',
        displayName: 'Quito',
        latitude: -0.1807,
        longitude: -78.4678
    },
    manta: {
        name: 'manta',
        displayName: 'Manta',
        latitude: -0.9677,
        longitude: -80.7089
    },
    cuenca: {
        name: 'cuenca',
        displayName: 'Cuenca',
        latitude: -2.9001,
        longitude: -79.0059
    }
};

export const DEFAULT_CITY = CITIES.quito;
