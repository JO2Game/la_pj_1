// 程序入口
import Handler = Laya.Handler;
import Loader = Laya.Loader;
import WebGL = Laya.WebGL;

Laya.MiniAdpter.init();
class GameMain
{
    constructor(){
        if (Laya.Browser.width > 0) this.init();
        else window.onresize = () => { this.init(); }
    }

    init(){
		//let enter = new Sophia.SLayaEnter()
        let enter = new Sophia.SLayaEnter()
		enter.init();

        Sophia.JOLog.error("","{0}", Sophia.JOMath.pointInLine(2,10, 6,2));

        let j=0;
        while(j<2){
            for(let i=0;i<10;i++){
                if(i==2)
                    break;
                console.log("iiiiiiiiiiiii", i);
            }
            console.log("jjjjjjjjjjjjjjjjjjjjj", j);
            j++;
        }
    }
}

new GameMain();
//Laya.Browser.__init__();//怒怼一次浏览器初始化,确保获取的数据是有效的 //		


