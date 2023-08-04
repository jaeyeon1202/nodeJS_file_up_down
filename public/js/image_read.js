function readURL(input){
    //파일에 대한 정보
    const file = input.files[0];
    console.log(file);
    if(file != ""){ //파일에 값이 있다면 
        const reader = new FileReader(); //파일을 읽어오는 기능
        reader.readAsDataURL(file); //파일에 대한 정보를 넣는것
        reader.onload =(e) => { //실행시켜주겠다 , e:이벤트 객체
            console.log(e.target.result);
            document.querySelector("#preview").src = e.target.result;
        }
    }
}