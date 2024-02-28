import axios from "axios"


export const uploadObra = async (
    //REQUERIDOS
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
    id_responsable,
    id_supervisor,
    id_cene
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
        id_responsable,
        id_supervisor,
        id_cene
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