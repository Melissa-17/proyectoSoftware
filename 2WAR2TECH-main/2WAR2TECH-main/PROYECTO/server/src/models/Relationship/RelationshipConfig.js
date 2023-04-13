import { 
    AssignmentModel, 
    AssignmentScoreModel,
    AssignmentXRoleModel,
    AssignmentTaskModel, 
    AssignmentXStudentModel, 
    AssignmentXStudentXRevisorModel, 
    BlockModel,
    CourseXSemesterModel,
    CalificationModel, 
    CalificationXAssignmentModel,
    CommentModel,
    CourseModel,
    FacultyModel,
    LevelCriteriaModel,
    PostulationPeriodModel,
    RoleModel,
    RubricCriteriaModel,
    RubricModel,
    SemesterModel,
    SpecialtyModel,
    TeamModel,
    ThesisModel,
    ThesisTrazabilityModel,
    UserModel,
    UserXCourseXSemesterModel,
    UserXRoleModel,
    UserXTeamXThesisModel,
    UserXThesisModel,
    UserXSpecialtyModel,
    FileModel,
    
} from '#Models/index.js';

/* Super NxN Relationship - User X Assignment - Intermediate Table: AsignmentXStudent */
UserModel.belongsToMany(AssignmentModel, { through: { model: AssignmentXStudentModel, unique: false }});
AssignmentModel.belongsToMany(UserModel, { through: { model: AssignmentXStudentModel, unique: false }}) ;

UserModel.hasMany(AssignmentXStudentModel);
AssignmentXStudentModel.belongsTo(UserModel);

AssignmentModel.hasMany(AssignmentXStudentModel);
AssignmentXStudentModel.belongsTo(AssignmentModel);

/* 1xN Relationship - AssignmentXStudent X File */
AssignmentXStudentModel.hasMany(FileModel);
FileModel.belongsTo(AssignmentXStudentModel);

/* 1xN Relationship - AssignmentXStudentXRevisor X File */
AssignmentXStudentXRevisorModel.hasMany(FileModel);
FileModel.belongsTo(AssignmentXStudentXRevisorModel);

