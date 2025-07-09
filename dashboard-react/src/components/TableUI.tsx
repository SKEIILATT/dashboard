import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

interface TableUIProps {
    data: OpenMeteoResponse | null;
    loading: boolean;
    error: string | null;
    cityName?: string;
}

function createTableRows(data: OpenMeteoResponse) {
    if (!data.hourly?.time || !data.hourly?.temperature_2m) {
        return [];
    }

    // Tomar solo las primeras 24 horas para una mejor visualización
    const maxRows = Math.min(24, data.hourly.time.length);
    
    return data.hourly.time.slice(0, maxRows).map((time, index) => ({
        id: index,
        hora: new Date(time).toLocaleTimeString('es-ES', { 
            hour: '2-digit', 
            minute: '2-digit' 
        }),
        fecha: new Date(time).toLocaleDateString('es-ES'),
        temperatura: data.hourly?.temperature_2m?.[index] ?? 'N/A',
        unidad: data.hourly_units?.temperature_2m ?? '°C'
    }));
}

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
        field: 'fecha',
        headerName: 'Fecha',
        width: 120,
    },
    {
        field: 'hora',
        headerName: 'Hora',
        width: 100,
    },
    {
        field: 'temperatura',
        headerName: 'Temperatura',
        width: 130,
        type: 'number',
    },
    {
        field: 'unidad',
        headerName: 'Unidad',
        width: 80,
    },
    {
        field: 'resumen',
        headerName: 'Resumen',
        description: 'Resumen de la información meteorológica',
        sortable: false,
        hideable: false,
        width: 200,
        valueGetter: (_, row) => `${row.fecha} ${row.hora}: ${row.temperatura}${row.unidad}`,
    },
];

export default function TableUI({ data, loading, error, cityName }: TableUIProps) {
    
    if (loading) {
        return (
            <Box sx={{ 
                height: 350, 
                width: '100%', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center' 
            }}>
                <CircularProgress />
                <Typography sx={{ ml: 2 }}>Cargando datos meteorológicos...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ height: 350, width: '100%' }}>
                <Alert severity="error">
                    Error al cargar los datos: {error}
                </Alert>
            </Box>
        );
    }

    if (!data) {
        return (
            <Box sx={{ height: 350, width: '100%' }}>
                <Alert severity="warning">
                    No hay datos disponibles
                </Alert>
            </Box>
        );
    }

    const rows = createTableRows(data);

    return (
        <Box sx={{ height: 350, width: '100%' }}>
            <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                Pronóstico por Horas - {cityName || 'Ubicación'}
            </Typography>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                pageSizeOptions={[5, 10, 25]}
                disableRowSelectionOnClick
            />
        </Box>
    );
}