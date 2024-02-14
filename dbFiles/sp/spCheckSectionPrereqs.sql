CREATE OR ALTER PROC spCheckSectionPrereqs
@section_id int
as
BEGIN
select  prereq_number,prereq_symbol as numPrereqsTaken
from 
	(mvcurrentcourses join prereqs 
	on 
	mvcurrentcourses.course_number = prereqs.course_number AND 
	mvcurrentcourses.course_symbol = prereqs.course_symbol) 
where 
mvcurrentcourses.id = @section_id
END