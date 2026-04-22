import { CustomLink } from '@/presentation/components';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-light to-accent opacity-10 -z-10" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary rounded-full blur-3xl opacity-20 -z-10" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent rounded-full blur-3xl opacity-20 -z-10" />

        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-full mb-8 shadow-lg shadow-primary/30">
              <span className="text-xl">⚡</span>
              <span className="font-semibold text-sm">Task Management Reimagined</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-extrabold mb-8">
              <span className="text-primary">TaskFlow</span>
              <span className="text-accent">.</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
              Organize your tasks effortlessly with an intuitive interface.
              Boost productivity and never miss a deadline again.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <CustomLink href="/tasks" variant="primary" size="lg">
                ☰ Get Started
              </CustomLink>
              <CustomLink href="/tasks/new" variant="secondary" size="lg">
                + Create Task
              </CustomLink>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Why TaskFlow?</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Everything you need to manage tasks effectively
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="group p-10 rounded-3xl border-2 border-gray-100 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <span className="text-3xl">✓</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Task Creation</h3>
              <p className="text-gray-500 leading-relaxed">
                Create tasks with title, description, effort points, and due dates. Set priorities that matter.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-10 rounded-3xl border-2 border-gray-100 hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/10 transition-all duration-500 hover:-translate-y-2">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Effort Tracking</h3>
              <p className="text-gray-500 leading-relaxed">
                Track effort points for each task to better estimate and plan your workload.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-10 rounded-3xl border-2 border-gray-100 hover:border-danger/40 hover:shadow-2xl hover:shadow-danger/10 transition-all duration-500 hover:-translate-y-2">
              <div className="w-16 h-16 bg-danger/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-danger/20 group-hover:scale-110 transition-all duration-300">
                <span className="text-3xl">📅</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Due Date Management</h3>
              <p className="text-gray-500 leading-relaxed">
                Set due dates and never miss a deadline. Visual indicators help you prioritize.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-primary-light">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center text-white">
            <div>
              <div className="text-5xl font-extrabold mb-3">100%</div>
              <div className="text-white/80 font-medium">Task Visibility</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold mb-3">24/7</div>
              <div className="text-white/80 font-medium">Access</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold mb-3">0</div>
              <div className="text-white/80 font-medium">Missed Deadlines</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold mb-3">∞</div>
              <div className="text-white/80 font-medium">Productivity</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to streamline your workflow?
          </h2>
          <p className="text-gray-500 text-lg mb-12">
            Join thousands of users who have transformed their task management with TaskFlow.
          </p>
          <CustomLink href="/tasks/new" variant="secondary" size="lg">
            + Create Your First Task
          </CustomLink>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 bg-gray-900 text-gray-400">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-lg font-semibold">
            <span className="text-primary">TaskFlow</span>
            <span className="text-accent">.</span>
          </div>
          <div className="flex items-center gap-8">
            <CustomLink href="/tasks" variant="link" size="md" className="transition-colors font-medium">
              Tasks
            </CustomLink>
            <CustomLink href="/tasks/new" variant="link" size="md" className="transition-colors font-medium">
              New Task
            </CustomLink>
          </div>
        </div>
      </footer>
    </div>
  );
}