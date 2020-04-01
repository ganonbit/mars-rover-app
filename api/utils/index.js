import fetch from 'isomorphic-unfetch';
import { readFileSync, existsSync, mkdirSync } from 'fs';
import download from 'image-downloader';
import appRoot from 'app-root-path';

const dateFile = `${appRoot}/assets/files/dates.txt`;

export const findExtensionOfString = string => {
    try {
        const regex = new RegExp('[^.]+$');
        const extension = string.match(regex);
        return extension;
    } catch (e) {
        console.error(e)
    }
};

export const getDatesFromFile = file => {
    try {
        const datesArr = readFileSync(file, 'utf8').toString().split('\n');
        const formattedDatesArr = datesArr.map(date => (date = new Date(date).toLocaleDateString('fr-CA')));
        return formattedDatesArr;
    } catch (e) {
        console.error(e)
    }
};

export const downloadImage = async options => {
    try {
        const filename = options.dest;
        !existsSync(filename) && await download.image(options);
    } catch (e) {
        console.error(e);
    }
};

export const fetchNasaApiImages = async url => {
    try {
    const res = await fetch(url);
    const data = await res.json();
    const flatPhotoData = [].concat(...data.photos);
    return flatPhotoData;
    } catch (error) {
    console.error(
        `There has been a problem with your fetch operation: ${error.message}`
    );
    }
};

export const saveNasaImagesToDisk = async url => {
    try {
        const imgArr = await fetchNasaApiImages(url);
        const imgDownload = imgArr.map(async entry => {
        const imgFolder = `${appRoot}/public/images`;
        const imgUrl = entry.img_src.replace(/http:/, 'https:');
        const imgExt = await findExtensionOfString(imgUrl);
        const fileName = `${entry.earth_date}_${entry.id}.${imgExt}`;
        const filePath = `${imgFolder}/${fileName}`
        !existsSync(imgFolder) && mkdirSync(imgFolder, { recursive: true });
        const nasaApiOptions = {
            url: imgUrl,
            dest: filePath,
            timeout: 300000,
            agent: false,
            pool: {
                maxSockets: 200
            }

        }
        await downloadImage(nasaApiOptions)
        });
        return imgDownload;
    } catch (e) {
        console.error(e)
    }
};

export const saveImagesInDateRange = async () => {
    try {
        const datesArr = await getDatesFromFile(dateFile);
        datesArr.map(async date => {
        const nasaUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=h8C1xyg8GdXdNhhHfUTDQ7CmK2tNyrLo5ecIzClG`;
        const saveDateImages = await saveNasaImagesToDisk(nasaUrl);
        return saveDateImages
        });
    } catch (e) {
        console.error(e)
    }
};