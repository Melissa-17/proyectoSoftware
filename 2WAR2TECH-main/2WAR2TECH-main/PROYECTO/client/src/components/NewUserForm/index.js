import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import '#Styles/Button/Button.css';

import axios from 'axios';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CONFIG_URI = 'http://localhost:3001/config';

const selectListOptions = (list, name, id) => {
    return list.map(e => 
        <option value={e[id]}>{e[name]}</option>
    );
}

const NewUserForm = () => {

    //Valores
    const [formValue, setFormValue] = useState({
        names: '',
        fLastName: '',
        mLastName: '',
        idPUCP: '',
        email: '',
        telephone: '',
        idSpecialty: '',
        password: '',
        reg_date: '',
    });

    const handleSubmit = async() => {
        formValue.reg_date = new Date().toLocaleString();
        await axios.post(CONFIG_URI+'/createnewuser', formValue);
    }

    // const handleSubmit = async() => {
    //     // store the states in the form data
    //     const loginFormData = new FormData();
    //     loginFormData.append("names", formValue.names);
    //     loginFormData.append("fLastName", formValue.fLastName);
    //     loginFormData.append("mLastName", formValue.mLastName);
    //     loginFormData.append("idPUCP", formValue.idPUCP);
    //     loginFormData.append("email", formValue.email);
    //     loginFormData.append("telephone", formValue.telephone);
    //     loginFormData.append("idSpecialty", formValue.idSpecialty);
    //     loginFormData.append("reg_date", new Date().toLocaleString());
      
    //     try {
    //       // make axios post request
    //       const response = await axios({
    //         method: "post",
    //         url: URI + '/createnewuser',
    //         data: loginFormData,
    //         headers: { "Content-Type": "multipart/form-data" },
    //       });
    //     } catch(error) {
    //       console.log(error)
    //     }
    //   }

    const handleChange = (event) => {
        setFormValue({
          ...formValue,
          [event.target.name]: event.target.value
        });
      }

    //Facultades
    const [faculties, setFaculties] = useState([]);
    const getFaculties = async () => {
        const res = await axios.get(CONFIG_URI + '/faculties', {
            withCredentials: "true",
            responseType: "json"
        });
        setFaculties(res.data);
    }

    useEffect( () => {
        getFaculties();
    }, []);


    
    //Especialidades
    const [specialties, setSpecialties] = useState([]);
    useEffect( () => {
        getSpecialties()
    }, []);


    const getSpecialties = async () => {
        const res = await axios.get(CONFIG_URI + '/specialties', {
            withCredentials: "true",
            responseType: "json"
        });
        setSpecialties(res.data);
    }
    //Roles
    const [roles, setRoles] = useState([]);
    useEffect( () => {
        getRoles()
    }, []);


    const getRoles = async () => {
        const res = await axios.get(CONFIG_URI + '/roles', {
            withCredentials: "true",
            responseType: "json"
        });
        setRoles(res.data);
    }
    //Cursos
    const [courses, setCourses] = useState([]);
    useEffect( () => {
        getCourses()
    }, []);


    const getCourses = async () => {
        const res = await axios.get(CONFIG_URI + '/courses', {
            withCredentials: "true",
            responseType: "json"
        });
        setCourses(res.data);
    }

    const logoutSession = async () => {
        window.open(CONFIG_URI+'/test-user/logout', "_self");
    }

    return (
        
        <Form onSubmit={handleSubmit} className="d-flex w-75 flex-column">

<div  className="header align-self-start w-100">
            <div className="d-flex flex-column">
                <div className="d-flex justify-content-between"> 
                    <p className="text-uppercase mb-0 mt-2 ms-5">
                        REGISTRO DE USUARIO
                    </p>
                    <Button className="mx-5 my-3 px-5 btn-logout" variant="primary" type="button" onClick={logoutSession}>
                        Logout
                    </Button>
                </div>
                <hr className="mb-5"></hr>
            </div>
            
        </div>
            
            <Container>
                <Row>
                    <Col>
                    <Form.Group className="mb-3 d-flex flex-column" controlId="formBasicName">
                        <Form.Label className="align-self-start fw-bold">Nombre *</Form.Label>
                        <Form.Control type="text" name="names" placeholder="" value={formValue.names} onChange={handleChange}/>
                    </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group className="mb-3 d-flex flex-column" controlId="formBasicSurname">
                        <Form.Label className="align-self-start fw-bold">Apellido Paterno *</Form.Label>
                        <Form.Control type="text" name="fLastName" placeholder="" value={formValue.fLastName} onChange={handleChange}/>
                    </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Form.Group className="mb-3 d-flex flex-column" controlId="formBasicSecondSurname">
                        <Form.Label className="align-self-start fw-bold">Apellido Materno *</Form.Label>
                        <Form.Control type="text" name="mLastName" placeholder="" value={formValue.mLastName} onChange={handleChange}/>
                    </Form.Group>
                    </Col>

                    <Col>
                    <Form.Group className="mb-3 d-flex flex-column" controlId="formBasicCode">
                        <Form.Label className="align-self-start fw-bold">Código *</Form.Label>
                        <Form.Control type="text" name="idPUCP" placeholder="" value={formValue.idPUCP} onChange={handleChange}/>
                    </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                    <Form.Group className="mb-3 d-flex flex-column" controlId="formBasicEmail">
                        <Form.Label className="align-self-start fw-bold">Email *</Form.Label>
                        <Form.Control type="text" name="email" placeholder="" value={formValue.email} onChange={handleChange}/>
                    </Form.Group>
                    </Col>

                    <Col>
                    <Form.Group className="mb-3 d-flex flex-column" controlId="formBasicTelephone">
                        <Form.Label className="align-self-start fw-bold">Teléfono *</Form.Label>
                        <Form.Control type="text" name="telephone" placeholder="" value={formValue.telephone} onChange={handleChange}/>
                    </Form.Group>
                    </Col>
                </Row>
                

                <Row>
                    <Col>
                    <Form.Group className="mb-3 d-flex flex-column">
                        <Form.Label htmlFor="facultySelect" className="align-self-start  fw-bold">Facultad</Form.Label>
                        <Form.Select id="facultySelect" name="idFaculty" aria-label="Faculty"  onChange={handleChange}>
                            <option value="0" selected="selected">Seleccione una facultad...</option>
                            {selectListOptions(faculties, 'name', 'idFaculty')}
                        </Form.Select>
                    </Form.Group>
                    </Col>

                    <Col>
                    <Form.Group className="mb-3 d-flex flex-column">   
                        <Form.Label htmlFor="roleSelect" className="align-self-start fw-bold">Roles</Form.Label>
                        <Form.Select id="roleSelect" name="Roles" aria-label="Role"  onChange={handleChange}>
                            <option value="0" selected="selected">Seleccione un rol...</option>
                            {selectListOptions(roles, 'description', 'idRole')}
                        </Form.Select>
                    </Form.Group>
                    </Col>
                </Row>
                
                
                <Row>
                    <Col>
                    <Form.Group className="mb-3 d-flex flex-column">
                        <Form.Label htmlFor="specialtySelect" className="align-self-start fw-bold">Especialidad</Form.Label>
                        <Form.Select id="specialtySelect" name="idSpecialty" aria-label="Specialty"  onChange={handleChange}>
                            <option value="Specialty" selected="selected">Seleccione una especialidad...</option>
                            {selectListOptions(specialties, 'name', 'idSpecialty')}
                        </Form.Select>
                    </Form.Group>
                    </Col>
                
                    <Col>
                    <Form.Group className="mb-3 d-flex flex-column">
                        <Form.Label htmlFor="courseSelect" className="align-self-start fw-bold">Curso</Form.Label>
                        <Form.Select id="courseSelect" name="idCourse" aria-label="Course"  onChange={handleChange}>
                            <option value="0" selected="selected">Seleccione un curso...</option>
                            {selectListOptions(courses, 'name', 'idCourse')}
                        </Form.Select>
                    </Form.Group>
                    </Col>
                </Row>

                <div className="d-flex justify-content-end">
                    <Button className="mx-3 px-5 btn-cancel" variant="secondary" type="cancel">
                        Cancelar
                    </Button>

                    <Button className="mx-3 px-5 btn-save" variant="primary" type="submit">
                        Guardar
                    </Button>
                </div>
            

            </Container>
        </Form>
    );
};

export default NewUserForm;
