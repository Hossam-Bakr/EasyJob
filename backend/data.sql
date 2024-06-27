
INSERT INTO Industries (name, createdAt, updatedAt)
VALUES
    ('IT/Software Development', NOW(), NOW()),
    ('Administration', NOW(), NOW()),
    ('Engineering-Construction/CVI/Architecture', NOW(), NOW()),
    ('Business Development', NOW(), NOW()),
    ('Banking', NOW(), NOW()),
    ('R&D/Science', NOW(), NOW()),
    ('Creative/Design/Art', NOW(), NOW()),
    ('Customer Service/Support', NOW(), NOW()),
    ('Writing/Editorial', NOW(), NOW()),
    ('Hospitality/Hotels/Food Services', NOW(), NOW()),
    ('Human Resources', NOW(), NOW()),
    ('Installation/Maintenance/Repair', NOW(), NOW()),
    ('Accounting/Finance', NOW(), NOW()),
    ('Legal', NOW(), NOW()),
    ('Logistics/Supply Chain', NOW(), NOW()),
    ('Operations/Management', NOW(), NOW()),
    ('Manufacturing/Production', NOW(), NOW()),
    ('Marketing/PR/Advertising', NOW(), NOW()),
    ('Medical/Healthcare', NOW(), NOW()),
    ('Project/Program Management', NOW(), NOW()),
    ('Quality', NOW(), NOW()),
    ('Analyst/Research', NOW(), NOW()),
    ('Sales/Retail', NOW(), NOW()),
    ('Media/Journalism/Publishing', NOW(), NOW()),
    ('Tourism/Travel', NOW(), NOW()),
    ('Sports and Leisure', NOW(), NOW()),
    ('Fashion', NOW(), NOW()),
    ('Pharmaceutical', NOW(), NOW()),
    ('Purchasing/Procurement', NOW(), NOW()),
    ('Strategy/Consulting', NOW(), NOW()),
    ('C-Level Executive/GM/Director', NOW(), NOW()),
    ('Engineering Telecom/Technology', NOW(), NOW());


-- IT/Software Development
INSERT  INTO Categories (name, createdAt, updatedAt, IndustryId) VALUES
('Application Development', NOW(), NOW(), 1),
('Business Intelligence', NOW(), NOW(), 1),
('Cloud Computing', NOW(), NOW(), 1),
('Data Analysis', NOW(), NOW(), 1),
('Database Administration', NOW(), NOW(), 1),
('ERP/CRM Software', NOW(), NOW(), 1),
('Information Security', NOW(), NOW(), 1),
('Mobile Development', NOW(), NOW(), 1),
('Network Administration', NOW(), NOW(), 1),
('Product Management', NOW(), NOW(), 1),
('Quality Assurance', NOW(), NOW(), 1),
('Software Development', NOW(), NOW(), 1),
('Systems Integration', NOW(), NOW(), 1),
('UI/UX Design', NOW(), NOW(), 1),
('Web Development', NOW(), NOW(), 1);



-- Administration

INSERT   INTO Categories (name, createdAt, updatedAt, IndustryId) VALUES
('Administration', NOW(), NOW(), 2),
('Clerical', NOW(), NOW(), 2),
('Receptionist', NOW(), NOW(), 2),
('Office Management', NOW(), NOW(), 2),
('Secretarial Work', NOW(), NOW(), 2),
('Support Services', NOW(), NOW(), 2);


-- Engineering-Construction/CVI/Architecture'
INSERT  INTO Categories (name, createdAt, updatedAt, IndustryId) VALUES
('Architecture', NOW(), NOW(), 3),
('Civil Engineering', NOW(), NOW(), 3),
('Construction', NOW(), NOW(), 3),
('Electrical Engineering', NOW(), NOW(), 3),
('Mechanical Engineering', NOW(), NOW(), 3),
('Surveying', NOW(), NOW(), 3),
('Urban Planning', NOW(), NOW(), 3),
('Project Management', NOW(), NOW(), 3),
('Quality Control', NOW(), NOW(), 3),
('Interior Design', NOW(), NOW(), 3),
('Landscape Architecture', NOW(), NOW(), 3);


