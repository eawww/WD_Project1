INSERT INTO Author(ID, Name)
VALUES
('1', 'Soren Lausen'),
('2', 'Robert Lafore'),
('3', 'Adam Trachtenberg'),
('4', 'David Sklar'),
('5', 'Kevin Tatroe');

INSERT INTO Book(ISBN, Title, Edition, YearIssued)
VALUES
('0672324539', 'Data Structures and Algorithms in Java', '2', 2002),
('0321181433', 'User Interface Design: A Software Engineering Perspective', '1', 2004),
('0201745704', 'Software Requirements: Styles and Techniques', 2, 2002),
('144936375X', 'PHP Cookbook: Solutions & Examples for PHP Programmers', '3', 2014),
('1449392776', 'Programming PHP', '3', 2013);

INSERT INTO Copy(barCode, Book_ID)
VALUES
('1234567', '0672324539'),
('5432122', '0672324539'),
('1237783', '144936375X'),
('8902342', '1449392776'),
('1256231', '0321181433'),
('1117891', '0201745704');

INSERT INTO Authorship(Main, Book_ID, Author_ID)
VALUES
(true, '0672324539', '2'),
(true, '0321181433', '1'),
(true, '0201745704', '1'),
(true, '144936375X', '4'),
(false, '144936375X', '3'),
(true, '1449392776', '5');

INSERT INTO Member(Name, Gender, Email)
VALUES
('Adam Smith', 1, 'smith@library.us'),
('Jane Jackson', 2, 'jane@library.us'),
('Joseph Davis', 1, 'joseph@library.us'),
('Yusif Kareem', 1, 'yusif@library.us'),
('Jasmin Harris', 2, 'jasmin@library.us');

INSERT INTO Loan(copyID, memberID, borrowDate, returnDate, status)
VALUES
('1234567', 1, '2010-06-01', '2010-06-10', 2),
('1234567', 2, '2011-02-15', '2011-02-20', 2),
('5432122', 1, '2011-07-01', '2011-07-05', 2),
('1237783', 5, '2012-07-15', '2012-08-01', 2),
('1237783', 4, '2013-02-01', NULL, 3),
('8902342', 3, '2013-10-12', NULL, 1);