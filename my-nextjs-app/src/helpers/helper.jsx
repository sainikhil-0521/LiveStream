import { getCookie } from "cookies-next";

const initilizeCookie = () => {
    setUserDetails(getCookie("sessionDetails"));
}