-- Business Development

INSERT INTO Categories (name, createdAt, updatedAt, IndustryId) VALUES
('Business Analysis', NOW(), NOW(), 4),
('Business Planning', NOW(), NOW(), 4),
('Franchise Management', NOW(), NOW(), 4),
('Market Research', NOW(), NOW(), 4),
('Marketing Strategy', NOW(), NOW(), 4),
('Partnership Management', NOW(), NOW(), 4),
('Product Development', NOW(), NOW(), 4),
('Project Development', NOW(), NOW(), 4),
('Sales Management', NOW(), NOW(), 4),
('Startup Development', NOW(), NOW(), 4),
('Strategic Planning', NOW(), NOW(), 4);


-- Banking
INSERT INTO Categories (name, createdAt, updatedAt, IndustryId) VALUES
('Asset Management', NOW(), NOW(), 5),
('Branch Management', NOW(), NOW(), 5),
('Compliance & Control', NOW(), NOW(), 5),
('Corporate Banking', NOW(), NOW(), 5),
('Credit Analysis', NOW(), NOW(), 5),
('Investment Banking', NOW(), NOW(), 5),
('Retail Banking', NOW(), NOW(), 5),
('Risk Management', NOW(), NOW(), 5),
('Treasury', NOW(), NOW(), 5),
('Wealth Management', NOW(), NOW(), 5),
('Loan Management', NOW(), NOW(), 5),
('Foreign Exchange', NOW(), NOW(), 5);

-- R&D/Science
INSERT INTO Categories (name, createdAt, updatedAt, IndustryId) VALUES
('Biotechnology', NOW(), NOW(), 6),
('Clinical Research', NOW(), NOW(), 6),
('Environmental Science', NOW(), NOW(), 6),
('Food Science', NOW(), NOW(), 6),
('Geology', NOW(), NOW(), 6),
('Life Sciences', NOW(), NOW(), 6),
('Materials Science', NOW(), NOW(), 6),
('Physics', NOW(), NOW(), 6),
('Product R&D', NOW(), NOW(), 6),
('Scientific Research', NOW(), NOW(), 6);

-- Creative/Design/Art
INSERT INTO Categories (name, createdAt, updatedAt, IndustryId) VALUES
('Graphic Design', NOW(), NOW(), 7),
('Illustration', NOW(), NOW(), 7),
('UX/UI Design', NOW(), NOW(), 7),
('Photography', NOW(), NOW(), 7),
('Videography', NOW(), NOW(), 7),
('Art Direction', NOW(), NOW(), 7),
('Interior Design', NOW(), NOW(), 7),
('Fashion Design', NOW(), NOW(), 7),
('Animation', NOW(), NOW(), 7),
('3D Modeling', NOW(), NOW(), 7),
('Product Design', NOW(), NOW(), 7);

-- Customer Service/Support
INSERT INTO Categories (name, createdAt, updatedAt, IndustryId) VALUES
('Customer Service', NOW(), NOW(), 8),
('Technical Support', NOW(), NOW(), 8),
('Help Desk', NOW(), NOW(), 8),
('Client Relations', NOW(), NOW(), 8),
('Account Management', NOW(), NOW(), 8),
('Call Center Operations', NOW(), NOW(), 8),
('Customer Success', NOW(), NOW(), 8),
('Live Chat Support', NOW(), NOW(), 8);



-- Writing/Editorial
INSERT INTO Categories (name, createdAt, updatedAt, IndustryId) VALUES
('Content Writing', NOW(), NOW(), 9),
('Copywriting', NOW(), NOW(), 9),
('Technical Writing', NOW(), NOW(), 9),
('Journalism', NOW(), NOW(), 9),
('Editing', NOW(), NOW(), 9),
('Proofreading', NOW(), NOW(), 9),
('SEO Writing', NOW(), NOW(), 9),
('Scriptwriting', NOW(), NOW(), 9),
('Blog Writing', NOW(), NOW(), 9),
('Grant Writing', NOW(), NOW(), 9);


