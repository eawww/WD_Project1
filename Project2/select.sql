--3.1
SELECT DISTINCT Author.Name
FROM Author
INNER JOIN Authorship
ON Author.ID = Authorship.Author_ID
INNER JOIN Book
ON Book.ISBN = Authorship.Book_ID
WHERE Book.YearIssued=2002;

--3.2
SELECT Book.Title, COUNT(*) AS 'Number Of Copies'
FROM Book
INNER JOIN Copy
ON Book.ISBN = Copy.Book_ID
GROUP BY Copy.Book_ID;

--3.3
SELECT DISTINCT Loan.copyID, Book.Title
FROM Loan
INNER JOIN Copy
ON Loan.copyID = Copy.barCode
INNER JOIN Book
ON Copy.Book_ID = Book.ISBN
WHERE Loan.borrowDate < '2012-12-31' AND Loan.borrowDate > '2009-12-31';

--3.4
SELECT Loan.memberID, Member.Name, Loan.copyID, Book.Title
FROM Loan
INNER JOIN Copy
ON Loan.copyID = Copy.barCode
INNER JOIN Book
ON Copy.Book_ID = Book.ISBN
INNER JOIN Member
ON Loan.memberID = member.ID
WHERE Loan.status = 1;