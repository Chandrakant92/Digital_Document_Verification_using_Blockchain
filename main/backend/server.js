import cors from "cors";
import express from "express";
import multer from "multer";
import { create } from "ipfs-http-client";
import fs from "fs";
import { PDFDocument,rgb } from "pdf-lib";
import crypto from "crypto";
import fsp from "fs/promises";
import { v4 as uuid } from "uuid";
import path from "path";
import morgan from "morgan";
import QRCode from "qrcode";

import {connectToDatabase} from './MongoDb/MongoConfig.js';
const port = 5000;
const ipfs_port=5001;

const UPLOADS_DIR = path.join(process.cwd(), "uploads");
const NODE_ENV = process.env.NODE_ENV || "development";
const APPENDED_DIR = path.join(process.cwd(), "appended");
const IPFS_NODE_HOST = 'localhost';



const ipfs = create({
  host: IPFS_NODE_HOST,
  protocol: "http",
  port: ipfs_port,
});




function catchAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch(next);
  };
}

async function uploadFileToIPFS(filePath) {
  const file = fs.readFileSync(filePath);
  const result = await ipfs.add(file, {
    pin: true,
  });
  return result.cid.toString();
}

async function generateQRCodePDF(text, pdfInputPath, pdfOutputPath) {
  const link=`http://localhost:3000/CompanyPage?document=${text}`;
      
  const qrCode = await QRCode.toDataURL(link, 
    { errorCorrectionLevel: 'H' });
  const pdfBytes = fs.readFileSync(pdfInputPath); // Read the PDF file

  const pdfDoc = await PDFDocument.load(pdfBytes);
  const [page] = pdfDoc.getPages();

  const qrCodeImage = await pdfDoc.embedPng(qrCode);
  const qrCodeDims = qrCodeImage.scale(0.25);

  page.drawImage(qrCodeImage, {
      x: page.getWidth() - qrCodeDims.width - 20,
      y: 20,
      width: qrCodeDims.width,
      height: qrCodeDims.height,
  });

  // Add text below the QR code
  page.drawText(text, {
      x: page.getWidth() - qrCodeDims.width - 200,
      y: 20 - 15,
      size: 12,
      color: rgb(0, 0, 0),
  });

  const modifiedPdfBytes = await pdfDoc.save();

  // Write the modified PDF bytes to a new file
  fs.writeFileSync(pdfOutputPath, modifiedPdfBytes);
}


//setup

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR);
}
if (!fs.existsSync(APPENDED_DIR)) {
  fs.mkdirSync(APPENDED_DIR);
}
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, UPLOADS_DIR);
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      const id = uuid();
      cb(null, id + ext);
    },
  }),
});

const app = express();
app.use(cors());
app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use(morgan("common"));


  /// uploading fn//
  app.post('/upload', upload.single('certificate'), async (req, res) => {
    try {  
      
     const id = uuid();
     const cid = await uploadFileToIPFS(req.file.path);
      
  
     const response= res.json({ 
        uuid: id, 
        ifpsLink: `http://localhost:8080/ipfs/${cid}`, //`https://ipfs.io/ipfs/${cid}/?filename=${id}.pdf`,
        cid: cid.toString() 
      });
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while uploading the file' });
    }
  });
  
  //issue//
  app.post(
    "/issue",
    upload.single("certificate"),
    catchAsync(async (req, res) => {
      if (!req.file) {
        throw new createHttpError.BadRequest("file not found");
      }
      const id = req.body.selectedUUID; // Access the value of selectedIpfs here
   
        const appendedFilePath = path.join(APPENDED_DIR, id + ".pdf");
 
        await generateQRCodePDF(id, req.file.path, appendedFilePath);
      
     // const hash = await sha256(appendedFilePath)
      const cid = await uploadFileToIPFS(appendedFilePath);
      return res.json({
        // uuid: id,
        // hash: hash,
        ifpsLink: `http://localhost:8080/ipfs/${cid}`, //`https://ipfs.io/ipfs/${cid}/?filename=${id}.pdf`,
        cid: cid, //cid //
      });
    })
  );


  /////////////////////////////////////////////////////////////////////////////////////////////////

 
//  connectToDatabase();


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
