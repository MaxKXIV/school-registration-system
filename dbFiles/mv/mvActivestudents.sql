USE [school-registration-db]
GO

/* 
Materialistic View
*/

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[mvActiveStudents]
with SchemaBinding
as
SELECT student_id, first_name, last_name, gender, department_id
	FROM dbo.students
	WHERE active = 1
GO

CREATE UNIQUE CLUSTERED INDEX uciActiveStudents
ON [dbo].[mvActiveStudents](student_id)
GO