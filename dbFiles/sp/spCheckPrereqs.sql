CREATE OR ALTER PROC spCheckPrereqs
@section_id int,
@student_id int
as
BEGIN
select  count(*) as numPrereqsTaken
from 
	(mvcurrentcourses join prereqs 
	on 
	mvcurrentcourses.course_number = prereqs.course_number AND 
	mvcurrentcourses.course_symbol = prereqs.course_symbol) 
where 
mvcurrentcourses.id = @section_id
AND exists(
	select course_number,course_symbol 
	from mvactivetakes 
	where student_id = @student_id AND 
	prereq_symbol = course_symbol AND
	prereq_number = course_number)
END



