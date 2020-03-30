import fetch from 'isomorphic-unfetch';
import { readFileSync, createWriteStream, existsSync, mkdirSync } from 'fs';
import { get } from 'https';

export const dateFile = __dirname + '/assets/files/dates.txt';
export const nasaUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=${process.env.nasaApiKey}`;

export const findExtensionOfString = string => {
  const regex = new RegExp('[^.]+$');
  const extension = string.match(regex);
  return extension;
}
  
export const getDatesFromList = dateFile => {
const datesArr = readFileSync(dateFile, 'utf8').toString().split('\n');
const formattedDatesArr = datesArr.map(date => (date = new Date(date).toLocaleDateString('fr-CA')));
return formattedDatesArr;
};

export const fetchNasaApiImages = async url => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    const flatPhotoData = [].concat(...data.photos);
    return flatPhotoData;
  } catch (error) {
    console.log(
      'There has been a problem with your fetch operation: ',
      error.message
    );
  }
};

export const saveNasaImagesToDisk = async url => {
  const imgArr = await fetchNasaApiImages(url);
  const uploadImage = imgArr.map(async entry => {
    const imgFolder = `${__dirname}/assets/images/${entry.earth_date}`;
    const imgUrl = entry.img_src.replace(/http:/, 'https:');
    const imgExt = findExtensionOfString(imgUrl);
    const fileName = `${entry.id}.${imgExt}`;
    get(imgUrl, response => {
      const fileWriteStream = createWriteStream(`${imgFolder}/${fileName}`);
      if (!existsSync(imgFolder)) {
        mkdirSync(imgFolder, { recursive: true });
      }
      response.pipe(fileWriteStream);
    });
  });
  return uploadImage;
};

export const saveImagesInDateRange = async (url) => {
  const datesArr = getDatesFromList(dateFile);
  datesArr.map(async date => {
    // saveNasaImagesToDisk();
  }
};