// HelloCanvas.js
function main() {
    // 获取<canvas> 元素
    var canvas = document.getElementById('webgl');

    var gl = getWebGLContext(canvas);
    if (!gl) {
        console.log('Fail to get the rendering context for WebGL');
        return;
    }
    // 指定情况 画布的颜色 rgba 参数均为float类型 均为0.0 -- 1.0
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    /**
     * 将指定缓冲区设定为预定的值
     * gl.clear(buffer)
     * @param buffer {gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUTTER_BIT}
     * 颜色缓冲区 深度缓冲区 模板缓冲区
     * （0.0，0.0，0.0，0.0） 1.0 0
     */
    gl.clear(gl.COLOR_BUFFER_BIT);
}
