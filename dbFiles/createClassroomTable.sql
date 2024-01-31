USE [CMPT319Project]
GO

/****** Object:  Table [dbo].[classroomTable]    Script Date: 1/31/2024 12:16:26 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[classroomTable](
	[room_number] [nchar](10) NOT NULL,
	[building] [nchar](10) NOT NULL,
	[capacity] [numeric](18, 0) NOT NULL,
 CONSTRAINT [PK_classroomTable] PRIMARY KEY CLUSTERED 
(
	[room_number] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO


