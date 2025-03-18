import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie";

const USER_COOKIE_NAME = "vid";
const COOKIE_EXPIRATION_DAYS = 365; // 1 year

const useUserUUID = () => {

    useEffect(() => {
        let userUUID = Cookies.get(USER_COOKIE_NAME);

        if (!userUUID) {
            userUUID = uuidv4();
            Cookies.set(USER_COOKIE_NAME, userUUID, { expires: COOKIE_EXPIRATION_DAYS });
        }
    }, []);
};

export default useUserUUID;