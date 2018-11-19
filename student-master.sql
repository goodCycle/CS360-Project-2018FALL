#Student Table
CREATE TABLE STUDENT (
	StuID integer PRIMARY KEY NOT NULL,
    DormID integer REFERENCES DORMITORY(DormID) ON DELETE SET NULL,
    RoomNum integer,
	StuName varchar(20) NOT NULL,
	PhoneNum integer,
    Password varchar(20) NOT NULL);

#Master Table
CREATE TABLE MASTER (
	MastID integer PRIMARY KEY NOT NULL,
	DormID integer REFERENCES DORMITORY(DormID) ON DELETE SET NULL,
	MastName varchar(20) NOT NULL,
	PhoneNum integer,
    Password varchar(20) NOT NULL);

INSERT INTO STUDENT(StuID, DormID, RoomNum, StuName, PhoneNum, Password) 
VALUES(20140645, 20, 104, '홍재이', 01099984612, 'abcd1234');
INSERT INTO STUDENT(StuID, DormID, RoomNum, StuName, PhoneNum, Password) 
VALUES(20140461, 22, 322, '이찬욱', 01091043774,'12345678');
INSERT INTO STUDENT(StuID, DormID, RoomNum, StuName, PhoneNum, Password)
VALUES(20150527, 18, 203, '윤형준', 01041459119,'efgd1234');

INSERT INTO MASTER(MastID, DormID, MastName, PhoneNum, Password) 
VALUES(20092003, 20, '송혜교', 01037361129, '11112222');
INSERT INTO MASTER(MastID, DormID, MastName, PhoneNum, Password) 
VALUES(20091001, 22, '장동건', 01044017718, '33334444');
INSERT INTO MASTER(MastID, DormID, MastName, PhoneNum, Password) 
VALUES(20101003, 18, '현순주', 01054193300, '55556666');


