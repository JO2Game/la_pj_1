/**
 * Created by James Ou .
 * @class JOSophia
 * @constructor 
 **/

namespace GConfig{
    export const DEBUG:boolean = true;

    //--******************日志设置****************************************
    export const LOG_SHOW:boolean = true
    export const LOG_SHOW_IN_TICK:boolean = true;
    export const LOG_TITLE:string = "laya"
    export const LOG_LIMIT_LEVEL:number = GDef.LOG_LV_INFO
    // 指定输出的日志标志
    export const LOG_APPOINT:Array<string> = [];
    // 忽略输出的日志标志
    export const LOG_IGNORE:Array<string> = ["Search", "LineSearch"];

    // 设置包的默认语言
    export const LANGUAGE:string = "zh"
    //--是否显示网络数据16x
    export const NET_MSG_SHOW:boolean = false
    //--等待界面的打开等待时间
    export const NET_WAIT_UI_SHOW_TIME:number = 0.5
    //--是否进行心跳包处理
    export const NET_HEART_BEAT_SHOW:boolean = false

    // 本地消息是否分帧派发
    export const EVENT_LOCAL_IN_TICK:boolean = true;

    // 设计分辨率
    export const DESIGN_WIDTH:number = 640;
    export const DESIGN_HEIGHT:number = 960;
}