
cc.Class({
    extends: cc.Component,

    properties: {
        bgNode:cc.Node,
        top:cc.Node,
        bottom:cc.Node,
        player:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.status = "none";
        this.bgNode.on("touchstart", this.down, this);
        this.bgNode.on("touchend", this.up, this);

        this._animDisplay = this.node.getComponent(dragonBones.ArmatureDisplay);
        // this._animDisplay.debugBones = true;
        this._armature = this._animDisplay.armature();

        this._armature.addEventListener(dragonBones.EventObject.START, this.listenEv, this);
        this._armature.addEventListener(dragonBones.EventObject.COMPLETE, this.listenEv, this);

        this.startPlayerPos = this.player.position;

    },

    listenEv(event) {
        if (event.type === "start") {
            if (event.detail.animationState.name === "wangdong0") {
                this.playDownStatus = "start";
            }else{
                this.playUpStatus = "start";
            }
        }
    },

    down() {
        this.status = "down";
        this._armature.animation.timeScale = 0.5;
        this.playAnim = this._armature.animation.gotoAndPlayByFrame("wangdong0", 1, 1);
        var worldPos = this.node.parent.convertToWorldSpaceAR(cc.v2(this._armature._bones[1].global.x, this._armature._bones[1].global.y))
        this.startBonesY = worldPos.y;
    },

    up() {
        this.status = "up";
        this.playDownStatus = "none";
        this.totalTm = 	this._armature.animation.lastAnimationState.totalTime;
        // 指定时间弹起
        this.startUpTm = this.totalTm - this.currZ;

        this._armature.animation.timeScale = 15;
        this.playUpAnim = this._armature.animation.gotoAndPlayByTime("wangdong3", this.startUpTm, 1);

    },

    updatePosition (moveY) {
        this.player.setPositionY(this.startPlayerPos.y - (moveY*0.5));
    },

    update (dt) {

        if (this.playUpStatus === "start") {
            var currWorldPos = this.node.parent.convertToWorldSpaceAR(cc.v2(this._armature._bones[1].global.x, this._armature._bones[1].global.y))
            var moveY = currWorldPos.y - this.startBonesY;
            this.updatePosition(moveY);
        }

        if (this.playDownStatus === "start") {
            // y轴相对移动距离
            var currBoneY = this._armature._bones[1].global.y;
            var currWorldPos = this.node.parent.convertToWorldSpaceAR(cc.v2(this._armature._bones[1].global.x, this._armature._bones[1].global.y))
            var moveY = currWorldPos.y - this.startBonesY;
            this.updatePosition(moveY);
            this.currZ = this._armature.animation.lastAnimationState.currentTime;        // 当前播放时间
            cc.log("播放时间"+this.currZ);
        }



    },
});
