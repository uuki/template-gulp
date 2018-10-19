import gulp from 'gulp';
import authorize from '../../utils/gapi_authorize/gapi_authorize.js';
import fs from 'fs-extra';

gulp.task('spread2json', () => {
  let auth = {
    scriptId: 'M_W5Ql7uS5COo9eqKIgy2arcQggsTmNIl',
    scope: ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/script.external_request'],
    token: 'script-nodejs-quickstart.json'
  };

  let resources = {
    function: 'spread2json',
    parameters: [
      'getData', {
        sheetId: '1og709ajh6JPG-uJA2nJCkFoq0tFITKX50gym4EL8ymE',
        sheetName: 'シート1'
      }
    ],
    devMode: true
  };

  let getJson = () => {
    authorize(auth, resources, (translateJson) => {
      fs.mkdirsSync(PATH.gulp.languages);

      Object.keys(translateJson).forEach((key, i) => {
        let splitData = {};
        splitData[key] = translateJson[key];
        fs.writeFile(`${ PATH.gulp.languages }/${ key }.json`, JSON.stringify(splitData), (err) => {
          err ? console.log('Error: ' + err) : '';
        })
      })

    });
  }

  return getJson;
})