    
namespace Sophia
{
    export interface IMove{
        /*--[[_s
        @todo: 设置行走点
        ]]*/
        setMovePoint(x:number, y:number):boolean;
        /*--[[_s
        @todo: 获取当前坐标
        ]]*/
        getCurXY():Array<number>;
        /*--[[_s
        @todo: 获取命令坐标
        ]]*/
        getCmdXY():Array<number>;
        /*--[[_s
        @todo: 获取团队归属坐标
        ]]*/
        getTeamPosXY():Array<number>;
        /*--[[_s
        @todo: 获取最终坐标x
        ]]*/
        getFinalTarX():number;
        /*--[[_s
        @todo: 获取最终坐标y
        ]]*/
        getFinalTarY():number;
        
        /*--[[_s
        @todo: 找一个新的目标(根据距离找)
        ]]*/
        findNewTarget():boolean;
        /*--[[_s
        @todo: 判断是否有目标
        ]]*/
        haveTarget():boolean;
        /*--[[_s
        @todo: 获取目标的坐标
        ]]*/
        getTargetXY():Array<number>;
        /*--[[_s
        @todo: 把找到的目标设为攻击目标
        ]]*/
        setupTarget():boolean;

        /*--[[_s
        @todo: 判断是否有指定目标
        ]]*/
        haveLockTarget():boolean;
        /*--[[_s
        @todo: 获取指定目标的坐标
        ]]*/
        getLockTargetXY():Array<number>;
        /*--[[_s
        @todo: 把指定的目标设为攻击目标
        ]]*/
        setupLockTarget():boolean;

        /*--[[_s
        @todo: 获取搜索距离
        ]]*/
        getSearchDis():number;
        /*--[[_s
        @todo: 获取攻击距离
        ]]*/
        getAttDis():number;
        /*--[[_s
        @todo: 获取归队距离
        ]]*/
        getMaxRetunDis():number;
        /*--[[_s
        @todo: 获取归队中可回复自由的限定距离
        ]]*/
        getMinRetunDis():number;
        /*--[[_s
        @todo: 获取目标点到自身的距离
        ]]*/
        disForTarget(tarX:number, tarY:number):number;
        /*--[[_s
        @todo: 重置指定handle 
        ]]*/
        resetHandle(handleTag:number);
    };

    export interface ICollision{
        /*--[[_s
        @todo: 判断点是否可行
        ]]*/
        isUnAccessible(x:number, y:number):boolean;
    }
}