import axios from "axios"


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
    responsable,
    //RELLENO
    responsable_id,
    supervisor_id,
    cene_id,
    observaciones,
    monto_facturado,
    monto_por_facturar
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
        responsable,
        //RELLENO
        responsable_id,
        supervisor_id,
        cene_id,
        observaciones,
        monto_facturado,
        monto_por_facturar
    })
    console.log(body)


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