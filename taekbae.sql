CREATE USER IF NOT EXISTS 'cupid'@'localhost' IDENTIFIED BY '1234';
GRANT ALL PRIVILEGES ON taekbae.* TO 'cupid'@'localhost';
CREATE DATABASE IF NOT EXISTS taekbae;
USE taekbae;

CREATE TABLE DORMITORY (
	DormID integer PRIMARY KEY,
	BuildingNum varchar(5),
	BuildingName varchar(20));

CREATE TABLE DELIVERY (
	DelivID integer PRIMARY KEY NOT NULL,
	DormID integer REFERENCES DORMITORY(DormID) ON DELETE SET NULL,
	RoomNum integer,
	Receiver varchar(15) NOT NULL,
	Sender varchar(15) NOT NULL,
	Content varchar(100),
	Location varchar(100),
	State integer NOT NULL,
	ArrivalDate datetime,
	ReceiptDate datetime);

CREATE TABLE MAIL (
	MailID integer PRIMARY KEY,
	DormID integer REFERENCES DORMITORY(DormID) ON DELETE SET NULL,
	RoomNum integer,
	Receiver varchar(15) NOT NULL,
	Sender varchar(15) NOT NULL,
	Location varchar(100),
	State integer NOT NULL,
	ArrivalDate datetime,
	ReceiptDate datetime);

CREATE TABLE STUDENT (
	StuID integer PRIMARY KEY NOT NULL,
	DormID integer REFERENCES DORMITORY(DormID) ON DELETE SET NULL,
	RoomNum integer,
	StuName varchar(20) NOT NULL,
	PhoneNum integer,
	Password varchar(20) NOT NULL);

CREATE TABLE MASTER (
	MastID integer PRIMARY KEY NOT NULL,
	DormID integer REFERENCES DORMITORY(DormID) ON DELETE SET NULL,
	MastName varchar(20) NOT NULL,
	PhoneNum integer,
	Password varchar(20) NOT NULL);

DELIMITER $$
CREATE TRIGGER UpdateDelivState
	BEFORE UPDATE ON DELIVERY
	FOR EACH ROW
BEGIN
	IF NEW.State=2 THEN
		SET NEW.ReceiptDate=NOW() + INTERVAL 9 HOUR;
	ELSE
		SET NEW.ReceiptDate=NULL;
	END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER UpdateMailState
	BEFORE UPDATE ON MAIL
	FOR EACH ROW
BEGIN
	IF NEW.State=2 THEN
		SET NEW.ReceiptDate=NOW() + INTERVAL 9 HOUR;
	ELSE
		SET NEW.ReceiptDate=NULL;
	END IF;
END$$
DELIMITER ;

#tuple insertion	
#Dormitory tuples
INSERT INTO DORMITORY(DormID, BuildingNum, BuildingName) VALUES(1, 'E8', '세종관');
INSERT INTO DORMITORY(DormID, BuildingNum, BuildingName) VALUES(2, 'W3', '갈릴레이관');
INSERT INTO DORMITORY(DormID, BuildingNum, BuildingName) VALUES(3, 'W4-1', '여울관');
INSERT INTO DORMITORY(DormID, BuildingNum, BuildingName) VALUES(4, 'W4-2', '나들관');
INSERT INTO DORMITORY(DormID, BuildingNum, BuildingName) VALUES(5, 'W4-3', '다솜관');
INSERT INTO DORMITORY(DormID, BuildingNum, BuildingName) VALUES(6, 'W4-4', '희망관');
INSERT INTO DORMITORY(DormID, BuildingNum, BuildingName) VALUES(7, 'W5-1', '기혼자기숙사');
INSERT INTO DORMITORY(DormID, BuildingNum, BuildingName) VALUES(8, 'W5-2', '스타트업빌리지');
INSERT INTO DORMITORY(DormID, BuildingNum, BuildingName) VALUES(9, 'W5-3', '인터네셔널빌리지C');
INSERT INTO DORMITORY(DormID, BuildingNum, BuildingName) VALUES(10, 'W5-4', '인터네셔널빌리지A');
INSERT INTO DORMITORY(DormID, BuildingNum, BuildingName) VALUES(11, 'W5-5', '인터네셔널빌리지B');
INSERT INTO DORMITORY(DormID, BuildingNum, BuildingName) VALUES(12, 'W6-1', '미르관');
INSERT INTO DORMITORY(DormID, BuildingNum, BuildingName) VALUES(13, 'W6-2', '나래관');
INSERT INTO DORMITORY(DormID, BuildingNum, BuildingName) VALUES(14, 'W11', '외국인교수 아파트');
INSERT INTO DORMITORY(DormID, BuildingNum, BuildingName) VALUES(15, 'N14', '사랑관');
INSERT INTO DORMITORY(DormID, BuildingNum, BuildingName) VALUES(16, 'N15', '교직원 숙소');
INSERT INTO DORMITORY(DormID, BuildingNum, BuildingName) VALUES(17, 'N16', '소망관');
INSERT INTO DORMITORY(DormID, BuildingNum, BuildingName) VALUES(18, 'N17', '성실관');
INSERT INTO DORMITORY(DormID, BuildingNum, BuildingName) VALUES(19, 'N18', '진리관');
INSERT INTO DORMITORY(DormID, BuildingNum, BuildingName) VALUES(20, 'N19', '아름관');
INSERT INTO DORMITORY(DormID, BuildingNum, BuildingName) VALUES(21, 'N20', '신뢰관');
INSERT INTO DORMITORY(DormID, BuildingNum, BuildingName) VALUES(22, 'N21', '지혜관');
INSERT INTO DORMITORY(DormID, BuildingNum, BuildingName) VALUES(23, 'N27', '유레카관');

#Delivery tuples
INSERT INTO DELIVERY(DelivID, DormID, RoomNum, Receiver, Sender, Content, Location, State, ArrivalDate, ReceiptDate)
VALUES(151515, 22, 322, '윤형준', '이찬욱', '문구류', '대전광역시 유성구 구성동 한국과학기술원 지혜관 322호', 1, NOW(), NULL);

#Mail tuples
INSERT INTO MAIL(MailID, DormID, RoomNum, Receiver, Sender, Location, State, ArrivalDate, ReceiptDate)
VALUES(3030, 22, 322, '윤형준', '이찬욱', '대전광역시 유성구 구성동 한국과학기술원 지혜관 322호', 1, NOW(), NULL);

#Student tuples
INSERT INTO STUDENT(StuID, DormID, RoomNum, StuName, PhoneNum, Password) 
VALUES(20140645, 20, 104, '홍재이', 01099984612, 'abcd1234');
INSERT INTO STUDENT(StuID, DormID, RoomNum, StuName, PhoneNum, Password) 
VALUES(20140461, 22, 322, '이찬욱', 01091043774,'12345678');
INSERT INTO STUDENT(StuID, DormID, RoomNum, StuName, PhoneNum, Password)
VALUES(20150527, 18, 203, '윤형준', 01041459119,'efgd1234');

#Master tuples
INSERT INTO MASTER(MastID, DormID, MastName, PhoneNum, Password) 
VALUES(20092003, 20, '송혜교', 01037361129, '11112222');
INSERT INTO MASTER(MastID, DormID, MastName, PhoneNum, Password) 
VALUES(20091001, 22, '장동건', 01044017718, '33334444');
INSERT INTO MASTER(MastID, DormID, MastName, PhoneNum, Password) 
VALUES(20101003, 18, '현순주', 01054193300, '55556666');