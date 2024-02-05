USE [school-registration-db]
GO

/****** Object:  StoredProcedure [dbo].[spInsertStudent]    Script Date: 2024-02-04 11:38:05 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[spInsertStudent]
@first_name nvarchar(50),
@last_name nvarchar(50),
@gender nchar(10),
@active bit
AS
BEGIN
	INSERT INTO students (first_name,last_name,gender,active)
	VALUES (@first_name,@last_name,@gender,@active);
END
GO


