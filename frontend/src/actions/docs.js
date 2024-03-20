import axios from "axios"
import swal from 'sweetalert2';

export const upload = async (doc, tipo, id) => {
    const formData = new FormData();
    formData.append("doc", doc);
    formData.append("tipo", tipo);
    formData.append("id_obra", id);

    const config = {
      headers: {
          'Content-Type': 'multipart/form-data'
      },
  };
  
    try {
      const res = await axios.post('https://sgo-django.azurewebsites.net/api/files/upload/', formData, config)
      console.log(res)
      swal.fire({
        title: "Documento cargado correctamente",
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
      title: "Error al cargar el documento",
      text: `${err.message}`,
      icon: "error",
      toast: true,
      timer: 4000,
      position: 'top-right',
      timerProgressBar: true,
      showConfirmButton: false,
    })
    }
};

export const reqUpload = async (doc,tipo, id) => {
  const formData = new FormData();
  formData.append("doc", doc);
  formData.append("tipo", tipo);
  formData.append("id_obra", id);

  const config = {
    headers: {
        'Content-Type': 'multipart/form-data'
    },
  };

  try {
    const res = await axios.post('https://sgo-django.azurewebsites.net/api/files/upload/', formData, config)
    console.log(res)
    swal.fire({
      title: "Documento cargado correctamente",
      icon: "success",
      toast: true,
      timer: 4000,
      position: 'top-right',
      timerProgressBar: true,
      showConfirmButton: false,
  })
  } catch(err) {
    swal.fire({
      title: "Error al cargar el documento",
      icon: "error",
      text: `${err.response.request.responseText}`,
      toast: true,
      timer: 4000,
      position: 'top-right',
      timerProgressBar: true,
      showConfirmButton: false,
    })
  }
};