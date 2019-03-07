// 程序入口
import Handler = Laya.Handler;
import Loader = Laya.Loader;
import WebGL = Laya.WebGL;

Laya.MiniAdpter.init();
class GameMain
{
    m_testUnit:Sophia.TestUnit;
    constructor(){
        if (Laya.Browser.width > 0) this.init();
        else window.onresize = () => { this.init(); }
    }

    init(){
		//let enter = new Sophia.SLayaEnter()
        let enter = new Sophia.SLayaEnter()
		enter.init();
        this.m_testUnit = new Sophia.TestUnit();
        // Sophia.JOLog.error("","{0}", Sophia.JOMath.pointInLine(2,10, 6,2));
        let dict = new Sophia.JODictionary<string, number>();
        dict.set("afd", 100);
        dict.set("oiu", 999);
        console.log(dict.get("afd"));
        console.log(dict["oiu"]);
        // let tt = {a:"abc", b:"123"};
        // if(dict["abc"])
        //     console.log("abc", dict["abc"]);
        // if(!dict["abc"])
        //     console.log("!!!abc", dict["abc"]);
        // let ta = tt;
        // // ta = null;
        // delete ta.a;
        // console.log("11111111111", ta);
        // console.log("2222222222222", tt);
        
        // let j=0;
        // while(j<2){
        //     for(let i=0;i<10;i++){
        //         if(i==2)
        //             break;
        //         console.log("iiiiiiiiiiiii", i);
        //     }
        //     console.log("jjjjjjjjjjjjjjjjjjjjj", j);
        //     j++;
        // }
        this.aaaa("qqqq", "1", "2", "4343");
    }

    aaaa(tmp:string, ...opt:any[]){
        console.log("aaaa", opt);
        let abc = opt;
        this.bbb("eeee", ...abc)
    }
    bbb(tmp:string, ...opt:any[]){
        console.log("bbbb", tmp, opt);
    }
}

new GameMain();
//Laya.Browser.__init__();//怒怼一次浏览器初始化,确保获取的数据是有效的 //		


