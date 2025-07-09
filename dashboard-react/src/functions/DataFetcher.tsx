import { useEffect, useState } from 'react';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

interface DataFetcherOutput {
    data: OpenMeteoResponse | null;
    loading: boolean;
    error: string | null;
}

interface DataFetcherProps {
    latitude: number;
    longitude: number;
    cityName: string;
}

export default function DataFetcher({ latitude, longitude, cityName }: DataFetcherProps) : DataFetcherOutput {

    const [data, setData] = useState<OpenMeteoResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        setLoading(true);
        setError(null);

        // URL de la API de Open-Meteo con coordenadas dinámicas
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=auto`

        const fetchData = async () => {

            try {

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
                }

                const result: OpenMeteoResponse = await response.json();
                setData(result);

            } catch (err: any) {

                if (err instanceof Error) {
                    setError(`Error al obtener datos para ${cityName}: ${err.message}`);
                } else {
                    setError(`Ocurrió un error desconocido al obtener los datos para ${cityName}.`);
                }

            } finally {
                setLoading(false);
            }
        };

        fetchData();

    }, [latitude, longitude, cityName]); // Se ejecuta cuando cambian las coordenadas o la ciudad

    return { data, loading, error };

}