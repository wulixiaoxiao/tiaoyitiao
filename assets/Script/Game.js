
cc.Class({
    extends: cc.Component,

    properties: {
        a1Node: cc.Node,
        a2Node: cc.Node,
        a3Node: cc.Node,
        a4Node: cc.Node,
        a5Node: cc.Node,
        a6Node: cc.Node,
        rope: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        // cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
        //     cc.PhysicsManager.DrawBits.e_pairBit |
        //     cc.PhysicsManager.DrawBits.e_centerOfMassBit |
        //     cc.PhysicsManager.DrawBits.e_jointBit |
        //     cc.PhysicsManager.DrawBits.e_shapeBit;

        var arr = [
            this.a1Node,
            this.a2Node,
            this.a3Node,
            this.a4Node,
            this.a5Node,
            this.a6Node,
        ];

        let prevBody = null;
        let totalLen = 30;
        let netLen = 10;
        for (var k = 0; k <= 5; k++) {
            var currNode = arr[k];
            prevBody = currNode.getComponent(cc.RigidBody);
            for (let i = 0; i <= totalLen; ++i) {
                let node = this.genNode(prevBody, i);
                if (i%netLen === 0 && i!==0) {
                    let tag = i/netLen;
                    node.setName("dian"+k+"-"+tag);
                }
                let body = node.getComponent(cc.RigidBody);
                currNode.addChild(node);
                prevBody = body;
            }
        }

        for (let j = 0; j < 3; ++j) {
            let cnode1 = cc.find("dian"+j+"-3", arr[j]);
            let cnode2 = cc.find("dian"+(j+3)+"-3", arr[j+3]);
            let joint = cnode1.addComponent(cc.RevoluteJoint);
            joint.collideConnected = false;
            joint.connectedBody = cnode2.getComponent(cc.RigidBody);
        }

        // 连接线
        for (var t = 1; t <= 2; t++) {
            let cnode1 = cc.find("dian"+(t)+"-"+2, arr[t]);
            let cnode2 = cc.find("dian"+(t+2)+"-"+2, arr[t+2]);
            let joint = cnode1.addComponent(cc.RevoluteJoint);
            joint.collideConnected = false;
            joint.connectedBody = cnode2.getComponent(cc.RigidBody);
        }

        let cnode1 = cc.find("dian2-1", arr[2]);
        let cnode2 = cc.find("dian3-1", arr[3]);
        let joint = cnode1.addComponent(cc.RevoluteJoint);
        joint.collideConnected = false;
        joint.connectedBody = cnode2.getComponent(cc.RigidBody);


        ////////////////////////// 第2根链接第1
        prevBody = arr[1].getComponent(cc.RigidBody);
        for (var i = 0; i <= netLen; ++i) {
            if (i%netLen === 0 && i!==0) {
                node.setName("dian21-1");
            }
            let node = this.genNode(prevBody, i);
            var body = node.getComponent(cc.RigidBody);
            arr[1].addChild(node);
            prevBody = body;
        }
        cnode1 = cc.find("dian21-1", arr[1]);
        cnode2 = cc.find("dian0-1", arr[0]);
        joint = cnode1.addComponent(cc.RevoluteJoint);
        joint.collideConnected = false;
        joint.connectedBody = cnode2.getComponent(cc.RigidBody);

        // ////////////////////////////第3根链接第2 1
        prevBody = arr[2].getComponent(cc.RigidBody);
        for (var h = 0; h <= netLen*2; ++h) {
            if (h%netLen === 0 && h!==0) {
                node.setName("dian33-"+(h/netLen));
            }
            let node = this.genNode(prevBody, h);
            var body = node.getComponent(cc.RigidBody);
            arr[2].addChild(node);
            prevBody = body;
        }
        cnode1 = cc.find("dian33-1", arr[2]);
        cnode2 = cc.find("dian1-1", arr[1]);
        joint = cnode1.addComponent(cc.RevoluteJoint);
        joint.collideConnected = false;
        joint.connectedBody = cnode2.getComponent(cc.RigidBody);

        cnode1 = cc.find("dian33-2", arr[2]);
        cnode2 = cc.find("dian0-2", arr[0]);
        joint = cnode1.addComponent(cc.RevoluteJoint);
        joint.collideConnected = false;
        joint.connectedBody = cnode2.getComponent(cc.RigidBody);

        ///////////////////第4根链接第5 6
        prevBody = arr[3].getComponent(cc.RigidBody);
        for (var h = 0; h <= netLen*2; ++h) {
            if (h%netLen === 0 && h!==0) {
                node.setName("dian44-"+(h/netLen));
            }
            let node = this.genNode(prevBody, h);
            var body = node.getComponent(cc.RigidBody);
            arr[3].addChild(node);
            prevBody = body;
        }
        cnode1 = cc.find("dian44-1", arr[3]);
        cnode2 = cc.find("dian4-1", arr[4]);
        joint = cnode1.addComponent(cc.RevoluteJoint);
        joint.collideConnected = false;
        joint.connectedBody = cnode2.getComponent(cc.RigidBody);

        cnode1 = cc.find("dian44-2", arr[3]);
        cnode2 = cc.find("dian5-2", arr[5]);
        joint = cnode1.addComponent(cc.RevoluteJoint);
        joint.collideConnected = false;
        joint.connectedBody = cnode2.getComponent(cc.RigidBody);

        //////////////// 第5根链接第6
        prevBody = arr[4].getComponent(cc.RigidBody);
        for (var i = 0; i <= netLen; ++i) {
            if (i%netLen === 0 && i!==0) {
                node.setName("dian55-1");
            }
            let node = this.genNode(prevBody, i);
            var body = node.getComponent(cc.RigidBody);
            arr[4].addChild(node);
            prevBody = body;
        }
        cnode1 = cc.find("dian55-1", arr[4]);
        cnode2 = cc.find("dian5-1", arr[5]);
        joint = cnode1.addComponent(cc.RevoluteJoint);
        joint.collideConnected = false;
        joint.connectedBody = cnode2.getComponent(cc.RigidBody);



    },

    genNode(prevBody,i){
        let itemWidth = 3;
        let itemHeight = 3;
        let y = 0;

        let node = cc.instantiate(this.rope);
        node.position = cc.v2(0, (i) * itemHeight);

        let sprite = node.getComponent(cc.Sprite);
        sprite.spriteFrame = this.node.getComponent(cc.Sprite).spriteFrame;

        let collider = node.getComponent(cc.PhysicsBoxCollider);
        collider.size = cc.size(itemWidth, itemHeight);
        collider.density = 1;

        let joint = node.getComponent(cc.RevoluteJoint);
        joint.collideConnected = false;
        joint.anchor = cc.v2(-itemWidth / 2, 0);
        joint.connectedAnchor = i === 0 ? cc.v2(0, y) : cc.v2(itemWidth / 2, 0);
        joint.connectedBody = prevBody;

        node.width = itemWidth;
        node.height = itemHeight;
        return node;
    },

    start () {

    },

    // update (dt) {},
});
