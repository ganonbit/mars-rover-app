import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import appRoot from 'app-root-path';
import { saveImagesInDateRange } from './utils'

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/image", express.static(`${appRoot}/api/public/images`), (req, res) => {
  res.status(404);
  res.json({error:{code:404}})
});

saveImagesInDateRange();

app.listen(4000, () =>
  console.log('listening on port 4000'),
);