USE [school-registration-db]
GO

/****** Object:  StoredProcedure [dbo].[spGetCartByStudentID]    Script Date: 2024-02-12 12:10:44 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create or alter proc [dbo].[spGetCartByStudentID]
@student_id [int]
as
begin
select sections.id,section_id,semester,year,course_symbol,course_number,start_time,end_time,day,capacity,teacher_id from cart,sections where student_id = @student_id AND cart.id = sections.id;
end
GO
