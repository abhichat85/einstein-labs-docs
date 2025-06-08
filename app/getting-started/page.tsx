import DocsLayout from "../docs-layout"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"

export default function GettingStarted() {
  return (
    <DocsLayout>
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold text-gunmetal mb-6">Getting Started</h1>

        <p className="text-gunmetal mb-6">
          This guide will help you set up your development environment and get started with the project.
        </p>

        <Alert className="mb-6 border-orange-pantone bg-orange-pantone/10">
          <Info className="h-4 w-4 text-orange-pantone" />
          <AlertTitle className="text-gunmetal">Important</AlertTitle>
          <AlertDescription className="text-gunmetal/80">
            Make sure you have the latest versions of all required software before proceeding.
          </AlertDescription>
        </Alert>

        <h2 className="text-2xl font-bold text-gunmetal mb-4">Prerequisites</h2>

        <p className="text-gunmetal mb-4">Before you begin, ensure you have the following installed:</p>

        <ul className="list-disc pl-6 mb-6 text-gunmetal space-y-2">
          <li>
            <strong>Node.js</strong> (version 18 or higher)
          </li>
          <li>
            <strong>Git</strong> for version control
          </li>
          <li>
            <strong>Docker</strong> (for local development)
          </li>
          <li>
            <strong>VS Code</strong> (recommended editor)
          </li>
        </ul>

        <h2 className="text-2xl font-bold text-gunmetal mb-4">Development Environment Setup</h2>

        <Tabs defaultValue="npm" className="mb-6">
          <TabsList className="bg-light-silver/30 border border-light-silver">
            <TabsTrigger
              value="npm"
              className="data-[state=active]:bg-midnight-green data-[state=active]:text-ivory-cream"
            >
              npm
            </TabsTrigger>
            <TabsTrigger
              value="yarn"
              className="data-[state=active]:bg-midnight-green data-[state=active]:text-ivory-cream"
            >
              yarn
            </TabsTrigger>
          </TabsList>
          <TabsContent value="npm" className="pt-4">
            <div className="bg-gunmetal rounded-lg p-4 overflow-x-auto">
              <pre className="text-ivory-cream">
                <code>{`# Clone the repository
git clone https://github.com/einstein-labs/[project-name].git
cd [project-name]

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev`}</code>
              </pre>
            </div>
          </TabsContent>
          <TabsContent value="yarn" className="pt-4">
            <div className="bg-gunmetal rounded-lg p-4 overflow-x-auto">
              <pre className="text-ivory-cream">
                <code>{`# Clone the repository
git clone https://github.com/einstein-labs/[project-name].git
cd [project-name]

# Install dependencies
yarn install

# Copy environment variables
cp .env.example .env.local

# Start development server
yarn dev`}</code>
              </pre>
            </div>
          </TabsContent>
        </Tabs>

        <h2 className="text-2xl font-bold text-gunmetal mb-4">Environment Configuration</h2>

        <p className="text-gunmetal mb-4">
          Edit <code className="bg-light-silver/30 px-1 py-0.5 rounded text-gunmetal">.env.local</code> with your
          configuration:
        </p>

        <div className="bg-gunmetal rounded-lg p-4 overflow-x-auto mb-6">
          <pre className="text-ivory-cream">
            <code>{`DATABASE_URL=postgresql://localhost:5432/project_db
API_KEY=your-api-key-here
NODE_ENV=development`}</code>
          </pre>
        </div>

        <h2 className="text-2xl font-bold text-gunmetal mb-4">Database Setup</h2>

        <p className="text-gunmetal mb-4">Start the local database and run migrations:</p>

        <div className="bg-gunmetal rounded-lg p-4 overflow-x-auto mb-6">
          <pre className="text-ivory-cream">
            <code>{`# Start the local database
docker-compose up -d postgres

# Run migrations
npm run db:migrate`}</code>
          </pre>
        </div>

        <h2 className="text-2xl font-bold text-gunmetal mb-4">Next Steps</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Button
            asChild
            variant="outline"
            className="border-midnight-green text-midnight-green hover:bg-midnight-green hover:text-ivory-cream"
          >
            <a href="/system-design">Explore System Design</a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-midnight-green text-midnight-green hover:bg-midnight-green hover:text-ivory-cream"
          >
            <a href="/api-docs">View API Documentation</a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-midnight-green text-midnight-green hover:bg-midnight-green hover:text-ivory-cream"
          >
            <a href="/how-to-guides">Browse How-to Guides</a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-midnight-green text-midnight-green hover:bg-midnight-green hover:text-ivory-cream"
          >
            <a href="/contributing">Learn How to Contribute</a>
          </Button>
        </div>
      </div>
    </DocsLayout>
  )
}
