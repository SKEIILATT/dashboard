import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

function combineArrays(arrLabels: Array<string>, arrValues1: Array<number>, arrValues2: Array<number>) {
   return arrLabels.map((label, index) => ({
      id: index,
      label: label,
      value1: arrValues1[index],
      value2: arrValues2[index]
   }));
}

const columns: GridColDef[] = [
   { field: 'id', headerName: 'ID', width: 90 },
   { field: 'label', headerName: 'Hora', width: 120 },
   { field: 'value1', headerName: 'Temperatura (°C)', width: 160 },
   { field: 'value2', headerName: 'Velocidad del viento 10m (km/h)', width: 350 },
   {
      field: 'resumen',
      headerName: 'Resumen',
      description: 'No es posible ordenar u ocultar esta columna.',
      sortable: false,
      hideable: false,
      width: 250,
      valueGetter: (_, row) => `A las ${row.label}: ${row.value1}°C, ${row.value2}%`,
   },
];

export default function TableUI({ lat, lon }: { lat: number, lon: number }) {
   const [arrLabels, setArrLabels] = useState<string[]>([]);
   const [arrValues1, setArrValues1] = useState<number[]>([]);
   const [arrValues2, setArrValues2] = useState<number[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      setLoading(true);
      setError(null);
      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,wind_speed_10m&forecast_days=1`)
         .then(res => {
            if (!res.ok) throw new Error('Error al obtener datos');
            return res.json();
         })
         .then(data => {
            setArrLabels(data.hourly.time.map((t: string) => t.slice(11, 16)));
            setArrValues1(data.hourly.temperature_2m);
            setArrValues2(data.hourly.wind_speed_10m);
         })
         .catch(() => setError('No se pudieron cargar los datos de Open-Meteo'))
         .finally(() => setLoading(false));
   }, []);

   if (loading) return <CircularProgress />;
   if (error) return <Alert severity="error">{error}</Alert>;

   const rows = combineArrays(arrLabels, arrValues1, arrValues2);

   return (
      <Box sx={{ height: 350, width: '100%' }}>
         <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
               pagination: {
                  paginationModel: {
                     pageSize: 5,
                  },
               },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
         />
      </Box>
   );
}