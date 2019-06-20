var Sophia;
(function (Sophia) {
    var JOVec2 = /** @class */ (function () {
        /*--[[_s
        ]]*/
        function JOVec2(x, y) {
            this.m_x = x;
            this.m_y = y;
        }
        /*--[[_s
        ]]*/
        JOVec2.prototype.set = function (x, y) {
            this.m_x = x;
            this.m_y = y;
        };
        /*--[[_s
        ]]*/
        JOVec2.prototype.setVec = function (vec) {
            this.m_x = vec.m_x;
            this.m_y = vec.m_y;
        };
        return JOVec2;
    }());
    Sophia.JOVec2 = JOVec2;
})(Sophia || (Sophia = {}));
//# sourceMappingURL=vec2.js.map

var Sophia;
(function (Sophia) {
    var JOMapNodeState;
    (function (JOMapNodeState) {
        JOMapNodeState[JOMapNodeState["NOTEXIST"] = 0] = "NOTEXIST";
        JOMapNodeState[JOMapNodeState["IN_OPENLIST"] = 1] = "IN_OPENLIST";
        JOMapNodeState[JOMapNodeState["IN_CLOSELIST"] = 2] = "IN_CLOSELIST";
    })(JOMapNodeState = Sophia.JOMapNodeState || (Sophia.JOMapNodeState = {}));
    var JOMapNodeVO = /** @class */ (function () {
        function JOMapNodeVO() {
            this.m_g = 0; //父节点到当前点的消耗
            this.m_h = 0; //当前点到目标点的消耗
        }
        JOMapNodeVO.prototype.f = function () {
            return this.m_g + this.m_h;
        };
        JOMapNodeVO.prototype.init = function (x, y) {
            // if(x<0 || y<0){
            //     this.m_g = 0;    
            // }
            this.m_g = 0;
            this.m_h = 0;
            if (this.m_pos == null) {
                this.m_pos = new Sophia.JOVec2(x, y);
            }
            else {
                this.m_pos.m_x = x;
                this.m_pos.m_y = y;
            }
            this.m_parent = null;
            this.m_state = JOMapNodeState.NOTEXIST;
            this.m_isBlock = false;
        };
        JOMapNodeVO.prototype.initDef = function () {
            this.m_g = 0;
            this.m_h = 0;
            this.m_parent = null;
            this.m_state = JOMapNodeState.NOTEXIST;
            //m_isBlock = false;
        };
        return JOMapNodeVO;
    }());
    Sophia.JOMapNodeVO = JOMapNodeVO;
    var FindWayMapData = /** @class */ (function () {
        function FindWayMapData() {
        }
        /**--[[_s
        //获取地图宽
        ]]*/
        FindWayMapData.prototype.getWidth = function () { return this.m_width; };
        /**--[[_s
        //获取地图高
        ]]*/
        FindWayMapData.prototype.getHeight = function () { return this.m_height; };
        /**--[[_s
        //获取地图格的边长
        ]]*/
        FindWayMapData.prototype.getStepLen = function () { return this.m_stepLen; };
        /**--[[_s设置地图数据
         * @param mw 整个地图网格的宽数
         * @param mh 整个地图网格的长数
         * @param orgX 地图坐标的原始位置(用于地图与格坐标的转换)
         * @param orgY 地图坐标的原始位置(用于地图与格坐标的转换)
         * @param stepLen 每格的边长
        ]] */
        FindWayMapData.prototype.setMapData = function (mw, mh, orgX, orgY, stepLen) {
            this.m_stepLen = stepLen;
            this.m_halfStepLen = Math.round(stepLen * 0.5);
            this.m_halfMapW = Math.round(mw * 0.5);
            this.m_halfMapH = Math.round(mh * 0.5);
            this.m_orgX = orgX;
            this.m_orgY = orgY;
            mw = Math.round(mw / stepLen);
            mh = Math.round(mh / stepLen);
            this.setSize(mw, mh);
        };
        /**--[[_s
        //设置地图大小
        ]]*/
        FindWayMapData.prototype.setSize = function (w, h) {
            if (this.m_width == w && this.m_height == h)
                return;
            this.m_width = w;
            this.m_height = h;
            this.m_totalGrid = this.m_width * this.m_height;
            this.m_mapGrid = []; //new JOMapNodeVO[this.m_totalGrid];
            //m_mapGrid = new NodeVO[m_width, m_height];
            for (var x = 0; x < this.m_width; x++) {
                for (var y = 0; y < this.m_height; y++) {
                    var vo = new JOMapNodeVO();
                    vo.init(x, y);
                    this.m_mapGrid[y * this.m_width + x] = vo;
                }
            }
        };
        /**--[[_s
        //传入格坐标, 返回地图坐标
        ]]*/
        FindWayMapData.prototype.cell2Map = function (cellx, celly) {
            if (cellx < this.m_width && celly < this.m_height && cellx >= 0 && celly >= 0) {
                return new Sophia.JOVec2(this.m_orgX - cellx * this.m_stepLen - this.m_halfStepLen, celly * this.m_stepLen + this.m_orgY - this.m_halfStepLen);
            }
            return new Sophia.JOVec2(0, 0);
        };
        /**--[[_s
        //传入地图坐标, 返回格坐标
        ]]*/
        FindWayMapData.prototype.map2Cell = function (mapx, mapy) {
            return new Sophia.JOVec2(Math.floor((this.m_orgX - mapx) / this.m_stepLen), Math.floor((mapy - this.m_orgY) / this.m_stepLen));
        };
        /**--[[_s
        //把传入的格坐标转为地图坐标
        ]]*/
        FindWayMapData.prototype.cellPoint2Map = function (cellPoint) {
            if (cellPoint.m_x < this.m_width && cellPoint.m_y < this.m_height && cellPoint.m_x >= 0 && cellPoint.m_y >= 0) {
                cellPoint.m_x = this.m_orgX - cellPoint.m_x * this.m_stepLen - this.m_halfStepLen;
                cellPoint.m_y = cellPoint.m_y * this.m_stepLen + this.m_orgY - this.m_halfStepLen;
            }
            else {
                cellPoint.m_x = 0;
                cellPoint.m_y = 0;
            }
        };
        /**--[[_s
        //设置阻挡点
        ]]*/
        FindWayMapData.prototype.setBlock = function (x, y, isBlock) {
            if (x < this.m_width && y < this.m_height && x >= 0 && y >= 0) {
                this.m_mapGrid[(y * this.m_width + x)].m_isBlock = isBlock;
            }
            //NodeVO vo = m_mapGrid[x, y];
        };
        /**--[[_s
        //设置阻挡点
        ]]*/
        FindWayMapData.prototype.setBlockIdx = function (idx, isBlock) {
            var vo = this.m_mapGrid[idx];
            if (vo) {
                vo.m_isBlock = isBlock;
            }
        };
        /**--[[_s
        //判断阻挡点(超出地图的, 都当作是阻挡点)
        ]]*/
        FindWayMapData.prototype.isBlock = function (x, y) {
            //超出的都不可走
            if (x < this.m_width && y < this.m_height && x >= 0 && y >= 0) {
                return this.m_mapGrid[(y * this.m_width + x)].m_isBlock;
            }
            return true;
            // if (this.m_mapGrid[(y * this.m_width + x)]==null){
            //     console.log("null");
            //     return true;
            // }  
            // return this.m_mapGrid[(y * this.m_width + x)].m_isBlock;
        };
        /**--[[_s
        //传入地图坐格判断是否阻挡
        ]]*/
        FindWayMapData.prototype.isBlockMapXY = function (mapx, mapy) {
            return this.isBlock(Math.floor((this.m_orgX - mapx) / this.m_stepLen), Math.floor((mapy - this.m_orgY) / this.m_stepLen));
        };
        /**--[[_s
        //判断阻挡点(超出地图的, 不当作是阻挡点)
        ]]*/
        FindWayMapData.prototype.isLegalBlock = function (x, y) {
            //超出的表示不合法的阻挡
            if (x < this.m_width && y < this.m_height && x >= 0 && y >= 0) {
                return this.m_mapGrid[(y * this.m_width + x)].m_isBlock;
            }
            return false;
            // return this.m_mapGrid[(y * this.m_width + x)].m_isBlock;
        };
        /**--[[_s
        //获取格节点
        ]]*/
        FindWayMapData.prototype.getNode = function (x, y) {
            if (x < this.m_width && y < this.m_height && x >= 0 && y >= 0) {
                return this.m_mapGrid[(y * this.m_width + x)];
            }
            return null;
        };
        /**--[[_s
        //清空阻挡数据
        ]]*/
        FindWayMapData.prototype.clearBlock = function () {
            if (this.m_mapGrid == null)
                return;
            var len = this.m_mapGrid.length;
            for (var i = 0; i < len; i++) {
                this.m_mapGrid[i].m_isBlock = false;
            }
        };
        /**--[[_s
        //能否到达相邻点, 传入的都为格坐标
        //(curx, cury)和(x,y)为相邻点(8个方向的)
        ]]*/
        FindWayMapData.prototype.canreachCorner = function (curx, cury, x, y) {
            var vo = this.getNode(x, y);
            if (vo == null || vo.m_isBlock == true)
                return false;
            //console.log("canreachCorner:", x, y, vo.m_isBlock);
            if (x == curx || y == cury)
                return true;
            var vo1 = this.getNode(x, cury);
            var vo2 = this.getNode(curx, y);
            if (vo1 == null || vo2 == null)
                return false;
            // console.log("m_isBlock1:", x, cury, vo1.m_isBlock);
            // console.log("m_isBlock2:", curx, y, vo2.m_isBlock);
            if (vo1.m_isBlock == false && vo2.m_isBlock == false)
                return true;
            return false;
        };
        /**--[[_s
        /**直线到达目标的第一个阻挡点
         * @param beginX @param beginY  @param endX @param endY 为地图坐标
         * 返回第一个阻挡点(返回是地图坐标), 找不到的返回null
        ]]*/
        FindWayMapData.prototype.firstBlock = function (beginX, beginY, endX, endY) {
            var dx = endX - beginX;
            var dy = endY - beginY;
            var absx = Math.abs(dx);
            var absy = Math.abs(dy);
            var stepLen = this.m_stepLen * 0.5;
            if (dx == 0) {
                var x = beginX;
                if (endY > beginY) {
                    for (var y = beginY + stepLen; y < endY; y += stepLen) {
                        if (this.isBlockMapXY(x, y))
                            return new Sophia.JOVec2(x, y);
                    }
                }
                else {
                    //for(let y=endY+stepLen;y<beginY;y+=stepLen){
                    for (var y = beginY - stepLen; y >= endY; y -= stepLen) {
                        if (this.isBlockMapXY(x, y))
                            return new Sophia.JOVec2(x, y);
                    }
                }
            }
            else if (dy == 0) {
                var y = beginY;
                if (endX > beginX) {
                    for (var x = beginX + stepLen; x < endX; x += stepLen) {
                        if (this.isBlockMapXY(x, y))
                            return new Sophia.JOVec2(x, y);
                    }
                }
                else {
                    //for(let x=endX+stepLen;x<beginX;x+=stepLen){
                    for (var x = beginX - stepLen; x >= endX; x -= stepLen) {
                        if (this.isBlockMapXY(x, y))
                            return new Sophia.JOVec2(x, y);
                    }
                }
            }
            else if (absx > absy) {
                var tmpK = dy / dx;
                if (endX > beginX) {
                    for (var x = beginX + stepLen; x < endX; x += stepLen) {
                        var y = (x - beginX) * tmpK + beginY;
                        if (this.isBlockMapXY(x, y))
                            return new Sophia.JOVec2(x, y);
                    }
                }
                else {
                    for (var x = beginX - stepLen; x >= endX; x -= stepLen) {
                        var y = (x - beginX) * tmpK + beginY;
                        if (this.isBlockMapXY(x, y))
                            return new Sophia.JOVec2(x, y);
                    }
                }
            }
            else {
                var tmpK = dx / dy;
                if (endY > beginY) {
                    for (var y = beginY + stepLen; y < endY; y += stepLen) {
                        var x = (y - beginY) * tmpK + beginX;
                        if (this.isBlockMapXY(x, y))
                            return new Sophia.JOVec2(x, y);
                    }
                }
                else {
                    for (var y = beginY - stepLen; y >= endY; y -= stepLen) {
                        var x = (y - beginY) * tmpK + beginX;
                        if (this.isBlockMapXY(x, y))
                            return new Sophia.JOVec2(x, y);
                    }
                }
            }
            return null;
        };
        /**--[[_s
        /**直线判断到达目标的可行点
         * @param beginX @param beginY  @param endX @param endY 为地图坐标
         * 返回最后的可行点阻挡点(返回是地图坐标), 找不到的返回起始点beginX, beginY
        ]]*/
        FindWayMapData.prototype.lastOK = function (beginX, beginY, endX, endY) {
            var dx = endX - beginX;
            var dy = endY - beginY;
            var absx = Math.abs(dx);
            var absy = Math.abs(dy);
            var lastOK = null;
            if (this.isBlockMapXY(endX, endY)) {
                lastOK = new Sophia.JOVec2(beginX, beginY);
            }
            else {
                lastOK = new Sophia.JOVec2(endX, endY);
            }
            var stepLen = this.m_stepLen * 0.5;
            if (dx == 0) {
                var x = beginX;
                if (endY > beginY) {
                    for (var y = beginY + stepLen; y < endY; y += stepLen) {
                        if (this.isBlockMapXY(x, y))
                            return lastOK;
                        lastOK.set(x, y);
                    }
                }
                else {
                    //for(let y=endY+stepLen;y<beginY;y+=stepLen){
                    for (var y = beginY - stepLen; y >= endY; y -= stepLen) {
                        if (this.isBlockMapXY(x, y))
                            return lastOK;
                        lastOK.set(x, y);
                    }
                }
            }
            else if (dy == 0) {
                var y = beginY;
                if (endX > beginX) {
                    for (var x = beginX + stepLen; x < endX; x += stepLen) {
                        if (this.isBlockMapXY(x, y))
                            return lastOK;
                        lastOK.set(x, y);
                    }
                }
                else {
                    //for(let x=endX+stepLen;x<beginX;x+=stepLen){
                    for (var x = beginX - stepLen; x >= endX; x -= stepLen) {
                        if (this.isBlockMapXY(x, y))
                            return lastOK;
                        lastOK.set(x, y);
                    }
                }
            }
            else if (absx > absy) {
                var tmpK = dy / dx;
                if (endX > beginX) {
                    for (var x = beginX + stepLen; x < endX; x += stepLen) {
                        var y = (x - beginX) * tmpK + beginY;
                        if (this.isBlockMapXY(x, y))
                            return lastOK;
                        lastOK.set(x, y);
                    }
                }
                else {
                    for (var x = beginX - stepLen; x >= endX; x -= stepLen) {
                        var y = (x - beginX) * tmpK + beginY;
                        if (this.isBlockMapXY(x, y))
                            return lastOK;
                        lastOK.set(x, y);
                    }
                }
            }
            else {
                var tmpK = dx / dy;
                if (endY > beginY) {
                    for (var y = beginY + stepLen; y < endY; y += stepLen) {
                        var x = (y - beginY) * tmpK + beginX;
                        if (this.isBlockMapXY(x, y))
                            return lastOK;
                        lastOK.set(x, y);
                    }
                }
                else {
                    for (var y = beginY - stepLen; y >= endY; y -= stepLen) {
                        var x = (y - beginY) * tmpK + beginX;
                        if (this.isBlockMapXY(x, y))
                            return lastOK;
                        lastOK.set(x, y);
                    }
                }
            }
            return lastOK;
        };
        // 过滤同一直线上的点
        // oPaths里是地图坐标组成的路径
        // 返回地图坐标的新路径
        FindWayMapData.prototype.filterUnConnect = function (oPaths) {
            var len = oPaths.length - 1;
            if (len < 2)
                return oPaths;
            var beFindBlock = true;
            var idx = 0;
            var tmpVecList = new Array();
            tmpVecList.push(oPaths[idx]);
            while (idx < len) {
                beFindBlock = true;
                for (var i = len; i > (idx + 1); i--) {
                    if (this.firstBlock(oPaths[idx].m_x, oPaths[idx].m_y, oPaths[i].m_x, oPaths[i].m_y) == null) {
                        tmpVecList.push(oPaths[i]);
                        idx = i;
                        beFindBlock = false;
                        break;
                    }
                }
                if (beFindBlock == true) {
                    idx++;
                    if (idx < len) {
                        tmpVecList.push(oPaths[idx]);
                    }
                }
            }
            return tmpVecList;
        };
        return FindWayMapData;
    }());
    Sophia.FindWayMapData = FindWayMapData;
})(Sophia || (Sophia = {}));

