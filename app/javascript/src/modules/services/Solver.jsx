import axios from 'src/modules/lib/Axios'

export function fetchDefaultMaze() {
  return new Promise((resolve, reject) => {
    axios.get('api/v1/maze/new')
    .then((response) => {
      resolve(response.data);
    }).catch((e) => {
      reject(e.message);
    })
  })
}

export function solveMaze(data) {
  return new Promise((resolve, reject) => {
    axios.post('api/v1/maze/solve', {data: data})
    .then((response) => {
      resolve(response.data);
    }).catch((e) => {
      reject(e.message);
    })
  })
}
