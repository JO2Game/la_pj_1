/**
 * Created by James Ou .
 * @class JOSophia
 * @constructor 
 **/

 namespace GDef {
     let enumIdx:number = 0;
     function _enumId(offset=0):number{
        enumIdx++;
        enumIdx+=offset;
        return enumIdx;
     }
    //--日志等级
    export const LOG_LV_INFO:number = 0;
    export const LOG_LV_WARN:number = 1;
    export const LOG_LV_ERROR:number = 2;

    //--图层
    enumIdx = 0;
    export const LAYER_SCENE:number = _enumId();
    export const LAYER_HUD:number = _enumId();
    export const LAYER_HOME:number = _enumId();
    export const LAYER_WIN:number = _enumId();
    export const LAYER_SWIN:number = _enumId();
    export const LAYER_ALERT:number = _enumId();
    export const LAYER_TIPS:number = _enumId();
    export const LAYER_GUIDE:number = _enumId();
    export const LAYER_WAIT:number = _enumId();
    export const LAYER_NOTICE:number = _enumId();
    export const LAYER_DEBUG:number = _enumId();
    export const LAYER_END:number = _enumId();

    
}