-- Hospitality/Hotels/Food Services
INSERT INTO Categories (name, createdAt, updatedAt, IndustryId) VALUES
('Hotel Management', NOW(), NOW(), 10),
('Restaurant Management', NOW(), NOW(), 10),
('Food and Beverage Services', NOW(), NOW(), 10),
('Culinary Arts', NOW(), NOW(), 10),
('Event Planning', NOW(), NOW(), 10),
('Hospitality Marketing', NOW(), NOW(), 10),
('Housekeeping', NOW(), NOW(), 10),
('Tourism Management', NOW(), NOW(), 10);


-- Human Resources (IndustryId = 11)
INSERT INTO Categories (name, createdAt, updatedAt, IndustryId) VALUES
('Recruitment', NOW(), NOW(), 11),
('Training and Development', NOW(), NOW(), 11),
('Employee Relations', NOW(), NOW(), 11),
('Compensation and Benefits', NOW(), NOW(), 11),
('HR Strategy', NOW(), NOW(), 11),
('Organizational Development', NOW(), NOW(), 11),
('HR Analytics', NOW(), NOW(), 11),
('Payroll Management', NOW(), NOW(), 11);


-- Installation/Maintenance/Repair (IndustryId = 12)
INSERT INTO Categories (name, createdAt, updatedAt, IndustryId) VALUES
('Electrical Maintenance', NOW(), NOW(), 12),
('HVAC Maintenance', NOW(), NOW(), 12),
('Vehicle Maintenance', NOW(), NOW(), 12),
('Equipment Repair', NOW(), NOW(), 12),
('Facility Management', NOW(), NOW(), 12),
('Plumbing Maintenance', NOW(), NOW(), 12),
('Technology Installation', NOW(), NOW(), 12),
('Safety Equipment Maintenance', NOW(), NOW(), 12);


-- Accounting/Finance
INSERT INTO Categories (name, createdAt, updatedAt, IndustryId) VALUES
('Financial Analysis', NOW(), NOW(), 13),
('Tax Accounting', NOW(), NOW(), 13),
('Corporate Finance', NOW(), NOW(), 13),
('Auditing', NOW(), NOW(), 13),
('Accounting Technology', NOW(), NOW(), 13),
('Bookkeeping', NOW(), NOW(), 13),
('Payroll Services', NOW(), NOW(), 13),
('Financial Consulting', NOW(), NOW(), 13);



-- Legal (IndustryId = 14):
INSERT INTO Categories (name, createdAt, updatedAt, IndustryId) VALUES
('Corporate Law', NOW(), NOW(), 14),
('Litigation', NOW(), NOW(), 14),
('Intellectual Property', NOW(), NOW(), 14),
('Legal Consulting', NOW(), NOW(), 14),
('Compliance', NOW(), NOW(), 14),
('Labor Law', NOW(), NOW(), 14),
('Real Estate Law', NOW(), NOW(), 14),
('Tax Law', NOW(), NOW(), 14),
('Legal Research', NOW(), NOW(), 14),
('Paralegal', NOW(), NOW(), 14);



-- Logistics/Supply Chain (IndustryId = 15):
INSERT INTO Categories (name, createdAt, updatedAt, IndustryId) VALUES
('Logistics Management', NOW(), NOW(), 15),
('Supply Chain Management', NOW(), NOW(), 15),
('Warehouse Operations', NOW(), NOW(), 15),
('Distribution Management', NOW(), NOW(), 15),
('Freight Forwarding', NOW(), NOW(), 15),
('Inventory Management', NOW(), NOW(), 15),
('Procurement', NOW(), NOW(), 15),
('Shipping and Receiving', NOW(), NOW(), 15);


-- Operations/Management (IndustryId = 16):
INSERT INTO Categories (name, createdAt, updatedAt, IndustryId) VALUES
('Operations Management', NOW(), NOW(), 16),
('Project Management', NOW(), NOW(), 16),
('Business Process Improvement', NOW(), NOW(), 16),
('Quality Assurance', NOW(), NOW(), 16),
('Product Management', NOW(), NOW(), 16),
('Team Leadership', NOW(), NOW(), 16),
('Strategy Planning', NOW(), NOW(), 16),
('Performance Management', NOW(), NOW(), 16);


-- Manufacturing/Production (IndustryId = 17):
INSERT INTO Categories (name, createdAt, updatedAt, IndustryId) VALUES
('Manufacturing Engineering', NOW(), NOW(), 17),
('Production Planning', NOW(), NOW(), 17),
('Quality Control', NOW(), NOW(), 17),
('Factory Management', NOW(), NOW(), 17),
('Process Engineering', NOW(), NOW(), 17),
('Product Design', NOW(), NOW(), 17),
('Maintenance Engineering', NOW(), NOW(), 17),
('Industrial Engineering', NOW(), NOW(), 17);



-- Marketing/PR/Advertising (IndustryId = 18):
INSERT INTO Categories (name, createdAt, updatedAt, IndustryId) VALUES
('Digital Marketing', NOW(), NOW(), 18),
('Content Marketing', NOW(), NOW(), 18),
('Public Relations', NOW(), NOW(), 18),
('Brand Management', NOW(), NOW(), 18),
('SEO/SEM', NOW(), NOW(), 18),
('Social Media Marketing', NOW(), NOW(), 18),
('Event Marketing', NOW(), NOW(), 18),
('Market Research', NOW(), NOW(), 18),
('Advertising', NOW(), NOW(), 18),
('Marketing Strategy', NOW(), NOW(), 18);


-- Medical/Healthcare (IndustryId = 19):
INSERT INTO Categories (name, createdAt, updatedAt, IndustryId) VALUES
('Clinical Medicine', NOW(), NOW(), 19),
('Nursing', NOW(), NOW(), 19),
('Pharmacy', NOW(), NOW(), 19),
('Medical Research', NOW(), NOW(), 19),
('Healthcare Management', NOW(), NOW(), 19),
('Dental Care', NOW(), NOW(), 19),
('Public Health', NOW(), NOW(), 19),
('Medical Imaging', NOW(), NOW(), 19),
('Physiotherapy', NOW(), NOW(), 19),
('Mental Health Services', NOW(), NOW(), 19);



-- Project/Program Management (IndustryId = 20)
INSERT INTO Categories (name, createdAt, updatedAt, IndustryId) VALUES
('Project Coordination', NOW(), NOW(), 20),
('Program Management', NOW(), NOW(), 20),
('Project Scheduling', NOW(), NOW(), 20),
('Agile Project Management', NOW(), NOW(), 20),
('Risk Management', NOW(), NOW(), 20),
('Resource Management', NOW(), NOW(), 20),
('Quality Assurance Management', NOW(), NOW(), 20),
('Technical Project Management', NOW(), NOW(), 20);

-- Quality (IndustryId = 21)
INSERT INTO Categories (name, createdAt, updatedAt, IndustryId) VALUES
('Quality Control', NOW(), NOW(), 21),
('Quality Assurance', NOW(), NOW(), 21),
('Quality Management Systems', NOW(), NOW(), 21),
('Six Sigma', NOW(), NOW(), 21),
('Continuous Improvement', NOW(), NOW(), 21),
('Quality Engineering', NOW(), NOW(), 21),
('ISO Certification', NOW(), NOW(), 21),
('Product Quality', NOW(), NOW(), 21);

