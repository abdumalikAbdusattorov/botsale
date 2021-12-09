import axios from 'axios';

export function getData(req) {

  const path = req.path;
  delete req.path;
  return axios({
    url: 'http://localhost:8082' + path,
    method: "get",
    params: req,

  })
}

export function createData(req) {

  const path = req.path;
  delete req.path;
  return axios({
    url: 'http://localhost:8082' + path,
    method: "post",
    data: req,

  })
}

export function removeData(req) {

  const path = req.path;
  delete req.path;
  return axios({
    url: 'http://localhost:8082' + path + req.id,
    method: "delete",

  })
}

export function editData(req) {

  const path = req.path;
  delete req.path;
  return axios({
    url: 'http://localhost:8082' + path,
    method: "post",
    data: req,
  })
}
