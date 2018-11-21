# select all tuples from table
SELECT *
FROM STUDENT AS S;
-- WHERE StuID=~

SELECT *
FROM MASTER;
-- WHERE MastID=~

SELECT *
FROM DORMITORY;
-- WHERE DormID=~

SELECT *
FROM DELIVERY;
-- WHERE DelivID=~

SELECT *
FROM MAIL;
-- WHERE MailID=~

# select STUDENT's room DELIVERY/MAIL
SELECT D.*
FROM STUDENT AS S, DELIVERY AS D
WHERE S.DormID=D.DormID and S.RoomNum=D.RoomNum;
-- and S.StuID=~

SELECT M.*
FROM STUDENT AS S, MAIL AS M
WHERE S.DormID=M.DormID and S.RoomNum=M.RoomNum;
-- and S.StuID=~

# select MASTER's dormitory DELIVERY/MAIL
SELECT D.*
FROM MASTER AS M, DELIVERY AS D
WHERE M.DormID=D.DormID;
-- and M.MastID=~

SELECT M.*
FROM MASTER AS A, MAIL AS M
WHERE A.DormID=M.DormID;
-- and A.MastID=~

# select all STUDENT/MASTER in DORMITORY
SELECT S.*
FROM STUDENT AS S, DORMITORY AS D
WHERE S.DormID=D.DormID;
-- and S.StuID=~

SELECT M.*
FROM MASTER AS M, DORMITORY AS D
WHERE M.DormID=D.DormID;
-- and M.MastID=~