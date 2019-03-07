
namespace Sophia{
    class FsmDemoMove extends FSMStateVO{
        public onGuard(...opt: any[]):boolean{ 
            JOLog.info("FsmDemoMove", "onGuard {0}", opt);
            return true; 
        }
        public onEntry(...opt: any[]){
            JOLog.info("FsmDemoMove", "onEntry", opt);
        }
        public onReEntry(...opt: any[]){
            JOLog.info("FsmDemoMove", "onReEntry", opt);
        }
        public onAction(){
            JOLog.info("FsmDemoMove", "onAction");
        }
        public onPause(){
            JOLog.info("FsmDemoMove", "onPause");
        }
        public onLeave(){
            JOLog.info("FsmDemoMove", "onLeave");
        }
    }

    class FsmDemoTalk extends FSMStateVO{
        public onGuard(...opt: any[]):boolean{ 
            JOLog.info("FsmDemoTalk", "onGuard {0}", opt);
            return true; 
        }
        public onEntry(...opt: any[]){
            JOLog.info("FsmDemoTalk", "onEntry", opt);
        }
        public onReEntry(...opt: any[]){
            JOLog.info("FsmDemoTalk", "onReEntry", opt);
        }
        public onAction(){
            JOLog.info("FsmDemoTalk", "onAction");
        }
        public onPause(){
            JOLog.info("FsmDemoTalk", "onPause");
        }
        public onLeave(){
            JOLog.info("FsmDemoTalk", "onLeave");
        }
    }
    export class FsmDemo
    {
        constructor(){
            let singleRule = new FsmRuleSingle();
            singleRule.addRelation([1], 2)
            singleRule.addRelation([2], 1)

            let fsm = new FsmSingle();
            fsm.setRule(singleRule)
            fsm.regStateInfo(1, JOPoolMgr.Ins.getVO("FsmDemoMove", FsmDemoMove) );
            fsm.regStateInfo(2, JOPoolMgr.Ins.getVO("FsmDemoTalk", FsmDemoTalk));

            fsm.setState(1);
            fsm.enter(2);
        }
    }
}




