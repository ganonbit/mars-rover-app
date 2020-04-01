import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { opendirSync } from 'fs';
import { saveImagesInDateRange } from './utils'

const app = express();

app.use(cors({
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/image', express.static('public/images'))

app.get('/', (req, res) => {
    const hostname = `${req.protocol}://${req.headers.host}`;
    const path = req.params[0] ? req.params[0] : `/public/images`;
    const dir = opendirSync(process.cwd() + path);
    let entity;
    let image = [];
    while((entity = dir.readSync()) !== null) {
        entity.isFile() && image.push({ image: `${hostname}/image/${entity.name}` });
    }
    dir.closeSync();
    res.send(image);
})

saveImagesInDateRange();

app.listen(8000, () =>
  console.log('listening on port 8000'),
);