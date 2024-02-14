CREATE OR ALTER PROC spInsertIntoCart
@section_id int,
@student_id int
as
BEGIN
insert into cart values(@section_id,@student_id)
END