//--_no
var Sophia;
(function (Sophia) {
    var AJFindRoad = /** @class */ (function () {
        function AJFindRoad() {
            this.m_step_value = 2;
            this.m_oblique_value = 3;
            this.m_nearbyCount = 0;
            //开户列表
            this.m_open_list = new Array();
            this.m_opt_list = new Array();
            this.m_nearby_Array = [];
        }
        /**--[[_s
        // 寻路径
        ]]*/
        AJFindRoad.prototype.search = function (beginX, beginY, endX, endY, mapData) {
            if ((endX >= 0 && endX < mapData.getWidth())
                && (endY >= 0 && endY < mapData.getHeight())
                && (beginX >= 0 && beginX < mapData.getWidth())
                && (beginY >= 0 && beginY < mapData.getHeight())) {
                var paths = [];
                /*
                设置起点所对应节点的状态
                */
                var start_node = mapData.getNode(beginX, beginY);
                //NodeVO start_node = m_mapGrid[beginX, beginY];
                start_node.initDef();
                start_node.m_state = Sophia.JOMapNodeState.IN_OPENLIST;
                /*
                起点放入开启列表
                */
                this.m_open_list.push(start_node);
                while (this.m_open_list.length > 0) {
                    /*
                    取出F值最小的节点
                    */
                    var current_node = this.m_open_list.shift();
                    current_node.m_state = Sophia.JOMapNodeState.IN_CLOSELIST;
                    this.m_opt_list.push(current_node);
                    /*
                    搜索附近可通行的位置
                    */
                    this._findCanreachPos(current_node.m_pos.m_x, current_node.m_pos.m_y, endX, endY, mapData);
                    this.m_nearbyCount = this.m_nearby_Array.length;
                    var index = 0;
                    while (index < this.m_nearbyCount) {
                        /*
                        如果存在于开启列表
                        */
                        var nearbyPos = this.m_nearby_Array[index];
                        var nearby_node = mapData.getNode(nearbyPos.m_x, nearbyPos.m_y);
                        //NodeVO nearby_node = m_mapGrid[nearbyPos.m_x, nearbyPos.y];
                        if (nearby_node != null && nearby_node.m_state != Sophia.JOMapNodeState.IN_CLOSELIST) {
                            if (nearby_node.m_state == Sophia.JOMapNodeState.IN_OPENLIST) {
                                this._handleFoundNode(current_node, nearby_node);
                            }
                            else {
                                /*
                                找到终点
                                */
                                if (nearbyPos.m_x == endX && nearbyPos.m_y == endY) {
                                    nearby_node.m_parent = current_node;
                                    while (nearby_node.m_parent != null) {
                                        paths.push(new Sophia.JOVec2(nearby_node.m_pos.m_x, nearby_node.m_pos.m_y));
                                        nearby_node = nearby_node.m_parent;
                                        // if (nearby_node.m_pos.m_x!=beginX || nearby_node.m_pos.m_y!=beginY){
                                        //     paths.add(new JOVec2(nearby_node.m_pos.m_x, nearby_node.m_pos.m_y));
                                        //     nearby_node = nearby_node.m_parent;
                                        // }
                                    }
                                    this._clear();
                                    paths.reverse();
                                    // let tmpFirstPos = paths.first();
                                    // if (tmpFirstPos.m_x==beginX && tmpFirstPos.m_y==beginY){
                                    //     paths.removeElementAtIndex(0);
                                    // }
                                    return paths;
                                }
                                /*
                                如果不存在于开启列表
                                */
                                this._handleNotFoundNode(current_node, nearby_node, endX, endY);
                            }
                        }
                        ++index;
                    }
                }
            }
            //JOLog.Ins.Warn("Search", "Can't find path s[{0},{1}] e[{2},{3}]", beginX, beginY, endX, endY);
            this._clear();
            return null;
        };
        AJFindRoad.prototype.filter = function (oPaths) {
            if (oPaths == null)
                return oPaths;
            var oldPathCount = oPaths.length;
            if (oldPathCount <= 2) {
                return oPaths;
            }
            var newPath = new Array();
            var sPoint = oPaths[0];
            var tempPoint = oPaths[1];
            newPath.push(sPoint);
            /*
            用于标志x1-x2是否等于0， 0为true
            */
            var disX = true;
            /*
            斜率
            */
            var k = 0;
            var tempk = 0;
            if (tempPoint.m_x != sPoint.m_x) {
                disX = false;
                k = (tempPoint.m_y - sPoint.m_y) * 0.1 / (tempPoint.m_x - sPoint.m_x);
            }
            var tmpTarget = tempPoint;
            for (var i = 2; i < oldPathCount; i++) {
                tmpTarget = oPaths[i];
                /*
                在同一直线时
                */
                if (sPoint.m_x == tmpTarget.m_x && disX == true) {
                    tempPoint = tmpTarget;
                }
                /*
                是在另一直线上
                */
                else if (sPoint.m_x == tmpTarget.m_x && disX == false) {
                    newPath.push(tempPoint);
                    sPoint = tempPoint;
                    tempPoint = tmpTarget;
                    disX = true;
                    if (tempPoint.m_x != sPoint.m_x) {
                        disX = false;
                        k = (tempPoint.m_y - sPoint.m_y) * 0.1 / (tempPoint.m_x - sPoint.m_x);
                    }
                }
                else {
                    disX = false;
                    tempk = (tmpTarget.m_y - sPoint.m_y) * 0.1 / (tmpTarget.m_x - sPoint.m_x);
                    /*
                    在同一直线时
                    */
                    if (tempk == k) {
                        tempPoint = tmpTarget;
                    }
                    /*
                    是在另一直线上
                    */
                    else {
                        newPath.push(tempPoint);
                        sPoint = tempPoint;
                        tempPoint = tmpTarget;
                        if (tempPoint.m_x == sPoint.m_x) {
                            disX = true;
                        }
                        k = (tmpTarget.m_y - sPoint.m_y) * 0.1 / (tmpTarget.m_x - sPoint.m_x);
                    }
                }
            }
            newPath.push(tmpTarget);
            return newPath;
        };
        AJFindRoad.prototype._handleFoundNode = function (current_node, target_node) {
            var g_value = this._calculGValue(current_node, target_node);
            if (g_value < target_node.m_g) {
                //权重改变了, 需要排列顺序
                target_node.m_g = g_value;
                target_node.m_parent = current_node;
                this.m_open_list.sort(function (a, b) {
                    return a.f() - b.f();
                });
            }
        };
        AJFindRoad.prototype._handleNotFoundNode = function (current_node, target_node, endX, endY) {
            //NodeVO target_node = m_mapGrid[target_Pos.x, target_Pos.y];
            target_node.m_parent = current_node;
            target_node.m_h = this._calculHValue(target_node.m_pos, endX, endY);
            target_node.m_g = this._calculGValue(current_node, target_node);
            target_node.m_state = Sophia.JOMapNodeState.IN_OPENLIST;
            if (this.m_open_list.length > 0 && target_node.f() > this.m_open_list[this.m_open_list.length - 1].f()) {
                this.m_open_list.push(target_node);
                return;
            }
            this.m_open_list.push(target_node);
            this.m_open_list.sort(function (a, b) {
                return a.f() - b.f();
            });
        };
        AJFindRoad.prototype._calculGValue = function (parent_node, target_node) {
            var ny = Math.abs(parent_node.m_pos.m_y - target_node.m_pos.m_y);
            var nx = Math.abs(parent_node.m_pos.m_x - target_node.m_pos.m_x);
            if (nx == 0 || ny == 0) {
                return ((nx + ny) * this.m_step_value + parent_node.m_g);
            }
            return Math.min(nx, ny) * this.m_oblique_value + Math.abs(nx - ny) * this.m_step_value + parent_node.m_g;
        };
        AJFindRoad.prototype._calculHValue = function (current_pos, endX, endY) {
            return (Math.abs(endY - current_pos.m_y) + Math.abs(endX - current_pos.m_x)) * this.m_step_value;
        };
        AJFindRoad.prototype._findCanreachPos = function (curX, curY, tarX, tarY, mapData) {
            //if ((curX >= 0 && curX < m_width) && (curY >= 0 && curY < m_height))
            this.m_nearby_Array = [];
            this.m_nearbyCount = 0;
            var curNode = mapData.getNode(curX, curY);
            if (curNode) {
                if (curNode.m_parent == null) {
                    for (var x = -1; x <= 1; x++)
                        for (var y = -1; y <= 1; y++)
                            if (x != 0 || y != 0)
                                this._findJP(x, y, curX, curY, tarX, tarY, mapData);
                }
                else {
                    var moveX = this._findDirection(curX, curNode.m_parent.m_pos.m_x);
                    var moveY = this._findDirection(curY, curNode.m_parent.m_pos.m_y);
                    if (moveX == 0 && moveY == 0) {
                        this.m_nearby_Array.push(curNode.m_pos);
                        return;
                    }
                    this._findJP(moveX, moveY, curX, curY, tarX, tarY, mapData);
                    if (moveX != 0 && moveY != 0) { //if curNoode is a diagonal jump point
                        if (mapData.isLegalBlock(curX - moveX, curY))
                            this._findJP((-moveX), moveY, curX, curY, tarX, tarY, mapData);
                        if (mapData.isLegalBlock(curX, curY - moveY))
                            this._findJP(moveX, (-moveY), curX, curY, tarX, tarY, mapData);
                        this._findJP(moveX, 0, curX, curY, tarX, tarY, mapData);
                        this._findJP(0, moveY, curX, curY, tarX, tarY, mapData);
                    }
                    //cutcorners disallowed
                    if (moveX == 0) {
                        if (this._canreachCorner(curX, curY, curX - moveY, curY, mapData))
                            if (mapData.isLegalBlock(curX - moveY, curY - moveY)) {
                                this._findJP((-moveY), moveY, curX, curY, tarX, tarY, mapData);
                                this._findJP((-moveY), 0, curX, curY, tarX, tarY, mapData);
                            }
                        if (this._canreachCorner(curX, curY, curX + moveY, curY, mapData))
                            if (mapData.isLegalBlock(curX + moveY, curY - moveY)) {
                                this._findJP(moveY, 0, curX, curY, tarX, tarY, mapData);
                                this._findJP(moveY, moveY, curX, curY, tarX, tarY, mapData);
                            }
                    }
                    else if (moveY == 0) {
                        if (this._canreachCorner(curX, curY, curX, curY - moveX, mapData))
                            if (mapData.isLegalBlock(curX - moveX, curY - moveX)) {
                                this._findJP(0, (-moveX), curX, curY, tarX, tarY, mapData); //additional check
                                this._findJP(moveX, (-moveX), curX, curY, tarX, tarY, mapData);
                            }
                        if (this._canreachCorner(curX, curY, curX, curY + moveX, mapData))
                            if (mapData.isLegalBlock(curX - moveX, curY + moveX)) {
                                this._findJP(0, moveX, curX, curY, tarX, tarY, mapData); //additional check
                                this._findJP(moveX, moveX, curX, curY, tarX, tarY, mapData);
                            }
                    }
                }
            }
        };
        AJFindRoad.prototype._findJP = function (moveX, moveY, curX, curY, tarX, tarY, mapData) {
            while (true) {
                if (!this._canreachCorner(curX, curY, curX + moveX, curY + moveY, mapData)) {
                    return;
                }
                if (moveX != 0 && moveY != 0)
                    if (!this._canreachCorner(curX, curY, curX, curY + moveY, mapData) || !this._canreachCorner(curX, curY, curX + moveX, curY, mapData))
                        return;
                curX += moveX;
                curY += moveY;
                if (curX == tarX && curY == tarY) {
                    break;
                }
                if (moveX == 0) { //straight move along j
                    if (this._canreachCorner(curX, curY, curX + 1, curY, mapData))
                        if (mapData.isBlock(curX + 1, curY - moveY)) //check forced neighbor
                         {
                            break;
                        }
                    if (this._canreachCorner(curX, curY, curX - 1, curY, mapData))
                        if (mapData.isBlock(curX - 1, curY - moveY)) {
                            break;
                        }
                }
                else if (moveY == 0) { //straight move along i
                    if (this._canreachCorner(curX, curY, curX, curY + 1, mapData))
                        if (mapData.isBlock(curX - moveX, curY + 1)) {
                            break;
                        }
                    if (this._canreachCorner(curX, curY, curX, curY - 1, mapData))
                        if (mapData.isBlock(curX - moveX, curY - 1)) {
                            break;
                        }
                }
                else { //diagonal move
                    if (this._findNeighbors(moveX, 0, curX, curY, tarX, tarY, mapData)) {
                        break;
                    }
                    if (this._findNeighbors(0, moveY, curX, curY, tarX, tarY, mapData)) {
                        break;
                    }
                }
            }
            var curNode = mapData.getNode(curX, curY);
            if (curNode) {
                if (moveX == 0 || moveY == 0)
                    curNode.m_g += this.m_step_value;
                else
                    curNode.m_g += this.m_oblique_value;
                this.m_nearby_Array.push(curNode.m_pos);
            }
        };
        AJFindRoad.prototype._findNeighbors = function (moveX, moveY, curX, curY, tarX, tarY, mapData) {
            do {
                if (curX == tarX && curY == tarY) {
                    return true;
                }
                if (moveX == 0 && this._canreachCorner(curX, curY, curX, curY - moveY, mapData)) {
                    if (this._canreachCorner(curX, curY, curX + 1, curY, mapData))
                        if (mapData.isBlock(curX + 1, curY - moveY))
                            return true;
                    if (this._canreachCorner(curX, curY, curX - 1, curY, mapData))
                        if (mapData.isBlock(curX - 1, curY - moveY))
                            return true;
                }
                if (moveY == 0 && this._canreachCorner(curX, curY, curX - moveX, curY, mapData)) {
                    if (this._canreachCorner(curX, curY, curX, curY + 1, mapData))
                        if (mapData.isBlock(curX - moveX, curY + 1))
                            return true;
                    if (this._canreachCorner(curX, curY, curX, curY - 1, mapData))
                        if (mapData.isBlock(curX - moveX, curY - 1))
                            return true;
                }
                curX += moveX;
                curY += moveY;
            } while (this._canreach(curX, curY, mapData));
            return false;
        };
        AJFindRoad.prototype._canreachCorner = function (curx, cury, x, y, mapData) {
            var vo = mapData.getNode(x, y);
            if (vo == null)
                return false;
            if (vo.m_state == Sophia.JOMapNodeState.IN_CLOSELIST || vo.m_isBlock == true)
                return false;
            if (x == curx || y == cury)
                return true;
            var vo1 = mapData.getNode(x, cury);
            var vo2 = mapData.getNode(curx, y);
            if (vo1 == null || vo2 == null)
                return false;
            if (vo1.m_isBlock == false && vo2.m_isBlock == false)
                return true;
            return true;
        };
        AJFindRoad.prototype._canreach = function (x, y, mapData) {
            var vo = mapData.getNode(x, y);
            if (vo == null)
                return false;
            if (vo.m_state == Sophia.JOMapNodeState.IN_CLOSELIST || vo.m_isBlock == true)
                return false;
            return true;
        };
        AJFindRoad.prototype._findDirection = function (cur, tar) {
            if (cur < tar)
                return -1;
            else if (cur > tar)
                return 1;
            return 0;
        };
        AJFindRoad.prototype._clear = function () {
            var cnt = this.m_opt_list.length;
            for (var i = 0; i < cnt; i++) {
                this.m_opt_list[i].initDef();
            }
            this.m_opt_list = [];
            while (this.m_open_list.length > 0) {
                var current_node = this.m_open_list.shift();
                current_node.initDef();
            }
        };
        return AJFindRoad;
    }());
    Sophia.AJFindRoad = AJFindRoad;
})(Sophia || (Sophia = {}));
//# sourceMappingURL=a_jps_search.js.map