-- Analyst/Research (IndustryId = 22)
INSERT INTO Categories (name, createdAt, updatedAt, IndustryId) VALUES
('Data Analysis', NOW(), NOW(), 22),
('Market Research', NOW(), NOW(), 22),
('Policy Analysis', NOW(), NOW(), 22),
('Business Analysis', NOW(), NOW(), 22),
('Financial Analysis', NOW(), NOW(), 22),
('Operations Research', NOW(), NOW(), 22),
('Scientific Research', NOW(), NOW(), 22),
('User Experience Research', NOW(), NOW(), 22);

-- Sales/Retail (IndustryId = 23)
INSERT INTO Categories (name, createdAt, updatedAt, IndustryId) VALUES
('Retail Sales', NOW(), NOW(), 23),
('Sales Management', NOW(), NOW(), 23),
('Customer Service Sales', NOW(), NOW(), 23),
('Business Development', NOW(), NOW(), 23),
('Account Management', NOW(), NOW(), 23),
('E-commerce Sales', NOW(), NOW(), 23),
('Sales Engineering', NOW(), NOW(), 23),
('Direct Sales', NOW(), NOW(), 23);

-- Media/Journalism/Publishing (IndustryId = 24)
INSERT INTO Categories (name, createdAt, updatedAt, IndustryId) VALUES
('Journalism', NOW(), NOW(), 24),
('Editing', NOW(), NOW(), 24),
('Publishing', NOW(), NOW(), 24),
('Digital Media', NOW(), NOW(), 24),
('Broadcast Journalism', NOW(), NOW(), 24),
('Media Production', NOW(), NOW(), 24),
('Content Writing', NOW(), NOW(), 24),
('Graphic Design in Media', NOW(), NOW(), 24);

-- Tourism/Travel (IndustryId = 25)
INSERT INTO Categories (name, createdAt, updatedAt, IndustryId) VALUES
('Travel Consulting', NOW(), NOW(), 25),
('Tour Guiding', NOW(), NOW(), 25),
('Hospitality Management', NOW(), NOW(), 25),
('Event Planning for Tourism', NOW(), NOW(), 25),
('Tourism Marketing', NOW(), NOW(), 25),
('Travel Agency Management', NOW(), NOW(), 25),
('Airline Operations', NOW(), NOW(), 25),
('Cruise Management', NOW(), NOW(), 25);

-- Sports and Leisure (IndustryId = 26)
INSERT INTO Categories (name, createdAt, updatedAt, IndustryId) VALUES
('Sports Management', NOW(), NOW(), 26),
('Fitness Instruction', NOW(), NOW(), 26),
('Recreational Management', NOW(), NOW(), 26),
('Sports Coaching', NOW(), NOW(), 26),
('Leisure Activities Coordination', NOW(), NOW(), 26),
('Athletic Training', NOW(), NOW(), 26),
('Sports Marketing', NOW(), NOW(), 26),
('Event Management in Sports', NOW(), NOW(), 26);

-- Fashion (IndustryId = 27)
INSERT INTO Categories (name, createdAt, updatedAt, IndustryId) VALUES
('Fashion Designing', NOW(), NOW(), 27),
('Merchandising', NOW(), NOW(), 27),
('Fashion Marketing', NOW(), NOW(), 27),
('Apparel Manufacturing', NOW(), NOW(), 27),
('Fashion Buying', NOW(), NOW(), 27),
('Fashion Styling', NOW(), NOW(), 27),
('Textile Design', NOW(), NOW(), 27),
('Fashion Photography', NOW(), NOW(), 27);

-- Pharmaceutical (IndustryId = 28)
INSERT INTO Categories (name, createdAt, updatedAt, IndustryId) VALUES
('Pharmaceutical Sales', NOW(), NOW(), 28),
('Clinical Research', NOW(), NOW(), 28),
('Drug Development', NOW(), NOW(), 28),
('Regulatory Affairs', NOW(), NOW(), 28),
('Pharmacovigilance', NOW(), NOW(), 28),
('Quality Assurance in Pharmaceuticals', NOW(), NOW(), 28),
('Medical Science Liaison', NOW(), NOW(), 28),
('Pharmaceutical Manufacturing', NOW(), NOW(), 28);

