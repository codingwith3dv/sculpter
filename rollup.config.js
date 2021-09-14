import nodeResolve from '@rollup/plugin-node-resolve';

export default {
  input: 'dist/src/index.js',
  output: {
    file: 'out/sculpter.js',
    format: 'es'
  },
  plugins: [nodeResolve()],
  onwarn: function(warning) {
    if (warning.code === 'THIS_IS_UNDEFINED') { return; }
    console.warn(warning.message);
  }
};
