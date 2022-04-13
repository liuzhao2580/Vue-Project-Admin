export default {
  bind(el: { querySelector: (arg0: string) => any }) {
    const dialogHead = el.querySelector('.el-dialog__header')
    const dialogBox = el.querySelector('.el-dialog')
    dialogHead.style.cursor = 'move'
    const getNumStyle = (leftORtop: string) => {
      if (leftORtop) {
        return parseInt(leftORtop)
      } else {
        return 0
      }
    }
    // 鼠标按下
    dialogHead.onmousedown = (e: MouseEvent) => {
      // 获取当前 body 可视区域的大小
      const screenW = document.body.offsetWidth
      const screenH = document.body.offsetHeight

      // 获取盒子的大小
      const BoxW = dialogBox.offsetWidth
      const BoxH = dialogBox.offsetHeight
      // 获取鼠标按下时 距离 body 左侧和顶部的距离
      const MouseTOBodyL = e.clientX
      const MouseTOBodyT = e.clientY

      // 获取鼠标按下时 距离盒子左侧和顶部的距离
      const MouseTOBoxL = e.offsetX
      const MouseTOBoxT = e.offsetY

      // 获取盒子距离 body 左侧和顶部的距离
      const BoxTOBodyL = MouseTOBodyL - MouseTOBoxL
      const BoxTOBodyT = MouseTOBodyT - MouseTOBoxT

      // 获取 鼠标 可以移动的范围
      const Mouse_MoveMinX = MouseTOBoxL
      const Mouse_MoveMaxX = screenW - BoxW + MouseTOBoxL
      const Mouse_MoveMinY = MouseTOBoxT
      const Mouse_MoveMaxY = screenH - BoxH + MouseTOBoxT
      // 获取 盒子中 css 样式中已经存在的 left top
      const existedLeft = getNumStyle(dialogBox.style.left)
      const existedTop = getNumStyle(dialogBox.style.top)
      document.onmousemove = e => {
        // 获取鼠标移动时 距离 body 左侧和顶部的距离
        const Move_MouseTOBodyL = e.clientX
        const Move_MouseTOBodyT = e.clientY

        // 获取盒子移动的距离
        let Move_BoxX = Move_MouseTOBodyL - BoxTOBodyL - MouseTOBoxL
        let Move_BoxY = Move_MouseTOBodyT - BoxTOBodyT - MouseTOBoxT

        // 限制条件
        if (Move_MouseTOBodyL > Mouse_MoveMaxX) {
          Move_BoxX = Mouse_MoveMaxX - BoxTOBodyL - MouseTOBoxL
        } else if (Move_MouseTOBodyL < Mouse_MoveMinX) {
          Move_BoxX = -BoxTOBodyL
        }
        if (Move_MouseTOBodyT > Mouse_MoveMaxY) {
          Move_BoxY = Mouse_MoveMaxY - BoxTOBodyT - MouseTOBoxT
        } else if (Move_MouseTOBodyT < Mouse_MoveMinY) {
          Move_BoxY = -BoxTOBodyT
        }

        // 设置位移
        dialogBox.style.left = Move_BoxX + existedLeft + 'px'
        dialogBox.style.top = Move_BoxY + existedTop + 'px'
      }
      document.onmouseup = () => {
        document.onmousemove = null
        document.onmousedown = null
      }
    }
  }
}
