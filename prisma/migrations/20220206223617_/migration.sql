-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "topCourseID" TEXT,
    "midCourseID" TEXT,
    "lowCourseID" TEXT,
    "gradeID" TEXT,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);
