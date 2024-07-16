const express = require('express');
const multer = require('multer')
const docxConverter = require('docx-pdf');
const path = require('path');
const cors = require('cors');

const app = express() ;
const PORT = process.env.PORT || 4001 ;

app.use(cors());

//? setting up the file storage
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads')
    },
    filename : function(req,file, cb){
    
     cb(null, file.originalname);   
    }
})

const upload = multer({ storage : storage})
// ? making post request
app.post('/convertfile', upload.single('file'), (req,res, next)=>{
    try {
        if(!req.file){
            return res.status(400).json({
                message : 'No file uploaded'
            })
        }

        // Defining output file path
        let outputPath = path.join(__dirname,"files", `${req.file.originalname}.pdf`);

        //? docx converter code here 
        docxConverter(req.file.path, outputPath,(err,result) => {
        if(err){
            console.log(err);
            return res.status(500).json({
                message : 'Error converting file'
            })
        }
        res.download(outputPath, () => {
            console.log('file downloaded')
        })
});
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal server error",
        });
    }
})

app.get('/', (req, res) => [
    res.send('Hello word to pdf convertor')
]);



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})