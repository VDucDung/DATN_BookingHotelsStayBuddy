import axios from 'axios';

const get = async (url: string): Promise<any> => {
  const response = await axios.get(url, {
    headers: {
      Accept: 'application/json',
      'Accept-Encoding': 'identity',
    },
  });
  return response.data;
};

export default { get };
