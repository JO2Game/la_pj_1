/**
 * Created by James Ou .
 * @class JOSophia
 * @constructor 
 **/

namespace FUI {
     //export const XXX = [ cls, ["PageMain"],["res/ui/PageMain@atlas0.png"]];
     
    
}


var GameLib;
(function(GameLib) {
    var WMath = (function() {
        function WMath() {}
        WMath.limitNumber = function(left, value, right) {
            return Math.max(left, Math.min(value, right));
        };
        WMath.isNumberBetween = function(value, left, right, includeLeft, includeRight) {
            if (includeLeft === void 0) {
                includeLeft = false;
            }
            if (includeRight === void 0) {
                includeRight = false;
            }
            var leftOk = includeLeft ? left <= value : left < value;
            var rightOk = includeRight ? value <= right : value < right;
            return leftOk && rightOk;
        };
        WMath.sliceNumberf3 = function(value) {
            return Math.floor(value * 1000) / 1000;
        };
        WMath.sliceNumberf2 = function(value) {
            return Math.floor(value * 100) / 100;
        };
        WMath.sliceNumberf1 = function(value) {
            return Math.floor(value * 10) / 10;
        };
        WMath.randomInt = function(min, max) {
            return Math.round(min + Math.random() * (max - min));
        };
        WMath.randomNumber = function(min, max) {
            return min + Math.random() * (max - min);
        };
        WMath.getTimestampSecond = function() {
            var timestamp = (new Date()).valueOf();
            return Math.round(timestamp / 1000);
        };
        WMath.getTimestamp = function() {
            var timestamp = (new Date()).valueOf();
            return Math.round(timestamp);
        };
        return WMath;
    }());
    GameLib.WMath = WMath;
})(GameLib || (GameLib = {}));
var GameLib;
(function(GameLib) {
    var WRandom = (function() {
        function WRandom() {
            this._probabilityList = new Array();
            this._itemList = new Array();
        }
        WRandom.prototype.add = function(probability, item) {
            this._probabilityList.push(probability);
            this._itemList.push(item);
        };
        WRandom.prototype.clear = function() {
            this._probabilityList = new Array();
            this._itemList = new Array();
        };
        WRandom.prototype.makeResult = function() {
            if (this._itemList.length == 0) return null;
            return this.getResult();
        };
        WRandom.prototype.getItemCount = function() {
            return this._itemList.length;
        };
        WRandom.prototype.getResult = function() {
            var probabilitySum = this.sumProbability();
            var index = Math.round(Math.random() * probabilitySum);
            var result = this._itemList[0];
            for (var i = 0; i < this._probabilityList.length; ++i) {
                var each = this._probabilityList[i];
                if (each > index) {
                    result = this._itemList[i];
                    break;
                }
                index -= each;
            }
            return result;
        };
        WRandom.prototype.sumProbability = function() {
            var result = 0;
            this._probabilityList.forEach(function(each) {
                result += each;
            });
            return result;
        };
        return WRandom;
    }());
    GameLib.WRandom = WRandom;
})(GameLib || (GameLib = {}));
var GameLib;
(function(GameLib) {
    var WArray = (function() {
        function WArray() {}
        WArray.randomElement = function(array) {
            var index = GameLib.WMath.randomInt(0, array.length - 1);
            return array[index];
        };
        WArray.arrayContain = function(array, value) {
            return array.indexOf(value) > -1;
        };
        WArray.tryRemove = function(array, value) {
            var index = array.indexOf(value);
            if (index >= 0) array.splice(index, 1);
        };
        WArray.splitStringToNumberArray = function(str, strSplit) {
            var ret = new Array();
            (str + "").split(strSplit).forEach(function(x) {
                ret.push(+x);
            });
            return ret;
        };
        WArray.copyArray = function(list) {
            var ret = new Array();
            list.forEach(function(x) {
                return ret.push(x);
            });
            return ret;
        };
        return WArray;
    }());
    GameLib.WArray = WArray;
})(GameLib || (GameLib = {}));
var GameLib;
(function(GameLib) {
    var WVector = (function() {
        function WVector() {}
        WVector.normalize = function(x, y, z) {
            var v3 = new Laya.Vector3(x, y, z);
            var v3Nor = new Laya.Vector3(0, 0, 0);
            Laya.Vector3.normalize(v3, v3Nor);
            return v3Nor;
        };
        return WVector;
    }());
    GameLib.WVector = WVector;
})(GameLib || (GameLib = {}));
var GameLib;
(function(GameLib) {
    var WMap = (function() {
        function WMap() {
            this.hasOwnProperty = function(obj, prop) {
                return Object.prototype.hasOwnProperty.call(obj, prop);
            };
            this.table = {};
            this.nElements = 0;
        }
        WMap.prototype.size = function() {
            return this.nElements;
        };
        WMap.prototype.isUndefined = function(obj) {
            return (typeof obj) === 'undefined';
        };
        WMap.prototype.isString = function(obj) {
            return Object.prototype.toString.call(obj) === '[object String]';
        };
        WMap.prototype.toStr = function(param) {
            if (this.isUndefined(param)) {
                return undefined;
            }
            return param.toString();
        };
        WMap.prototype.get = function(key) {
            var pair = this.table[this.toStr(key)];
            if (this.isUndefined(pair)) {
                return undefined;
            }
            return pair.value;
        };
        WMap.prototype.set = function(key, value) {
            if (this.isUndefined(key) || this.isUndefined(value)) {
                return undefined;
            }
            var ret;
            var k = this.toStr(key);
            var previousElement = this.table[k];
            if (this.isUndefined(previousElement)) {
                this.nElements++;
                ret = undefined;
            } else {
                ret = previousElement.value;
            }
            this.table[k] = {
                key: key,
                value: value
            };
            return ret;
        };
        WMap.prototype["delete"] = function(key) {
            var k = this.toStr(key);
            var previousElement = this.table[k];
            if (!this.isUndefined(previousElement)) {
                delete this.table[k];
                this.nElements--;
                return previousElement.value;
            }
            return undefined;
        };
        WMap.prototype.keys = function() {
            var array = [];
            for (var name_1 in this.table) {
                if (this.hasOwnProperty(this.table, name_1)) {
                    var pair = this.table[name_1];
                    array.push(pair.key);
                }
            }
            return array;
        };
        WMap.prototype.values = function() {
            var array = [];
            for (var name_2 in this.table) {
                if (this.hasOwnProperty(this.table, name_2)) {
                    var pair = this.table[name_2];
                    array.push(pair.value);
                }
            }
            return array;
        };
        WMap.prototype.forEach = function(callback) {
            for (var name_3 in this.table) {
                if (this.hasOwnProperty(this.table, name_3)) {
                    var pair = this.table[name_3];
                    var ret = callback(pair.value, pair.key);
                    if (ret === false) {
                        return;
                    }
                }
            }
        };
        WMap.prototype.has = function(key) {
            return !this.isUndefined(this.get(key));
        };
        WMap.prototype.clear = function() {
            this.table = {};
            this.nElements = 0;
        };
        WMap.prototype.isEmpty = function() {
            return this.nElements <= 0;
        };
        WMap.prototype.toString = function() {
            var toret = '{';
            this.forEach(function(k, v) {
                toret += "\n" + k + " : " + v;
            });
            return toret + '\n}';
        };
        return WMap;
    }());
    GameLib.WMap = WMap;
})(GameLib || (GameLib = {}));
var GameLib;
(function(GameLib) {
    var WLaya = (function() {
        function WLaya() {}
        WLaya.destroySprite3D = function(sprite3D, destroyChild) {
            if (destroyChild === void 0) {
                destroyChild = true;
            }
            sprite3D && sprite3D.destroy(destroyChild);
        };
        return WLaya;
    }());
    GameLib.WLaya = WLaya;
})(GameLib || (GameLib = {}));
var GameLib;
(function(GameLib) {
    var WAnimationClipLoader = (function() {
        function WAnimationClipLoader() {}
        WAnimationClipLoader.prototype.test = function() {
            var url = "res/d3/Assets/ResFromUnity/model/animation/idle.lani";
            var clip = this.load(url);
            var clip2 = this.load(url);
        };
        WAnimationClipLoader.prototype.load = function(url) {
            return Laya.AnimationClip.load(url);
        };
        return WAnimationClipLoader;
    }());
    GameLib.WAnimationClipLoader = WAnimationClipLoader;
})(GameLib || (GameLib = {}));
var GameLib;
(function(GameLib) {
    var WD3 = (function() {
        function WD3() {}
        WD3.pos2DTo3D = function(camera, x, y) {
            var outPos = new Laya.Vector3(0, 0, 0);
            camera.convertScreenCoordToOrthographicCoord(new Laya.Vector3(x, y, 0), outPos);
            return outPos;
        };
        return WD3;
    }());
    GameLib.WD3 = WD3;
})(GameLib || (GameLib = {}));
var GameLib;
(function(GameLib) {
    var BehaviorObject = (function() {
        function BehaviorObject() {
            this._comList = new Array();
            this._comDic = new GameLib.WMap();
        }
        BehaviorObject.prototype.addComponent = function(com) {
            this._comList.push(com);
            this._comDic.set(com.getComName(), com);
            com.setBehaviorObject(this);
            return com;
        };
        BehaviorObject.prototype.getComponentEx = function(comName) {
            if (!this._comDic) {
                return null;
            }
            return this._comDic.get(comName);
        };
        BehaviorObject.prototype.onBehaviorDelete = function() {
            this._comList.forEach(function(x) {
                return x.onComponentDelete();
            });
            this._comList = null;
            this._comDic.clear();
            this._comDic = null;
        };
        return BehaviorObject;
    }());
    GameLib.BehaviorObject = BehaviorObject;
})(GameLib || (GameLib = {}));
var GameLib;
(function(GameLib) {
    var Component = (function() {
        function Component(comName) {
            this._comName = comName;
        }
        Component.prototype.getComName = function() {
            return this._comName;
        };
        Component.prototype.setBehaviorObject = function(value) {
            this._behaviorObject = value;
        };
        Component.prototype.getBehaviorObject = function() {
            return this._behaviorObject;
        };
        Component.prototype.onComponentDelete = function() {};
        return Component;
    }());
    GameLib.Component = Component;
})(GameLib || (GameLib = {}));
var GameLib;
(function(GameLib) {
    var WBusiness = (function() {
        function WBusiness() {}
        WBusiness.getSkinnedMeshSprite3D = function(sprite3D) {
            if (!sprite3D) {
                console.error("\u6A21\u578B\u4E3A\u7A7A");
                return null;
            }
            var child1 = sprite3D.getChildAt(0);
            if (!child1) {
                console.error("\u6A21\u578B\u7B2C\u4E00\u5B50\u8282\u70B9\u4E3A\u7A7A[" + sprite3D.name + "]");
                return null;
            }
            var child2 = child1.getChildAt(0);
            if (!child2) {
                console.error("\u6A21\u578B\u7B2C\u4E8C\u5B50\u8282\u70B9\u4E3A\u7A7A[" + sprite3D.name + "]");
                return null;
            }
            var child3 = child2.getChildAt(0);
            if (!child3) {
                console.error("\u6A21\u578B\u7B2C\u4E8C\u5B50\u8282\u70B9\u4E3A\u7A7A[" + sprite3D.name + "]");
                return null;
            }
            return child3;
        };
        return WBusiness;
    }());
    GameLib.WBusiness = WBusiness;
})(GameLib || (GameLib = {}));
var GameLib;
(function(GameLib) {
    var WAnimator = (function() {
        function WAnimator(sprite3D) {
            this._sprite3D = sprite3D;
            if (!sprite3D) {
                console.error("\u6A21\u578B\u4E3A\u7A7A");
                return;
            }
            var firstChild = sprite3D.getChildAt(0);
            if (!firstChild) {
                console.error("\u6A21\u578B\u7B2C\u4E00\u5B50\u8282\u70B9\u4E3A\u7A7A[" + sprite3D.name + "]");
                return;
            }
            var secondChild = firstChild.getChildAt(0);
            if (!secondChild) {
                console.error("\u6A21\u578B\u7B2C\u4E8C\u5B50\u8282\u70B9\u4E3A\u7A7A[" + sprite3D.name + "]");
                return;
            }
            var child = secondChild;
            this._animator = child.getComponentByType(Laya.Animator);
            this._animator.playOnWake = false;
        }
        WAnimator.prototype.playAction = function(action, onStop, onComplete) {
            if (onStop === void 0) {
                onStop = null;
            }
            if (onComplete === void 0) {
                onComplete = null;
            }
            if (!this._animator) {
                console.error("\u6A21\u578B\u7684_animator\u8FD8\u6CA1\u6709\u52A0\u8F7D\u5B8C\u6BD5");
                return;
            }
            if (this._animator.destroyed) return;
            this._animator.play(action);
            if (onStop) {
                this._animator.once(Laya.Event.STOPPED, this, function() {
                    onStop();
                });
            }
            if (onComplete) {
                this._animator.once(Laya.Event.COMPLETE, this, function() {
                    onComplete();
                });
            }
        };
        WAnimator.prototype.setPause = function(paused) {
            this._animator.paused = paused;
        };
        WAnimator.prototype.linkSprite3DToAvatarNode = function(name, obj) {
            return this._animator.linkSprite3DToAvatarNode(name, obj);
        };
        WAnimator.prototype.unLinkSprite3DToAvatarNode = function(obj) {
            return this._animator.unLinkSprite3DToAvatarNode(obj);
        };
        return WAnimator;
    }());
    GameLib.WAnimator = WAnimator;
})(GameLib || (GameLib = {}));
var GameLib;
(function(GameLib) {
    var WModel = (function() {
        function WModel() {}
        WModel.prototype.setScale = function(value) {
            this.sprite3D.transform.localScale = value;
        };
        WModel.prototype.getScale = function() {
            return this.sprite3D.transform.localScale;
        };
        return WModel;
    }());
    GameLib.WModel = WModel;
})(GameLib || (GameLib = {}));
var GameLib;
(function(GameLib) {
    var WTweenStruct = (function() {
        function WTweenStruct() {
            this.alpha = 0;
        }
        WTweenStruct.prototype.setAlpha = function(value) {
            this.alpha = value;
            return this;
        };
        return WTweenStruct;
    }());
    GameLib.WTweenStruct = WTweenStruct;
})(GameLib || (GameLib = {}));
var GameLib;
(function(GameLib) {
    var WEnum = (function() {
        function WEnum() {}
        WEnum.FacadePos_Cloth = 1;
        WEnum.FacadePos_Weapon = 2;
        WEnum.FacadePos_Wing = 3;
        WEnum.FacadeType_Fashion = 1;
        WEnum.FacadeType_Equip = 2;
        WEnum.FacadeType_Wing = 3;
        return WEnum;
    }());
    GameLib.WEnum = WEnum;
})(GameLib || (GameLib = {}));
var GameLib;
(function(GameLib) {
    var WShader = (function() {
        function WShader() {}
        WShader.shaderVS = "\n        attribute vec4 a_Position;\n        attribute vec2 a_Texcoord;\n        attribute vec3 a_Normal;\n        \n        uniform mat4 u_MvpMatrix;\n        uniform mat4 u_WorldMat;\n        uniform vec3 u_CameraPos;\n        \n        varying vec2 v_Texcoord;\n        varying vec3 v_Normal;\n        varying vec3 v_PositionWorld;\n        \n        #ifdef BONE\n            attribute vec4 a_BoneIndices;\n            attribute vec4 a_BoneWeights;\n            const int c_MaxBoneCount = 24;\n            uniform mat4 u_Bones[c_MaxBoneCount];\n        #endif\n        \n        void main()\n        {\n            #ifdef BONE\n                mat4 skinTransform=mat4(0.0);\n                skinTransform += u_Bones[int(a_BoneIndices.x)] * a_BoneWeights.x;\n                skinTransform += u_Bones[int(a_BoneIndices.y)] * a_BoneWeights.y;\n                skinTransform += u_Bones[int(a_BoneIndices.z)] * a_BoneWeights.z;\n                skinTransform += u_Bones[int(a_BoneIndices.w)] * a_BoneWeights.w;\n                vec4 position = skinTransform * a_Position;\n                gl_Position=u_MvpMatrix * position;\n                mat3 worldMat=mat3(u_WorldMat * skinTransform);\n            #else\n                gl_Position=u_MvpMatrix * a_Position;\n                mat3 worldMat=mat3(u_WorldMat);\n            #endif\n        \n            v_Texcoord=a_Texcoord;\n            v_Normal = worldMat * a_Normal;\n        }\n        ";
        WShader.shaderPS = "\n        #ifdef FSHIGHPRECISION\n            precision highp float;\n        #else\n            precision mediump float;\n        #endif\n\n        uniform sampler2D u_texture;\n        uniform sampler2D u_SpecularTexture;\n        uniform vec3 u_marginalColor;\n        uniform vec4 u_Albedo;\n\n        varying vec2 v_Texcoord;\n        varying vec3 v_Normal;\n\n        void main()\n        {\n            gl_FragColor = texture2D(u_texture, v_Texcoord) + texture2D(u_SpecularTexture, v_Texcoord) * 0.5;\n            gl_FragColor.a = u_Albedo.a;\n        }\n        ";
        return WShader;
    }());
    GameLib.WShader = WShader;
})(GameLib || (GameLib = {}));
var GameLib;
(function(GameLib) {
    var WSetHpResult = (function() {
        function WSetHpResult() {}
        return WSetHpResult;
    }());
    GameLib.WSetHpResult = WSetHpResult;
})(GameLib || (GameLib = {}));