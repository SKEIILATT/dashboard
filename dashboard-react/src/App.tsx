//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import Grid from '@mui/material/Grid';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
function App() {
  //const [count, setCount] = useState(0)

  return (
    <Grid container spacing={5} justifyContent="center" alignItems="center">

         {/* Encabezado */}
         <Grid size={{ xs: 12, md: 12 }}>
           Elemento: Encabezado
           <HeaderUI/>
           </Grid>

         {/* Alertas */}
         <Grid container justifyContent="right" alignItems="center" size={{ xs: 12}} >
          Elemento: Alertas
          <AlertUI description="No se preveen lluvias"/>
          </Grid>

         {/* Selector*/}
         <Grid size={{ xs: 12, md: 3  }}>Elemento: Selector
            <SelectorUI/>
         </Grid>

         {/* Indicadores */}
         <Grid size={{ xs: 12, md: 9 }}>Elemento: Indicadores</Grid>

         
         {/* Gráfico */}
         <Grid sx={{ display: { xs: "none", md: "block"} }} >Elemento: Gráfico</Grid>

         {/* Tabla */}
         <Grid sx={{ display: { xs: "none", md: "block"} }} >Elemento: Tabla</Grid>

         {/* Información adicional */}
         <Grid>Elemento: Información adicional</Grid>

      </Grid>
  )
}

export default App
