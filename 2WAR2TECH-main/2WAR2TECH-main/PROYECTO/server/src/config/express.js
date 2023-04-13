import cors from 'cors';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import bodyParser from 'body-parser';

import '#Models/Relationship/RelationshipConfig.js'

import testUserRouter from '#Routes/testUserRouter.js';
import createUserRouter from '#Routes/createUserRouter.js';
import commentRouter from '#Routes/CommentRouter.js';
import userRouter  from '#Routes/UserRouter.js';
import partialAssignmentRouter from '#Routes/partialAssignmentRouter.js';
import finalAssignmentRouter from '#Routes/FinalAssignmentRouter.js';
import advanceRouter from '#Routes/AdvanceRouter.js';
import expositionRouter from '#Routes/expositionsRouter.js';
import tokenVerify from '#Middleware/tokenVerify.js';
import FileRouter from '#Routes/FileRouter.js';
import roleRouter from '#Routes/RoleRouter.js';
import assignmentScoreRouter from '#Routes/assignmentScoreRouter.js';
import semesterRouter from '#Routes/semesterRouter.js';
import assigmentxStudentxRevisorRouter from '#Routes/AssignmentxStudentxRevisorRouter.js';
import CoursesXSemesterxUserRouter from '#Routes/CourseXSemesterXUserRouter.js';
import courseRouter from '#Routes/CourseRouter.js';
import ThesisRouter from '#Routes/ThesisRouter.js';
import specialtyRouter from '#Routes/SpecialtyRouter.js';
import seekerRouter from '#Routes/SeekerRouter.js';
import PostulationPeriodRouter from '#Routes/PostulationPeriodRouter.js';
import rubricRouter from '#Routes/RubricRouter.js';
import rubricCriteriaRouter from '#Routes/RubricCriteriaRouter.js';
import programmedExposition from '#Routes/ProgrammedExpositionRouter.js';
import CalificationRouter from '#Routes/CalificationRouter.js';
import FacultyRouter from '#Routes/FacultyRouter.js';
import reportRouter from '#Routes/reportesRouter.js';
import utilitiesRouter from '#Routes/UtilitiesRouter.js';
import horarioRouter from '#Routes/HorarioRouter.js';

//import { bodyParser } from 'body-parser';
// import pkg from 'body-parser';
// const { bodyParser } = pkg;

const expressApp = express();

// Middlewares
expressApp.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true
}));

expressApp.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

// BodyParser
expressApp.use(bodyParser.urlencoded({
    extended: true
}));
expressApp.use(bodyParser.json());

/* Configuracion de PassportJS */
expressApp.use(passport.initialize());
expressApp.use(passport.session());

// Routes
expressApp.use('/test-user', testUserRouter);
expressApp.use('/config', createUserRouter);
expressApp.use(utilitiesRouter);
expressApp.use(express.json());

// NO MOVER
expressApp.use(tokenVerify);

expressApp.use(finalAssignmentRouter);
expressApp.use(ThesisRouter);
expressApp.use(reportRouter);
expressApp.use(horarioRouter);
expressApp.use(expositionRouter);
expressApp.use(courseRouter);
expressApp.use(semesterRouter);
expressApp.use(userRouter);
expressApp.use(assigmentxStudentxRevisorRouter);
expressApp.use(seekerRouter);
expressApp.use(specialtyRouter);
expressApp.use(rubricRouter);
expressApp.use(programmedExposition);
expressApp.use(FacultyRouter);
expressApp.use(partialAssignmentRouter);
expressApp.use(CalificationRouter);
expressApp.use(rubricCriteriaRouter);
expressApp.use(assignmentScoreRouter);
expressApp.use(PostulationPeriodRouter);
expressApp.use(CoursesXSemesterxUserRouter);
expressApp.use(FileRouter);
expressApp.use(roleRouter);
expressApp.use(commentRouter);
expressApp.use(advanceRouter);

export default expressApp;
