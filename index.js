/*
    1. Buat fungsi authenticationUser dengan tambahan fungsi untuk menyimpan refresh token di table user_token
        - buat table user_token dengan field : user_id, refresh_token, create_at, updated_at;
        - simpan data user_token ketika process login berhasil
    2. Buat endpoint token/refresh : untuk membuat access token baru
        - validasi refresh token yang kirimkan
        - ambil data user berdasarkan id yang di ambil dari claims / payload
        - buat access token baru
        - kembalikan response object yang berisi {access_token, refresh_token}
*/


import express from 'express';
import userRouter from "./routes/userRoutes.js";
import { errorResp } from "./utils/response.js";

const app = express();
const port = 8080;
const host = 'localhost';

app.use(express.json());
app.use('/users',userRouter);

app.use((error, request, response, next) => {
    const message = "internal server error";
    console.log(error.message);
    errorResp(response, message, 500)
});

app.listen(port, host, () => {
    console.log(`server berjalan di http://${host}:${port}`);
})