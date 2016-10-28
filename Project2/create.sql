CREATE TABLE Author (
ID VARCHAR(10) NOT NULL,
Name VARCHAR(250),
PRIMARY KEY(ID),
UNIQUE(ID)
);

CREATE TABLE Book (
ISBN VARCHAR(15) NOT NULL,
Title VARCHAR(250),
Edition VARCHAR(10),
YearIssued INT,
PRIMARY KEY(ISBN)
);

CREATE TABLE Copy (
barCode VARCHAR(10) NOT NULL,
Book_ID VARCHAR(15),
PRIMARY KEY(barCode),
FOREIGN KEY(Book_ID) REFERENCES Book(ISBN)
);

CREATE TABLE Authorship (
ID INT NOT NULL AUTO_INCREMENT,
Book_ID VARCHAR(15),
Author_ID VARCHAR(10),
Main BOOLEAN,
PRIMARY KEY(ID),
FOREIGN KEY(Book_ID) REFERENCES Book(ISBN),
FOREIGN KEY(Author_ID) REFERENCES Author(ID),
UNIQUE(Book_ID, Author_ID)
);

CREATE TABLE Member (
ID INT NOT NULL AUTO_INCREMENT,
Name VARCHAR(250),
Gender ENUM('M','F'),
Email VARCHAR(250),
PRIMARY KEY(ID)
);

CREATE TABLE Loan (
ID INT NOT NULL AUTO_INCREMENT,
copyID VARCHAR(10),
memberID INT,
borrowDate DATE,
returnDate DATE,
status ENUM('Borrowed','Returned','Lost'),
PRIMARY KEY(ID),
FOREIGN KEY(copyID) REFERENCES Copy(barCode),
FOREIGN KEY(memberID) REFERENCES Member(ID)
);

