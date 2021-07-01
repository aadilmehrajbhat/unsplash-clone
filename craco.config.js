const path = require('path');
module.exports = {
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components/'),
      '@hooks': path.resolve(__dirname, 'src/hooks/'),
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@services': path.resolve(__dirname, 'src/services/'),
      '@assets': path.resolve(__dirname, 'src/assets/'),
      '@pages': path.resolve(__dirname, 'src/pages/'),
      '@contexts': path.resolve(__dirname, 'src/contexts/'),
    },
  },
};
