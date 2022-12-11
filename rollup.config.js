import resolve from '@rollup/plugin-node-resolve';

export default {
    input: 'src/main.js',
    output: {
      file: './demo/xiaoMRoom.js',
      format: 'umd',
      name: 'XiaoMRoom'
    },
    plugins: [ 
        resolve()
    ]
  };