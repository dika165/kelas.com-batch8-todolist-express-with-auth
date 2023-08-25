import dbPool from "../utils/db.js";

export const getData = () => {
    const sql = "SELECT user_id, name, email, password, created_at FROM users LIMIT 1000";
    
    return dbPool.query(sql);
}

export const createData = (name, email, password) => {
    let createdAt = new Date();
    const sql = "INSERT INTO users (name, email, password, created_at) VALUE (?, ?, ?, ?)";
    const value = [name, email, password, createdAt];
    const result = dbPool.query(sql, value)

    return result;
}

export const updateData = (id, name, email) => {
    let updatedAt = new Date();

    const sql = "UPDATE users SET name = ?, email=? WHERE user_id = ?";
    const value = [name, email, id]
    const result = dbPool.query(sql, value)

    return result;
}

export const deleteData = (id) => {
    const sql = "DELETE FROM users WHERE user_id = ?";
    const result = dbPool.query(sql, [id]);

    return result;
}

export const getDataByEmail = (email) => {
    const sql = "SELECT user_id, name, email, password FROM users WHERE email = ?";
    
    return dbPool.query(sql,[email]);
}

export const getDataById = (id) => {
    const sql = "SELECT user_id, name, email, password FROM users WHERE user_id = ?";
    return dbPool.query(sql, [id]);
}