#Insertando facultades
INSERT INTO wartech.FACULTY (name,createdAt,updatedAt,deletedAt) VALUES
	 ('CIENCIAS E INGENIERÍA','2022-09-29 15:05:20','2022-09-29 15:05:20',NULL),
	 ('ADMINISTRACIÓN Y CONTABILIDAD','2022-09-29 15:05:21','2022-09-29 15:05:21',NULL),
	 ('ARQUITECTURA Y URBANISMO','2022-09-29 15:05:22','2022-09-29 15:05:22',NULL),
	 ('ARTE','2022-09-29 15:05:22','2022-09-29 15:05:22',NULL),
	 ('CIENCIAS Y ARTE DE LA COMUNICACIÓN','2022-09-29 15:05:22','2022-09-29 15:05:22',NULL),
	 ('CIENCIAS SOCIALES','2022-09-29 15:05:22','2022-09-29 15:05:22',NULL),
	 ('DERECHO','2022-09-29 15:05:22','2022-09-29 15:05:22',NULL),
	 ('EDUCACIÓN','2022-09-29 15:05:22','2022-09-29 15:05:22',NULL),
	 ('GESTIÓN Y ALTA DIRECCIÓN','2022-09-29 15:05:22','2022-09-29 15:05:22',NULL),
	 ('LETRAS Y CIENCIAS HUMANAS','2022-09-29 15:05:22','2022-09-29 15:05:22',NULL);

#Insertando especialidades
INSERT INTO wartech.SPECIALTY (name,createdAt,updatedAt,deletedAt,FACULTYId) VALUES
	 ('ESTADÍSTICA','2022-09-29 16:58:29','2022-09-29 16:58:29',NULL,1),
	 ('FÍSICAS','2022-09-29 16:58:30','2022-09-29 16:58:30',NULL,1),
	 ('MATEMÁTICAS','2022-09-29 16:58:30','2022-09-29 16:58:30',NULL,1),
	 ('QUÍMICA','2022-09-29 16:58:30','2022-09-29 16:58:30',NULL,1),
	 ('INGENIERÍA AMBIENTAL Y SOSTENIBLE','2022-09-29 16:58:30','2022-09-29 16:58:30',NULL,1),
	 ('INGENIERÍA BIOMÉDICA','2022-09-29 16:58:30','2022-09-29 16:58:30',NULL,1),
	 ('INGENIERÍA CIVIL','2022-09-29 16:58:31','2022-09-29 16:58:31',NULL,1),
	 ('INGENIERÍA DE LAS TELECOMUNICACIONES','2022-09-29 16:58:31','2022-09-29 16:58:31',NULL,1),
	 ('INGENIERÍA DE MINAS','2022-09-29 16:58:31','2022-09-29 16:58:31',NULL,1),
	 ('INGENIERÍA ELECTRÓNICA','2022-09-29 16:58:31','2022-09-29 16:58:31',NULL,1);
INSERT INTO wartech.SPECIALTY (name,createdAt,updatedAt,deletedAt,FACULTYId) VALUES
	 ('INGENIERÍA GEOLÓGICA','2022-09-29 16:58:31','2022-09-29 16:58:31',NULL,1),
	 ('INGENIERÍA INDUSTRIAL','2022-09-29 16:58:32','2022-09-29 16:58:32',NULL,1),
	 ('INGENIERÍA INFORMATICA','2022-09-29 16:58:32','2022-09-29 16:58:32',NULL,1),
	 ('INGENIERÍA MECÁNICA','2022-09-29 16:58:32','2022-09-29 16:58:32',NULL,1),
	 ('INGENIERÍA MECATRÓNICA','2022-09-29 16:58:32','2022-09-29 16:58:32',NULL,1);

#Insertando cursos
INSERT INTO wartech.COURSE (name,credits,createdAt,updatedAt,deletedAt,SPECIALTYId) VALUES
	 ('TESIS1',2,'2022-09-29 16:58:30','0000-00-00 00:00:00',NULL,13),
	 ('TESIS2',2,'2022-09-29 16:58:30','0000-00-00 00:00:00',NULL,13);

#Insertando semestres
INSERT INTO wartech.SEMESTER (name,abbreviation,createdAt,updatedAt,deletedAt,SPECIALTYId) VALUES
	 ('PrimerCiclo_2021','2021-1','2022-09-29 16:58:30','0000-00-00 00:00:00',NULL,13),
	 ('SegundoCiclo_2021','2021-2','2022-09-29 16:58:30','0000-00-00 00:00:00',NULL,13),
	 ('VeranoCiclo_2021','2022-0','2022-09-29 16:58:30','0000-00-00 00:00:00',NULL,13),
	 ('PrimerCiclo_2021_2022','2022-1','2022-09-29 16:58:30','0000-00-00 00:00:00',NULL,13),
	 ('SegundoCiclo_2022','2022-2','2022-09-29 16:58:30','0000-00-00 00:00:00',NULL,13);

#Insertando curso x semestre
INSERT INTO wartech.COURSE_X_SEMESTER (numberOfThesis,createdAt,updatedAt,deletedAt,COURSEId,SEMESTERId) VALUES
	 (0,'2022-09-29 16:58:30','0000-00-00 00:00:00',NULL,1,5),
	 (0,'2022-09-29 16:58:30','0000-00-00 00:00:00',NULL,2,5);

