create table Industries
(
    id        int auto_increment
        primary key,
    name      varchar(255) not null,
    createdAt datetime     not null,
    updatedAt datetime     not null,
    constraint name
        unique (name),
    constraint name_10
        unique (name),
    constraint name_11
        unique (name),
    constraint name_12
        unique (name),
    constraint name_13
        unique (name),
    constraint name_14
        unique (name),
    constraint name_15
        unique (name),
    constraint name_16
        unique (name),
    constraint name_17
        unique (name),
    constraint name_18
        unique (name),
    constraint name_19
        unique (name),
    constraint name_2
        unique (name),
    constraint name_20
        unique (name),
    constraint name_21
        unique (name),
    constraint name_22
        unique (name),
    constraint name_23
        unique (name),
    constraint name_24
        unique (name),
    constraint name_25
        unique (name),
    constraint name_26
        unique (name),
    constraint name_27
        unique (name),
    constraint name_28
        unique (name),
    constraint name_29
        unique (name),
    constraint name_3
        unique (name),
    constraint name_30
        unique (name),
    constraint name_31
        unique (name),
    constraint name_32
        unique (name),
    constraint name_33
        unique (name),
    constraint name_34
        unique (name),
    constraint name_35
        unique (name),
    constraint name_36
        unique (name),
    constraint name_37
        unique (name),
    constraint name_4
        unique (name),
    constraint name_5
        unique (name),
    constraint name_6
        unique (name),
    constraint name_7
        unique (name),
    constraint name_8
        unique (name),
    constraint name_9
        unique (name)
);

create table Categories
(
    id         int auto_increment
        primary key,
    name       varchar(255) not null,
    createdAt  datetime     not null,
    updatedAt  datetime     not null,
    IndustryId int          null,
    constraint Categories_ibfk_1
        foreign key (IndustryId) references Industries (id)
            on update cascade on delete cascade
);

create index IndustryId
    on Categories (IndustryId);

create table PricingPlans
(
    id          int auto_increment
        primary key,
    name        varchar(255) not null,
    price       int          not null,
    maxJobPosts int          not null,
    startDate   datetime     not null,
    endDate     datetime     not null,
    createdAt   datetime     not null,
    updatedAt   datetime     not null
);

create table Companies
(
    id                    int auto_increment
        primary key,
    name                  varchar(255)                       not null,
    email                 varchar(255)                       not null,
    password              varchar(255)                       not null,
    phone                 varchar(255)                       not null,
    role                  enum ('company') default 'company' null,
    createdAt             datetime                           not null,
    updatedAt             datetime                           not null,
    deletedAt             datetime                           null,
    IndustryId            int                                not null,
    PricingPlanId         int                                null,
    passwordResetCode     varchar(255)                       null,
    passwordResetExpire   datetime                           null,
    passwordResetVerified tinyint(1)                         null,
    constraint email
        unique (email),
    constraint email_10
        unique (email),
    constraint email_11
        unique (email),
    constraint email_12
        unique (email),
    constraint email_13
        unique (email),
    constraint email_14
        unique (email),
    constraint email_15
        unique (email),
    constraint email_16
        unique (email),
    constraint email_17
        unique (email),
    constraint email_18
        unique (email),
    constraint email_19
        unique (email),
    constraint email_2
        unique (email),
    constraint email_20
        unique (email),
    constraint email_21
        unique (email),
    constraint email_22
        unique (email),
    constraint email_23
        unique (email),
    constraint email_24
        unique (email),
    constraint email_25
        unique (email),
    constraint email_26
        unique (email),
    constraint email_27
        unique (email),
    constraint email_28
        unique (email),
    constraint email_29
        unique (email),
    constraint email_3
        unique (email),
    constraint email_30
        unique (email),
    constraint email_31
        unique (email),
    constraint email_32
        unique (email),
    constraint email_33
        unique (email),
    constraint email_34
        unique (email),
    constraint email_35
        unique (email),
    constraint email_36
        unique (email),
    constraint email_37
        unique (email),
    constraint email_4
        unique (email),
    constraint email_5
        unique (email),
    constraint email_6
        unique (email),
    constraint email_7
        unique (email),
    constraint email_8
        unique (email),
    constraint email_9
        unique (email),
    constraint Companies_ibfk_71
        foreign key (IndustryId) references Industries (id)
            on update cascade on delete cascade,
    constraint Companies_ibfk_72
        foreign key (PricingPlanId) references PricingPlans (id)
            on update cascade on delete set null
);

