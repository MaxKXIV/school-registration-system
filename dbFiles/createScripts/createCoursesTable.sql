USE [school-registration-db]
GO

/****** Object:  Table [dbo].[courses]    Script Date: 2024-02-05 11:40:23 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[courses](
	[course_id] [int] NOT NULL,
	[course_symbol] [nchar](10) NOT NULL,
	[course_number] [int] NOT NULL,
	[course_name] [nvarchar](50) NOT NULL,
	[credits] [smallint] NOT NULL,
 CONSTRAINT [PK_courses] PRIMARY KEY CLUSTERED 
(
	[course_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO


