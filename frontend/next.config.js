const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { 
      fs: false, 
      net: false, 
      tls: false,
      'pino-pretty': false,
      lokijs: false,
      encoding: false
    }
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    
    config.ignoreWarnings = [
      { module: /node_modules/ },
      { file: /inpage\.js/ },
      { file: /requestProvider\.js/ }
    ]
    
    return config
  },
}

module.exports = nextConfig