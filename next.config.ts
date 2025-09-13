import type { NextConfig } from 'next'
 
const nextConfig: NextConfig = {
  typedRoutes: true,
  sassOptions: {
    implementation: 'sass-embedded',
  },
}
 
export default nextConfig