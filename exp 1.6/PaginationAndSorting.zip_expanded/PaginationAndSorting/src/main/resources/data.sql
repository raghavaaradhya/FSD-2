INSERT INTO accounts (username, platform)
VALUES ('John_java', 'LinkedIn');
 
INSERT INTO accounts (username, platform)
VALUES ('tech_creator', 'Instagram');
 
INSERT INTO accounts (username, platform)
VALUES ('spring_developer', 'Twitter');
 
 
INSERT INTO posts
(title, content, likes, comments, views, created_at, account_id)
 
VALUES
(
    'Spring Boot Caching',
    'Learning Ehcache with Spring Boot',
    500,
    100,
    5000,
    NOW(),
    1
);
 
 
INSERT INTO posts
(title, content, likes, comments, views, created_at, account_id)
 
VALUES
(
    'Java Tutorial',
    'Java Full Stack Development',
    300,
    80,
    3000,
    NOW(),
    2
);
 
 
INSERT INTO posts
(title, content, likes, comments, views, created_at, account_id)
 
VALUES
(
    'Spring Data JPA',
    'Understanding JOIN FETCH',
    700,
    150,
    8000,
    NOW(),
    3
);
 
 
INSERT INTO posts
(title, content, likes, comments, views, created_at, account_id)
 
VALUES
(
    'MySQL Optimization',
    'Database performance optimization',
    400,
    90,
    6000,
    NOW(),
    1
);
 
 
INSERT INTO posts
(title, content, likes, comments, views, created_at, account_id)
 
VALUES
(
    'REST APIs',
    'Building scalable REST APIs',
    600,
    120,
    7000,
    NOW(),
    2
);