import axios from "axios"

export const upload = async (doc, nombre, tipo, id) => {
    console.log('holamundo')
    const formData = new FormData();
    formData.append("doc", doc);
    formData.append("nombre", nombre);
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

}catch(err){
  console.error(err)
  }

};