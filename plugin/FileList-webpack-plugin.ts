class FileListPlugin {
    constructor(){}
    apply(compiler) {
        compiler.hooks.emit.tapAsync('FileListPlugin',(compilation, callback)=> {
            let fileList = 'In This Build \n\n'
            for(let fileName in compilation.assets) {
                fileList += `- ${fileName}\n`
            }
            compilation.assets['fileList.md'] = {
                source: () => fileList,
                size: () => fileList.length
            }
            callback()
        })
        compiler.hooks.compile.tap('FileListPlugin',(compilation) => {
            console.log(compilation)
        })
    }
}
module.exports = FileListPlugin