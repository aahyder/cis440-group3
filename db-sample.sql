CREATE DATABASE cis440db;

SHOW DATABASES;

USE cis440db;

CREATE TABLE IF NOT EXISTS UserType (
	UserTypeID 			BIGINT 			AUTO_INCREMENT		NOT NULL,
    TypeName			VARCHAR(10)		NOT NULL,
    AnonymousStatus		BOOLEAN			NOT NULL,
    AdminStatus			BOOLEAN			NOT NULL,
    TermDate			DATETIME		DEFAULT NULL,
    SysCreateDate		DATETIME		NOT NULL			DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (UserTypeID)
);

CREATE TABLE IF NOT EXISTS Department (
	DepartmentID		BIGINT 			AUTO_INCREMENT		NOT NULL,
    DepartmentName		VARCHAR(25)		NOT NULL,
    TermDate			DATETIME		DEFAULT NULL,
    SysCreateDate		DATETIME		NOT NULL			DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (DepartmentID)
);

CREATE TABLE IF NOT EXISTS Users (
	UserID 				BIGINT 			AUTO_INCREMENT		NOT NULL,
    UserTypeID			BIGINT			NOT NULL,
    DepartmentID		BIGINT			NOT NULL,
    JobTitle			VARCHAR(50)		NOT NULL,
    EmailAddress		VARCHAR(50)		NOT NULL,
    FirstName			VARCHAR(25)		NOT NULL,
    LastName			VARCHAR(25)		NOT NULL,
    UserName			VARCHAR(25)		NOT NULL,
    Password			VARCHAR(25)		NOT NULL,
    TermDate			DATETIME		DEFAULT NULL,
    SysCreateDate		DATETIME		NOT NULL			DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (UserID),
    CONSTRAINT FK_UserType FOREIGN KEY (UserTypeID) REFERENCES UserType(UserTypeID),
    CONSTRAINT FK_Department FOREIGN KEY (DepartmentID) REFERENCES Department(DepartmentID)
);

INSERT INTO UserType
		(TypeName,
		 AnonymousStatus,
		 AdminStatus)
	VALUES
("Admin",1,1),
("User",1,0),
("Manager",0,0);

INSERT INTO Department
		(DepartmentName)
	VALUES
("Information Technology"),
("Operations"),
("Legal"),
("Finance"),
("Human Resources"),
("Website Support");

INSERT INTO Users
		(UserTypeID,
         DepartmentID,
         JobTitle,
         EmailAddress,
         FirstName,
		 LastName,
         UserName,
         Password)
	VALUES
(1,6,"Website Admin","dummyemail1@nomail.com","Test1","User1","testuser1","test1236"),
(2,3,"General Counsel","dummyemail13@nomail.com","Test2","User2","testuser2","test1234"),
(3,3,"Lead Counsel","dummyemail13@nomail.com","Test3","User3","testuser3","test1234"),
(2,2,"Software Developer","dummyemail12@nomail.com","Test4","User4","testuser4","test1234"),
(3,3,"Engineering Team Lead","dummyemail12@nomail.com","Test5","User5","testuser5","test1234");

DELIMITER $$

CREATE PROCEDURE checkLogIn (
	IN userName VARCHAR(25), 
    IN pass VARCHAR(25)
	)
BEGIN
	DECLARE valid INT;
    
	SET valid = (SELECT COUNT(*) FROM cis440db.Users WHERE UserName = userName AND Password = pass);
    
    IF (valid = 1) THEN
		SET @valid = 1;
	ELSE
		SET @valid = 0;
	END IF;
    
    SELECT @valid;
END$$

DELIMITER ;

ALTER USER 'myaccount'@'localhost' IDENTIFIED WITH mysql_native_password BY 'mypassword';

SELECT * FROM Department;
SELECT * FROM UserType;
SELECT * FROM Users;