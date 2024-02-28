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
      const res = await axios.post('http://127.0.0.1:8000/api/files/upload/', formData, config)
      console.log(res)

  }catch(err){
    console.error(err)
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
    const res = await axios.post('http://127.0.0.1:8000/api/files/upload/', formData, config)
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
    console.error(err)
    swal.fire({
      title: "Error al cargar el documento",
      icon: "error",
      toast: true,
      timer: 4000,
      position: 'top-right',
      timerProgressBar: true,
      showConfirmButton: false,
    })
  }
};