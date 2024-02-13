USE [school-registration-db]
GO
/*
This materialistic view ill have all the courses taken before by active students.
*/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[mvactivetakes]
WITH SCHEMABINDING
AS
SELECT 
    students.student_id,
    takes.id,
    sections.course_symbol,
    sections.course_number,
    takes.grades
FROM 
    dbo.takes,
    dbo.students,
    dbo.sections
WHERE 
    students.active = 1 
    AND sections.year < 2024
    AND students.student_id = takes.student_id
    AND takes.id = sections.id;
GO

CREATE UNIQUE CLUSTERED INDEX uci_activetakes
on [dbo].[mvactivetakes](student_id)
GO

