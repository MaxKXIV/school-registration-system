USE [school-registration-db]
GO

/****** Object:  Table [dbo].[sections]    Script Date: 2024-02-05 11:20:34 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[sections](
	[section_id] [int] NOT NULL,
	[semester] [nvarchar](50) NOT NULL,
	[year] [int] NOT NULL,
	[course_id] [int] NOT NULL,
	[start_time] [time](7) NULL,
	[end_time] [time](7) NULL,
	[day] [smallint] NOT NULL,
	[capacity] [int] NOT NULL,
	[teacher_id] [int] NULL FOREIGN KEY REFERENCES teachers(teacher_id),
	[room_number] [int] NULL FOREIGN KEY REFERENCES classrooms(room_number),
 CONSTRAINT [PK_sections] PRIMARY KEY CLUSTERED 
(
	[section_id] ASC,
	[semester] ASC,
	[year] ASC,
	[course_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO


