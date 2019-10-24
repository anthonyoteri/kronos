import axios from "axios";

function url() {
  return "/api/projects/";
}

export function listProjects(onSuccess, onError) {
  axios.get(url()).then(onSuccess, onError);
}

export function createProject(data, onSuccess, onError) {
  axios.post(url(), data).then(onSuccess, onError);
}
