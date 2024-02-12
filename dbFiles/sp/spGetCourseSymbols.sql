USE [school-registration-db]
GO

/****** Object:  StoredProcedure [dbo].[spGetCourseSymbols]    Script Date: 2024-02-11 11:06:28 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[spGetCourseSymbols]
	AS
	Begin
	SELECT DISTINCT TRIM(course_symbol) AS course_symbol from courses 
	End
GO


