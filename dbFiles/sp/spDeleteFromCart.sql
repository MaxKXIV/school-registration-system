CREATE OR ALTER PROC spDeleteFromCart
@section_id int,
@student_id int
as
BEGIN
	Delete from cart where id = @section_id AND student_id = @student_id;
END

