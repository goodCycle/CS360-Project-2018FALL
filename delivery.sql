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
INSERT INTO DELIVERY(DelivID, DormID, RoomNum, Receiver, Sender, Content, Location, State)
VALUES(151515, 22, 322, '윤형준', '이찬욱', '문구류', '대전광역시 유성구 구성동 한국과학기술원 지혜관 322호', 1);

#Mail tuples
INSERT INTO MAIL(MailID, DormID, RoomNum, Receiver, Sender, Location, State)
VALUES(3030, 22, 322, '윤형준', '이찬욱', '대전광역시 유성구 구성동 한국과학기술원 지혜관 322호', 1);