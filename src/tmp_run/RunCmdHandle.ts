    
namespace Sophia
{
    export class RunCmdHandle extends RunHandle
    {
        private m_cmdTarXY:Array<number> = null;
        private m_isCmding:boolean = false;
        /*--[[_s
        @todo: handle判断
        ]]*/
        public onUpdate(deltaTime: number): RHandleRet
        {
            this.m_elapsedTime += deltaTime;
            if (this.m_elapsedTime>this.m_handleInterval){
                let cmdTarXY = this.m_runAction.getCmdXY();
                if (cmdTarXY && (this.m_cmdTarXY==null ||Math.abs(this.m_cmdTarXY[0]-cmdTarXY[0])>0.1 || Math.abs(this.m_cmdTarXY[1]-cmdTarXY[1])>0.1)){
                    this.m_cmdTarXY = cmdTarXY;
                    this.m_isCmding = true;
                    this.m_runAction.setMovePoint(this.m_cmdTarXY[0], this.m_cmdTarXY[1]);
                }
            }
            if (this.m_isCmding==true && this.m_cmdTarXY){
                if (this.m_runAction.disForTarget(this.m_cmdTarXY[0], this.m_cmdTarXY[1])>0.2){
                    this.m_handlRet.m_isGoOnHandle = false;
                    this.m_handlRet.m_isStop = false;
                    return this.m_handlRet;
                }
            }
            this.onReset();
            this.m_handlRet.m_isGoOnHandle = true;
            this.m_handlRet.m_isStop = false;
            return this.m_handlRet;
        }

        public onReset(){
            this.m_cmdTarXY = null;
            this.m_isCmding = false;
        }
    }
}