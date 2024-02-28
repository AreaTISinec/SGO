import axios from "axios"
import swal from 'sweetalert2';

export const uploadObra = async (fecha_inicio, fecha_termino, fecha_asignacion, monto_neto, empresa, direccion, comuna, tipo_obra, estado_obra, observaciones, porc_avance, monto_facturado, saldo_facturado, id_user, id_cene) => {
    console.log('holamundo')
    const body = JSON.stringify({
        fecha_inicio, 
        fecha_termino, 
        fecha_asignacion, 
        monto_neto, 
        empresa, 
        direccion, 
        comuna, 
        tipo_obra, 
        estado_obra, 
        observaciones, 
        porc_avance, 
        monto_facturado, 
        saldo_facturado, 
        id_user,
        id_cene
    })


    const config = {
      headers: {
          'Content-Type': 'application/json'
      },
  };

    try {
        const res = await axios.post('http://127.0.0.1:8000/api/obras/nueva/', body, config)
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