USE [school-registration-db]
GO

/****** Object:  Table [dbo].[prereqs]    Script Date: 2024-02-05 11:40:41 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[takes](
	[section_id] [int] NOT NULL,
	[semester] [nvarchar](50) NOT NULL,
	[year] [int] NOT NULL,
	[course_symbol] [nchar](10) NOT NULL,
	[course_number] [int] NOT NULL,
	[student_id] [int] NOT NULL,
	[grades] [smallInt] NULL,
 CONSTRAINT [PK_takes] PRIMARY KEY CLUSTERED 
(
	[section_id] ASC,
	[semester] ASC,
	[year] ASC,
	[course_symbol] ASC,
	[course_number] ASC,
	[student_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO


ALTER TABLE [dbo].[takes]  WITH CHECK ADD FOREIGN KEY([section_id],[semester],[year],[course_symbol],[course_number])
REFERENCES [dbo].[sections] ([section_id],[semester],[year],[course_symbol],[course_number])
GO

ALTER TABLE [dbo].[takes]  WITH CHECK ADD FOREIGN KEY([student_id])
REFERENCES [dbo].[students] ([student_id])
GO