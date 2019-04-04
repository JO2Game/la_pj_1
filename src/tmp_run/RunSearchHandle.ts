    
namespace Sophia
{
    export class RunSearchHandle extends RunHandle
    {
        private m_isSearch:boolean = false;
        private m_tarXY: Array<number>;

        constructor(interval:number=2){
            super(interval);
            this.m_tarXY = null;
        }
        /*--[[_s
        @todo: handle判断
        ]]*/
        public onUpdate(deltaTime: number): RHandleRet
        {
            this.m_elapsedTime += deltaTime;
            if (this.m_elapsedTime>this.m_handleInterval){
                // 每次都重新找一个合适的目标
                this.m_runAction.findNewTarget();
                if (!this.m_runAction.haveTarget()){
                    this.m_handlRet.m_isStop = false;
                    this.m_handlRet.m_isGoOnHandle = true;
                    this.onReset();
                    return this.m_handlRet;
                }

                // 有目标的情况
                let dist = null;
                let tmpXY = this.m_runAction.getTargetXY();
                if (this.m_tarXY==null || Math.abs(tmpXY[0]-this.m_tarXY[0])>1 || Math.abs(tmpXY[1]-this.m_tarXY[1])>1){
                    this.m_tarXY = tmpXY;
                    dist = this.m_runAction.disForTarget(this.m_tarXY[0], this.m_tarXY[1]);
                    if(dist<=this.m_runAction.getAttDis()){
                        this.m_runAction.setupTarget();
                        this.m_handlRet.m_isStop = true;
                        this.m_tarXY = null;
                        return this.m_handlRet;
                    }
                    if (isNaN(this.m_runAction.getSearchDis()) || dist<this.m_runAction.getSearchDis()){
                        this.m_runAction.setMovePoint(this.m_tarXY[0], this.m_tarXY[1]);
                    }
                }
                else{
                    dist = this.m_runAction.disForTarget(this.m_tarXY[0], this.m_tarXY[1]);
                    if(dist<=this.m_runAction.getAttDis()){
                        this.m_runAction.setupTarget();
                        this.m_handlRet.m_isStop = true;
                        this.m_tarXY = null;
                        return this.m_handlRet;
                    }
                }
            }
            
            this.m_handlRet.m_isStop = false;
            this.m_handlRet.m_isGoOnHandle = true;
            return this.m_handlRet;
        }

        public onReset(){
            this.m_tarXY = null;
        }
    }
}