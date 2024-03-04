import axios from "axios"
import swal from 'sweetalert2';

export const uploadObra = async (
    //REQUERIDOS
    empresa, 
    cliente, 
    nombre,
    presupuesto, 
    porc_avance_financiero,  //debiesen iniciar en 0, en una obra nueva
    porc_avance_operativo,
    estado_obra,
    fecha_inicio, 
    fecha_termino, 
    fecha_asignacion, 
    direccion, 
    comuna, 
    tipo_obra,
    //RELLENO
    responsable,
    supervisor,
    cene,
    observaciones,
    monto_facturado,
    monto_por_facturar,
    is_gantt,
    is_presupuesto,
    is_avance
    ) => {
    const body = JSON.stringify({
        //REQUIRED
        empresa, 
        cliente, 
        nombre,
        presupuesto, 
        porc_avance_financiero,
        porc_avance_operativo,
        estado_obra,
        fecha_inicio, 
        fecha_termino, 
        fecha_asignacion, 
        direccion, 
        comuna, 
        tipo_obra,
        //RELLENO
        responsable,
        supervisor,
        cene,
        observaciones,
        monto_facturado,
        monto_por_facturar,
        is_gantt,
        is_presupuesto,
        is_avance
    })


    const config = {
      headers: {
          'Content-Type': 'application/json'
      },
  };

    try {
        const res = await axios.post('https://sgo-django.azurewebsites.net/api/obras/nueva/', body, config)
        swal.fire({
            title: "Nueva obra creada exitosamente",
            icon: "success",
            toast: true,
            timer: 4000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
        })
        return res
    }catch(err){
        console.error(err)
        swal.fire({
            title: "Error al crear la obra",
            icon: "error",
            toast: true,
            timer: 4000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
          })
        throw err
    }

};