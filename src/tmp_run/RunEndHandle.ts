    
namespace Sophia
{
    export class RunEndHandle extends RunHandle
    {
        /*--[[_s
        @todo: handle判断
        ]]*/
        public onUpdate(deltaTime: number): RHandleRet
        {
            this.m_elapsedTime += deltaTime;
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
            return this.m_handlRet;
        }
        public onReset(){
            this.m_elapsedTime = 0;
        }
    }
}