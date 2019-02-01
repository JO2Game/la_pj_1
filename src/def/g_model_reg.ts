/**
 * Created by James Ou .
 * @class JOSophia
 * @constructor 
 **/

 namespace MOD {
     let BEGIN_TAG:number = 0;
     function _bindIdModel(modelCls:any){
        BEGIN_TAG++;
        return BEGIN_TAG;
     }
    // //--玩家模块
    // export const PLAYER:number = _bindIdModel(PlayerMod);
    // //--背包模块
    // export const BAG:number = _bindIdModel(BagMod);
    
}
