import axios from "axios";

function url(slug) {
  return `/api/projects/${slug}/`;
}

export function getProject(slug, onSuccess, onError) {
  axios.get(url(slug)).then(onSuccess, onError);
}

export function updateProject(slug, data, onSuccess, onError) {
  axios.put(url(slug), data).then(onSuccess, onError);
}

export function deleteProject(slug, onSuccess, onError) {
  axios.delete(url(slug)).then(onSuccess, onError);
}
