USE [school-registration-db]
GO

/****** Object:  Table [dbo].[prereqs]    Script Date: 2024-02-05 11:40:41 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[prereqs](
	[course_id] [int] NOT NULL,
	[prereq_id] [int] NOT NULL,
 CONSTRAINT [PK_prereqs] PRIMARY KEY CLUSTERED 
(
	[course_id] ASC,
	[prereq_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[prereqs]  WITH CHECK ADD FOREIGN KEY([course_id])
REFERENCES [dbo].[courses] ([course_id])
GO

ALTER TABLE [dbo].[prereqs]  WITH CHECK ADD FOREIGN KEY([prereq_id])
REFERENCES [dbo].[courses] ([course_id])
GO


