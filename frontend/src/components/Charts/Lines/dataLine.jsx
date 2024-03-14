/* eslint-disable react/prop-types */
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
  
  import { Line } from 'react-chartjs-2'
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    )

const CurvaS = ({ avances }) => {


  const avancesReales = avances.filter(avance => avance.tipo === 'real')
  const avancesProyectados = avances.filter(avance => avance.tipo === 'proyectado')

  const labels = Array.from(new Set([...avancesReales.map(avance => avance.fecha), ...avancesProyectados.map(avance => avance.fecha)]));

  const labelsOrdenadas = labels.sort((a,b)=> new Date(a).getTime() > new Date(b).getTime())

  let valorRealAnterior = 0;
  let valorProyectadoAnterior = 0
  const valoresReales = [];
  const valoresProyectados = [];
  


  // Rellenar los valores para cada fecha
  labelsOrdenadas.forEach(fecha => {
    // Buscar el valor correspondiente en los avances reales
    const avanceReal = avancesReales.find(avance => avance.fecha === fecha);
    if (avanceReal) {
      valorRealAnterior = avanceReal.porcentaje
    }
    valoresReales.push(valorRealAnterior)

    // Buscar el valor correspondiente en los avances proyectados
    const avanceProyectado = avancesProyectados.find(avance => avance.fecha === fecha);
    if (avanceProyectado) {
      valorProyectadoAnterior = avanceProyectado.porcentaje
    } 
    valoresProyectados.push(valorProyectadoAnterior)
  });

  // const labelsReales = avancesReales.map(avance => avance.fecha)
  // const valoresReales = avancesReales.map(avance => avance.porcentaje)

  // const labelsProyectados = avancesProyectados.map(avance => avance.fecha)
  // const valoresProyectados = avancesProyectados.map(avance => avance.porcentaje)

  // console.log("Reales: ", avancesReales)
  // console.log("Proyectados: ", avancesProyectados)

  // console.log("labels y valor real: ", labelsReales, valoresReales)
  // console.log("labels y valor proyectado: ", labelsProyectados, valoresProyectados)
  


  
  

  const data = {
      labels: labelsOrdenadas,
      datasets: [
        {
          label: 'Proyectado',
          data: valoresProyectados,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Real',
          data: valoresReales,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    };
  
  
  const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Curva S',
        },
      },
    };
  
  
  return (
      <>
          <Line data={data}  options={options} />
      </>
  )
}

export default CurvaS





