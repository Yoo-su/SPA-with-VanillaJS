import Dashboard from "./views/Dashboard.js";
import Posts from "./views/Posts.js";
import Settings from "./views/Settings.js";

const navigateTo=(url)=>{
    history.pushState(null,null,url);
    router();
}

//js로 구현한 router
const router=async()=>{
    //각각의 경로와 element를 그릴 함수를 가진다.
    const routes=[
        {path:"/", view:Dashboard},
        {path:"/posts", view:Posts},
        {path:"/settings", view:Settings},
    ];

    //현재 url 경로와 같으면 isMatch를 true로 설정한다. 
    const potentialMatches=routes.map(route=>{
        return {
            route:route,
            isMatch:location.pathname===route.path,
        }
    });

    //현재 url과 매치되는 것을 찾는다.
    let match=potentialMatches.find(potentialMatch=>potentialMatch.isMatch);

    //매칭되는 url이 아닌경우 기본 경로로 이동시킨다.
    if (!match){
        match={
            route:routes[0],
            isMatch:true
        }
    }

    //매칭되는 뷰 클래스 객체를 생성한다. 
    const view=new match.route.view();

    document.querySelector('#app').innerHTML=await view.getHtml();
};

//뒤로 가기 눌렀을 때 router함수 호출한다. 
window.addEventListener('popstate',router);

//DOM 컨텐츠가 브라우저에 로드 되었을 때 실행할 함수를 정의한다.
document.addEventListener("DOMContentLoaded",()=>{
    //a 태그를 작동하지 않게 한다. 싱글 페이지 어플리케이션 방식으로 이동하게 한다.
    document.body.addEventListener('click',e=>{
        if(e.target.matches("[data-link]")){
            e.preventDefault();
            navigateTo(e.target.href);
        }
    })

    router();
})