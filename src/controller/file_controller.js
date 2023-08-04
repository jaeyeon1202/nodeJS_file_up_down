
const fs = require("fs"); //파일 모듈 임폴트 =>파일에 관련된 기능을 사용할수 있다.

const views = { //보여지는것만
    index: (req,res) =>{
        //res.send("controller index 연동");
        res.render("file_index");
    }, //콤마찍기
    
    list: (req,res) => {
        /*
        fs.readdir("./upload_file", (err,files)=>{
            console.log("====비동기=====");
            console.log(files);
        })*/ //비동기로 만들때는 안에 함수를 따로 만들어줘서 처리
        //(폴더위치, 함수..?)
        //readdir - 비동기방식으로 처리됨 => dir비동기 sync동기(싱크)
        //결과가 들어올때까지 기다려 주겠다.

        const fileList = fs.readdirSync("./upload_file");
        console.log("===동기 방식 처리 ===");
        console.log(fileList);
        //res.send("test");
        res.render("file_list", {files:fileList});
    },

    download : (req, res) =>{
        const filePath = `./upload_file/${req.params.fileName}`;
        res.download( filePath) ;
        
    }, 

    modifyForm: (req,res) => {
        const fileName = req.params.fileName;
        res.render("modify_form", {fileName});

    }
}

const process = { //연산하는 기능은 요기에다가 몰빵
    upload : (req,res)=>{
        console.log("===컨트롤 업로드 ===");
        console.log(req.body); //title
        console.log("---------------");
        console.log(req.file); //파일에 대한 정보
        console.log("---------------");
        console.log("req.test: ", req.fileValidation);
        console.log("=======================");
        if(req.fileValidation){
            return res.send(req.fileValidation);
        }
        res.send("upload");
    }, 

    deleteFile : (req,res)=> {
        fs.unlinkSync(`./upload_file/${req.params.fileName}`);
        //unlink 동기,비동기 둘다 있음
        res.redirect("/file/list");
    }, 

    modify : (req,res) => {
        console.log("=== modify ===");
        console.log(req.file); 
        //file값이 없으면 변경 안됨
        //file값이 있으면 변경됨
        if(req.file){
            return res.redirect(`/file/deleteFile/${req.body.originFileName}`);
        }
        res.redirect("/file/list");

    }
}
module.exports = {views, process};

// 해당하는 함수를 만들어서 사용을 했는데,
// 키벨류 형식으로 만들어서 그 안에 함수를 정의하고ㅓ
// 보여지는 쪽은 뷰즈 안에만 처리해서 뷰즈만 내보낸다./
// views.index로 사용
