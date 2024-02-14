USE [school-registration-db]
GO

/****** Object:  StoredProcedure [dbo].[spGetSectionByID]    Script Date: 2024-02-11 11:08:15 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create proc [dbo].[spGetSectionByID]
@id[int] 
As
BEGIN
	select * from mvcurrentcourses 
	where id=@id
END
GO


