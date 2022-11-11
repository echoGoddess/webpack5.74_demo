class FileListPlugin{
    constructor(options){
        console.log("-----------FileListPlugin",options);
    }
    apply(compiler){
        compiler.hooks.emit.tapAsync("FileListPlugin",(compilation,callback)=>{
            let filelist = "In this build:\n\n";

            for(var fileName in compilation.assets){
                filelist += `${fileName}\n`;
            }

            compilation.assets["filelist.md"]={
                source:function(){
                    return filelist;
                },
                size:function(){
                    return filelist.length;
                }
            }
            callback();
        });
    }
}

module.exports = FileListPlugin;