USE [school-registration-db]
GO

/****** Object:  StoredProcedure [dbo].[spGetCartByStudentID]    Script Date: 2024-02-12 12:10:44 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create   proc [dbo].[spGetCartByStudentID]
@student_id [int]
as
begin
select * from cart where student_id = @student_id;
end
GO


