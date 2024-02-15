import axios from "axios"


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
        return res
    }catch(err){
        console.error(err)
        throw err
    }

};