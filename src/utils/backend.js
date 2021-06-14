import axios from "axios";
import { BACKEND_BASEURL } from "../const";

export async function getUsers(token) {
  return axios.get(BACKEND_BASEURL + "users", {
    headers: {
      Authorization: token,
    },
  });
}

export async function sendFriendRequest(token, id) {
  let createRequestBody = {
    id: id,
  };
  let config = {
    headers: {
      Authorization: token,
    },
  };
  return axios.post(
    BACKEND_BASEURL + "users/friends/request",
    createRequestBody,
    config
  );
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

export async function getMyFriends(token) {
  return axios.get(BACKEND_BASEURL + "users/friends", {
    headers: {
      Authorization: token,
    },
  });
}
