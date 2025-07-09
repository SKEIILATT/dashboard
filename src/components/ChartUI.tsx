import { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

export default function ChartUI() {
   const [arrLabels, setArrLabels] = useState<string[]>([]);
   const [arrValues1, setArrValues1] = useState<number[]>([]);
   const [arrValues2, setArrValues2] = useState<number[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      setLoading(true);
      setError(null);
      
      fetch('https://api.open-meteo.com/v1/forecast?latitude=-0.18&longitude=-78.47&hourly=temperature_2m,wind_speed_10m&forecast_days=1')
         .then(res => {
            if (!res.ok) throw new Error('Error al obtener datos');
            return res.json();
         })
         .then(data => {
            setArrLabels(data.hourly.time.map((t: string) => t.slice(11, 16))); // Solo hora:minuto
            setArrValues1(data.hourly.temperature_2m);
            setArrValues2(data.hourly.wind_speed_10m); 
         })
         .catch(() => setError('No se pudieron cargar los datos de Open-Meteo'))
         .finally(() => setLoading(false));
   }, []);

   if (loading) return <CircularProgress />;
   if (error) return <Alert severity="error">{error}</Alert>;

   return (
      <>
         <Typography variant="h5" component="div">
            Tiempo vs Temperatura (°C) & Velocidad del viento 10m (km/h)
         </Typography>
         <LineChart
            height={300}
            series={[
               { data: arrValues1, label: 'Temperatura (°C)' },
               { data: arrValues2, label: 'Velocidad del viento 10m (km/h)' },
            ]}
            xAxis={[{ scaleType: 'point', data: arrLabels }]}
         />
      </>
   );
}