import axios from "axios";
import { BACKEND_BASEURL } from "../const";

export function createUser(email) {
  let createUserBody = {
    email: email,
  };
  return axios.post(BACKEND_BASEURL + "users", { createUserBody });
}

export async function getUsers(token) {
  return axios.get(BACKEND_BASEURL + "users", {
    headers: {
      Authorization: token,
    },
  });
}

export async function addFriend(token, email) {
  return axios.post(
    BACKEND_BASEURL + "users/friends/add",
    { email: email },
    {
      headers: {
        Authorization: token,
      },
    }
  );
}
