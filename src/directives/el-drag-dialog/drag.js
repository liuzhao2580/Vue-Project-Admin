/* eslint-disable */
export default {
    bind(el, binding, vnode){
        const dialogHead = el.querySelector(".el-dialog__header")
        const dialogBox = el.querySelector(".el-dialog")
        dialogHead.style.cursor = "move"
        const getNumStyle = ((leftORtop) => {
            if (leftORtop) {
                return parseInt(leftORtop)
            } else {
                return 0
            }
        })
        // 鼠标按下
        dialogHead.onmousedown = (e) => {
            // 获取当前屏幕可视区域的大小
            let getCurrentW = document.body.clientWidth
            let getCurrentH = document.body.clientHeight
            // 获取盒子的宽度和高度
            let getBoxW = dialogBox.clientWidth
            let getBoxH = dialogBox.clientHeight
            // 获取鼠标点击时的位置距离 屏幕 屏幕 屏幕 左边和顶端的距离
            let getNowX = e.clientX
            let getNowY = e.clientY
            // 获取鼠标点击时的位置距离当前 div 左边和顶端的距离
            let getNowOffsetX = e.offsetX
            let getNowOffsetY = e.offsetY
            // 获取 鼠标点击时当前 div 距离屏幕左边和顶部的距离
            let getMoveX = getNowX - getNowOffsetX
            let getMoveY = getNowY - getNowOffsetY
            // 获取鼠标点击时 鼠标距离盒子内侧的距离
            let MouseTOBoxX = getNowX - getMoveX
            let MouseTOBoxY = getNowY - getMoveY
            // 获取到的值带px
            let styL = getNumStyle(dialogBox.style.left)
            let styT = getNumStyle(dialogBox.style.top)
            // 获取当前盒子可以移动的最小范围  和 最大范围
            let MinMoveX = getMoveX
            let MaxMoveX = getCurrentW - getBoxW

            let MinMoveY = getMoveY
            let MaxMoveY = getCurrentH - getBoxH
            // 鼠标移动
            document.onmousemove = (e) => {
                let getMouseClientX = e.clientX
                let getMouseClientY = e.clientY
                // 获取鼠标移动的距离
                let getMouseMoveX = getMouseClientX - MouseTOBoxX
                let getMouseMoveY = getMouseClientY - MouseTOBoxY

                let MoveX = getMouseClientX - getNowX + styL
                let MoveY = getMouseClientY - getNowY + styT

                console.log(MoveX)
                // 区域限制
                if (getMouseMoveX > MaxMoveX) {
                    MoveX = getMouseClientX - MouseTOBoxX - getNowX
                }
                else if (getMouseMoveX < MinMoveX) {
                    MoveX = MinMoveX
                }

                // if (getMouseMoveY > MaxMoveY) {
                //     MoveY = MaxMoveY
                // } else if (getMouseMoveY < MinMoveY) {
                //     MoveY = MinMoveY
                // }
                dialogBox.style.left = MoveX + "px"
                dialogBox.style.top = MoveY + "px"
            }
            // 鼠标松开
            document.onmouseup = () => {
                document.onmousemove = null;
                document.onmouseup = null;
            }
        }
        
    }
}
