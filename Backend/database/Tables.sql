CREATE TABLE Users (
    Username NVARCHAR(50) PRIMARY KEY, 
    PasswordHash NVARCHAR(255) NOT NULL,
    ProfilePicture NVARCHAR(500), 
    UserRole NVARCHAR(20) DEFAULT 'User' 
);

CREATE TABLE UserMusic (
    SongName NVARCHAR(150) NOT NULL,
    Genre NVARCHAR(50) NOT NULL,
    Artist NVARCHAR(100) NOT NULL,
    Album NVARCHAR(150) NOT NULL,
    AddedByUsername NVARCHAR(50) FOREIGN KEY REFERENCES Users(Username),
    AddedDate DATETIME DEFAULT GETDATE(),
    PRIMARY KEY (SongName, AddedByUsername) 
);
