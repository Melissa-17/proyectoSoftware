import multer from 'multer';
import fileTest from 'src/tests/fileTest.js';
import { Router } from 'express'; 
import fileGetTest from 'src/tests/getFileTest.js';

//Un file contiene:
//fieldname es el nombre del parametro
//originalname es el nombre del archivo, con extension
//encoding...
//mimetype es el tipo de archivo. confiar en este, no en la extension
//destination es donde se guardara
//filename es el nombre con el que se guardara
//path es la ruta en donde se guardara
//size es el tamanho del archivo en bytes
//buffer, contenido del archivo

//Todos estos anteriores se pueden configurar como:

const storage = multer.memoryStorage({
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
}); 
//el primer parametro de cb es nulo siempre, el segundo es el valor que quieren que tome el parametro
//que estan configurando
//Para añadirlo, incorporarlo como parametro en la variable upload

//FILTRADO POR TIPO DE ARCHIVO
//el parametro mimetype tiene siempre el tipo padre (video, image) y el tipo hijo (mp4, avi, png, jpeg)
//por ejemplo: image/png, video/mp4
//REVISAR DOCUMENTACION DE MULTER PARA SABER LOS TIPOS
const fileFilter = (req, file, cb) => {
    //Este es un filtro fuerte, solo aceptara archivos jpeg
    if(file.mimetype === 'image/jpeg');
    //Este es un filtro de padres, aceptara cualquier archivo de imagen
    //split parte el string al /, resultando en un array de dos elementos ['image', 'jpeg']
    //luego, la logica es la misma:
    if(file.mimetype.split('/')[0] === 'image');

    //Completo, seria:
    if(file.mimetype.split('/')[0] === 'image'){
        cb(null, true);
    }else{
        cb(new Error('Ta mal, tipo incorrecto'), false);
    }
};
//HAY TIPOS DE ERRORES DE MULTER ARPOPIADOS PARA ESTA SITUACION, PUEDEN USAR ESOS, REVISAR LA DOCUMENTACION
//Notese que lo primero es simplemente una comparacion inofensiva de strings, lo importante es el cb(null, false/true)
//En ese sentido, podemos ponerle que verifique lo que sea, tamanho, nombre, incluso cosas no propias del archivo
//Ya paso la fecha limite? ya no puedes editar este archivo mas, cosas asi
//Para incorporar este filtro, lo anhadimos como parametro a nuestra variable upload

//MANEJO DE ERRORES
//LIMITES
//REVISAR DOCUMENTACION, HAY OTRAS COSITAS CHEVERES
const limits = 
{
    fileSize: 200000,
    files: 2
}
//Piensen en esto como filtros automaticos, al que nosotros solo le pasamos un parametro
//tendra un mensaje de error automatico y todo lo chevere
//Para usarlo, solo hay que pasarlo como parametro en nuestra variable uploads
//RECORDAR QUE SE TRABAJA EN BYTES

//En express, tenemos (error, req, res, cb) ENTONCES, SI ES UN ERROR DE MULTER DE LIMITES DE MULTER, se puede hacer:

//if(error instanceof multer.MulterError){
//    if(error.code === 'LIMIT_FILE_SIZE'){
//        return res.send(400, 'tu archivo pesa mucho, ta mal')
//    }
//}

//REVISAR LA DOCUMENTACION PARA TODOS LOS TIPOS DE MULTER ERROR
//Notese que esto iria dentro de un request y que el codigo 400 es es simplemente decir que el cliente
//esta haciendo una mala solicitud (su archivo pesa mucho); pero, pueden poner lo que vean mas apropiado
//ESTO ES SUMAMENTE IMPORTANTE PARA EVITAR CRASHEAR EL SERVIDOR

const upload = multer({ storage: storage, fileFilter, limits });

//Campos para el body
//Este tiene dos campos, un avatar y un resume, ambos aceptan solo 1
//En ese sentido, espera solo un avatar y un solo resume
//Estos son los nombres que debe tener en el body

const multiUpload = upload.fields([
    { name: 'avatar', maxCount: 1},
    { name: 'resume', maxCount: 1}
]);
//RECORDAR QUE TODOS LOS ARCHIVOS EN SI ESTAN EN EL BODY DE LA REQUEST
//Esta como multiples objetos, como arreglos, aunque el max count sea 1


const testFileRouter = Router();

testFileRouter.post("/1", multiUpload, fileTest);

//const _upload = multer({ dest: "uploads/" , fileFilter, limits });

//const _multiUpload = _upload.fields([
//   { name: "avatar", maxCount: 1 },
//   { name: "resume", maxCount: 1 },
//]);

const _upload = multer({ storage: storage });

testFileRouter.post("/2", _upload.single('file'), fileTest);
testFileRouter.get("/3", fileGetTest);

export default testFileRouter;