/* 1xN Relationship - User X File */
UserModel.hasMany(FileModel, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
FileModel.belongsTo(UserModel, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

/* 1xN Relationship - Assignment X AssignmentTask */
AssignmentModel.hasMany(AssignmentTaskModel);
AssignmentTaskModel.belongsTo(AssignmentModel);

/* Super NxN Relationship - AsignmentXStudent X User - Intermediate Table : AsignmentXStudentXRevisor */
AssignmentXStudentModel.belongsToMany(UserModel, { through: { model: AssignmentXStudentXRevisorModel, unique: false }});
UserModel.belongsToMany(AssignmentXStudentModel, { through: { model: AssignmentXStudentXRevisorModel, unique: false }});

AssignmentXStudentModel.hasMany(AssignmentXStudentXRevisorModel);
AssignmentXStudentXRevisorModel.belongsTo(AssignmentXStudentModel);

UserModel.hasMany(AssignmentXStudentXRevisorModel);
AssignmentXStudentXRevisorModel.belongsTo(UserModel);

/* Super NxN Relationship - AsignmentXStudent X AssignmentXStudentXRevisorModel - Intermediate Table : AssignmentScoreModel */
AssignmentXStudentModel.belongsToMany(AssignmentXStudentXRevisorModel, { through: { model: AssignmentScoreModel, unique: false }});
AssignmentXStudentXRevisorModel.belongsToMany(AssignmentXStudentModel, { through: { model: AssignmentScoreModel, unique: false }});

AssignmentXStudentModel.hasMany(AssignmentScoreModel);
AssignmentScoreModel.belongsTo(AssignmentXStudentModel);

AssignmentXStudentXRevisorModel.hasMany(AssignmentScoreModel);
AssignmentScoreModel.belongsTo(AssignmentXStudentXRevisorModel);

/* NxN Relationship - AsignmentXStudent X User - Intermediate Table : Comment */
AssignmentXStudentModel.belongsToMany(UserModel, { through: { model: CommentModel, unique: false }});
UserModel.belongsToMany(AssignmentXStudentModel, { through: { model: CommentModel, unique: false }});

AssignmentXStudentModel.hasMany(CommentModel);
CommentModel.belongsTo(AssignmentXStudentModel);

UserModel.hasMany(CommentModel);
CommentModel.belongsTo(UserModel);


/* NxN Relationship - User X Role - Intermediate Table : UserXRole */
UserModel.belongsToMany(RoleModel, { through: { model: UserXRoleModel, unique: false }});
RoleModel.belongsToMany(UserModel, { through: { model: UserXRoleModel, unique: false }});

UserModel.hasMany(UserXRoleModel);
UserXRoleModel.belongsTo(UserModel);

RoleModel.hasMany(UserXRoleModel);
UserXRoleModel.belongsTo(RoleModel);

/* NxN Relationship - User X CourseXSemester - Intermediate Table : UserXCourseXSemester */
UserModel.belongsToMany(CourseXSemesterModel, { through: { model: UserXCourseXSemesterModel, unique: false }});
CourseXSemesterModel.belongsToMany(UserModel, { through: { model: UserXCourseXSemesterModel, unique: false }});

UserModel.hasMany(UserXCourseXSemesterModel);
UserXCourseXSemesterModel.belongsTo(UserModel);

CourseXSemesterModel.hasMany(UserXCourseXSemesterModel);
UserXCourseXSemesterModel.belongsTo(CourseXSemesterModel);

/* Super NxN Relationship - User X Specialty - Intermediate Table */
UserModel.belongsToMany(SpecialtyModel, { through: { model: UserXSpecialtyModel, unique: false }});
SpecialtyModel.belongsToMany(UserModel, { through: { model: UserXSpecialtyModel, unique: false }});

UserModel.hasMany(UserXSpecialtyModel);
UserXSpecialtyModel.belongsTo(UserModel);

SpecialtyModel.hasMany(UserXSpecialtyModel);
UserXSpecialtyModel.belongsTo(SpecialtyModel);


/* 1xN Relationship - Faculty X Specialty */
FacultyModel.hasMany(SpecialtyModel);
SpecialtyModel.belongsTo(FacultyModel);

/* 1xN Relationship - Specialty X Course */
SpecialtyModel.hasMany(CourseModel);
CourseModel.belongsTo(SpecialtyModel);

/* 1xN Relationship - Specialty X Semester  */
// SpecialtyModel.hasMany(SemesterModel);
// SemesterModel.belongsTo(SpecialtyModel);

/* NxN Relationship - Course X Semester - Intermediate Table: CourseXSemester */
CourseModel.belongsToMany(SemesterModel, { through: { model: CourseXSemesterModel, unique: false }});
SemesterModel.belongsToMany(CourseModel, { through: { model: CourseXSemesterModel, unique: false }});

CourseModel.hasMany(CourseXSemesterModel);
CourseXSemesterModel.belongsTo(CourseModel);

SemesterModel.hasMany(CourseXSemesterModel);
CourseXSemesterModel.belongsTo(SemesterModel);

/* 1xN Relationship - CourseXSemester X Assignment */
CourseXSemesterModel.hasMany(AssignmentModel);
AssignmentModel.belongsTo(CourseXSemesterModel);


/* NxN Relationship - Assignment X Role - Intermediate Table: ASSIGNMENT_X_ROLE */
AssignmentModel.belongsToMany(RoleModel, { through: { model: AssignmentXRoleModel, unique: false }});
RoleModel.belongsToMany(AssignmentModel, { through: { model: AssignmentXRoleModel, unique: false }});

AssignmentModel.hasMany(AssignmentXRoleModel);
AssignmentXRoleModel.belongsTo(AssignmentModel);

RoleModel.hasMany(AssignmentXRoleModel);
AssignmentXRoleModel.belongsTo(RoleModel);

/* NxN Relationship - Calification X Assignment - Intermediate Table: CalificationXAssignment */
CalificationModel.belongsToMany(AssignmentModel, { through: { model: CalificationXAssignmentModel, unique: false }});
AssignmentModel.belongsToMany(CalificationModel, { through: { model: CalificationXAssignmentModel, unique: false }});

CalificationModel.hasMany(CalificationXAssignmentModel);
CalificationXAssignmentModel.belongsTo(CalificationModel);

AssignmentModel.hasMany(CalificationXAssignmentModel);
CalificationXAssignmentModel.belongsTo(AssignmentModel);

/* 1xN Relationship - Calification X CourseXSemester */
CourseXSemesterModel.hasMany(CalificationModel);
CalificationModel.belongsTo(CourseXSemesterModel);

/* 1xN Relationship - Assignment X Rubric */
// AssignmentModel.hasMany(RubricModel);
// RubricModel.belongsTo(AssignmentModel);

/* 1xN Relationship - Rubric X Assignment */
RubricModel.hasMany(AssignmentModel, { foreignKey: { allowNull: true } });
AssignmentModel.belongsTo(RubricModel, { foreignKey: { allowNull: true } });

/* 1xN Relationship - Rubric X RubricCriteria */
RubricModel.hasMany(RubricCriteriaModel);
RubricCriteriaModel.belongsTo(RubricModel);

/* 1xN Relationship - Rubric X RubricCriteria */
RubricCriteriaModel.hasMany(LevelCriteriaModel);
LevelCriteriaModel.belongsTo(RubricCriteriaModel);

/* 1xN Relationship - LevelCriteria X AssignmentScore */
LevelCriteriaModel.hasMany(AssignmentScoreModel);
AssignmentScoreModel.belongsTo(LevelCriteriaModel);

/* 1xN Relationship - Specialty X Thesis  */
SpecialtyModel.hasMany(ThesisModel);
ThesisModel.belongsTo(SpecialtyModel);

/* 1xN Relationship - Thesis X File */
ThesisModel.hasMany(FileModel, { foreignKey: { allowNull: true }, onDelete: 'CASCADE' });
FileModel.belongsTo(ThesisModel, { foreignKey: { allowNull: true }, onDelete: 'CASCADE' });

/* 1xN Relationship - PeriodPostulationModel X SpecialtyModel */
SpecialtyModel.hasMany(PostulationPeriodModel);
PostulationPeriodModel.belongsTo(SpecialtyModel);

/* NxN Relationship - User X UserXThesis - Intermediate Table: ThesisTrazability */
ThesisModel.belongsToMany(UserModel, { through: { model: ThesisTrazabilityModel, unique: false }});
UserModel.belongsToMany(ThesisModel, { through: { model: ThesisTrazabilityModel, unique: false }});

ThesisModel.hasMany(ThesisTrazabilityModel);
ThesisTrazabilityModel.belongsTo(ThesisModel);

UserModel.hasMany(ThesisTrazabilityModel);
ThesisTrazabilityModel.belongsTo(UserModel);

/* NxN Relationship - User X Thesis - Intermediate Table: UserXThesis */
UserModel.belongsToMany(ThesisModel, { through: { model: UserXThesisModel, unique: false }});
ThesisModel.belongsToMany(UserModel, { through: { model: UserXThesisModel, unique: false }});

UserModel.hasMany(UserXThesisModel);
UserXThesisModel.belongsTo(UserModel);

ThesisModel.hasMany(UserXThesisModel);
UserXThesisModel.belongsTo(ThesisModel);

/* 1xN Relationship - PeriodPostulationModel X ThesisModel */
PostulationPeriodModel.hasMany(ThesisModel, { foreignKey: { allowNull: true }});
ThesisModel.belongsTo(PostulationPeriodModel, { foreignKey: { allowNull: true }});

/* NxN Relationship - User X Team - Intermediate Table: UserXTeam */
UserXThesisModel.belongsToMany(TeamModel, { through: { model: UserXTeamXThesisModel, unique: false }});
TeamModel.belongsToMany(UserXThesisModel, { through: { model: UserXTeamXThesisModel, unique: false }});

UserXThesisModel.hasMany(UserXTeamXThesisModel);
UserXTeamXThesisModel.belongsTo(UserXThesisModel);

TeamModel.hasMany(UserXTeamXThesisModel);
UserXTeamXThesisModel.belongsTo(TeamModel);

/* 1xN Relationship - Block X Team  */
BlockModel.hasMany(TeamModel, { foreignKey: { allowNull: true }});
TeamModel.belongsTo(BlockModel, { foreignKey: { allowNull: true }});

/* 1xN Relationship -  CourseXSemester X Block  */
CourseXSemesterModel.hasMany(BlockModel, { foreignKey: { allowNull: true }});
BlockModel.belongsTo(CourseXSemesterModel, { foreignKey: { allowNull: true }});

/* 1xN Relationship -  User X Block  */
UserModel.hasMany(BlockModel, { foreignKey: { allowNull: true }});
BlockModel.belongsTo(UserModel, { foreignKey: { allowNull: true }});
