
namespace Sophia{
    
    export class CmdDemo
    {
        m_update1Idx:number = 0;
        m_update2Idx:number = 0;
        constructor(){
            let queue = new CmdQueue();
            queue.setRunFinishCall(this, this._queueFinish1);
            queue.setRunNextInDelay(true);

            queue.pushBackCall(this, this._run1, this, this._update1);
            queue.pushBackCall(this, this._run1, this, this._update1);

            queue.start();

            let syncVO = new CmdSyncVO();
            for(let i=0;i<2;i++){
                let queue = new CmdQueue();
                queue.setRunNextInDelay(true);
                queue.pushBackCall(this, this._run2, this, this._update2);
                queue.pushBackCall(this, this._run3, this, this._update3);
                syncVO.pushQueue(queue);
            }
            queue.pushBack(syncVO);

            let seq = new CmdSequenceVO();
            for(let i=0;i<3;i++){
                let queue = new CmdQueue();
                queue.setRunNextInDelay(true);
                queue.pushBackCall(this, this._run1, this, this._update1);
                queue.pushBackCall(this, this._run1, this, this._update1);
                seq.pushQueue(queue);
            }
            queue.pushBack(seq);
            
        }

        private _run1(vo:CmdVO){
            JOLog.info("CmdDemo", "run1");
        }
        private _update1(vo:CmdVO){
            this.m_update1Idx++;
            JOLog.info("CmdDemo", "update1 ", this.m_update1Idx);
            if (this.m_update1Idx%3==1){
                vo.done();
            }
        }
        private _queueFinish1(queue:CmdQueue){
            JOLog.info("CmdDemo", "_queueFinish1");
        }

        private _run2(vo:CmdVO){
            JOLog.info("CmdDemo", "run2");
        }
        private _update2(vo:CmdVO){
            this.m_update2Idx++;
            JOLog.info("CmdDemo", "update2 ", this.m_update2Idx);
            if (this.m_update2Idx%3==0){
                vo.done();
                this.m_update2Idx = 1;
            }
        }
        private _run3(vo:CmdVO){
            JOLog.info("CmdDemo", "run3");
        }
        private _update3(vo:CmdVO){
            this.m_update2Idx++;
            JOLog.info("CmdDemo", "update3 ", this.m_update2Idx);
            if (this.m_update2Idx%3==0){
                vo.done();
                this.m_update2Idx = 1;
            }
        }
    }
}



// local function TestCommond()
// 	local cQueue = gp.CommandQueue.new()

// 	local haha = 1
// 	local function _testF(vo)
// 		print("haha ", haha)
// 		--haha=haha+1
// 		--vo:done()
// 	end

// 	local function _testU( vo )
// 		haha = haha+1
// 		print("haha update", haha)
// 		if haha%3==1 then
// 			vo:done()
// 		end
// 	end
	
// 	for i=1,2 do
// 		cQueue:pushBackCall(_testF, _testU)
// 	end
// 	local function _testFinish(queue)
// 		print("haha _testFinish", haha)
// 		queue:cancelTick()
// 	end
// 	cQueue:setRunFinishCall(_testFinish)
// 	cQueue:setRunNextInDelay(true)
// 	local sssetidx = 100
// 	local function _testsetF(vo)
// 		vo.setidx = sssetidx
// 		sssetidx = sssetidx+1
// 		print("set haha ", haha)
// 	end

// 	local function _testsetU( vo )
// 		haha = haha+1
// 		print(vo.setidx, "set haha update", haha)
// 		if haha%3==1 then
// 			vo:done()
// 		end
// 	end
// 	local setVo = gp.CommandQueue.SyncVO()
	
// 	--haha=100
// 	for i=1,4 do
// 		local setQueue = gp.CommandQueue.new()
// 		for i=1,2 do
// 			setQueue:pushBackCall(_testsetF, _testsetU)
// 		end
// 		setQueue:runTick()
// 		setVo:pushQueue(setQueue)
// 	end
// 	cQueue:pushBack(setVo)
// 	--haha=500
// 	local lllsssetidx =500
// 	local function _testlistF(vo)
// 		vo.setidx = lllsssetidx
// 		lllsssetidx = lllsssetidx+1
// 		print("list haha ", haha)
// 	end

// 	local function _testlistU( vo )
// 		haha = haha+1
// 		print(vo.setidx, "list haha update", haha)
// 		if haha%3==1 then
// 			vo:done()
// 		end
// 	end
// 	local listVo = gp.CommandQueue.SequenceVO()
// 	for i=1,2 do
// 		local listQueue = gp.CommandQueue.new()
// 		for i=1,2 do
// 			listQueue:pushBackCall(_testlistF, _testlistU)
// 		end
// 		listQueue:runTick()
// 		listVo:pushQueue(listQueue)
// 	end
	
// 	cQueue:pushBack(listVo)
// 	cQueue:start()
// 	cQueue:runTick()
// end




