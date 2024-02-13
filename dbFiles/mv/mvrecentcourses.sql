USE [school-registration-db]
GO

-- This gives courses taken in past 5 years
-- But not sure how useful this is 
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[mvrecentcourses]
WITH SchemaBinding
as
SELECT 
	takes.id,
	takes.student_id,
	takes.grades,
	sections.course_symbol,
	sections.course_number
FROM
	dbo.takes,
	dbo.sections
WHERE
	sections.year > 2018
	AND sections.year < 2024
	AND takes.id = sections.id
GO

CREATE UNIQUE CLUSTERED INDEX uci_recentcourses
on [dbo].[mvrecentcourses](id)
GO