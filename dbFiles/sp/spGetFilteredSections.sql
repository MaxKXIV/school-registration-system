USE [school-registration-db]
GO

/****** Object:  StoredProcedure [dbo].[spGetFilteredSections]    Script Date: 2024-02-11 11:07:17 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE OR ALTER PROC [dbo].[spGetFilteredSections]
	@course_symbol [nchar](10) = NULL,
	@course_number int = NULL,
	@semester [nvarchar](50) = NULL,
	@year int = NULL,
	@start_time smallint = NULL,
	@end_time smallint = NULL,
	@day [smallint] = NULL
	AS
	Begin
	SELECT TOP 30 * 
	FROM mvcurrentcourses 
	WHERE 
	(course_symbol = @course_symbol OR @course_symbol IS NULL)
	AND 
	(course_number = @course_number OR @course_number IS NULL )
	AND
	(semester = @semester OR @semester IS NULL)
	AND
	(year = @year OR @year IS NULL)
	AND
	(start_time = @start_time OR @start_time IS NULL)
	AND
	(end_time = @end_time OR @end_time IS NULL)
	AND
	(day = @day OR @day IS NULL);
	End


GO