-- Purchasing/Procurement (IndustryId = 29)
INSERT INTO Categories (name, createdAt, updatedAt, IndustryId) VALUES
('Procurement Management', NOW(), NOW(), 29),
('Supply Chain Management', NOW(), NOW(), 29),
('Vendor Management', NOW(), NOW(), 29),
('Inventory Management', NOW(), NOW(), 29),
('Purchasing Operations', NOW(), NOW(), 29),
('Contract Negotiation', NOW(), NOW(), 29),
('Material Procurement', NOW(), NOW(), 29),
('Strategic Sourcing', NOW(), NOW(), 29);

-- Strategy/Consulting (IndustryId = 30)
INSERT INTO Categories (name, createdAt, updatedAt, IndustryId) VALUES
('Business Strategy', NOW(), NOW(), 30),
('Management Consulting', NOW(), NOW(), 30),
('Financial Advisory', NOW(), NOW(), 30),
('IT Consulting', NOW(), NOW(), 30),
('HR Consulting', NOW(), NOW(), 30),
('Operations Consulting', NOW(), NOW(), 30),
('Strategy Consulting', NOW(), NOW(), 30),
('Marketing Consulting', NOW(), NOW(), 30);

-- Engineering Telecom/Technology
INSERT INTO Categories (name, createdAt, updatedAt, IndustryId) VALUES
('Telecommunications Engineering', NOW(), NOW(), 32),
('Network Architecture', NOW(), NOW(), 32),
('Satellite Engineering', NOW(), NOW(), 32),
('Radio-Frequency Engineering', NOW(), NOW(), 32),
('Fiber Optics Technology', NOW(), NOW(), 32),
('Broadband Communication Systems', NOW(), NOW(), 32),
('Wireless Networks', NOW(), NOW(), 32),
('Information Technology Systems', NOW(), NOW(), 32);




INSERT INTO Companies (id, name, email, password, phone, role, passwordResetCode, passwordResetExpire, passwordResetVerified, createdAt, updatedAt, deletedAt, IndustryId)
VALUES (1, 'easyJob', 'bakr.hossam.255@gmail.com', '$2a$12$nQGTG7Dh3jeEDbLsUqvzmuGElbwZJWQmo.IM0MwaN4qjD/0esR68G', '0123456789', 'company', null, null, null, '2024-02-29 11:31:37', '2024-02-29 11:31:37', null, 1)
ON DUPLICATE KEY UPDATE
name = VALUES(name), email = VALUES(email), password = VALUES(password), phone = VALUES(phone), role = VALUES(role), passwordResetCode = VALUES(passwordResetCode), passwordResetExpire = VALUES(passwordResetExpire), passwordResetVerified = VALUES(passwordResetVerified), createdAt = VALUES(createdAt), updatedAt = VALUES(updatedAt), deletedAt = VALUES(deletedAt), IndustryId = VALUES(IndustryId);

-- Inserting a job into the 'Jobs' table with specific details for an IT & Software Development position
INSERT INTO Jobs 
(
    title, 
    description, 
    requirements, 
    workplace, 
    salaryRangeMin, 
    salaryRangeMax, 
    hideSalary, 
    minExperience, 
    careerLevel, 
    type, 
    country, 
    city, 
    openPositions, 
    keywords, 
    createdAt, 
    updatedAt, 
    CompanyId,
    location
) 
VALUES 
(
    'Software Engineer', 
    'Develop and maintain software applications.', 
    'Proficient in Java, SQL, and experience with Agile methodologies.', 
    'remote', 
    80000, 
    120000, 
    0, 
    5, 
    'experienced/senior', 
    'full-time', 
    'USA', 
    'New York', 
    3, 
    'Java, SQL, Agile, Developer', 
    NOW(), 
    NOW(), 
    1,
    ST_GeomFromText('POINT(40.7128 -74.0060)')
);

