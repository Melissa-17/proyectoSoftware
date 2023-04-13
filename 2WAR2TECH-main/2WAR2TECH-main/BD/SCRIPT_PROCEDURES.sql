-- PROCEDURES BRYAN
DROP PROCEDURE IF EXISTS PR_CONSOLE_LOG;
DROP PROCEDURE IF EXISTS PR_LOGIN;
DROP PROCEDURE IF EXISTS PR_INSERT_USER;
DROP PROCEDURE IF EXISTS PR_GET_ROLES_ALL;
DROP PROCEDURE IF EXISTS PR_GET_FACULTIES_ALL;
DROP PROCEDURE IF EXISTS PR_GET_SPECIALTIES_X_FACULTY;
DROP PROCEDURE IF EXISTS PR_GET_COURSES_FILTERED;

DELIMITER $

CREATE PROCEDURE PR_CONSOLE_LOG(
	IN p_msg VARCHAR(1000)
)
BEGIN
	INSERT INTO SYSLOG (DATEOPE, MESSAGE) VALUES (SYSDATE(), p_msg);
END$

CREATE PROCEDURE PR_INSERT_USER(
	IN p_name 	   	 VARCHAR(200),
    IN p_f_last_name VARCHAR(200),
    IN p_m_last_name VARCHAR(200),
    IN p_pucp_code 	 VARCHAR(8)  ,
    IN p_email     	 VARCHAR(200),
    IN p_user_type 	 VARCHAR(1)  ,
    IN p_specialty 	 VARCHAR(200),
    IN p_course    	 VARCHAR(200),
    IN p_semester  	 VARCHAR(200),
    IN p_telephone   VARCHAR(9)  ,
    IN p_pwd		 VARCHAR(200)
)
BEGIN	
    DECLARE v_user_type      INT;
    DECLARE v_specialty      INT;
    DECLARE v_course         INT;
    DECLARE v_semester       INT;
    DECLARE v_id_user		 INT;
    DECLARE v_count			 INT;
    DECLARE v_message        VARCHAR(1000);
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
        GET DIAGNOSTICS CONDITION 1
		v_message = MESSAGE_TEXT;
	END;

	SET v_user_type := CONVERT(p_user_type, UNSIGNED);
    SET v_specialty := CONVERT(p_specialty, UNSIGNED);
    SET v_course    := CONVERT(p_course   , UNSIGNED);
    SET v_semester  := CONVERT(p_semester , UNSIGNED);
    SELECT COUNT(*) INTO v_count FROM `USER` WHERE EMAIL = p_email;
    
    IF v_count = 0 THEN
		INSERT INTO USER 
		(ID_COURSE, ID_SEMESTER, ID_SPECIALTY, `NAMES`, F_LAST_NAME, M_LAST_NAME, TELEPHONE, EMAIL, `PASSWORD`, REG_DATE) VALUES 
		(v_course, v_semester, v_specialty, p_names, p_f_last_name, p_m_last_name, p_telephone, p_email, p_pwd, SYSDATE());
		
		SET v_id_user  := LAST_INSERT_ID();
		
		INSERT INTO USER_X_ROLE
        (ID_USER, ID_ROLE) VALUES
        (v_id_user, v_user_type);
        
        SET v_message := 'Usuario creado correctamente.';
	ELSE
		SET v_message := 'Este email ya está en uso.';
	END IF;
    SELECT v_id_user AS id_user, v_message AS msg;
END$

CREATE PROCEDURE PR_LOGIN(
	IN p_email VARCHAR(200),
	IN p_pwd   VARCHAR(200)
)
BEGIN
	DECLARE v_id_user INT;
	SELECT COUNT(*) AS login FROM `USER` WHERE EMAIL = p_email AND `PASSWORD` = p_pwd;
	SELECT ID_USER INTO v_id_user FROM `USER` WHERE EMAIL = p_email AND `PASSWORD` = p_pwd;
    
    IF v_id_user IS NOT NULL THEN
		SELECT ID_ROLE AS roles FROM USER_X_ROLE WHERE ID_USER = v_id_user;
    END IF;
END$

CREATE PROCEDURE PR_GET_ROLES_ALL()
BEGIN
    SELECT ID_ROLE AS id_role, `DESCRIPTION` AS `description` FROM `ROLE`;
END$

CREATE PROCEDURE PR_GET_FACULTIES_ALL()
BEGIN
	SELECT ID_FACULTY AS id_faculty, `NAME` AS `name` WHERE `ACTIVE` = 1;
END$

CREATE PROCEDURE PR_GET_SPECIALTIES_X_FACULTY(
	IN p_id_faculty VARCHAR(200)
)
BEGIN
	DECLARE v_id_faculty INT;
    SET v_id_faculty = CONVERT(p_id_faculty, UNSIGNED);
    
    SELECT ID_SPECIALTY AS id_specialty, `NAME` AS `name` FROM SPECIALTY WHERE `ACTIVE` = 1;
END$

CREATE PROCEDURE PR_GET_COURSES_FILTERED(
    IN p_id_specialty VARCHAR(200),
    IN p_id_semester  VARCHAR(200)
)
BEGIN
    DECLARE v_id_specialty INT;
    DECLARE v_id_semester  INT;
    SET v_id_specialty := CONVERT(p_id_specialty, UNSIGNED);
    SET v_id_semester  := CONVERT(p_id_semester , UNSIGNED);
    
    SELECT c.ID_COURSE AS id_course, c.`NAME` AS `name`, c.CREDITS AS credits, cs.THEME_QUANTITY AS theme_quantity
    FROM COURSE c INNER JOIN COURSE_X_SEMESTER cs 
    ON c.ID_COURSE = cs.ID_COURSE 
    WHERE ID_SEMESTER = v_id_semester 
    AND ID_SPECIALTY = v_id_specialty 
    AND cs.`ACTIVE` = 1 AND c.`ACTIVE` = 1;
END$