create index IndustryId
    on Companies (IndustryId);

create index PricingPlanId
    on Companies (PricingPlanId);

create table CompanyProfiles
(
    id          int auto_increment
        primary key,
    logo        varchar(255)                                        null,
    coverPhoto  varchar(255)                                        null,
    country     varchar(255)                                        null,
    city        varchar(255)                                        null,
    size        enum ('1-10', '11-50', '51-200', '201-500', '500+') null,
    foundedYear int                                                 null,
    description text                                                null,
    location    point                                               null,
    website     varchar(255)                                        null,
    linkedin    varchar(255)                                        null,
    facebook    varchar(255)                                        null,
    twitter     varchar(255)                                        null,
    instagram   varchar(255)                                        null,
    youtube     varchar(255)                                        null,
    blog        varchar(255)                                        null,
    behance     varchar(255)                                        null,
    vimeo       varchar(255)                                        null,
    createdAt   datetime                                            not null,
    updatedAt   datetime                                            not null,
    CompanyId   int                                                 null,
    constraint CompanyProfiles_ibfk_1
        foreign key (CompanyId) references Companies (id)
            on update cascade on delete cascade
);

create index CompanyId
    on CompanyProfiles (CompanyId);

create table CompanySpecializations
(
    id               int auto_increment
        primary key,
    createdAt        datetime not null,
    updatedAt        datetime not null,
    CompanyProfileId int      null,
    CategoryId       int      null,
    constraint CompanySpecializations_CategoryId_CompanyProfileId_unique
        unique (CompanyProfileId, CategoryId),
    constraint CompanySpecializations_ibfk_69
        foreign key (CompanyProfileId) references CompanyProfiles (id)
            on update cascade on delete cascade,
    constraint CompanySpecializations_ibfk_70
        foreign key (CategoryId) references Categories (id)
            on update cascade on delete cascade
);

create index CategoryId
    on CompanySpecializations (CategoryId);

create table Jobs
(
    id             int auto_increment
        primary key,
    title          varchar(255)                                                                                      not null,
    logo           varchar(255)                                                                                      null,
    description    text                                                                                              not null,
    requirements   text                                                                                              not null,
    workplace      enum ('remote', 'office', 'hybrid')                                                               not null,
    salaryRangeMin int                                                                                               not null,
    salaryRangeMax int                                                                                               not null,
    minExperience  int                                                                                               not null,
    careerLevel    enum ('Student', 'Entry', 'Junior', 'Mid-level', 'Experienced/Senior', 'Manager/Lead')            not null,
    type           enum ('Full time', 'Part time', 'Internship', 'Volunteering', 'Freelance project', 'Shift based') not null,
    country        varchar(255)                                                                                      not null,
    city           varchar(255)                                                                                      not null,
    openPositions  int                                                                                               not null,
    deadline       datetime                                                                                          null,
    createdAt      datetime                                                                                          not null,
    updatedAt      datetime                                                                                          not null,
    CompanyId      int                                                                                               null,
    constraint Jobs_ibfk_1
        foreign key (CompanyId) references Companies (id)
            on update cascade on delete cascade
);

create table JobCategories
(
    id         int auto_increment
        primary key,
    createdAt  datetime not null,
    updatedAt  datetime not null,
    JobId      int      null,
    CategoryId int      null,
    constraint JobCategories_CategoryId_JobId_unique
        unique (JobId, CategoryId),
    constraint JobCategories_ibfk_71
        foreign key (JobId) references Jobs (id)
            on update cascade on delete cascade,
    constraint JobCategories_ibfk_72
        foreign key (CategoryId) references Categories (id)
            on update cascade on delete cascade
);

create index CategoryId
    on JobCategories (CategoryId);

create index CompanyId
    on Jobs (CompanyId);

