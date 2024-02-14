USE [school-registration-db]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[mvcurrentcourses]
WITH SchemaBinding
as
SELECT
	teachers.teacher_id,
	teachers.first_name,
	teachers.last_name,
	sections.id,
	sections.section_id,
	sections.year,
	sections.semester,
	sections.start_time,
	sections.end_time,
	sections.day,
	sections.course_symbol,
	sections.course_number,
	courses.course_name,
	courses.credits
FROM
	dbo.teachers,
	dbo.sections,
	dbo.courses
WHERE
	sections.year > 2023
	AND sections.course_symbol = courses.course_symbol
	AND sections.course_number = courses.course_number
	AND teachers.teacher_id = sections.teacher_id
GO

create unique clustered index UCI_currentcourses
on [dbo].[mvcurrentcourses](id)
GO

create nonclustered index NCI_currentcourses on mvcurrentcourses(course_symbol)

