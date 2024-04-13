//Imported the multer package
import Multer from 'multer';

//assigning the uploads folder to DIR
const DIR = './uploads';

/* 
Using uploads directory for the storage configuration of the files 
received by multer,
*/
const storage = new Multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName);
  },
});

const upload = Multer({
  storage: storage,
});

export default upload;