create table Questions
(
    id           int auto_increment
        primary key,
    questionText varchar(255)                     not null,
    type         enum ('text', 'yes/no', 'voice') not null,
    createdAt    datetime                         not null,
    updatedAt    datetime                         not null,
    JobId        int                              null,
    constraint Questions_ibfk_1
        foreign key (JobId) references Jobs (id)
            on update cascade on delete cascade
);

create index JobId
    on Questions (JobId);

create table Skills
(
    id        int auto_increment
        primary key,
    name      varchar(255) not null,
    createdAt datetime     not null,
    updatedAt datetime     not null,
    constraint name
        unique (name),
    constraint name_10
        unique (name),
    constraint name_11
        unique (name),
    constraint name_12
        unique (name),
    constraint name_13
        unique (name),
    constraint name_14
        unique (name),
    constraint name_15
        unique (name),
    constraint name_16
        unique (name),
    constraint name_17
        unique (name),
    constraint name_18
        unique (name),
    constraint name_19
        unique (name),
    constraint name_2
        unique (name),
    constraint name_20
        unique (name),
    constraint name_21
        unique (name),
    constraint name_22
        unique (name),
    constraint name_23
        unique (name),
    constraint name_24
        unique (name),
    constraint name_25
        unique (name),
    constraint name_26
        unique (name),
    constraint name_27
        unique (name),
    constraint name_28
        unique (name),
    constraint name_29
        unique (name),
    constraint name_3
        unique (name),
    constraint name_30
        unique (name),
    constraint name_31
        unique (name),
    constraint name_32
        unique (name),
    constraint name_33
        unique (name),
    constraint name_34
        unique (name),
    constraint name_35
        unique (name),
    constraint name_36
        unique (name),
    constraint name_4
        unique (name),
    constraint name_5
        unique (name),
    constraint name_6
        unique (name),
    constraint name_7
        unique (name),
    constraint name_8
        unique (name),
    constraint name_9
        unique (name)
);

create table RequiredSkills
(
    id                   int auto_increment
        primary key,
    minLevel             int          not null,
    minYearsOfExperience varchar(255) not null,
    createdAt            datetime     not null,
    updatedAt            datetime     not null,
    JobId                int          null,
    SkillId              int          null,
    constraint RequiredSkills_SkillId_JobId_unique
        unique (JobId, SkillId),
    constraint RequiredSkills_ibfk_69
        foreign key (JobId) references Jobs (id)
            on update cascade on delete cascade,
    constraint RequiredSkills_ibfk_70
        foreign key (SkillId) references Skills (id)
            on update cascade on delete cascade
);

create index SkillId
    on RequiredSkills (SkillId);

create table Users
(
    id                    int auto_increment
        primary key,
    firstName             varchar(20)                           not null,
    lastName              varchar(20)                           not null,
    email                 varchar(255)                          not null,
    password              varchar(255)                          not null,
    role                  enum ('user', 'admin') default 'user' null,
    createdAt             datetime                              not null,
    updatedAt             datetime                              not null,
    deletedAt             datetime                              null,
    passwordResetCode     varchar(255)                          null,
    passwordResetExpire   datetime                              null,
    passwordResetVerified tinyint(1)                            null,
    constraint email
        unique (email),
    constraint email_10
        unique (email),
    constraint email_11
        unique (email),
    constraint email_12
        unique (email),
    constraint email_13
        unique (email),
    constraint email_14
        unique (email),
    constraint email_15
        unique (email),
    constraint email_16
        unique (email),
    constraint email_17
        unique (email),
    constraint email_18
        unique (email),
    constraint email_19
        unique (email),
    constraint email_2
        unique (email),
    constraint email_20
        unique (email),
    constraint email_21
        unique (email),
    constraint email_22
        unique (email),
    constraint email_23
        unique (email),
    constraint email_24
        unique (email),
    constraint email_25
        unique (email),
    constraint email_26
        unique (email),
    constraint email_27
        unique (email),
    constraint email_28
        unique (email),
    constraint email_29
        unique (email),
    constraint email_3
        unique (email),
    constraint email_30
        unique (email),
    constraint email_31
        unique (email),
    constraint email_32
        unique (email),
    constraint email_33
        unique (email),
    constraint email_34
        unique (email),
    constraint email_35
        unique (email),
    constraint email_36
        unique (email),
    constraint email_37
        unique (email),
    constraint email_4
        unique (email),
    constraint email_5
        unique (email),
    constraint email_6
        unique (email),
    constraint email_7
        unique (email),
    constraint email_8
        unique (email),
    constraint email_9
        unique (email)
);

