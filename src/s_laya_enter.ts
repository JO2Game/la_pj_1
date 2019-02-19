/**
 * Created by James Ou .
 * @class JOSophia
 * @constructor 
 **/

namespace Sophia{
    const SN_CHECK_INTERVAL:number = 120;
    const RES_CHECK_INTERVAL:number = 120;
    const POOL_CHECK_INTERVAL:number = 120;

    const NOR_SECOND_CHECK_INTERVAL:number = 3*1000;
    const NOR_FRAME_CHECK_INTERVAL:number = 10;

    export class SLayaEnter {
        
        public init(){
            Laya.init(GConfig.DESIGN_WIDTH, GConfig.DESIGN_HEIGHT, Laya.WebGL);
            //日志 初始化
            if(GConfig.LOG_SHOW===true){
                Sophia.JOLog.setCall(this, (logLv, msg)=>{
                    switch(logLv){
                        case 1:
                            console.warn(msg);
                            break;
                        case 2:
                            console.error(msg);
                            break;
                        default :
                            console.log(msg);
                            break;
                    }
                });
                let ignores = GConfig.LOG_IGNORE;
                if(ignores){
                    for(let i=0;i<ignores.length;i++){
                        Sophia.JOLog.addIgnore(ignores[i]);
                    }
                }
                let appoints = GConfig.LOG_APPOINT;
                if(appoints){
                    for(let i=0;i<appoints.length;i++){
                        Sophia.JOLog.addAppoint(appoints[i]);
                    }
                }
                Sophia.JOLog.setLevel(GConfig.LOG_LIMIT_LEVEL);
                Sophia.JOLog.setTitle(GConfig.LOG_TITLE);
                Sophia.JOLog.setShowInTick(GConfig.LOG_SHOW_IN_TICK);
            }
            else{
                Sophia.JOLog.setLevel(GDef.LOG_LV_ERROR+999);
            }
            
            //Socket 初始化
            Sophia.JOSocketMgr.Ins.setDebug(GConfig.NET_MSG_SHOW);
            Sophia.JOSocketMgr.Ins.setSocketVO(Sophia.JOSocketLayaVO);

            // Other 初始化
            Sophia.JOSnMgr.Ins.setCheckInterval(SN_CHECK_INTERVAL);
            Sophia.JOPoolMgr.Ins.setCheckInterval(POOL_CHECK_INTERVAL);

            // 消息处理 初始化
            Sophia.JOEventMgr.Ins.setLocalBinderVO("JOEBinderLocalVO",Sophia.JOEBinderLocalVO);
            Sophia.JOEventMgr.Ins.setNetBinderVO("JOEBinderNetVO",Sophia.JOEBinderNetVO);
            Sophia.JOEventMgr.Ins.setLocalInTick(GConfig.EVENT_LOCAL_IN_TICK);

            Sophia.JOResLayaMgr.Ins.setCheckInterval(RES_CHECK_INTERVAL);
            Sophia.JOResLayaMgr.Ins.setResCls("JOResLayaVO",Sophia.JOResLayaVO);
            
            // 音乐播放器初始化
            Sophia.JOAudioMgr.Ins.setMusicPlayer(new Sophia.JOLayaMusicVO());
            Sophia.JOAudioMgr.Ins.setSoundBase("JOLayaSoundVO", Sophia.JOLayaSoundVO);
            
            //循环事件 初始化
            Laya.timer.frameLoop(1, this, this._tick);
            Laya.timer.loop(NOR_SECOND_CHECK_INTERVAL, this, this._norTimeTick);
            Laya.timer.frameLoop(NOR_FRAME_CHECK_INTERVAL, this, this._norFrameTick);


            if(GConfig.DEBUG){
                //laya.debug.DebugPanel.init();
                laya.utils.Stat.show(0,0); 
            }
            Laya.WorkerLoader.workerPath = "libs/worker.js";
            Laya.WorkerLoader.enable = true

            this.initScene();
            Laya.stage.on(Laya.Event.RESIZE,this,this._onResize);
        }

        public static setFrameRate(rate: number)
        {
            //项目根据要求固定30帧, 这里不被调整！
            if(rate >= 60){
                Laya.stage.frameRate = "fast";
            }
            else{
                Laya.stage.frameRate = "slow";
            }
        }

        public initScene(){
            //Laya.init(GConfig.DESIGN_WIDTH, GConfig.DESIGN_HEIGHT, Laya.WebGL);
            // 设置流程度（0=标准，1=流畅【默认0】）
            let fluntIndex = laya.net.LocalStorage.getItem("FluntIndex");
            if (fluntIndex == null || fluntIndex == "0"){
                Config.isAntialias = false;
            }
            else if (fluntIndex == "1"){
                Config.isAntialias = true;
            }
            
            Laya3D.init(0, 0, true);
            //帧率限定为30
            SLayaEnter.setFrameRate(30);
            // 尝试把默认下载线程改为10个//
            // Laya.loader.maxLoader = 10;

            // //设置适配模式
            // let scale = Laya.Browser.width/Laya.Browser.height;//高宽比
            // let minScale =  17/32;
            // let maxScale = 19/32;
            // /** 设计宽高比 */
            // // let designSize = ScreenConfig.WINDOW_DESIGN_WIDTH / ScreenConfig.WINDOW_DESIGN_HEIGHT;
            // if (Laya.Browser.onIPhone) {
            //     ScreenConfig.IsIphoneX = true;
            // }
            // let debugFlag = true; // TODO , 现在调试模式就不用这个模式！
            // if(!debugFlag && (scale>minScale&&scale<maxScale)){
            //     Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
            // }else{
            //     if (scale > 0.6) {
            //         Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_AUTO;//Laya.Stage.SCALE_SHOWALL;
            //     } else {
            //         Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;//SCALE_FIXED_HEIGHT; //SCALE_FIXED_WIDTH;
            //     }
            //     // Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
            // }
            // Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
            // Laya.stage.alignV = Laya.Stage.ALIGN_TOP;
            // Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;

            fairygui.GRoot.inst.setSize(GConfig.DESIGN_WIDTH, GConfig.DESIGN_HEIGHT);
            Laya.stage.addChild(fairygui.GRoot.inst.displayObject);
        }
        
        private _tick(){
            Sophia.JOTickMgr.Ins.tick(Laya.timer.delta);
            Sophia.JOEventMgr.Ins.tick();
            Sophia.JOLayaUIMgr.Ins.tick();
        }

        private _norTimeTick(){
            Sophia.JOPoolMgr.Ins.tick();
            Sophia.JOSnMgr.Ins.tick();
        }
        private _norFrameTick(){
            Sophia.JOLog.tick();
        }

        private _onResize(){

        }
    }
}