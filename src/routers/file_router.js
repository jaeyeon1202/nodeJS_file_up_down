const router = require("express").Router();

const multer = require("multer"); //멀터가 파일을 관리해줌
//const upload = multer({dest: "upload_file"}); //파일을 저장할 폴더 위치
//{dest: "upload_file"}: 데스트네이션 파일에 대한 위치 정보

const stg = multer.diskStorage( { //어떤 방식으로 저장을 할거다.
    destination : (req,file,cb) => { //(리퀘스트, 파일, 콜백이라는 함수)
        //변수로 만들어서 저장위치를 처리...?
        //콜백은 des에 지정한 파일이 저장된다
        console.log("====dest =====");
        cb(null, "upload_file"); //컬백함수 이용, 넘엉혼 데이터를 특정 위치에 저장
        //앞에는 무조건 널, 
    },
    filename : (req, file, cb) => { //리퀘스트 객체에 대한 정보, 파일,파일 이름을 콜백함수로 통해서 지정
        console.log("==== filename =====");
        cb(null, Date.now()+"-"+file.originalname); //file.originalname:사용자가 실질적으로 보내온 이름
    }//Date.now()+"-"+file.originalname : 초단위+파일명 => 다른이미지 같은 이름 파일을 올려도, 이름이 같으면 계속 덮어씌워져서 시간으로 구분
});

const f_Filter = (req,file,cb) => {
    console.log(" === filter ===");
    const type = file.mimetype.split("/")[0];//스플릿: "/"를 기준으로 쪼개겠다.
    console.log("type: ", type);
    if(type === "image"){
        cb(null, true);
    }else{
        //req = {test: "...내용..."}
        req.fileValidation = "이미지만 저장하세유~";
        cb(null,false);
    }
    //cb(null, true); //파일을 저장하겠다 펄스면 안저장    
}

const upload = multer({storage: stg, 
                        fileFilter: f_Filter}); //얘네는 filename이 들어와야 실행됨
//storage : 저장할 장소..?

const fileCtrl = require("../controller/file_controller");

router.get("/", fileCtrl.views.index)
router.get("/list", fileCtrl.views.list)
router.get("/download/:fileName", fileCtrl.views.download)
router.get("/deleteFile/:fileName", fileCtrl.process.deleteFile)
router.get("/modify_form/:fileName", fileCtrl.views.modifyForm)

router.post("/upload", 
    upload.single("file_name"),
     fileCtrl.process.upload)
router.post("/modify", 
    upload.single("newFileName"),
    fileCtrl.process.modify)

//미들웨어처럼 처리해주는 함수..?
// upload가 실행되면 이 함수를 싱행해주세요
//single(파일에 대한 이름): 단일파일 업로드, arr():여러개의 파일 업로드
//ejs에서 만들었던 이름이랑 똑같이 해야함

module.exports = router;