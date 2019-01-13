// HelloCanvas.js
function main () {
    // 获取<canvas> 元素
    var canvas = document.getElementById('webgl');

    var gl = getWebGLContext(canvas);
    if (!gl) {
        console.log('Fail to get the rendering context for WebGL');
        return;
    }
    // 指定情况 画布的颜色 参数均为float类型 均为0.0 -- 1.0
    gl.clearColor(0.0, 0.0, 0.3, 1.0);

    gl.clear(gl.COLOR_BUFFER_BIT);
}