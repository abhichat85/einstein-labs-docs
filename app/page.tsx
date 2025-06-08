import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Book, FileText, Settings, Zap, Shield, Globe } from "lucide-react"
import EnhancedDocsLayout from "./enhanced-docs-layout"
import CodeBlock from "@/components/code-block"

export default function Home() {
  const quickStartCode = `# Clone the repository
git clone https://github.com/einstein-labs/project-name.git
cd project-name

# Install dependencies
npm install

# Start development server
npm run dev`

  const apiExampleCode = `import { EinsteinAPI } from '@einstein-labs/sdk'

const api = new EinsteinAPI({
  apiKey: process.env.EINSTEIN_API_KEY
})

// Create a new user
const user = await api.users.create({
  name: 'John Doe',
  email: 'john@example.com'
})

console.log('User created:', user.id)`

  return (
    <EnhancedDocsLayout>
      <div className="space-y-12">
        {/* Hero section */}
        <section className="text-center py-12">
          <div className="bg-gradient-to-br from-midnight-green to-midnight-green/80 rounded-2xl p-12 text-ivory-cream">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Einstein Labs Documentation</h1>
            <p className="text-xl text-light-silver mb-8 max-w-3xl mx-auto">
              Comprehensive technical documentation for all Einstein Labs projects. Build faster with our world-class
              APIs, guides, and developer tools.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-orange-pantone hover:bg-orange-pantone/90 text-ivory-cream">
                <Link href="/getting-started">
                  <Zap className="mr-2 h-5 w-5" />
                  Quick Start
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-light-silver text-light-silver hover:bg-ivory-cream hover:text-gunmetal"
              >
                <Link href="/api-docs">View API Docs</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Quick start */}
        <section>
          <h2 className="text-3xl font-bold text-gunmetal mb-6">Get Started in Minutes</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gunmetal mb-4">1. Install and Setup</h3>
              <p className="text-gunmetal/70 mb-4">
                Get up and running with Einstein Labs in just a few commands. Our CLI tool handles all the heavy lifting
                for you.
              </p>
              <CodeBlock code={quickStartCode} language="bash" title="Quick Setup" filename="terminal" downloadable />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gunmetal mb-4">2. Make Your First API Call</h3>
              <p className="text-gunmetal/70 mb-4">
                Start building with our intuitive SDK. Type-safe, well-documented, and designed for developer
                productivity.
              </p>
              <CodeBlock
                code={apiExampleCode}
                language="typescript"
                title="First API Call"
                filename="app.ts"
                runnable
                downloadable
              />
            </div>
          </div>
        </section>

        {/* Feature highlights */}
        <section>
          <h2 className="text-3xl font-bold text-gunmetal mb-6">Why Choose Einstein Labs?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-card border-light-silver hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-gunmetal">
                  <Zap className="mr-3 h-6 w-6 text-orange-pantone" />
                  Lightning Fast
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gunmetal/70">
                Built for performance with edge computing, global CDN, and optimized APIs that respond in milliseconds
                worldwide.
              </CardContent>
            </Card>

            <Card className="bg-card border-light-silver hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-gunmetal">
                  <Shield className="mr-3 h-6 w-6 text-orange-pantone" />
                  Enterprise Security
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gunmetal/70">
                SOC 2 compliant with end-to-end encryption, advanced authentication, and comprehensive audit logs for
                enterprise peace of mind.
              </CardContent>
            </Card>

            <Card className="bg-card border-light-silver hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-gunmetal">
                  <Globe className="mr-3 h-6 w-6 text-orange-pantone" />
                  Global Scale
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gunmetal/70">
                Deployed across 50+ regions worldwide with 99.99% uptime SLA and automatic scaling to handle any
                workload.
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Documentation sections */}
        <section>
          <h2 className="text-3xl font-bold text-gunmetal mb-6">Explore Our Documentation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-card border-light-silver group hover:border-midnight-green transition-colors">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-gunmetal">
                  <FileText className="mr-3 h-5 w-5 text-orange-pantone" />
                  Getting Started
                </CardTitle>
                <CardDescription className="text-gunmetal/70">Complete setup guide and first steps</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-gunmetal/70">
                Learn how to set up your development environment, install dependencies, and build your first Einstein
                Labs application.
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  variant="ghost"
                  className="text-midnight-green hover:text-midnight-green/90 hover:bg-light-silver/20 p-0 group-hover:translate-x-1 transition-transform"
                >
                  <Link href="/getting-started">
                    Read Guide <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-card border-light-silver group hover:border-midnight-green transition-colors">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-gunmetal">
                  <Settings className="mr-3 h-5 w-5 text-orange-pantone" />
                  System Design
                </CardTitle>
                <CardDescription className="text-gunmetal/70">
                  Architecture and technical specifications
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-gunmetal/70">
                Deep dive into our system architecture, design patterns, and the technical decisions that power Einstein
                Labs.
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  variant="ghost"
                  className="text-midnight-green hover:text-midnight-green/90 hover:bg-light-silver/20 p-0 group-hover:translate-x-1 transition-transform"
                >
                  <Link href="/system-design">
                    Explore Architecture <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-card border-light-silver group hover:border-midnight-green transition-colors">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-gunmetal">
                  <Book className="mr-3 h-5 w-5 text-orange-pantone" />
                  API Reference
                </CardTitle>
                <CardDescription className="text-gunmetal/70">Complete API documentation and examples</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-gunmetal/70">
                Comprehensive API reference with interactive examples, authentication guides, and SDKs for all major
                programming languages.
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  variant="ghost"
                  className="text-midnight-green hover:text-midnight-green/90 hover:bg-light-silver/20 p-0 group-hover:translate-x-1 transition-transform"
                >
                  <Link href="/api-docs">
                    Browse APIs <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Community and support */}
        <section className="bg-sand-yellow/10 rounded-2xl p-8 border border-sand-yellow/30">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gunmetal mb-4">Join Our Community</h2>
            <p className="text-gunmetal/70 max-w-2xl mx-auto">
              Connect with thousands of developers building amazing things with Einstein Labs. Get help, share ideas,
              and stay updated with the latest features.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant="outline"
              className="border-midnight-green text-midnight-green hover:bg-midnight-green hover:text-ivory-cream"
            >
              Join Discord
            </Button>
            <Button
              variant="outline"
              className="border-midnight-green text-midnight-green hover:bg-midnight-green hover:text-ivory-cream"
            >
              Follow on Twitter
            </Button>
            <Button
              variant="outline"
              className="border-midnight-green text-midnight-green hover:bg-midnight-green hover:text-ivory-cream"
            >
              Star on GitHub
            </Button>
            <Button className="bg-orange-pantone hover:bg-orange-pantone/90 text-ivory-cream">Contact Support</Button>
          </div>
        </section>
      </div>
    </EnhancedDocsLayout>
  )
}