#Insertando calification 
INSERT INTO wartech.CALIFICATION (name,weight,createdAt,updatedAt,deletedAt,COURSEXSEMESTERId) VALUES
	 ('prom entregables',0.3,'0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,1),
	 ('doc final',0.3,'0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,1),
	 ('exp final',0.2,'0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,1),
	 ('prom entegrables parciales',0.2,'0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,1),
	 ('entregables ',0.5,'0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,2),
	 ('exposiciones',0.5,'0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,2);


#Insertando usuario 
INSERT INTO wartech.`USER` (idPUCP,name,fLastName,mLastName,telephone,photo,email,password,createdAt,updatedAt,deletedAt) VALUES
	 ('20220001','admin','admin','admin',999999999,NULL,'usuario.wartech@gmail.com','12345','2022-09-29 16:58:30','0000-00-00 00:00:00',NULL),
	 ('20180001','Alonso','Casas','Cuadra',999999999,NULL,'alonso.casas@pucp.edu.pe','12345','2022-09-29 16:58:30','0000-00-00 00:00:00',NULL),
	 ('20180002','Alex','Taboada','Portocarrero',999999999,NULL,'a20185462@pucp.edu.pe','12345','2022-09-29 16:58:30','0000-00-00 00:00:00',NULL),
	 ('20180003','Henry','Pebe','Reyes',999999999,NULL,'a20191425@pucp.edu.pe','12345','2022-09-29 16:58:30','0000-00-00 00:00:00',NULL),
	 ('20180004','Bryan ','Ruiz ','Ramirez',999999999,NULL,'a20191151@pucp.edu.pe','12345','2022-09-29 16:58:30','0000-00-00 00:00:00',NULL),
	 (NULL,'Giovanni ','Rodríguez','Ros',999999999,NULL,NULL,'12345','2022-09-29 16:58:30','0000-00-00 00:00:00',NULL),
	 (NULL,'Maria','Ali','Paz ',999999999,NULL,NULL,'12345','2022-09-29 16:58:30','0000-00-00 00:00:00',NULL),
	 (NULL,'Tomas ','Arnaiz','Cañizares',999999999,NULL,NULL,'12345','2022-09-29 16:58:30','0000-00-00 00:00:00',NULL),
	 ('20171395','Leonardo','Rosales','Olivas',123456789,NULL,'leonardo.rosales@pucp.edu.pe','12345','2022-09-29 16:41:10','0000-00-00 00:00:00',NULL);

#Insertando usuario x especialidad
INSERT INTO wartech.USER_X_SPECIALTY (createdAt,updatedAt,USERId,SPECIALTYId) VALUES
	 ('2022-09-29 16:58:30','0000-00-00 00:00:00',2,13),
	 ('2022-09-29 16:58:30','0000-00-00 00:00:00',3,13),
	 ('2022-09-29 16:58:30','0000-00-00 00:00:00',4,13),
	 ('2022-09-29 16:58:30','0000-00-00 00:00:00',5,13),
	 ('2022-09-29 16:58:30','0000-00-00 00:00:00',6,13);

#Insertando roles
INSERT INTO wartech.`ROLE` (description,createdAt,updatedAt,deletedAt) VALUES
	 ('Administrador','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL),
	 ('Usuario','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL),
	 ('Alumno','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL),
	 ('Profesor','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL),
	 ('Asesor','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL),
	 ('Jurado','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL),
	 ('Coordinador','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL);


#Insertando usuario x rol
INSERT INTO wartech.USER_X_ROLE (createdAt,updatedAt,USERId,ROLEId) VALUES
	 ('2022-09-29 16:58:30','0000-00-00 00:00:00',1,3),
	 ('2022-09-29 16:58:30','0000-00-00 00:00:00',2,3),
	 ('2022-09-29 16:58:30','0000-00-00 00:00:00',3,3),
	 ('2022-09-29 16:58:30','0000-00-00 00:00:00',4,3),
	 ('2022-09-29 16:58:30','0000-00-00 00:00:00',5,3),
	 ('2022-09-29 16:58:30','0000-00-00 00:00:00',6,4),
	 ('2022-09-29 16:58:30','0000-00-00 00:00:00',7,4),
	 ('2022-09-29 16:58:30','0000-00-00 00:00:00',8,4),
	 ('2022-09-29 16:58:30','0000-00-00 00:00:00',9,3);


#Insertando thesis
INSERT INTO wartech.THESIS (title,theme,description,status,areaName,createdAt,updatedAt,deletedAt) VALUES
	 ('ANÁLISIS, DISEÑO E IMPLEMENTACIÓN DE SOFTWARE PARA EL MANEJO DE LLAMADAS 
TELEFÓNICAS SOBRE REDES IP','SOFTWARE','El protocolo IP para direccionamiento de paquetes de datos por redes de computadoras está en la actualidad ampliamente extendido, siendo uno de los protocolos en los que tiene su base la red mundial Internet, así como las redes locales en diversas institu','ASIGNADO','SOFTWARE IMPLEMENTACION','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL),
	 ('DESARROLLO PARA UN SISTEMA DE INFORMACIÓN DE DELIBERY','SISTEMAS DE INFORMACIÓN','','NO ASIGNADO','SISTEMAS DE INFORMACIÓN','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL);


#Insertando usuario x thesis
INSERT INTO wartech.USER_X_THESIS (createdAt,updatedAt,USERId,THESISId) VALUES
	 ('2022-09-29 16:58:30','0000-00-00 00:00:00',5,1);

#Insertando assigments
INSERT INTO wartech.`ASSIGNMENT` (assignmentName,chapterName,startDate,endDate,maxScore,limitCompleteDate,limitCalificationDate,limitRepositoryUploadDate,`type`,additionalComments,createdAt,updatedAt,deletedAt,COURSEXSEMESTERId) VALUES
	 ('Conceptos Generales','EP1.1','2022-08-15 00:00:00','2022-08-22 00:00:00',20.0,'2022-08-22 00:00:00','2022-08-25 00:00:00','0000-00-00 00:00:00','PARTIAL ASSIGN','','2022-08-01 00:00:00','0000-00-00 00:00:00',NULL,1),
	 ('Estado del Arte – Revisión Sistemática','EP1.2','2022-08-22 00:00:00','2022-08-29 00:00:00',20.0,'2022-08-29 00:00:00','2022-09-01 00:00:00','0000-00-00 00:00:00','PARTIAL ASSIGN','','2022-08-01 00:00:00','0000-00-00 00:00:00',NULL,1),
	 ('Estado del Arte – Herramientas','EP1.3','2022-08-29 00:00:00','2022-09-05 00:00:00',20.0,'2022-09-05 00:00:00','2022-09-08 00:00:00','0000-00-00 00:00:00','PARTIAL ASSIGN','','2022-08-01 00:00:00','0000-00-00 00:00:00',NULL,1),
	 ('Árbol de Problemas','EP1.4','2022-09-05 00:00:00','2022-09-12 00:00:00',20.0,'2022-09-12 00:00:00','2022-09-15 00:00:00','0000-00-00 00:00:00','PARTIAL ASSIGN','','2022-08-01 00:00:00','0000-00-00 00:00:00',NULL,1),
	 ('Árbol de Problemas – Actividad','EP1.5','2022-09-12 00:00:00','2022-09-19 00:00:00',20.0,'2022-09-19 00:00:00','2022-09-22 00:00:00','0000-00-00 00:00:00','PARTIAL ASSIGN','','2022-08-01 00:00:00','0000-00-00 00:00:00',NULL,1),
	 ('Objetivo General','E1','2022-09-19 00:00:00','2022-09-26 00:00:00',20.0,'2022-09-26 00:00:00','2022-09-29 00:00:00','0000-00-00 00:00:00','PARTIAL ASSIGN','','2022-08-01 00:00:00','0000-00-00 00:00:00',NULL,1),
	 ('Objetivo específicos y resultados esperados','EP2.1','2022-09-26 00:00:00','2022-10-03 00:00:00',20.0,'2022-10-03 00:00:00','2022-10-07 00:00:00','0000-00-00 00:00:00','FINAL ASSIGN','','2022-08-01 00:00:00','0000-00-00 00:00:00',NULL,1),
	 ('Métodos y procedimientos','-','2022-10-03 00:00:00','2022-10-10 00:00:00',20.0,'2022-10-10 00:00:00','2022-10-14 00:00:00','0000-00-00 00:00:00','PARTIAL ASSIGN','','2022-08-01 00:00:00','0000-00-00 00:00:00',NULL,1),
	 ('Alcances y limitaciones','E2','2022-10-10 00:00:00','2022-10-17 00:00:00',20.0,'2022-10-17 00:00:00','2022-10-20 00:00:00','0000-00-00 00:00:00','FINAL ASSIGN','','2022-08-01 00:00:00','0000-00-00 00:00:00',NULL,1),
	 ('Alcances y limitaciones - Actividad','-','2022-10-17 00:00:00','2022-10-24 00:00:00',20.0,'2022-10-24 00:00:00','2022-10-27 00:00:00','0000-00-00 00:00:00','FINAL ASSIGN','','2022-08-01 00:00:00','0000-00-00 00:00:00',NULL,1);
INSERT INTO wartech.`ASSIGNMENT` (assignmentName,chapterName,startDate,endDate,maxScore,limitCompleteDate,limitCalificationDate,limitRepositoryUploadDate,`type`,additionalComments,createdAt,updatedAt,deletedAt,COURSEXSEMESTERId) VALUES
	 ('Plan proyecto','E3','2022-10-24 00:00:00','2022-10-31 00:00:00',20.0,'2022-10-31 00:00:00','2022-11-03 00:00:00','0000-00-00 00:00:00','FINAL ASSIGN','','2022-08-01 00:00:00','0000-00-00 00:00:00',NULL,1),
	 ('Plan proyecto - Actividad','E4','2022-10-31 00:00:00','2022-11-07 00:00:00',20.0,'2022-11-07 00:00:00','2022-11-10 00:00:00','0000-00-00 00:00:00','FINAL ASSIGN','','2022-08-01 00:00:00','0000-00-00 00:00:00',NULL,1),
	 ('Exposición final','ExF','2022-11-07 00:00:00','2022-11-14 00:00:00',20.0,'2022-11-14 00:00:00','2022-11-17 00:00:00','0000-00-00 00:00:00','EXPOSITION','','2022-08-01 00:00:00','0000-00-00 00:00:00',NULL,1),
	 ('Exposición final ','ExF','2022-11-14 00:00:00','2022-11-21 00:00:00',20.0,'2022-11-21 00:00:00','2022-11-24 00:00:00','0000-00-00 00:00:00','EXPOSITION','','2022-08-01 00:00:00','0000-00-00 00:00:00',NULL,1),
	 ('Avance inicial','Unidad','2022-08-15 00:00:00','2022-08-22 00:00:00',20.0,'2022-08-22 00:00:00','2022-08-29 00:00:00','0000-00-00 00:00:00','FINAL ASSIGN','','2022-08-01 00:00:00','0000-00-00 00:00:00',NULL,2),
	 ('Exposición 1','Unidad ','2022-08-22 00:00:00','2022-08-29 00:00:00',20.0,'2022-08-29 00:00:00','2022-09-05 00:00:00','0000-00-00 00:00:00','EXPOSITION','','2022-08-01 00:00:00','0000-00-00 00:00:00',NULL,2),
	 ('Exposición 2','Unidad ','2022-08-29 00:00:00','2022-09-05 00:00:00',20.0,'2022-09-05 00:00:00','2022-09-12 00:00:00','0000-00-00 00:00:00','EXPOSITION','','2022-08-01 00:00:00','0000-00-00 00:00:00',NULL,2),
	 ('Exposición 3','Unidad ','2022-09-05 00:00:00','2022-09-12 00:00:00',20.0,'2022-09-12 00:00:00','2022-09-19 00:00:00','0000-00-00 00:00:00','EXPOSITION','','2022-08-01 00:00:00','0000-00-00 00:00:00',NULL,2),
	 ('Exposición 4','Unidad ','2022-09-12 00:00:00','2022-09-19 00:00:00',20.0,'2022-09-19 00:00:00','2022-09-26 00:00:00','0000-00-00 00:00:00','EXPOSITION','','2022-08-01 00:00:00','0000-00-00 00:00:00',NULL,2),
	 ('Asesoría','Unidad ','2022-09-19 00:00:00','2022-09-26 00:00:00',20.0,'2022-09-26 00:00:00','2022-10-03 00:00:00','0000-00-00 00:00:00','EXPOSITION','','2022-08-01 00:00:00','0000-00-00 00:00:00',NULL,2);
INSERT INTO wartech.`ASSIGNMENT` (assignmentName,chapterName,startDate,endDate,maxScore,limitCompleteDate,limitCalificationDate,limitRepositoryUploadDate,`type`,additionalComments,createdAt,updatedAt,deletedAt,COURSEXSEMESTERId) VALUES
	 ('Avance parcial','Unidad ','2022-09-26 00:00:00','2022-10-03 00:00:00',20.0,'2022-10-03 00:00:00','2022-10-10 00:00:00','0000-00-00 00:00:00','EXPOSITION','','2022-08-01 00:00:00','0000-00-00 00:00:00',NULL,2),
	 ('Exposición 5','Unidad ','2022-10-03 00:00:00','2022-10-10 00:00:00',20.0,'2022-10-10 00:00:00','2022-10-17 00:00:00','0000-00-00 00:00:00','EXPOSITION','','2022-08-01 00:00:00','0000-00-00 00:00:00',NULL,2),
	 ('Exposición 6','Unidad ','2022-10-10 00:00:00','2022-10-17 00:00:00',20.0,'2022-10-17 00:00:00','2022-10-24 00:00:00','0000-00-00 00:00:00','EXPOSITION','','2022-08-01 00:00:00','0000-00-00 00:00:00',NULL,2),
	 ('Entregable final','Unidad ','2022-10-17 00:00:00','2022-10-24 00:00:00',20.0,'2022-10-24 00:00:00','2022-10-31 00:00:00','0000-00-00 00:00:00','FINAL ASSIGN','','2022-08-01 00:00:00','0000-00-00 00:00:00',NULL,2),
	 ('Revisión de parte del jurado','Unidad ','2022-10-24 00:00:00','2022-10-31 00:00:00',20.0,'2022-10-31 00:00:00','2022-11-07 00:00:00','0000-00-00 00:00:00','FINAL ASSIGN','','2022-08-01 00:00:00','0000-00-00 00:00:00',NULL,2),
	 ('Revisión de parte del jurado','Unidad ','2022-10-31 00:00:00','2022-11-07 00:00:00',20.0,'2022-11-07 00:00:00','2022-11-14 00:00:00','0000-00-00 00:00:00','FINAL ASSIGN','','2022-08-01 00:00:00','0000-00-00 00:00:00',NULL,2),
	 ('Levantamiento de observaciones','Unidad ','2022-11-07 00:00:00','2022-11-14 00:00:00',20.0,'2022-11-14 00:00:00','2022-11-21 00:00:00','0000-00-00 00:00:00','FINAL ASSIGN','','2022-08-01 00:00:00','0000-00-00 00:00:00',NULL,2),
	 ('Exposiciones finales','Unidad ','2022-11-14 00:00:00','2022-11-21 00:00:00',20.0,'2022-11-21 00:00:00','2022-12-04 00:00:00','0000-00-00 00:00:00','EXPOSITION','','2022-08-01 00:00:00','0000-00-00 00:00:00',NULL,2),
	 ('Exposiciones finales','Unidad ','2022-11-28 00:00:00','2022-12-04 00:00:00',20.0,'2022-12-04 00:00:00','2022-12-11 00:00:00','0000-00-00 00:00:00','EXPOSITION','','2022-08-01 00:00:00','0000-00-00 00:00:00',NULL,2),
	 ('Semana_1','Unidad 1','2022-08-15 00:00:00','2022-08-22 00:00:00',20.0,'2022-08-22 00:00:00','2022-08-29 00:00:00','0000-00-00 00:00:00','ADVANCE','','2022-08-01 00:00:00','0000-00-00 00:00:00',NULL,1);
INSERT INTO wartech.`ASSIGNMENT` (assignmentName,chapterName,startDate,endDate,maxScore,limitCompleteDate,limitCalificationDate,limitRepositoryUploadDate,`type`,additionalComments,createdAt,updatedAt,deletedAt,COURSEXSEMESTERId) VALUES
	 ('Semana_2','Unidad 1','2022-08-22 00:00:00','2022-08-29 00:00:00',20.0,'2022-08-29 00:00:00','2022-09-05 00:00:00','0000-00-00 00:00:00','ADVANCE','','2022-08-01 00:00:00','0000-00-00 00:00:00',NULL,1),
	 ('Semana_3','Unidad 2','2022-08-29 00:00:00','2022-09-05 00:00:00',20.0,'2022-09-05 00:00:00','2022-09-12 00:00:00','0000-00-00 00:00:00','ADVANCE','','2022-08-01 00:00:00','0000-00-00 00:00:00',NULL,1),
	 ('Semana_4','Unidad 2','2022-09-05 00:00:00','2022-09-12 00:00:00',20.0,'2022-09-12 00:00:00','2022-09-19 00:00:00','0000-00-00 00:00:00','ADVANCE','','2022-08-01 00:00:00','0000-00-00 00:00:00',NULL,1),
	 ('Semana_5','Unidad 3','2022-09-12 00:00:00','2022-09-19 00:00:00',20.0,'2022-09-19 00:00:00','2022-09-26 00:00:00','0000-00-00 00:00:00','ADVANCE','','2022-08-01 00:00:00','0000-00-00 00:00:00',NULL,1),
	 ('Semana_6','Unidad 3','2022-09-19 00:00:00','2022-09-26 00:00:00',20.0,'2022-09-26 00:00:00','2022-10-03 00:00:00','0000-00-00 00:00:00','ADVANCE','','2022-08-01 00:00:00','0000-00-00 00:00:00',NULL,1),
	 ('Semana_7','Unidad 4','2022-09-26 00:00:00','2022-10-03 00:00:00',20.0,'2022-10-03 00:00:00','2022-10-10 00:00:00','0000-00-00 00:00:00','ADVANCE','','2022-08-01 00:00:00','0000-00-00 00:00:00',NULL,1),
	 ('Semana_8','Unidad 4','2022-10-03 00:00:00','2022-10-10 00:00:00',20.0,'2022-10-10 00:00:00','2022-10-17 00:00:00','0000-00-00 00:00:00','ADVANCE','','2022-08-01 00:00:00','0000-00-00 00:00:00',NULL,1),
	 ('Semana_9','Unidad 4','2022-10-10 00:00:00','2022-10-17 00:00:00',20.0,'2022-10-17 00:00:00','2022-10-24 00:00:00','0000-00-00 00:00:00','ADVANCE','','2022-08-01 00:00:00','0000-00-00 00:00:00',NULL,1),
	 ('Semana_10','Unidad 5','2022-10-17 00:00:00','2022-10-24 00:00:00',20.0,'2022-10-24 00:00:00','2022-10-31 00:00:00','0000-00-00 00:00:00','ADVANCE','','2022-08-01 00:00:00','0000-00-00 00:00:00',NULL,1),
	 ('Semana_11','Unidad 5','2022-10-24 00:00:00','2022-10-31 00:00:00',20.0,'2022-10-31 00:00:00','2022-11-07 00:00:00','0000-00-00 00:00:00','ADVANCE','','2022-08-01 00:00:00','0000-00-00 00:00:00',NULL,1);
INSERT INTO wartech.`ASSIGNMENT` (assignmentName,chapterName,startDate,endDate,maxScore,limitCompleteDate,limitCalificationDate,limitRepositoryUploadDate,`type`,additionalComments,createdAt,updatedAt,deletedAt,COURSEXSEMESTERId) VALUES
	 ('Semana_12','Unidad 6','2022-10-31 00:00:00','2022-11-07 00:00:00',20.0,'2022-11-07 00:00:00','2022-11-14 00:00:00','0000-00-00 00:00:00','ADVANCE','','2022-08-01 00:00:00','0000-00-00 00:00:00',NULL,1),
	 ('Semana_13','Unidad 6','2022-11-07 00:00:00','2022-11-14 00:00:00',20.0,'2022-11-14 00:00:00','2022-11-21 00:00:00','0000-00-00 00:00:00','ADVANCE','','2022-08-01 00:00:00','0000-00-00 00:00:00',NULL,1),
	 ('Semana_14','ExF','2022-11-14 00:00:00','2022-11-21 00:00:00',20.0,'2022-11-21 00:00:00','2022-11-28 00:00:00','0000-00-00 00:00:00','ADVANCE','','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,1);


#Insertando assigmentXrol
INSERT INTO wartech.ASSIGNMENT_X_ROLE (name,createdAt,updatedAt,deletedAt,ASSIGNMENTId,ROLEId) VALUES
	 ('Revisor','2022-09-29 17:42:31','0000-00-00 00:00:00',NULL,1,5),
	 ('Evaluador','2022-09-29 17:42:31','0000-00-00 00:00:00',NULL,1,4),
	 ('Responsable','2022-09-29 17:42:31','0000-00-00 00:00:00',NULL,1,3),
	 ('Revisor','2022-09-29 17:42:31','0000-00-00 00:00:00',NULL,2,5),
	 ('Evaluador','2022-09-29 17:42:31','0000-00-00 00:00:00',NULL,2,4),
	 ('Responsable','2022-09-29 17:42:31','0000-00-00 00:00:00',NULL,2,3),
	 ('Revisor','2022-09-29 17:42:31','0000-00-00 00:00:00',NULL,3,5),
	 ('Evaluador','2022-09-29 17:42:31','0000-00-00 00:00:00',NULL,3,5),
	 ('Responsable','2022-09-29 17:42:31','0000-00-00 00:00:00',NULL,3,3),
	 ('Revisor','2022-09-29 17:42:31','0000-00-00 00:00:00',NULL,4,5);
INSERT INTO wartech.ASSIGNMENT_X_ROLE (name,createdAt,updatedAt,deletedAt,ASSIGNMENTId,ROLEId) VALUES
	 ('Evaluador','2022-09-29 17:42:31','0000-00-00 00:00:00',NULL,4,4),
	 ('Responsable','2022-09-29 17:42:31','0000-00-00 00:00:00',NULL,4,3),
	 ('Revisor','2022-09-29 17:42:31','0000-00-00 00:00:00',NULL,5,5),
	 ('Evaluador','2022-09-29 17:42:31','0000-00-00 00:00:00',NULL,5,5),
	 ('Responsable','2022-09-29 17:42:31','0000-00-00 00:00:00',NULL,5,3),
	 ('Revisor','2022-09-29 17:42:31','0000-00-00 00:00:00',NULL,6,5),
	 ('Evaluador','2022-09-29 17:42:31','0000-00-00 00:00:00',NULL,6,4),
	 ('Responsable','2022-09-29 17:42:31','0000-00-00 00:00:00',NULL,6,3),
	 ('Revisor','2022-09-29 17:42:31','0000-00-00 00:00:00',NULL,7,5),
	 ('Evaluador','2022-09-29 17:42:31','0000-00-00 00:00:00',NULL,7,4);
INSERT INTO wartech.ASSIGNMENT_X_ROLE (name,createdAt,updatedAt,deletedAt,ASSIGNMENTId,ROLEId) VALUES
	 ('Responsable','2022-09-29 17:42:31','0000-00-00 00:00:00',NULL,7,3),
	 ('Revisor','2022-09-29 17:42:31','0000-00-00 00:00:00',NULL,8,5),
	 ('Evaluador','2022-09-29 17:42:31','0000-00-00 00:00:00',NULL,8,4),
	 ('Responsable','2022-09-29 17:42:31','0000-00-00 00:00:00',NULL,8,3),
	 ('Revisor','2022-09-29 17:42:31','0000-00-00 00:00:00',NULL,9,5),
	 ('Evaluador','2022-09-29 17:42:31','0000-00-00 00:00:00',NULL,9,4),
	 ('Responsable','2022-09-29 17:42:31','0000-00-00 00:00:00',NULL,9,3),
	 ('Revisor','2022-09-29 17:42:31','0000-00-00 00:00:00',NULL,10,5),
	 ('Evaluador','2022-09-29 17:42:31','0000-00-00 00:00:00',NULL,10,4),
	 ('Responsable','2022-09-29 17:42:31','0000-00-00 00:00:00',NULL,10,3);
INSERT INTO wartech.ASSIGNMENT_X_ROLE (name,createdAt,updatedAt,deletedAt,ASSIGNMENTId,ROLEId) VALUES
	 ('Revisor','2022-09-29 17:42:31','0000-00-00 00:00:00',NULL,11,5),
	 ('Evaluador','2022-09-29 17:42:31','0000-00-00 00:00:00',NULL,11,4),
	 ('Responsable','2022-09-29 17:42:31','0000-00-00 00:00:00',NULL,11,3),
	 ('Revisor','2022-09-29 17:42:31','0000-00-00 00:00:00',NULL,12,5),
	 ('Evaluador','2022-09-29 17:42:31','0000-00-00 00:00:00',NULL,12,6),
	 ('Responsable','2022-09-29 17:42:31','0000-00-00 00:00:00',NULL,12,3),
	 ('Revisor','2022-09-29 17:42:31','0000-00-00 00:00:00',NULL,13,5),
	 ('Evaluador','2022-09-29 17:42:31','0000-00-00 00:00:00',NULL,13,6),
	 ('Responsable','2022-09-29 17:42:31','0000-00-00 00:00:00',NULL,13,3),
	 ('Revisor','2022-09-29 17:42:31','0000-00-00 00:00:00',NULL,14,5);
INSERT INTO wartech.ASSIGNMENT_X_ROLE (name,createdAt,updatedAt,deletedAt,ASSIGNMENTId,ROLEId) VALUES
	 ('Evaluador','2022-09-29 17:42:31','0000-00-00 00:00:00',NULL,14,6),
	 ('Responsable','2022-09-29 17:42:31','0000-00-00 00:00:00',NULL,14,3);



#Insertando assigmentXtask
INSERT INTO wartech.ASSIGNMENT_TASK (name,createdAt,updatedAt,deletedAt,ASSIGNMENTId) VALUES
	 (' Ficha de registro de idea de tesis y asesor.','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,1),
	 ('Protocolo de revisión.','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,2),
	 ('Diseño de Formulario de extracción.','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,2),
	 ('Reporte de ejecución de la revisión.','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,3),
	 ('Formulario de extracción.','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,3),
	 ('Reporte de ejecución de la revisión.','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,4),
	 ('Formulario de extracción.','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,4),
	 ('Marco conceptual.','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,5),
	 ('Problematica.','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,6),
	 ('Marco conceptual.','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,6);
INSERT INTO wartech.ASSIGNMENT_TASK (name,createdAt,updatedAt,deletedAt,ASSIGNMENTId) VALUES
	 ('Marco teórico.','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,6),
	 ('Marco legal.','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,6),
	 ('Estado del arte.','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,6),
	 ('Arbol de objetivos.','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,7),
	 ('Objetivo general.','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,7),
	 ('Objetivo específicos.','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',7),
	 ('Objetivo general.','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',9),
	 ('Objetivo específicos.','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',9),
	 ('Resultados esperados.','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',9),
	 ('Medios de verificación.','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',9);
INSERT INTO wartech.ASSIGNMENT_TASK (name,createdAt,updatedAt,deletedAt,ASSIGNMENTId) VALUES
	 ('Resultados esperados.','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',11),
	 ('Herramientas, métodos y procedimientos.','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',11),
	 ('Alcances y limitaciones.','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',11),
	 ('Proyecto de fin de carrera completo incluyendo: todas las correcciones y el Anexo de Plan de Tesis. ','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',12),
	 ('Entregable 4 del curso de proyecto de tesis1 en el semetres anterior','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',15),
	 ('Deberá incluir, por lo menos, cada uno de los resultados que espera alcanzar. Los nombres y numeración de estos resultados deberá estar de acorde con lo
descrito en el documento de tesis.','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',16),
	 ('avance de la implementación de los resultados esperados de su proyecto de fin de carrera siguiendo el cronograma establecido.','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',17),
	 ('documento conteniendo la redacción de los resultados alcanzados
acorde a lo presentado.','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',17),
	 ('avance de la implementación de los resultados esperados de su proyecto de fin de carrera siguiendo el cronograma establecido.','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',18),
	 ('documento conteniendo la redacción de los resultados alcanzados','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',18);
INSERT INTO wartech.ASSIGNMENT_TASK (name,createdAt,updatedAt,deletedAt,ASSIGNMENTId) VALUES
	 ('avance de la implementación de los resultados esperados de su proyecto de fin de carrera siguiendo el cronograma establecido.','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',19),
	 ('documento conteniendo la redacción de los resultados alcanzados','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',19),
	 ('avance de la implementación de los resultados esperados de su proyecto de fin de carrera siguiendo el cronograma establecido.','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',20),
	 ('documento conteniendo la redacción de los resultados alcanzados','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',20),
	 ('avance de la implementación de los resultados esperados de su proyecto de fin de carrera siguiendo el cronograma establecido.','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',21),
	 ('documento conteniendo la redacción de los resultados alcanzados','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',21),
	 ('avance de la implementación de los resultados esperados de su proyecto de fin de carrera siguiendo el cronograma establecido.','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',22),
	 ('documento conteniendo la redacción de los resultados alcanzados','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',22),
	 ('avance de la implementación de los resultados esperados de su proyecto de fin de carrera siguiendo el cronograma establecido.','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',23),
	 (' El asesor de tesis, en caso de otorgar el visto bueno y
luego de verificar que se hayan terminado con todos los
resultados esperados, enviará el documento conteniendo
el desarrollo del proyecto de tesis del alumno asesorado.','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',24);
INSERT INTO wartech.ASSIGNMENT_TASK (name,createdAt,updatedAt,deletedAt,ASSIGNMENTId) VALUES
	 (' jurado revisará y entregará las observaciones en formato digital al alumno.','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',25),
	 (' jurado revisará y entregará las observaciones en formato digital al alumno.','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',26),
	 (' El alumno levantará las observaciones que ha recibido
de parte del jurado.','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',27),
	 ('El alumno levantará las observaciones que ha recibido
de parte del jurado.','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',28),
	 ('El alumno levantará las observaciones que ha recibido
de parte del jurado.','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',29),
	 ('Avance semanal numero 1','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',30),
	 ('Avance semanal numero 2','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',31),
	 ('Avance semanal numero 3','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',32),
	 ('Avance semanal numero 4','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',33),
	 ('Avance semanal numero 5','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',34);
INSERT INTO wartech.ASSIGNMENT_TASK (name,createdAt,updatedAt,deletedAt,ASSIGNMENTId) VALUES
	 ('Avance semanal numero 6','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',35),
	 ('Avance semanal numero 7','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',36),
	 ('Avance semanal numero 8','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',37),
	 ('Avance semanal numero 9','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',38),
	 ('Avance semanal numero 10','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',39),
	 ('Avance semanal numero 11','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',40),
	 ('Avance semanal numero 12','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',41),
	 ('Avance semanal numero 13','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',42),
	 ('Avance semanal numero 14','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',43);



#Insertando assigmentsXstudents
INSERT INTO wartech.ASSIGNMENT_X_STUDENT (score,linkVirtualSession,registerDate,status,createdAt,updatedAt,deletedAt,USERId,ASSIGNMENTId) VALUES
	 (19,NULL,'2022-08-20 00:00:00','Calificado','2022-09-29 16:58:30','0000-00-00 00:00:00',NULL,2,1),
	 (18,NULL,'2022-08-19 00:00:00','Calificado','2022-09-29 16:58:30','0000-00-00 00:00:00',NULL,3,1),
	 (18,NULL,'0000-00-00 00:00:00','Calificado','2022-09-29 16:58:30','0000-00-00 00:00:00',NULL,4,1),
	 (19,NULL,'2022-08-19 00:00:00','Calificado','2022-09-29 16:58:30','0000-00-00 00:00:00',NULL,5,1),
	 (14,NULL,'2022-08-27 00:00:00','Calificado','2022-09-29 16:58:30','0000-00-00 00:00:00',NULL,2,2),
	 (15,NULL,'2022-08-24 00:00:00','Calificado','2022-09-29 16:58:30','0000-00-00 00:00:00',NULL,3,2),
	 (17,NULL,'2022-08-25 00:00:00','Calificado','2022-09-29 16:58:30','0000-00-00 00:00:00',NULL,4,2),
	 (15,NULL,'2022-08-27 00:00:00','Calificado','2022-09-29 16:58:30','0000-00-00 00:00:00',NULL,5,2),
	 (17,NULL,'2022-09-01 00:00:00','Calificado','2022-09-29 16:58:30','0000-00-00 00:00:00',NULL,2,3),
	 (15,NULL,'2022-09-02 00:00:00','Calificado','2022-09-29 16:58:30','0000-00-00 00:00:00',NULL,3,3);
INSERT INTO wartech.ASSIGNMENT_X_STUDENT (score,linkVirtualSession,registerDate,status,createdAt,updatedAt,deletedAt,USERId,ASSIGNMENTId) VALUES
	 (16,NULL,'2022-09-03 00:00:00','Calificado','2022-09-29 16:58:30','0000-00-00 00:00:00',NULL,4,3),
	 (17,NULL,'2022-09-03 00:00:00','Calificado','2022-09-29 16:58:30','0000-00-00 00:00:00',NULL,5,3),
	 (0,NULL,'2022-09-09 00:00:00','Entregado','2022-09-29 16:58:30','0000-00-00 00:00:00',NULL,2,4),
	 (0,NULL,'2022-09-09 00:00:00','Asignado','2022-09-29 16:58:30','0000-00-00 00:00:00',NULL,3,4),
	 (0,NULL,'2022-09-10 00:00:00','Entregado','2022-09-29 16:58:30','0000-00-00 00:00:00',NULL,4,4),
	 (0,NULL,'2022-09-10 00:00:00','Entregado','2022-09-29 16:58:30','0000-00-00 00:00:00',NULL,5,4),
	 (12,NULL,'2022-09-29 16:58:30','Calificado','2022-09-29 16:58:30','2022-09-29 16:58:30',NULL,1,1),
	 (14,NULL,'2022-08-27 00:00:00','Calificado','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,1,2),
	 (16,NULL,'2022-09-01 00:00:00','Calificado','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,1,3),
	 (0,NULL,'2022-09-09 00:00:00','Asignado','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,1,4);
INSERT INTO wartech.ASSIGNMENT_X_STUDENT (score,linkVirtualSession,registerDate,status,createdAt,updatedAt,deletedAt,USERId,ASSIGNMENTId) VALUES
	 (0,NULL,NULL,'Asignado','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,1,5),
	 (0,NULL,NULL,'Asignado','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,1,6),
	 (0,NULL,NULL,'Asignado','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,1,7),
	 (0,NULL,NULL,'Asignado','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,1,8),
	 (0,NULL,NULL,'Asignado','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,1,9),
	 (0,NULL,NULL,'Asignado','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,1,10),
	 (0,NULL,NULL,'Asignado','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,1,11),
	 (0,NULL,NULL,'Asignado','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,1,12),
	 (0,'https://pucp.zoom.us/j/92348570914?pwd=RHpkb1dka2o4WG9pdEF4S0R4UDY5Zz09&uname=CASAS%20CUADRA%2C%20ALONSO%20DAVID#success',NULL,'Asignado','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,1,13),
	 (0,'https://pucp.zoom.us/j/92348570914?pwd=RHpkb1dka2o4WG9pdEF4S0R4UDY5Zz09&uname=CASAS%20CUADRA%2C%20ALONSO%20DAVID#success',NULL,'Asignado','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,1,14);
INSERT INTO wartech.ASSIGNMENT_X_STUDENT (score,linkVirtualSession,registerDate,status,createdAt,updatedAt,deletedAt,USERId,ASSIGNMENTId) VALUES
	 (0,NULL,NULL,'Asignado','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,1,15),
	 (0,NULL,NULL,'Asignado','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,1,16),
	 (0,NULL,NULL,'Asignado','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,1,17),
	 (0,NULL,NULL,'Asignado','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,1,18),
	 (0,NULL,NULL,'Asignado','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,1,19),
	 (0,NULL,NULL,'Asignado','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,1,20),
	 (0,NULL,NULL,'Asignado','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,1,21),
	 (0,NULL,NULL,'Asignado','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,1,22),
	 (0,NULL,NULL,'Asignado','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,1,23),
	 (0,NULL,NULL,'Asignado','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,1,24);
INSERT INTO wartech.ASSIGNMENT_X_STUDENT (score,linkVirtualSession,registerDate,status,createdAt,updatedAt,deletedAt,USERId,ASSIGNMENTId) VALUES
	 (0,NULL,NULL,'Asignado','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,1,25),
	 (0,NULL,NULL,'Asignado','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,1,26),
	 (0,NULL,NULL,'Asignado','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,1,27),
	 (0,NULL,NULL,'Asignado','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,1,28),
	 (0,NULL,NULL,'Asignado','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,1,29),
	 (0,'https://pucp.zoom.us/j/92348570914?pwd=RHpkb1dka2o4WG9pdEF4S0R4UDY5Zz09&uname=CASAS%20CUADRA%2C%20ALONSO%20DAVID#success',NULL,'Asignado','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,1,30),
	 (0,NULL,NULL,'Asignado','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,1,31),
	 (0,NULL,NULL,'Asignado','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,1,32),
	 (0,NULL,NULL,'Asignado','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,1,33),
	 (0,NULL,NULL,'Asignado','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,1,34);
INSERT INTO wartech.ASSIGNMENT_X_STUDENT (score,linkVirtualSession,registerDate,status,createdAt,updatedAt,deletedAt,USERId,ASSIGNMENTId) VALUES
	 (0,NULL,NULL,'Asignado','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,1,35),
	 (0,NULL,NULL,'Asignado','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,1,36),
	 (0,NULL,NULL,'Asignado','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,1,37),
	 (0,NULL,NULL,'Asignado','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,1,38),
	 (0,NULL,NULL,'Asignado','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,1,39),
	 (0,NULL,NULL,'Asignado','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,1,40),
	 (0,NULL,NULL,'Asignado','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,1,41),
	 (0,NULL,NULL,'Asignado','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,1,42),
	 (0,NULL,NULL,'Asignado','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,1,43);

#Insertando assigmentsXstudentsXrevisor
INSERT INTO wartech.ASSIGNMENT_X_STUDENT_X_REVISOR (grade,feedbackDate,createdAt,updatedAt,deletedAt,ASSIGNMENTXSTUDENTId,USERId) VALUES
	 (20.0,'2022-08-20 00:00:00','2022-08-20 00:00:00','2022-10-06 00:23:59',NULL,1,2),
	 (0.0,'0000-00-00 00:00:00','2022-08-20 00:00:00','2022-10-06 00:23:59',NULL,17,6),
	 (0.0,'0000-00-00 00:00:00','2022-08-20 00:00:00','2022-10-06 00:23:59',NULL,18,6),
	 (0.0,'0000-00-00 00:00:00','2022-08-20 00:00:00','2022-10-06 00:23:59',NULL,19,6),
	 (0.0,'0000-00-00 00:00:00','2022-08-20 00:00:00','2022-10-06 00:23:59',NULL,20,6),
	 (0.0,'0000-00-00 00:00:00','2022-08-20 00:00:00','2022-10-06 00:23:59',NULL,21,6),
	 (0.0,'0000-00-00 00:00:00','2022-08-20 00:00:00','2022-10-06 00:23:59',NULL,22,6),
	 (0.0,'0000-00-00 00:00:00','2022-08-20 00:00:00','2022-10-06 00:23:59',NULL,23,6),
	 (0.0,'0000-00-00 00:00:00','2022-08-20 00:00:00','2022-10-06 00:23:59',NULL,24,6),
	 (0.0,'0000-00-00 00:00:00','2022-08-20 00:00:00','2022-10-06 00:23:59',NULL,25,6);
INSERT INTO wartech.ASSIGNMENT_X_STUDENT_X_REVISOR (grade,feedbackDate,createdAt,updatedAt,deletedAt,ASSIGNMENTXSTUDENTId,USERId) VALUES
	 (0.0,'0000-00-00 00:00:00','2022-08-20 00:00:00','2022-10-06 00:23:59',NULL,26,6),
	 (0.0,'0000-00-00 00:00:00','2022-08-20 00:00:00','2022-10-06 00:23:59',NULL,27,6),
	 (0.0,'0000-00-00 00:00:00','2022-08-20 00:00:00','2022-10-06 00:23:59',NULL,28,6),
	 (0.0,'0000-00-00 00:00:00','2022-08-20 00:00:00','2022-10-06 00:23:59',NULL,29,6),
	 (0.0,'0000-00-00 00:00:00','2022-08-20 00:00:00','2022-10-06 00:23:59',NULL,30,6),
	 (0.0,'0000-00-00 00:00:00','2022-08-20 00:00:00','2022-10-06 00:23:59',NULL,46,6),
	 (0.0,'0000-00-00 00:00:00','2022-08-20 00:00:00','2022-10-06 00:23:59',NULL,47,6),
	 (0.0,'0000-00-00 00:00:00','2022-08-20 00:00:00','2022-10-06 00:23:59',NULL,48,6),
	 (0.0,'0000-00-00 00:00:00','2022-08-20 00:00:00','2022-10-06 00:23:59',NULL,49,6),
	 (0.0,'0000-00-00 00:00:00','2022-08-20 00:00:00','2022-10-06 00:23:59',NULL,50,6);
INSERT INTO wartech.ASSIGNMENT_X_STUDENT_X_REVISOR (grade,feedbackDate,createdAt,updatedAt,deletedAt,ASSIGNMENTXSTUDENTId,USERId) VALUES
	 (0.0,'0000-00-00 00:00:00','2022-08-20 00:00:00','2022-10-06 00:23:59',NULL,51,6),
	 (0.0,'0000-00-00 00:00:00','2022-08-20 00:00:00','2022-10-06 00:23:59',NULL,52,6),
	 (0.0,'0000-00-00 00:00:00','2022-08-20 00:00:00','2022-10-06 00:23:59',NULL,53,6),
	 (0.0,'0000-00-00 00:00:00','2022-08-20 00:00:00','2022-10-06 00:23:59',NULL,54,6),
	 (0.0,'0000-00-00 00:00:00','2022-08-20 00:00:00','2022-10-06 00:23:59',NULL,55,6),
	 (0.0,'0000-00-00 00:00:00','2022-08-20 00:00:00','2022-10-06 00:23:59',NULL,56,6),
	 (0.0,'0000-00-00 00:00:00','2022-08-20 00:00:00','2022-10-06 00:23:59',NULL,57,6),
	 (0.0,'0000-00-00 00:00:00','2022-08-20 00:00:00','2022-10-06 00:23:59',NULL,58,6),
	 (0.0,'0000-00-00 00:00:00','2022-08-20 00:00:00','2022-10-06 00:23:59',NULL,59,6);



#Insertando comments
INSERT INTO wartech.COMMENT (comment,createdAt,updatedAt,deletedAt,ASSIGNMENTXSTUDENTId,USERId) VALUES
	 ('Bueno trabajo','2022-09-29 16:41:10','0000-00-00 00:00:00',NULL,1,6),
	 ('Bueno trabajo','2022-09-29 16:41:10','0000-00-00 00:00:00',NULL,2,7),
	 ('Bueno trabajo','2022-09-29 16:41:10','0000-00-00 00:00:00',NULL,3,8),
	 ('Bueno trabajo','2022-09-29 16:41:10','0000-00-00 00:00:00',NULL,4,6),
	 ('Muchas gracias','2022-09-30 00:38:18','2022-09-30 00:38:18',NULL,1,2),
	 ('Bueno trabajo','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,17,6),
	 ('Bueno trabajo','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,18,6),
	 ('Bueno trabajo','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,19,6);


#Insertando user x course x semester
INSERT INTO wartech.USER_X_COURSE_X_SEMESTER (createdAt,updatedAt,USERId,COURSEXSEMESTERId) VALUES
	 ('2022-09-29 16:58:30','0000-00-00 00:00:00',1,1),
	 ('2022-09-29 16:58:30','0000-00-00 00:00:00',2,1),
	 ('2022-09-29 16:58:30','0000-00-00 00:00:00',3,1),
	 ('2022-09-29 16:58:30','0000-00-00 00:00:00',4,1),
	 ('2022-09-29 16:58:30','0000-00-00 00:00:00',5,1);

#Insertando rubrica
INSERT INTO wartech.RUBRIC (objective,annotations,criteriaQuantity,description,createdAt,updatedAt,deletedAt,ASSIGNMENTId) VALUES
	 ('','Rúbrica del Entregable Parcial 1.1 (E1.1) ',4,'','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',1),
	 ('','Rúbrica del Entregable Parcial 1.2 (E1.2)',5,'','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',2),
	 ('','Rúbrica del Entregable Parcial 1.3 (E1.3)',3,'','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',3),
	 ('','Rúbrica del Entregable Parcial 1.4 (E1.4)',3,'','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',4),
	 ('','Rúbrica del Entregable Parcial 1.5 (E1.5)',3,'','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',5),
	 ('','Rúbrica del Entregable 1 (E1) ',4,'','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',6),
	 ('','Rúbrica del Entregable Parcial 2.1',5,'','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,7),
	 ('','Rúbrica del Entregable 2 (E2) ',6,'','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,9),
	 ('','Rúbrica del Entregable 3 (E3) ',5,'','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,11),
	 ('','Rúbrica del Entregable Final (E4)',5,'','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,12);
INSERT INTO wartech.RUBRIC (objective,annotations,criteriaQuantity,description,createdAt,updatedAt,deletedAt,ASSIGNMENTId) VALUES
	 ('','Rúbrica de la exposición del curso Proyecto de Tesis 1',6,'','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,13),
	 ('','Rúbrica de la exposición del curso Proyecto de Tesis 1',6,'','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,14);


#Insertando rubrica X criteria

INSERT INTO wartech.RUBRIC_CRITERIA (levelQuantity,description,createdAt,updatedAt,deletedAt,RUBRICId) VALUES
	 ('1','Título del tema de tesis','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',1),
	 ('1','Asesor','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',1),
	 ('1','Area','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',1),
	 ('1','Descripción','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',1),
	 ('1','Objetivo de revisión','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',2),
	 ('1','Preguntas de revisión','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',2),
	 ('1','Estrategias de búsqueda','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',2),
	 ('1','Formulario de extracción','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',2),
	 ('1','Criterio de inclusión/Criterio de exclusión','0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00',2),
	 ('1','Estudios primarios','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,3);
INSERT INTO wartech.RUBRIC_CRITERIA (levelQuantity,description,createdAt,updatedAt,deletedAt,RUBRICId) VALUES
	 ('1','Formulario de extracción','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,3),
	 ('1','Respuestas a las preguntas','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,3),
	 ('1','Estudios primarios','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,4),
	 ('1','Formulario de extracción','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,4),
	 ('1','Respuestas a las preguntas','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,4),
	 ('1','Objetivo del marco conceptual','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,5),
	 ('1','Conceptos','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,5),
	 ('1','Ejemplos ','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,5),
	 ('1','Objetivo general','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,7),
	 ('1','Objetivos específicos ','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,7);
INSERT INTO wartech.RUBRIC_CRITERIA (levelQuantity,description,createdAt,updatedAt,deletedAt,RUBRICId) VALUES
	 ('1','Problemática','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,6),
	 ('1','Marco Conceptual','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,6),
	 ('1','Revisión de la literatura y Estado del arte','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,6),
	 ('1','Redacción, estilo y formato','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,6),
	 ('1','Problemática','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,8),
	 ('1','Marco Conceptual','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,8),
	 ('1','Revisión de la Literatura y Estado del arte','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,8),
	 ('1','Objetivo General y Específicos','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,8),
	 ('1','Resultados Esperados','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,8),
	 ('1','Redacción, estilo y formato','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,8);
INSERT INTO wartech.RUBRIC_CRITERIA (levelQuantity,description,createdAt,updatedAt,deletedAt,RUBRICId) VALUES
	 ('1','Problemática','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,9),
	 ('1','Marco Conceptual','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,9),
	 ('1','Revisión de la Literatura y Estado del arte','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,9),
	 ('1','Plan de Tesis (Alcance y limitaciones)','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,9),
	 ('1','Redacción, estilo y formato','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,9),
	 ('1','Problemática','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,10),
	 ('1','Marco Conceptual','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,10),
	 ('1','etivos, resultados y métodos y','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,10),
	 ('1','Plan de Tesis (Alcance y limitaciones)','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,10),
	 ('1','Redacción, estilo y formato','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,10);
INSERT INTO wartech.RUBRIC_CRITERIA (levelQuantity,description,createdAt,updatedAt,deletedAt,RUBRICId) VALUES
	 ('1','Identificación del problema','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,11),
	 ('1','Objetivos','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,11),
	 ('1','Resultados esperados','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,11),
	 ('1','Plan de proyecto','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,11),
	 ('1','Viabilidad','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,11),
	 ('1','Exposición','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,11);

#Insertando rubrica  levelXcriteria

INSERT INTO wartech.LEVEL_CRITERIA (name,maxScore,description,createdAt,updatedAt,deletedAt,RUBRICCRITERIumId) VALUES
	 ('Nivel deseado',2.0,'El alumno indica el título de la tesis que realizará. ','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,1),
	 ('Nivel deseado',8.0,'El alumno indica el nombre completo de su asesor e especifica el plan de trabajo que desarrollará con el asesor para garantizar que consiga cumplir con los objetivos del curso. El alumno informa el cronograma de reuniones con el asesor. ','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,2),
	 ('Nivel deseado',2.0,'El alumno identifica claramente a qué área corresponde el proyecto de fin de carrera.','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,3),
	 ('Nivel deseado',8.0,'¿Qué problema busca resolver?, ¿Qué resultado espera lograr?, ¿Qué métodos y procedimientos espera usar?','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,4),
	 ('Nivel deseado',4.0,'Describe claramente para qué está haciendo la revisión e
informa el tipo de revisión o los tipos de revisiones que
realizará.','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,5),
	 ('Nivel deseado',4.0,'El alumno presenta por lo menos 3 preguntas de revisión
que permiten cumplir el objetivo de la revisión definido previamente. Las preguntas son específicas al tema propuesto
y las respuestas de las mismas no son triviales.','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,6),
	 ('Nivel deseado',4.0,'El alumno presenta la estrategia de búsqueda que les permitirá responder cada una de las preguntas diseñadas. Deberá
indicar por lo menos:
Motores de búsqueda a usar. Deberá indicar por lo
menos dos motores de búsqueda diferentes.
Cadenas de búsqueda a us','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,7),
	 ('Nivel deseado',4.0,'El alumno diseña un formulario que le permitirá extraer
la información requerida para responder a las preguntas
propuestas en su protocolo de revisión.','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,8),
	 ('Nivel deseado',4.0,'El alumno describe los criterios de inclusión y exclusión,
justificando cada uno de los criterios establecidos.','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,9),
	 ('Nivel deseado',4.0,'El alumno presenta los estudios primarios recopilados con
el objetivo de dar respuesta a las preguntas. Los estudios
están presentados usando algún estándar de referencia bibliográfica.','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,10);
INSERT INTO wartech.LEVEL_CRITERIA (name,maxScore,description,createdAt,updatedAt,deletedAt,RUBRICCRITERIumId) VALUES
	 ('Nivel deseado',8.0,'El alumno presenta el formulario de extracción con la información completa de forma tal que permita responder por
lo menos una pregunta.','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,11),
	 ('Nivel deseado',8.0,'El alumno responde a por lo menos una de las preguntas
planteadas en el protocolo de revisión usando la evidencia
recopilada del formulario de extracción. No se espera un
resumen de artículos leídos sino responder a las cuestiones
planteadas.','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,12),
	 ('Nivel deseado',4.0,'El alumno presenta los estudios primarios recopilados con el
objetivo de dar respuesta a todas las preguntas planteadas.
Los estudios están presentados usando algún estándar de
referencia bibliográfica.','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,13),
	 ('Nivel deseado',8.0,'El alumno presenta el formulario de extracción con la información completa de forma tal que permita responder a
todas las preguntas planteadas.
','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,14),
	 ('Nivel deseado',8.0,'El alumno responde a cada una de las preguntas planteadas
en el protocolo de revisión usando la evidencia recopilada
del formulario de extracción. No se espera un resumen de
artículos leídos sino responder a las cuestiones planteadas.','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,15),
	 ('Nivel deseado',2.0,'El alumno presenta los estudios primarios recopilados con el
objetivo de dar respuesta a todas las preguntas planteadas.
El alumno presente el objetivo del marco conceptual.','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,16),
	 ('Nivel deseado',9.0,'El alumno describe los conceptos que ha considerado relevantes para contextualizar el problema que va a estudiar
en el curso. Cada concepto presentado está correctamente
referenciado a través de fuentes primarias. No incluyen en
los conceptos a los método','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,17),
	 ('Nivel deseado',9.0,'El alumno incluye en cada concepto ejemplos que permitan
determinar cómo el concepto permitirá comprender mejor
el problema. El alumno con el ejemplo vincula el concepto
al tema que abordará..','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,18),
	 ('Nivel deseado',10.0,'El alumno presenta el objetivo general que permite estudiar
el problema central identificado en el árbol de problemas.
El objetivo general es factible desde el punto de vista informático y desde el punto de vista temporal.','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,19),
	 ('Nivel deseado',10.0,'El alumno presenta los objetivos específicos alineados a los
problemas causa del árbol de problemas. Los objetivos específicos se encuentran alineados al objetivo general y además
son factibles desde el punto de vista informático y desde el
punto de vista','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,20);
INSERT INTO wartech.LEVEL_CRITERIA (name,maxScore,description,createdAt,updatedAt,deletedAt,RUBRICCRITERIumId) VALUES
	 ('Nivel deseado',8.0,'','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,21),
	 ('Nivel deseado',2.0,'','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,22),
	 ('Nivel deseado',5.0,'','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,23),
	 ('Nivel deseado',5.0,'','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,24),
	 ('Nivel deseado',4.0,'El alumno contextualiza claramente el problema, respaldando y justificando fuertemente la ejecución de su proyecto de tesis, el cual tiene como objetivo desarrollar una propuesta de solución a la problemática que ha sido identificada. El problema a solucionar debe ser relevante y de la magnitud de un proyecto de fin de carrera.','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,25),
	 ('Nivel deseado',2.0,'Cobertura de conceptos: por lo menos todos los conceptos presentados en la problemática han sido incluidos en el marco. Detalle de conceptos: Deben detallarse los conceptos de una forma más amplia que en la problemática. En algunos casos para comprender los conceptos es necesario incluir ejemplos. En caso de ser necesario usar ejemplo, estos deberán ser reales y basados en la problemática.','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,26),
	 ('Nivel deseado',2.0,'El alumno explica de forma resumida el método empleado para la revisión. El alumno ha realizado una revisión extensa de las fuentes que son relevantes para el desarrollo de su proyecto de tesis. Realiza una apropiada citación de los estudios más pertinentes en el campo, incluyendo artículos científicos y tesis previamente realizadas. En el caso de proyectos enfocados al desarrollo de software, establece un análisis comparativos de productos similares que existen en el mercado, e indica los aspectos que diferencian a su propuesta, justificando en base a esta revisión que su proyecto es innovador, original, correcto, novedoso y suficientemente complejo como para ser un proyecto de tesis de pregrado. Establece una excelente síntesis y organización de la literatura que está claramente vinculada al problema de investigación. El alumno utiliza la revisión de la literatura para fundamentar el desarrollo de su propuesta de tesis (pone en evidencia el vacío a ser cubierto por el trabajo de tesis).','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,27),
	 ('Nivel deseado',5.0,'Los objetivos guardan relación con la problemática principal, identificada a través de alguna de las técnicas para el planteamiento del problema como: árbol de problema, y el desarrollo de la propuesta de solución. Son entendibles, claros y bien delimitados. El objetivo general indica lo que se pretende alcanzar en el proyecto. Los objetivos específicos indican lo que se pretende realizar en cada una de las etapas del proceso de investigación. El alumno hace uso de verbos en infinitivo. Tanto el objetivo principal como los específicos responden a lo que se quiere alcanzar y lo que se desea lograr. Existe congruencia entre objetivo general y específicos.','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,28),
	 ('Nivel deseado',5.0,'Los resultados están organizados apropiadamente en función de los objetivos, la solución propuesta y el planteamiento teórico que lo sustenta. Están convenientemente redactados. Se han establecido correctamente los medios de verificación en la tabla de mapeo de los resultados.','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,29),
	 ('Nivel deseado',2.0,'La redacción es fluida, clara, concisa y entendible. La gramática y ortografía son correctas. No hay errores. Existe transiciones claras entre capítulos y párrafos (o cualquier división que se utilice). Se aplica apropiadamente el formato de citación en el texto y bibliografía, así como referencias correctamente descritas en todo el documento.','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,30);
INSERT INTO wartech.LEVEL_CRITERIA (name,maxScore,description,createdAt,updatedAt,deletedAt,RUBRICCRITERIumId) VALUES
	 ('Nivel deseado',5.0,'','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,31),
	 ('Nivel deseado',4.0,'','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,32),
	 ('Nivel deseado',5.0,'','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,33),
	 ('Nivel deseado',4.0,'','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,34),
	 ('Nivel deseado',2.0,'','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,35),
	 ('Nivel deseado',5.0,'','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,36),
	 ('Nivel deseado',4.0,'','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,37),
	 ('Nivel deseado',5.0,'','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,38),
	 ('Nivel deseado',4.0,'','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,39),
	 ('Nivel deseado',2.0,'','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,40);
INSERT INTO wartech.LEVEL_CRITERIA (name,maxScore,description,createdAt,updatedAt,deletedAt,RUBRICCRITERIumId) VALUES
	 ('Nivel deseado',5.0,'','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,41),
	 ('Nivel deseado',4.0,'','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,42),
	 ('Nivel deseado',4.0,'','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,43),
	 ('Nivel deseado',2.0,'','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,44),
	 ('Nivel deseado',1.0,'','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,45),
	 ('Nivel deseado',4.0,'','0000-00-00 00:00:00','0000-00-00 00:00:00',NULL,46);


INSERT INTO wartech.ASSIGNMENT_SCORE (obtainedScore,notes,createdAt,updatedAt,deletedAt,ASSIGNMENTXSTUDENTId,ASSIGNMENTXSTUDENTXREVISORId,LEVELCRITERIumId) VALUES
	 (0.0,'Ninguna observación','2022-08-01 00:00:00','2022-08-01 00:00:00',NULL,25,10,25),
	 (0.0,'Ninguna observación','2022-08-01 00:00:00','2022-08-01 00:00:00',NULL,25,10,26),
	 (0.0,'Ninguna observación','2022-08-01 00:00:00','2022-08-01 00:00:00',NULL,25,10,27),
	 (0.0,'Ninguna observación','2022-08-01 00:00:00','2022-08-01 00:00:00',NULL,25,10,28),
	 (0.0,'Ninguna observación','2022-08-01 00:00:00','2022-08-01 00:00:00',NULL,25,10,29),
	 (0.0,'Ninguna observación','2022-08-01 00:00:00','2022-08-01 00:00:00',NULL,25,10,30);

