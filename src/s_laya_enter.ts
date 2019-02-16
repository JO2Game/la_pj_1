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

            //日志 初始化
            if(GConfig.LOG_SHOW===true){
                JOLog.setCall(this, (logLv, msg)=>{
                    switch(logLv){
                        case 2:
                            console.warn(msg);
                            break;
                        case 3:
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
                        JOLog.addIgnore(ignores[i]);
                    }
                }
                let appoints = GConfig.LOG_APPOINT;
                if(appoints){
                    for(let i=0;i<appoints.length;i++){
                        JOLog.addAppoint(appoints[i]);
                    }
                }
                JOLog.setLevel(GConfig.LOG_LIMIT_LEVEL);
                JOLog.setTitle(GConfig.LOG_TITLE);
                JOLog.setShowInTick(GConfig.LOG_SHOW_IN_TICK);
            }
            else{
                JOLog.setLevel(GDef.LOG_LV_ERROR+999);
            }
            
            //Socket 初始化
            JOSocketMgr.Ins.setDebug(GConfig.NET_MSG_SHOW);
            JOSocketMgr.Ins.setSocketVO(JOSocketLayaVO);

            // Other 初始化
            JOSnMgr.Ins.setCheckInterval(SN_CHECK_INTERVAL);
            JOPoolMgr.Ins.setCheckInterval(POOL_CHECK_INTERVAL);

            // 消息处理 初始化
            JOEventMgr.Ins.setLocalBinderVO("JOEBinderLocalVO",JOEBinderLocalVO);
            JOEventMgr.Ins.setNetBinderVO("JOEBinderNetVO",JOEBinderNetVO);
            JOEventMgr.Ins.setLocalInTick(GConfig.EVENT_LOCAL_IN_TICK);

            JOResLayaMgr.Ins.setCheckInterval(RES_CHECK_INTERVAL);
            JOResLayaMgr.Ins.setResCls("",null);
            
            // 音乐播放器初始化
            JOAudioMgr.Ins.setMusicPlayer(new JOLayaMusicVO());
            JOAudioMgr.Ins.setSoundBase("JOLayaSoundVO", JOLayaSoundVO);
            
            //循环事件 初始化
            Laya.timer.frameLoop(1, this, this._tick);
            Laya.timer.loop(NOR_SECOND_CHECK_INTERVAL, this, this._norTimeTick);
            Laya.timer.frameLoop(NOR_FRAME_CHECK_INTERVAL, this, this._norFrameTick);
        }
        
        private _tick(){
            JOTickMgr.Ins.tick(Laya.timer.delta);
            JOEventMgr.Ins.tick();
            JOLayaUIMgr.Ins.tick();
        }

        private _norTimeTick(){
            JOPoolMgr.Ins.tick();
            JOSnMgr.Ins.tick();
        }
        private _norFrameTick(){
            JOLog.tick();
        }
    }
}