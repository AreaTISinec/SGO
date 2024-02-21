import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useState } from "react"
import { reqUpload } from "../../actions/docs"
import { useNavigate, useParams } from "react-router-dom"


const ReqFiles = () => {
    const { idObra } = useParams();
    const [ file, setFile] = useState(null)
    const [gantt, setGantt] = useState(false)
    const [presupuesto, setPresupuesto] = useState(false)
    const [cubicacion, setCubicacion] = useState(false)

    const onSubmit = (e, tipo) => {
        e.preventDefault();
        if(tipo == 'gantt'){
          reqUpload(file, tipo, idObra)
          setGantt(true)
        }else if(tipo == 'presupuesto'){
          reqUpload(file, tipo, idObra)
          setPresupuesto(true)
        }else{
          reqUpload(file, tipo, idObra)
          setCubicacion(true)
        }
    };

    const onFileChange = (e) => {
        setFile(e.target.files[0]);
        console.log(file);
      };

  const navigate = useNavigate()
    
  if(gantt && presupuesto && cubicacion)
      navigate(-1)

  return (
    <> 
    
      { !gantt ? 
        <Form onSubmit={(e)=> onSubmit(e, 'gantt')}>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Carta Gantt</Form.Label>
            <Form.Control
              type="file"
              name="doc"
              onChange={(e) => onFileChange(e)}
            />
          </Form.Group>
          <Button variant="danger" type="submit">
            Subir archivo
          </Button>

        </Form>
      :
      <>
      </>
    }
    { !presupuesto ? 
      <Form onSubmit={(e)=> onSubmit(e, 'presupuesto')}>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Presupuesto</Form.Label>
          <Form.Control
            type="file"
            name="doc"
            onChange={(e) => onFileChange(e)}
          />
        </Form.Group>
        <Button variant="danger" type="submit">
          Subir archivo
        </Button>
      </Form>
      :
      <>
      </>
    }
    { !cubicacion ? 
      <Form onSubmit={(e)=> onSubmit(e, 'cubicacion')}>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Cubicacion</Form.Label>
          <Form.Control
            type="file"
            name="doc"
            onChange={(e) => onFileChange(e)}
          />
        </Form.Group>
        <Button variant="danger" type="submit">
          Subir archivo
        </Button>

      </Form>
      :
      <>
      </>
    }
    

    </>
  )
}

export default ReqFiles
