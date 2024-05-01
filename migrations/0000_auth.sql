-- Migration number: 0000 	 2023-10-15T15:24:19.451Z

CREATE TABLE user (
    id VARCHAR(15) NOT NULL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    email_verified BOOLEAN NOT NULL
);

CREATE TABLE user_key (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    user_id VARCHAR(15) NOT NULL,
    hashed_password VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE user_session (
    id VARCHAR(127) NOT NULL PRIMARY KEY,
    user_id VARCHAR(15) NOT NULL,
    active_expires BIGINT NOT NULL,   -- unix timestamp milliseconds
    idle_expires BIGINT NOT NULL,     -- unix timestamp milliseconds
    FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE email_verification_token (
    token VARCHAR(64) NOT NULL,   -- token to send inside the verification link
    expires BIGINT NOT NULL,      -- unix timestamp milliseconds
    user_id VARCHAR(15) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE password_reset_token (
    token VARCHAR(64) NOT NULL,   -- token to send inside the reset link
    expires BIGINT NOT NULL,      -- unix timestamp milliseconds
    user_id VARCHAR(15) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id)
);
