USE [school-registration-db]
GO

/****** Object:  Table [dbo].[teachers]    Script Date: 2024-02-05 10:09:06 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[teachers](
	[teacher_id] [int] NOT NULL IDENTITY(1,1) PRIMARY KEY,
	[first_name] [nvarchar](50) NOT NULL,
	[last_name] [nvarchar](50) NOT NULL,
	[dept_id] [nvarchar](50) NOT NULL FOREIGN KEY REFERENCES departments(dept_id)
) ON [PRIMARY]
GO


