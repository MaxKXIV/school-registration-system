USE [school-registration-db]
GO

/****** Object:  Table [dbo].[prereqs]    Script Date: 2024-02-05 11:40:41 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[takes](
	[section_id] [int] NOT NULL FOREIGN KEY REFERENCES sections(section_id),
	[semester] [nvarchar](50) NOT NULL FOREIGN KEY REFERENCES sections(semester,
	[year] [int] NOT NULL FOREIGN KEY REFERENCES sections(year),
	[course_id] [int] NOT NULL FOREIGN KEY REFERENCES courses(course_id),
	[student_id] [int] NOT NULL FOREIGN KEY REFERENCES students(student_id),
	[grades] [smallInt] NULL,
)
 CONSTRAINT [PK_prereqs] PRIMARY KEY CLUSTERED 
(
	[section_id] ASC,
	[semester] ASC,
	[year] ASC,
	[course_id] ASC,
	[student_id] ASC,
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
