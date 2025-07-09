import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

interface ChartUIProps {
    data: OpenMeteoResponse | null;
    loading: boolean;
    error: string | null;
    cityName?: string;
}

function prepareChartData(data: OpenMeteoResponse) {
    if (!data.hourly?.time || !data.hourly?.temperature_2m || !data.hourly?.wind_speed_10m) {
        return { labels: [], temperatures: [], windSpeeds: [] };
    }

    // Tomar solo las primeras 24 horas para una mejor visualización
    const maxPoints = Math.min(24, data.hourly.time.length);
    
    const labels = data.hourly.time.slice(0, maxPoints).map(time => 
        new Date(time).toLocaleTimeString('es-ES', { 
            hour: '2-digit', 
            minute: '2-digit' 
        })
    );
    
    const temperatures = data.hourly.temperature_2m.slice(0, maxPoints);
    const windSpeeds = data.hourly.wind_speed_10m.slice(0, maxPoints);
    
    return { labels, temperatures, windSpeeds };
}

export default function ChartUI({ data, loading, error, cityName }: ChartUIProps) {
    
    if (loading) {
        return (
            <Box sx={{ 
                height: 350, 
                width: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center', 
                alignItems: 'center' 
            }}>
                <CircularProgress />
                <Typography sx={{ mt: 2 }}>Cargando gráfico meteorológico...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ height: 350, width: '100%' }}>
                <Alert severity="error">
                    Error al cargar los datos del gráfico: {error}
                </Alert>
            </Box>
        );
    }

    if (!data) {
        return (
            <Box sx={{ height: 350, width: '100%' }}>
                <Alert severity="warning">
                    No hay datos disponibles para mostrar el gráfico
                </Alert>
            </Box>
        );
    }

    const { labels, temperatures, windSpeeds } = prepareChartData(data);

    if (labels.length === 0 || temperatures.length === 0 || windSpeeds.length === 0) {
        return (
            <Box sx={{ height: 350, width: '100%' }}>
                <Alert severity="info">
                    No hay datos de temperatura disponibles para el gráfico
                </Alert>
            </Box>
        );
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                Temperatura y Velocidad del Viento - {cityName || 'Ubicación'}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Ubicación: {data.latitude}°N, {data.longitude}°E | Elevación: {data.elevation}m
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
                Nota: Temperatura en {data.hourly_units?.temperature_2m ?? '°C'} (azul) y Velocidad del Viento en {data.hourly_units?.wind_speed_10m ?? 'km/h'} (naranja)
            </Typography>
            <LineChart
                height={350}
                series={[
                    { 
                        data: temperatures, 
                        label: `Temperatura (${data.hourly_units?.temperature_2m ?? '°C'})`,
                        color: '#1976d2'
                    },
                    { 
                        data: windSpeeds, 
                        label: `Velocidad del Viento (${data.hourly_units?.wind_speed_10m ?? 'km/h'})`,
                        color: '#ff6b35'
                    }
                ]}
                xAxis={[{ 
                    scaleType: 'point', 
                    data: labels,
                    label: 'Hora'
                }]}
                yAxis={[{
                    label: 'Temperatura'
                }]}
                margin={{ left: 80, right: 50, top: 50, bottom: 80 }}
            />
        </Box>
    );
}