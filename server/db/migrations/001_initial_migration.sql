CREATE TABLE 
IF NOT EXISTS Users (
	UserId INT auto_increment primary key,
    Password varchar(255) NOT NULL,
    Email varchar(255) NOT NULL, 
    Role varchar(255) NOT NULL,
    SecurityQuestion varchar(255) NOT NULL,
    SecurityAnswer varchar(255) NOT NULL,
    ZipCode INT(5) unsigned zerofill NOT NULL
);

CREATE TABLE 
IF NOT EXISTS DisasterEvents (
	EventId INT auto_increment primary key,
    EventName varchar(255) NOT NULL,
    StartDate date,
    EndDate date,
    EventDescription varchar(255) NOT NULL,
    EventStatus boolean NOT NULL,
    EventUrgency INT NOT NULL
);

CREATE TABLE 
IF NOT EXISTS DisasterEventLocations (
	EventId INT not null,
    EventZipCode INT(5) unsigned zerofill not null,
    foreign key (EventId) references DisasterEvents(EventId)
);

CREATE TABLE 
IF NOT EXISTS Categories (
	Category varchar(255) primary key,
    CategoryDescription varchar(255)
);

CREATE TABLE 
IF NOT EXISTS Requests (
	RequestId INT auto_increment primary key,
    EventId INT not null,
    UserId Int not null,
    Category varchar(255) not null,
    RequestQuantity int not null,
    RequestStatus boolean not null,
    RequestUrgency int not null,
	foreign key (EventId) references DisasterEvents(EventId),
    foreign key (UserId) references Users(UserId),
    foreign key (Category) references Categories(Category)
);

CREATE TABLE 
IF NOT EXISTS Responses (
    ResponseId INT auto_increment primary key,
    RequestId INT NOT NULL,
    UserId INT NOT NULL,
    Quantity INT NOT NULL,
    FOREIGN KEY (RequestId) REFERENCES Requests(RequestId),
    FOREIGN KEY (UserId) REFERENCES Users(UserId)
);

CREATE TABLE 
IF NOT EXISTS Pledges (
	PledgeId Int auto_increment primary key,
	UserId Int not null,
    Category varchar(255) not null,
    Quantity int not null,
    foreign key (UserId) references Users(UserId),
    foreign key (Category) references Categories(Category)
);

Create TABLE 
IF NOT EXISTS MatchResponse (
	RequestId Int not null,
    ResponseId Int not null,
    MatchDate date, 
    foreign key (RequestId) references Requests(RequestId),
    foreign key (ResponseId) references Responses(ResponseId)
);

CREATE TABLE 
IF NOT EXISTS MatchPledge (
	RequestId int not null,
    PledgeId int not null,
    MatchDate date, 
    foreign key (RequestId) references Requests(RequestId),
    foreign key (PledgeId) references Pledges(PledgeId)
);

CREATE TABLE 
IF NOT EXISTS Notifications (
    notification_id INT AUTO_INCREMENT PRIMARY KEY;
	UserId int not null,
    Message varchar(255) not null, 
    NotificationDate date,
    NotificationRead boolean,
    foreign key (UserId) references Users(UserId)
);
