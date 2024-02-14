CREATE OR ALTER PROC spRegisterForClass
@section_id int,
@student_id int
as
BEGIN
IF EXISTS (select * from (select count(student_id) as number_taking from mvactivetakes where id = @section_id) t1 where t1.number_taking < 20)
	INSERT INTO takes values (@section_id,@student_id,null);
	Delete from cart where id = @section_id AND student_id = @student_id;
END

