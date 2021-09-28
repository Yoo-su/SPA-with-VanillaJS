const express=require('express');
const path=require('path');
const app=express();

app.use("/static", express.static(path.resolve(__dirname,"frontend", "static")))

//요청이 들어오면 기본적으로 index.html 파일을 응답으로 보내준다. 
//싱글 페이지 애플리케이션은 html이 하나만 있고 javascript를 통해 그 위에 모든 것을 만드는 것.
app.get("/*" , (req,res)=>{
    res.sendFile(path.resolve("frontend", "index.html"));
})

app.listen(process.env.PORT || 5001,()=>{console.log('server is running...')});

  