create table Applications
(
    id        int auto_increment
        primary key,
    status    varchar(255) not null,
    createdAt datetime     not null,
    updatedAt datetime     not null,
    JobId     int          null,
    UserId    int          null,
    constraint Applications_ibfk_71
        foreign key (JobId) references Jobs (id)
            on update cascade on delete cascade,
    constraint Applications_ibfk_72
        foreign key (UserId) references Users (id)
            on update cascade on delete cascade
);

create table Answers
(
    id            int auto_increment
        primary key,
    textAnswer    text       null,
    yesNoAnswer   tinyint(1) null,
    voiceAnswer   blob       null,
    createdAt     datetime   not null,
    updatedAt     datetime   not null,
    ApplicationId int        null,
    constraint Answers_ibfk_1
        foreign key (ApplicationId) references Applications (id)
            on update cascade on delete cascade
);

create index ApplicationId
    on Answers (ApplicationId);

create index JobId
    on Applications (JobId);

create index UserId
    on Applications (UserId);

create table Interviews
(
    id            int auto_increment
        primary key,
    interviewDate datetime     not null,
    location      point        not null,
    status        varchar(255) not null,
    notes         text         null,
    createdAt     datetime     not null,
    updatedAt     datetime     not null,
    UserId        int          null,
    CompanyId     int          null,
    JobId         int          null,
    constraint Interviews_ibfk_106
        foreign key (UserId) references Users (id)
            on update cascade on delete cascade,
    constraint Interviews_ibfk_107
        foreign key (CompanyId) references Companies (id)
            on update cascade on delete cascade,
    constraint Interviews_ibfk_108
        foreign key (JobId) references Jobs (id)
            on update cascade on delete cascade
);

create index CompanyId
    on Interviews (CompanyId);

create index JobId
    on Interviews (JobId);

create index UserId
    on Interviews (UserId);

create table NotificationPreferences
(
    id        int auto_increment
        primary key,
    type      varchar(255)         not null,
    frequency varchar(255)         not null,
    active    tinyint(1) default 1 not null,
    createdAt datetime             not null,
    updatedAt datetime             not null,
    UserId    int                  null,
    constraint NotificationPreferences_ibfk_1
        foreign key (UserId) references Users (id)
            on update cascade on delete cascade
);

create index UserId
    on NotificationPreferences (UserId);

create table SavedJobs
(
    id        int auto_increment
        primary key,
    createdAt datetime not null,
    updatedAt datetime not null,
    UserId    int      null,
    JobId     int      null,
    constraint SavedJobs_JobId_UserId_unique
        unique (UserId, JobId),
    constraint SavedJobs_ibfk_69
        foreign key (UserId) references Users (id)
            on update cascade on delete cascade,
    constraint SavedJobs_ibfk_70
        foreign key (JobId) references Jobs (id)
            on update cascade on delete cascade
);

create index JobId
    on SavedJobs (JobId);

