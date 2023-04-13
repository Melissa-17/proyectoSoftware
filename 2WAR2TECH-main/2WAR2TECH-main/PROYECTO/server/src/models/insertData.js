import { 
  AssignmentModel, 
  AssignmentTaskModel, 
  AssignmentXStudentModel, 
  AssignmentXStudentXRevisorModel, 
  CourseXSemesterModel,
  CalificationModel, 
  CommentModel,
  CourseModel,
  FacultyModel,
  FileModel,
  LevelCriteriaModel,
  ReunionModel,
  RoleModel,
  RubricCriteriaModel,
  RubricModel,
  SemesterModel,
  SpecialtyModel,
  ThesisModel,
  UserModel
} from '#Models/index.js';


//Creando facultades

await FacultyModel.create({name: "CIENCIAS E INGENIERÍA"});
await FacultyModel.create({name: "ADMINISTRACIÓN Y CONTABILIDAD"});
await FacultyModel.create({name: "ARQUITECTURA Y URBANISMO"});
await FacultyModel.create({name: "ARTE"});
await FacultyModel.create({name: "CIENCIAS Y ARTE DE LA COMUNICACIÓN"});
await FacultyModel.create({name: "CIENCIAS SOCIALES"});
await FacultyModel.create({name: "DERECHO"});
await FacultyModel.create({name: "EDUCACIÓN"});
await FacultyModel.create({name: "GESTIÓN Y ALTA DIRECCIÓN"});
await FacultyModel.create({name: "LETRAS Y CIENCIAS HUMANAS"});

//Creando especialidades
await SpecialtyModel.create({name: "ESTADÍSTICA" });
await SpecialtyModel.create({name: "FÍSICAS" });
await SpecialtyModel.create({name: "MATEMÁTICAS" });
await SpecialtyModel.create({name: "QUÍMICA" });
await SpecialtyModel.create({name: "INGENIERÍA AMBIENTAL Y SOSTENIBLE" });
await SpecialtyModel.create({name: "INGENIERÍA BIOMÉDICA" });
await SpecialtyModel.create({name: "INGENIERÍA CIVIL" });
await SpecialtyModel.create({name: "INGENIERÍA DE LAS TELECOMUNICACIONES" });
await SpecialtyModel.create({name: "INGENIERÍA DE MINAS" });
await SpecialtyModel.create({name: "INGENIERÍA ELECTRÓNICA" });
await SpecialtyModel.create({name: "INGENIERÍA GEOLÓGICA" });
await SpecialtyModel.create({name: "INGENIERÍA INDUSTRIAL" });
await SpecialtyModel.create({name: "INGENIERÍA INFORMATICA" });
await SpecialtyModel.create({name: "INGENIERÍA MECÁNICA" });
await SpecialtyModel.create({name: "INGENIERÍA MECATRÓNICA" });

console.log("Done");