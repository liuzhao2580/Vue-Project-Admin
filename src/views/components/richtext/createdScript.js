/* eslint-disable */
const dynamicLoadScript = (src, callback) => {
    return new Promise(res => {
        const script = document.createElement("script")
        script.src = src
        document.body.appendChild(script)
        
        script.onload = () => {
            res(true)
        }
    })
}
export default dynamicLoadScript
