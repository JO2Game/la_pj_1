    
namespace Sophia
{
    export class RunCollisionHandle extends RunHandle
    {
        /*--[[_s
        @todo: 碰撞处理
        ]]*/
        public toCollision(curX:number, curY:number, curRadius:number, otherX:number, otherY:number, oRadius:number, speedFactor:number):Array<number>{
            let dX = otherX-curX;
            let dY = otherY - curY;
            let angle=Math.atan2(dY,dX);
            let sine=Math.sin(angle);
            let cosine=Math.cos(angle);
            
            // let x=0;
            // let y=0;
            
            let xB=dX*cosine+dY*sine;
            let yB=dY*cosine-dX*sine;
            
            // let vX=curX*cosine+curY*sine;
            // let vY=curY*cosine-curX*sine;
            
            // let vXb=otherX*cosine+otherY*sine;
            // let vYb=otherY*cosine-otherX*sine;

            // //2
            // vX *=-1;
            // vXb *=-1;
            let offset = (curRadius+oRadius)-Math.sqrt(dX * dX + dY * dY);
            xB+=offset;
            yB+=offset;
            //xB=x+(curRadius+oRadius);

            let tarX = otherX+(xB*cosine-yB*sine);
            let tarY = otherY+(yB*cosine+xB*sine);

            const moveVector = [tarX - otherX, tarY - otherY];
            const curDist = Math.sqrt(moveVector[0] * moveVector[0] + moveVector[1] * moveVector[1]);
            offset = speedFactor/curDist;

            let retX = otherX + moveVector[0]*offset;
            let retY = otherY + moveVector[1]*offset;

            //3

            // curX=curX+(x*cosine-y*sine);
            // curY=curY+(y*cosine+x*sine);
            
            // let retX =otherX+(xB*cosine-yB*sine)*speedFactor;
            // let retY =otherY+(yB*cosine+xB*sine)*speedFactor;
            if (this.m_collisionAction.isUnAccessible(retX, retY)){
                if (this.m_collisionAction.isUnAccessible(retX, otherY)){
                    if (this.m_collisionAction.isUnAccessible(otherX, retY)){
                        return null;
                    }
                    return [otherX, retY];
                }
                return [retX, otherY];
            }

            return [retX, retY]
            
            // ball.vX=vX*cosine-vY*sine;
            // ball.vY=vY*cosine+vX*sine;
            
            // ballB.vX=vXb*cosine-vYb*sine;
            // ballB.vY=vYb*cosine+vXb*sine;
        }
    }
}