create table UserProfiles
(
    id                     int auto_increment
        primary key,
    avatar                 varchar(255)                                                                                              null,
    coverPhoto             varchar(255)                                                                                              null,
    birthDate              date                                                                                                      null,
    phone                  varchar(255)                                                                                              null,
    gender                 varchar(255)                                                                                              null,
    nationality            varchar(255)                                                                                              null,
    drivingLicense         tinyint(1)                                                                                                null,
    about                  text                                                                                                      null,
    openToWork             tinyint(1)                                                                                                null,
    country                varchar(255)                                                                                              null,
    city                   varchar(255)                                                                                              null,
    area                   varchar(255)                                                                                              null,
    currentCareerLevel     enum ('student', 'entry', 'experienced', 'manager', 'executive', 'not specified') default 'not specified' null,
    jobTypes               json                                                                                                      null,
    jobTitles              json                                                                                                      null,
    jobCategories          json                                                                                                      null,
    totalYearsOfExperience int                                                                                                       null,
    educationLevel         varchar(255)                                                                                              null,
    languages              json                                                                                                      null,
    linkedIn               varchar(255)                                                                                              null,
    twitter                varchar(255)                                                                                              null,
    facebook               varchar(255)                                                                                              null,
    github                 varchar(255)                                                                                              null,
    stackOverflow          varchar(255)                                                                                              null,
    behance                varchar(255)                                                                                              null,
    youtube                varchar(255)                                                                                              null,
    website                varchar(255)                                                                                              null,
    other                  varchar(255)                                                                                              null,
    createdAt              datetime                                                                                                  not null,
    updatedAt              datetime                                                                                                  not null,
    UserId                 int                                                                                                       null,
    constraint UserProfiles_ibfk_1
        foreign key (UserId) references Users (id)
            on update cascade on delete cascade
);

create table Certifications
(
    id            int auto_increment
        primary key,
    title         varchar(255) not null,
    organization  varchar(255) not null,
    issueDate     date         not null,
    credentialID  varchar(255) null,
    credentialURL varchar(255) null,
    description   text         null,
    createdAt     datetime     not null,
    updatedAt     datetime     not null,
    UserProfileId int          null,
    constraint Certifications_ibfk_1
        foreign key (UserProfileId) references UserProfiles (id)
            on update cascade on delete cascade
);

create index UserProfileId
    on Certifications (UserProfileId);

create table Education
(
    id            int auto_increment
        primary key,
    school        varchar(255)                                                                                                not null,
    degree        enum ('high school', 'bachelor''s degree', 'master''s degree', 'mba', 'doctorate', 'diploma', 'vocational') not null,
    fieldsOfStudy json                                                                                                        not null,
    grade         enum ('A / 100-85', 'B / 84-75', 'C / 74-65', 'D / 64-50')                                                  not null,
    startDate     date                                                                                                        not null,
    endDate       date                                                                                                        not null,
    description   text                                                                                                        null,
    createdAt     datetime                                                                                                    not null,
    updatedAt     datetime                                                                                                    not null,
    UserProfileId int                                                                                                         null,
    constraint Education_ibfk_1
        foreign key (UserProfileId) references UserProfiles (id)
            on update cascade on delete cascade
);

create index UserProfileId
    on Education (UserProfileId);

create table Experiences
(
    id            int auto_increment
        primary key,
    type          enum ('full-time', 'part-time', 'internship', 'freelance/project', 'volunteering', 'student Activity') not null,
    title         varchar(255)                                                                                           not null,
    category      varchar(255)                                                                                           not null,
    organization  varchar(255)                                                                                           not null,
    startDate     date                                                                                                   not null,
    endDate       date                                                                                                   null,
    description   text                                                                                                   null,
    createdAt     datetime                                                                                               not null,
    updatedAt     datetime                                                                                               not null,
    UserProfileId int                                                                                                    null,
    constraint Experiences_ibfk_1
        foreign key (UserProfileId) references UserProfiles (id)
            on update cascade on delete cascade
);

create index UserProfileId
    on Experiences (UserProfileId);

create index UserId
    on UserProfiles (UserId);

create table UserSkills
(
    id                int auto_increment
        primary key,
    proficiency       int          not null,
    yearsOfExperience varchar(255) not null,
    createdAt         datetime     not null,
    updatedAt         datetime     not null,
    UserProfileId     int          null,
    SkillId           int          null,
    constraint UserSkills_SkillId_UserProfileId_unique
        unique (UserProfileId, SkillId),
    constraint UserSkills_ibfk_69
        foreign key (UserProfileId) references UserProfiles (id)
            on update cascade on delete cascade,
    constraint UserSkills_ibfk_70
        foreign key (SkillId) references Skills (id)
            on update cascade on delete cascade
);

create index SkillId
    on UserSkills (SkillId);

