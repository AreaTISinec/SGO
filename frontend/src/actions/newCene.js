import axios from "axios"


export const uploadCene = async (id_cene, nombre) => {
    console.log('holamundo')
    const body = JSON.stringify({
        id_cene, nombre
    })

    const config = {
      headers: {
          'Content-Type': 'application/json'
      },
  };

    try {
      const res = await axios.post('http://127.0.0.1:8000/api/cene/new/', body, config)
    }catch(err){
        console.error(err)
    }

};