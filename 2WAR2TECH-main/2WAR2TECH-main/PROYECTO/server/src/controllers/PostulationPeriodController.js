import PostulationPeriodModel from '#Models/PostulationPeriodModel.js';
import { Op } from 'sequelize';

const getPostulationPeriodBySpeciality = async (req, res) => {
    //Espera un par de parametros en el url, tal como:
    //http://localhost:port/postulation-period

    const idPostulation_Period = await PostulationPeriodModel.findOne({
        where:{
            "SPECIALTYId": {
                [Op.eq]: res.locals.userSpecialtyId,
            },
            "status" : {
                [Op.eq]: "HABILITADO"
            }
        },
        subQuery: false,
        order: [ ['updatedAt', 'DESC'], ['createdAt', 'DESC'] ],
    });
    if(!idPostulation_Period){
        return res.status(404).send({
            errorMessage: `No esta habilitada alguna fecha de postulacion para la especialidad.`
        });
    }

    return res.status(200).send(idPostulation_Period);
}

const getPostulationPeriodBySpecialityAndName = async (req, res) => {
    //Espera un par de parametros en el url, tal como:
    //http://localhost:port/postulation-period/:type   
    //type puede ser propuesta o solicitud

    const idPostulation_Period = await PostulationPeriodModel.findOne({
        where:{
            "SPECIALTYId": {
                [Op.eq]: res.locals.userSpecialtyId,
            },
            "status" : {
                [Op.eq]: "HABILITADO"
            },
            "name" : {
                [Op.like]: req.params.type, //propuesta o solicitud
            },
        },
        subQuery: false,
        order: [ ['updatedAt', 'DESC'], ['createdAt', 'DESC'] ],
    });
    if(!idPostulation_Period){
        return res.status(404).send({
            errorMessage: `No esta habilitada alguna fecha de postulacion para la especialidad.`
        });
    }

    return res.status(200).send(idPostulation_Period);
}

const addPostulationPeriodBySpeciality = async (req, res) => {
    /*
    Se espera un body así: (formato: "aaaa-mm-dd")
    {
        "tipo" : "solicitud",
        "startDate": "2022-09-18",
        "endDate": "2022-09-30"
    }
    */
    const idPostulation_Period = await PostulationPeriodModel.findOne({
        where:{
            "SPECIALTYId": {
                [Op.eq]: res.locals.userSpecialtyId,
            },
            "status" : {
                [Op.eq]: "HABILITADO"
            },
            "name" : {
                [Op.eq]: req.body.tipo
            }

        }
    });
    if(idPostulation_Period){
        idPostulation_Period.status = "DESHABILITADO";
        idPostulation_Period.name = req.body.tipo;
        await idPostulation_Period.save();
    }

    const newPeriodPostulation = PostulationPeriodModel.build();
    newPeriodPostulation.startDate = req.body.startDate;
    newPeriodPostulation.endDate = req.body.endDate;
    newPeriodPostulation.status = "HABILITADO";
    newPeriodPostulation.name = req.body.tipo;

    // console.log(JSON.stringify(res.locals, null, 2));

    newPeriodPostulation.SPECIALTYId = res.locals.userSpecialtyId;
    await newPeriodPostulation.save();

    return res.status(201).send(`Se ha habilitado el período de postulación correctamente.`)
}

const editPostulationPeriodBySpeciality = async (req, res) => { //Deshabilitar un período de postulación
    /*
    Se espera un body así: (formato: "aaaa-mm-dd")
    {
        "tipo" : "solicitud",
        "startDate": "2022-09-18",
        "endDate": "2022-09-30"
    }
    */
   let fechas = {
        desde: new Date(req.body.startDate),
        hasta: new Date(req.body.endDate)
   }

   
    const idPostulation_Period = await PostulationPeriodModel.findOne({
        where:{
            "SPECIALTYId": {
                [Op.eq]: res.locals.userSpecialtyId,
            },
            "startDate": {
                [Op.eq]: fechas.desde,
            },
            "endDate": {
                [Op.eq]: fechas.hasta,
            },
            "status" : {
                [Op.eq]: "HABILITADO"
            },
            "name" : {
                [Op.like]: req.body.tipo, //propuesta o solicitud
            },
        }
    });
    
    if(idPostulation_Period){
        idPostulation_Period.status = "DESHABILITADO";
        await idPostulation_Period.save();
        return res.status(200).send(`Se ha deshabilitado el período de postulación correctamente.`)
    }
    else{
        return res.status(404).send(`No existe un período de postulación habilitado que cumpla con dicho rango de fechas.`)
    }
}

export { getPostulationPeriodBySpeciality , addPostulationPeriodBySpeciality , editPostulationPeriodBySpeciality,
    getPostulationPeriodBySpecialityAndName };