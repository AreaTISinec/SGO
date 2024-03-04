import axios from "axios"
import swal from 'sweetalert2';


export const uploadCene = async (id_cene, nombre, empresa) => {
    console.log('holamundo')
    const body = JSON.stringify({
        id_cene, nombre, empresa
    })
    const config = {
      headers: {
          'Content-Type': 'application/json'
      },
  };

    try {
      const res = await axios.post('https://sgo-django.azurewebsites.net/api/cene/new/', body, config)
      console.log(res)
      swal.fire({
        title: "Nuevo cene creado exitosamente",
        icon: "success",
        toast: true,
        timer: 4000,
        position: 'top-right',
        timerProgressBar: true,
        showConfirmButton: false,
    })
    }catch(err){
        console.error(err)
        swal.fire({
            title: "Error al crear el cene",
            icon: "error",
            toast: true,
            timer: 4000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
          })
    }

};