-- Assuming JobId 1 exists after the above insert and the CategoryIds 285 and 79 exist in the 'Categories' table
INSERT INTO JobCategories (createdAt, updatedAt, JobId, CategoryId) VALUES (NOW(), NOW(), 1, 1);


INSERT INTO users (firstName, lastName, email, password, role, createdAt, updatedAt)
VALUES 
('John', 'Doe', 'johndoe@example.com', 'password', 'user', NOW(), NOW()),
('Jane', 'Doe', 'janedoe@example.com', 'password', 'user', NOW(), NOW()),
('Mark', 'Smith', 'marksmith@example.com', 'password', 'user', NOW(), NOW()),
('Anna', 'Johnson', 'annajohnson@example.com', 'password', 'user', NOW(), NOW()),
('Tom', 'Brown', 'tombrown@example.com', 'password', 'user', NOW(), NOW());


INSERT INTO userProfiles (avatar, coverPhoto, tagline, birthDate, phone, gender, nationality, drivingLicense, about, openToWork, country, city, area, currentCareerLevel, jobTypes, jobTitles, jobCategories, totalYearsOfExperience, educationLevel, languages,workplace, linkedIn, twitter, facebook, github, stackOverflow, behance, youtube, website, other, UserId, createdAt, updatedAt)
VALUES 
(NULL, NULL, 'Experienced Backend Developer', '1990-01-01', '1234567890', 'male', 'Egyptian', 1, 'Skilled in Java and Spring', 1, 'Egypt', 'Cairo', 'Heliopolis', 'experienced/senior', '["full-time"]', '["Backend Developer"]', '["Application Development"]', 5, "bachelor's degree", '["English"]'  , "remote", 'linkedin.com/in/johndoe', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NOW(), NOW()),
(NULL, NULL, 'Frontend Developer with React Experience', '1992-03-12', '0987654321', 'female', 'Egyptian', 0, 'Proficient in React and Redux', 1, 'Egypt', 'Alexandria', 'Sidi Gaber', 'entry level', '["part-time"]', '["Frontend Developer"]', '["Web Development"]', 2, "bachelor's degree", '["English", "French"]', "on-site", NULL, 'twitter.com/janedoe', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2, NOW(), NOW()),
(NULL, NULL, 'Full Stack Developer', '1985-06-23', '1112223333', 'male', 'Egyptian', 1, 'Expert in Node.js and React', 1, 'Egypt', 'Cairo', 'Maadi', 'manager/lead', '["full-time", "freelance/project"]', '["Full Stack Developer"]', '["Application Development", "Web Development"]', 10, "master's degree", '["English", "Arabic"]',"hybrid", NULL, NULL, 'facebook.com/fullstackdev', 'github.com/fullstackdev', 'stackoverflow.com/users/fullstackdev', NULL, NULL, 'fullstackdev.com', NULL, 3, NOW(), NOW()),
(NULL, NULL, 'Data Scientist', '1995-12-01', '2223334444', 'female', 'Egyptian', 1, 'Specialized in Python and Machine Learning', 1, 'Egypt', 'Giza', 'Dokki', 'experienced/senior', '["full-time"]', '["Data Scientist"]', '["Data Science", "Machine Learning"]', 4, "master's degree", '["English"]',"hybrid", 'linkedin.com/in/datascientist', NULL, NULL, NULL, NULL, 'behance.net/datascientist', NULL, NULL, NULL, 4, NOW(), NOW()),
(NULL, NULL, 'DevOps Engineer', '1988-07-15', '3334445555', 'male', 'Egyptian', 1, 'Experienced in AWS and Docker', 1, 'Egypt', 'Cairo', 'Nasr City', 'experienced/senior', '["full-time"]', '["DevOps Engineer"]', '["DevOps"]', 6, "bachelor's degree", '["English"]', "hybrid",'linkedin.com/in/devopsengineer', NULL, NULL, 'github.com/devopsengineer', NULL, NULL, NULL, 'devopsengineer.com', NULL, 5, NOW(), NOW());
