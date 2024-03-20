import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useEffect, useState } from "react"
import { reqUpload } from "../../actions/docs"
import { useNavigate, useParams } from "react-router-dom"
import "./UploadFile.css"
import SidebarV2 from "../../components/SidebarV2/SidebarV2"
import { getDetalleObra } from "../../actions/getPetitions"


const ReqFiles = () => {
  const { idObra } = useParams();
  const [detalleObra, setDetalleObra] = useState({})
  const [ file, setFile] = useState(null)
  const [gantt, setGantt] = useState(false)
  const [presupuesto, setPresupuesto] = useState(false)
  const [cubicacion, setCubicacion] = useState(false)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e, tipo) => {
      e.preventDefault();
      if(tipo == 'gantt'){
        try {
          setLoading(true)
          await reqUpload(file, tipo, idObra)
          setGantt(true)
        } catch (error) {
          console.error
        }finally{
          setLoading(false)
        }
      }else if(tipo == 'presupuesto'){
        try {
          setLoading(true)
          await reqUpload(file, tipo, idObra)
          setPresupuesto(true)
          
        } catch (error) {
            console.error
        }finally{
            setLoading(false)
        }
      }else{
        try{
          setLoading(true)
          await reqUpload(file, tipo, idObra)
          setCubicacion(true)
        }catch(err){
          console.log(err)
        }finally{
          setLoading(false)
        }
      }
  };

  const onFileChange = (e) => {
      setFile(e.target.files[0]);
    };

  const navigate = useNavigate()
  
  useEffect(()=>{
    getDetalleObra(idObra, setDetalleObra)
    if(gantt && presupuesto && cubicacion)
        navigate(-1)

  },[gantt, presupuesto, cubicacion])

  useEffect(()=>{
    if(detalleObra && detalleObra.is_gantt) 
      setGantt(true)
    if(detalleObra && detalleObra.is_presupuesto)
      setPresupuesto(true)
    if(detalleObra && detalleObra.is_cubicacion)
      setCubicacion(true)
  }, [detalleObra])
    

  return (
    <div className="UploadContainer">
    <SidebarV2 />
      <div className="RecuadroUploadFiles">

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
            <Button
              variant="outline-secondary" 
              className='m-1'  
              type="submit" 
              disabled={loading} 
              onClick={(e) => {e.preventDefault(); setGantt(true)}}
            >
            Omitir
          </Button>
            <Button variant="danger" type="submit" disabled={loading}>
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
          <Button 
            variant="outline-secondary" 
            className='m-1'  
            type="submit" 
            disabled={loading} 
            onClick={(e) => {e.preventDefault(); setPresupuesto(true)}}
          >
            Omitir
          </Button>
          <Button variant="danger" type="submit" disabled={loading}>
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
          <Button 
            variant="outline-secondary" 
            className='m-1'  
            type="submit" 
            disabled={loading} 
            onClick={(e) => {e.preventDefault();setCubicacion(true)}}
          >
            Omitir
          </Button>
          <Button variant="danger" type="submit" disabled={loading}>
            Subir archivo
          </Button>

        </Form>
        :
        <>
        </>
      }
      </div>
    
    

    </div>
  )
}

export default ReqFiles
