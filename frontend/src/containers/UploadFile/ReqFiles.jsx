import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useState } from "react"
import { reqUpload } from "../../actions/docs"
import { useParams } from "react-router-dom"


const ReqFiles = () => {
    const { idObra } = useParams();
    const [ file, setFile] = useState(null)

    const onSubmit = (e, tipo) => {
        e.preventDefault();
        reqUpload(file, tipo, idObra)
    };

    const onFileChange = (e) => {
        setFile(e.target.files[0]);
        console.log(file);
      };

  return (
    <>
        <Form onSubmit={(e)=> onSubmit(e, 'gantts')}>
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
        <Form onSubmit={(e)=> onSubmit(e, 'presupuestos')}>
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

    </>
  )
}

export default ReqFiles
