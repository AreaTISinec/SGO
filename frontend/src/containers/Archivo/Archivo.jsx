import { useState } from "react"
import { upload_xlxs } from "../../actions/files"

const Archivo = () => {
    const [file, setFile] = useState()

    const onChange = e => setFile({...file, [e.target.name]: e.target.value})

    const onSubmit = e => {
        e.preventDefault();
        console.log(e)
        upload_xlxs(e)
    }

    return (
        <div>
        <form onSubmit={e => onSubmit(e)} method="POST" encType="multipart/form-data"> 
            <h4>Seleciona un archivo: </h4> 
            <input type="file" name="uploadfile" onChange={e=>onChange(e)}/> <br/><br/> 
            <input type="submit" value="Upload File"/> 
        </form>
        </div>
    )
}

export default Archivo
