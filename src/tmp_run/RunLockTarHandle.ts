    
namespace Sophia
{
    export class RunLockTarHandle extends RunHandle
    {
        private m_lockTarXY:Array<number> = null;
        private m_isLocking:boolean = false;
        /*--[[_s
        @todo: handle判断
        ]]*/
        public onUpdate(deltaTime: number): RHandleRet
        {
            let isLockTarget = this.m_runAction.haveLockTarget();
            this.m_elapsedTime += deltaTime;
            if (this.m_elapsedTime>this.m_handleInterval){
                if (isLockTarget){
                    let tmpXY = this.m_runAction.getLockTargetXY();
                    if(this.m_runAction.disForTarget(tmpXY[0], tmpXY[1])<=this.m_runAction.getAttDis()){
                        this.onReset();
                        this.m_runAction.setupLockTarget();
                        this.m_handlRet.m_isStop = true;
                        this.m_lockTarXY = null;
                        return this.m_handlRet;
                    }

                    if (this.m_lockTarXY==null || Math.abs(tmpXY[0]-this.m_lockTarXY[0])>1 || Math.abs(tmpXY[1]-this.m_lockTarXY[1])>1){
                        this.m_lockTarXY = tmpXY;
                        this.m_isLocking = true;
                        this.m_runAction.setMovePoint(this.m_lockTarXY[0], this.m_lockTarXY[1]);
                    }
                }
            }

            if (isLockTarget && this.m_isLocking){
                this.m_handlRet.m_isStop = false;
                this.m_handlRet.m_isGoOnHandle = false;
                return this.m_handlRet;
            }
            this.onReset();
            this.m_handlRet.m_isStop = false;
            this.m_handlRet.m_isGoOnHandle = true;
            return this.m_handlRet;
        }

        public onReset(){
            this.m_lockTarXY = null;
            this.m_isLocking = false;
        }
    }
}