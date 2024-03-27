import axios from "axios"

export const upload_xlxs = async ( file )   => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
        const res = await axios.post('https://sgo-django.azurewebsites.net/api/ventas/upload/file/', formData, config)
        console.log(res)
    }catch(err){
        console.error(err)
    }
}
export const uploadForm = async (nombre_doc,num_doc,cod_cliente,nom_cliente,fecha,fecha_venc,desc_producto,total_detalle,analisis_cn,comentario,linea,empresa,precio_unit,total_neto,es_venta) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({
        nombre_doc,num_doc,cod_cliente,nom_cliente,fecha,fecha_venc,desc_producto,total_detalle,analisis_cn,comentario,linea,empresa,precio_unit,total_neto,es_venta
    })

    try {
        const res = await axios.post('https://sgo-django.azurewebsites.net/api/ventas/upload/form/', body, config)
        console.log(res)
    } catch (error) {
        console.error(error)
    }
}
