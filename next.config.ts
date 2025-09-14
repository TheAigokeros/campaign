import type { NextConfig } from 'next'
 
const nextConfig: NextConfig = {
  typedRoutes: true,
  sassOptions: {
    implementation: 'sass-embedded',
  },
  images: {
    domains: ["toppng.com"],
  },
}
 
export default nextConfig