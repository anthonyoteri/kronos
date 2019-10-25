import axios from "axios";

export function getRecord(url, onSuccess, onError) {
  axios.get(url).then(onSuccess, onError);
}

export function updateRecord(url, data, onSuccess, onError) {
  axios.put(url, data).then(onSuccess, onError);
}

export function deleteRecord(url, onSuccess, onError) {
  axios.delete(url).then(onSuccess, onError);
}
