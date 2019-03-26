    
namespace Sophia
{
    export class RunFollowHandle extends RunHandle
    {
        private m_beReturning:boolean = false;
        private m_lastTeamPosXY:Array<number>;
        /*--[[_s
        @todo: handle判断
        ]]*/
        public onUpdate(deltaTime: number): RHandleRet
        {
            this.m_elapsedTime += deltaTime;
            if (this.m_elapsedTime>this.m_handleInterval){
                this.m_elapsedTime = 0;
                let teamPos = this.m_runAction.getTeamPosXY();
                if (teamPos){
                    let dist = this.m_runAction.disForTarget(teamPos[0], teamPos[1]);
                    if (this.m_beReturning==true){
                        if (this.m_lastTeamPosXY && (Math.abs(this.m_lastTeamPosXY[0]-teamPos[0])>0.1 || Math.abs(this.m_lastTeamPosXY[1]-teamPos[1])>0.1)){
                            this.m_lastTeamPosXY = teamPos;
                            this.m_runAction.setMovePoint(teamPos[0], teamPos[1]);    
                        }
                        if(dist>=this.m_runAction.getMinRetunDis()){ // 归队距离
                            this.m_handlRet.m_isStop = false;
                            this.m_handlRet.m_isGoOnHandle = false;
                            return this.m_handlRet;
                        }
                        // 小于最小集合点, 可以自由了
                    }
                    //大于集合距离, 归队
                    else if(dist>this.m_runAction.getMaxRetunDis()){// 归队距离
                        this.m_beReturning = true;
                        this.m_lastTeamPosXY = teamPos;
                        this.m_runAction.setMovePoint(teamPos[0], teamPos[1]);
                        this.m_handlRet.m_isStop = false;
                        this.m_handlRet.m_isGoOnHandle = false;
                        return this.m_handlRet;
                    }
                }                
            }
            else if (this.m_beReturning==true){
                this.m_handlRet.m_isStop = false;
                this.m_handlRet.m_isGoOnHandle = false;
                return this.m_handlRet;
            }
            this.m_handlRet.m_isStop = false;
            this.m_handlRet.m_isGoOnHandle = true;
            this.onReset();
            return this.m_handlRet;
        }

        public onReset(){
            this.m_lastTeamPosXY = null;
            this.m_beReturning = false;
        }
    }
}