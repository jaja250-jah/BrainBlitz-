CREATE TABLE teachers (
      id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
          email VARCHAR(150) NOT NULL UNIQUE,
            password_hash VARCHAR(255) NOT NULL,
              role ENUM('teacher','admin') DEFAULT 'teacher',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
)
CREATE TABLE sessions (
      id INT AUTO_INCREMENT PRIMARY KEY,
        pin VARCHAR(10) NOT NULL UNIQUE,
          teacher_id INT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              FOREIGN KEY (teacher_id) REFERENCES teachers(id)
              );

              CREATE TABLE students (
                id INT AUTO_INCREMENT PRIMARY KEY,
                  name VARCHAR(100) NOT NULL,
                    session_id INT NOT NULL,
                      joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        FOREIGN KEY (session_id) REFERENCES sessions(id)
                        );
)