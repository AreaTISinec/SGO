export const dataObras = (adjudicada, ejecucion, paralizada, ejecutada, finalizada, na) => ({
    labels: ['Adjudicada', 'En Ejecucion', 'Paralizada', 'Ejecutada', 'Finalizada', 'N-A'],
    datasets: [
      {
        label: 'Numero de obras',
        data: [adjudicada, ejecucion, paralizada, ejecutada, finalizada, na],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  });

export const dataPorc = (operativo, financiero) => ({
  labels: ['Operativo', 'Financiero'],
  datasets: [
    {
      label: '% avance promedio',
      data: [operativo, financiero],
      backgroundColor: [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
      ],
      borderWidth: 1,
    },
  ],
});

export const dataFacturacion = {
  labels: ['Proyectado', 'Pendiente', 'Facturado'],
  datasets: [
    {
      label: 'Pesos $ ',
      data: [600210354, 99994934, 500215420],
      backgroundColor: [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
      ],
      borderWidth: 1,
    },
  ],
};