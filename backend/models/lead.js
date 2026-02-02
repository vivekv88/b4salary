export const leadSchema = {
    id: 'BIGINT AUTO_INCREMENT PRIMARY KEY',
    mobile: 'VARCHAR(10) NOT NULL UNIQUE',
    tnc: 'BOOLEAN DEFAULT FALSE',
    OTP: 'VARCHAR(4) DEFAULT NULL'
};