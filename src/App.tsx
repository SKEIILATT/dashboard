//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import Grid from '@mui/material/Grid';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import useDataFetcher from './functions/DataFetcher';
import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';
import { useState } from 'react';

const cityCoords: Record<string, { lat: number, lon: number }> = {
  guayaquil: { lat: -2.17, lon: -79.92 },
  quito: { lat: -0.18, lon: -78.47 },
  manta: { lat: -0.96, lon: -80.71 },
  cuenca: { lat: -2.90, lon: -79.00 }
};

function App() {
  const [seletedcity, setSelectedCity] = useState<string>("quito");
  const coords = cityCoords[seletedcity] 
  const dataFetcherOutput = useDataFetcher({ lat: coords.lat, lon: coords.lon });

  return (
    <Grid container spacing={5} justifyContent="center" alignItems="center">

      {/* Encabezado */}
      <Grid size={{ xs: 12, md: 12 }}>
        Elemento: Encabezado
        <HeaderUI />
      </Grid>

      {/* Alertas */}
      <Grid container justifyContent="right" alignItems="center" size={{ xs: 12 }} >
        Elemento: Alertas
        <AlertUI description="No se preveen lluvias" />
      </Grid>

      {/* Selector*/}
      <Grid size={{ xs: 12, md: 3 }}>Elemento: Selector
        <SelectorUI onCityChange={setSelectedCity}/>
      </Grid>

      {/* Indicadores */}
      <Grid container size={{ xs: 12, md: 9 }} >

       {/* Renderizado condicional de los datos obtenidos */}

                 {dataFetcherOutput.loading && <p>Cargando datos...</p>}
                 {dataFetcherOutput.error && <p>Error: {dataFetcherOutput.error}</p>}
                 {dataFetcherOutput.data && (
                 <>

                     {/* Indicadores con datos obtenidos */}

                     <Grid size={{ xs: 12, md: 3 }} >
                         <IndicatorUI
                             title='Temperatura (2m)'
                             description={dataFetcherOutput.data.current.temperature_2m + " " + dataFetcherOutput.data.current_units.temperature_2m} />
                     </Grid>

                     <Grid size={{ xs: 12, md: 3 }}>
                         <IndicatorUI
                             title='Temperatura aparente'
                             description={dataFetcherOutput.data.current.apparent_temperature + " " + dataFetcherOutput.data.current_units.apparent_temperature} />
                     </Grid>

                     <Grid size={{ xs: 12, md: 3 }}>
                         <IndicatorUI
                             title='Velocidad del viento'
                             description={dataFetcherOutput.data.current.wind_speed_10m + " " + dataFetcherOutput.data.current_units.wind_speed_10m} />
                     </Grid>

                     <Grid size={{ xs: 12, md: 3 }}>
                         <IndicatorUI
                             title='Humedad relativa'
                             description={dataFetcherOutput.data.current.relative_humidity_2m + " " + dataFetcherOutput.data.current_units.relative_humidity_2m} />
                     </Grid>

                 </>
                 )}

      </Grid>


      {/* Gráfico */}
      <Grid sx={{ display: { xs: "none", md: "block" } }} >Elemento: Gráfico
        <ChartUI lat={coords.lat} lon= {coords.lon}/>
      </Grid>
      
      {/* Tabla */}
      <Grid sx={{ display: { xs: "none", md: "block" } }} >Elemento: Tabla
        <TableUI lat={coords.lat} lon= {coords.lon}/>
      </Grid>

      {/* Información adicional */}
      <Grid>Elemento: Información adicional</Grid>

    </Grid>
  )
}

export default App
