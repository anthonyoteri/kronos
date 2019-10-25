import axios from "axios";

function url() {
  return "/api/records/";
}

export function listRecords(onSuccess, onError) {
  axios.get(url()).then(onSuccess, onError);
}

export function createRecord(data, onSuccess, onError) {
  axios.post(url(), data).then(onSuccess, onError);
}
