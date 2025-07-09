//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import { useState } from 'react';
import './App.css'
import Grid from '@mui/material/Grid';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import DataFetcher from './functions/DataFetcher';
import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';
import { CITIES, DEFAULT_CITY } from './types/CityData';

function App() {
  // Estado para manejar la ciudad seleccionada
  const [selectedCity, setSelectedCity] = useState<string>(DEFAULT_CITY.name);
  
  // Obtener las coordenadas de la ciudad seleccionada
  const currentCity = CITIES[selectedCity] || DEFAULT_CITY;
  
  // Función para manejar el cambio de ciudad desde el componente hijo
  const handleCityChange = (cityKey: string) => {
    setSelectedCity(cityKey);
  };

  // Obtener datos de la API con las coordenadas actuales
  const dataFetcherOutput = DataFetcher({
    latitude: currentCity.latitude,
    longitude: currentCity.longitude,
    cityName: currentCity.displayName
  });

  return (
    <Grid container spacing={5} justifyContent="center" alignItems="center">

      {/* Encabezado */}
      <Grid size={{ xs: 12, md: 12 }}>
        
        <HeaderUI />
      </Grid>

      {/* Alertas */}
      <Grid container justifyContent="right" alignItems="center" size={{ xs: 12 }} >
        
        <AlertUI description={`Datos meteorológicos para ${currentCity.displayName}`} />
      </Grid>

      {/* Selector*/}
      <Grid size={{ xs: 12, md: 3 }}>
        
        <SelectorUI 
          selectedCity={selectedCity}
          onCityChange={handleCityChange}
        />
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
      <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
        <ChartUI 
          data={dataFetcherOutput.data} 
          loading={dataFetcherOutput.loading} 
          error={dataFetcherOutput.error}
          cityName={currentCity.displayName}
        />
      </Grid>

      {/* Tabla */}
      <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
        <TableUI 
          data={dataFetcherOutput.data} 
          loading={dataFetcherOutput.loading} 
          error={dataFetcherOutput.error}
          cityName={currentCity.displayName}
        />
      </Grid>

      {/* Información adicional */}
      <Grid>Elemento: Información adicional</Grid>

    </Grid>
  )
}

export default App
