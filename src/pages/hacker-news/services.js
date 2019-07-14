import axios from 'axios';

export const pathsUrl = [
  'maxitem',
  'topstories',
  'newstories',
  'beststories',
  'askstories',
  'showstories',
  'jobstories'
]

const hackerNewsRequest = axios.create({
  baseURL: 'https://hacker-news.firebaseio.com/v0'
});

export const getStoriesByPath = (path) => {
  return hackerNewsRequest.get(`/${path}.json?print=pretty`).then(({data}) => data);
};

export const getItemsById = (id) => {
  return hackerNewsRequest.get(`/item/${id}.json?print=pretty`).then(({data}) => data);
};
