const { rejects } = require('assert');
const { error } = require('console');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const writeFileAsync = async (path, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (error) => {
      if (error) {
        return reject(error);
      }
      return resolve();
    });
  });
};

const appendFileAsync = async (path, data) => {
  return new Promise((resolve, reject) => {
    fs.appendFile(path, data, (error) => {
      if (error) {
        return reject(error);
      }
      return resolve();
    });
  });
};

const readFileAsync = async (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: 'utf-8' }, (error, data) => {
      if (error) {
        return reject(error);
      }
      return resolve(data);
    });
  });
};

const removeFileAsync = async (path) => {
  return new Promise((resolve, reject) => {
    fs.rm(path, (error) => {
      if (error) {
        return reject(error);
      }
      return resolve();
    });
  });
};

// writeFileAsync(path.resolve(__dirname, 'test.txt'), 'data ')
//   .then(() => appendFileAsync(path.resolve(__dirname, 'test.txt'), 'pervii '))
//   .then(() => appendFileAsync(path.resolve(__dirname, 'test.txt'), 'vtoroi '))
//   .then(() => appendFileAsync(path.resolve(__dirname, 'test.txt'), 'tretii '))
//   .then(() => readFileAsync(path.resolve(__dirname, 'test.txt')))
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));

// removeFileAsync(path.resolve(__dirname, 'test.txt')).then(() =>
//   console.log('file was removed')
// );

// const text = process.env.TEXT;

// writeFileAsync(path.resolve(__dirname, 'test.txt'), text)
//   .then(() => readFileAsync(path.resolve(__dirname, 'test.txt')))
//   .then((data) => data.split('').length)
//   .then((count) =>
//     writeFileAsync(
//       path.resolve(__dirname, 'count.txt'),
//       `Amount of words ${count}`
//     )
//   )
//   .then(() => removeFileAsync(path.resolve(__dirname, 'test.txt')))
//   .catch((error) => console.log(error));
